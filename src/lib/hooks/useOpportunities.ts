'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Opportunity, OpportunityWithPoster } from '@/lib/types/database';

interface UseOpportunitiesOptions {
  type?: 'procurement' | 'teaming' | 'all';
  status?: 'open' | 'closed' | 'all';
  naicsCodes?: string[];
  searchQuery?: string;
  postedBy?: string;
}

export function useOpportunities(options: UseOpportunitiesOptions = {}) {
  const [opportunities, setOpportunities] = useState<OpportunityWithPoster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const supabase = createClient();

  const fetchOpportunities = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('opportunities')
        .select(`
          *,
          poster:profiles!posted_by(*)
        `)
        .order('created_at', { ascending: false });

      if (options.type && options.type !== 'all') {
        query = query.eq('type', options.type);
      }

      if (options.status && options.status !== 'all') {
        query = query.eq('status', options.status);
      }

      if (options.postedBy) {
        query = query.eq('posted_by', options.postedBy);
      }

      if (options.naicsCodes && options.naicsCodes.length > 0) {
        query = query.overlaps('naics_codes', options.naicsCodes);
      }

      if (options.searchQuery) {
        query = query.or(`title.ilike.%${options.searchQuery}%,description.ilike.%${options.searchQuery}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      
      setOpportunities(data as OpportunityWithPoster[] || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [options.type, options.status, options.postedBy, options.searchQuery]);

  const createOpportunity = async (opportunity: Omit<Opportunity, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('opportunities')
      .insert(opportunity)
      .select()
      .single();

    if (error) throw error;
    await fetchOpportunities();
    return data;
  };

  const updateOpportunity = async (id: string, updates: Partial<Opportunity>) => {
    const { data, error } = await supabase
      .from('opportunities')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    await fetchOpportunities();
    return data;
  };

  const deleteOpportunity = async (id: string) => {
    const { error } = await supabase
      .from('opportunities')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await fetchOpportunities();
  };

  return {
    opportunities,
    loading,
    error,
    refetch: fetchOpportunities,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
  };
}

export function useSavedOpportunities(userId: string | undefined) {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchSaved = async () => {
      const { data } = await supabase
        .from('saved_opportunities')
        .select('opportunity_id')
        .eq('user_id', userId);

      if (data) {
        setSavedIds(new Set(data.map(s => s.opportunity_id)));
      }
      setLoading(false);
    };

    fetchSaved();
  }, [userId]);

  const toggleSave = async (opportunityId: string) => {
    if (!userId) return;

    if (savedIds.has(opportunityId)) {
      await supabase
        .from('saved_opportunities')
        .delete()
        .eq('user_id', userId)
        .eq('opportunity_id', opportunityId);

      setSavedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(opportunityId);
        return newSet;
      });
    } else {
      await supabase
        .from('saved_opportunities')
        .insert({ user_id: userId, opportunity_id: opportunityId });

      setSavedIds(prev => new Set(prev).add(opportunityId));
    }
  };

  return { savedIds, loading, toggleSave, isSaved: (id: string) => savedIds.has(id) };
}
