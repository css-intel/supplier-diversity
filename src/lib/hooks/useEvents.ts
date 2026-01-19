'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Event } from '@/lib/types/database';

interface UseEventsOptions {
  type?: string;
  searchQuery?: string;
}

export function useEvents(options: UseEventsOptions = {}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const supabase = createClient();

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (options.type && options.type !== 'All Events') {
        query = query.eq('type', options.type);
      }

      if (options.searchQuery) {
        query = query.or(`title.ilike.%${options.searchQuery}%,description.ilike.%${options.searchQuery}%,location.ilike.%${options.searchQuery}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      
      setEvents(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [options.type, options.searchQuery]);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
  };
}

export function useEventRegistration(userId: string | undefined) {
  const [registeredEventIds, setRegisteredEventIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchRegistrations = async () => {
      const { data } = await supabase
        .from('event_registrations')
        .select('event_id')
        .eq('user_id', userId);

      if (data) {
        setRegisteredEventIds(new Set(data.map(r => r.event_id)));
      }
      setLoading(false);
    };

    fetchRegistrations();
  }, [userId]);

  const register = async (eventId: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from('event_registrations')
      .insert({ user_id: userId, event_id: eventId });

    if (!error) {
      setRegisteredEventIds(prev => new Set(prev).add(eventId));
      
      // Increment attendees count
      await supabase.rpc('increment_attendees', { event_id: eventId });
    }
  };

  const unregister = async (eventId: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from('event_registrations')
      .delete()
      .eq('user_id', userId)
      .eq('event_id', eventId);

    if (!error) {
      setRegisteredEventIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
    }
  };

  return {
    registeredEventIds,
    loading,
    register,
    unregister,
    isRegistered: (id: string) => registeredEventIds.has(id),
  };
}
