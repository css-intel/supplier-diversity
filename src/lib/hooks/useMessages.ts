'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Message, Profile } from '@/lib/types/database';

interface Conversation {
  id: string;
  participant: Profile;
  lastMessage: Message | null;
  unreadCount: number;
}

export function useMessages(userId: string | undefined) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const supabase = createClient();

  const fetchConversations = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    
    try {
      // Get all messages involving this user
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;

      // Group by conversation
      const conversationMap = new Map<string, Message[]>();
      messagesData?.forEach(msg => {
        const convId = msg.conversation_id;
        if (!conversationMap.has(convId)) {
          conversationMap.set(convId, []);
        }
        conversationMap.get(convId)!.push(msg);
      });

      // Build conversation objects
      const convList: Conversation[] = [];
      for (const [convId, msgs] of conversationMap) {
        const lastMsg = msgs[0];
        const otherUserId = lastMsg.sender_id === userId ? lastMsg.receiver_id : lastMsg.sender_id;
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', otherUserId)
          .single();

        if (profile) {
          const unread = msgs.filter(m => m.receiver_id === userId && !m.read).length;
          convList.push({
            id: convId,
            participant: profile,
            lastMessage: lastMsg,
            unreadCount: unread,
          });
        }
      }

      setConversations(convList);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    
    setMessages(data || []);

    // Mark as read
    if (userId) {
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('conversation_id', conversationId)
        .eq('receiver_id', userId);
    }

    return data;
  };

  const sendMessage = async (receiverId: string, subject: string, content: string, conversationId?: string) => {
    if (!userId) throw new Error('User not authenticated');

    const convId = conversationId || `${[userId, receiverId].sort().join('-')}`;

    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: userId,
        receiver_id: receiverId,
        subject,
        content,
        conversation_id: convId,
      })
      .select()
      .single();

    if (error) throw error;

    await fetchConversations();
    return data;
  };

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Real-time subscription
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${userId}`,
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, fetchConversations]);

  return {
    conversations,
    messages,
    loading,
    error,
    fetchMessages,
    sendMessage,
    refetch: fetchConversations,
  };
}
