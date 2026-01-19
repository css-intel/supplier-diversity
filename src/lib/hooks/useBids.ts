'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Bid, BidWithContractor } from '@/lib/types/database';

export function useBids(opportunityId?: string, contractorId?: string) {
  const [bids, setBids] = useState<BidWithContractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const supabase = createClient();

  const fetchBids = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('bids')
        .select(`
          *,
          contractor:profiles!contractor_id(
            *,
            contractor_profile:contractor_profiles(*)
          )
        `)
        .order('created_at', { ascending: false });

      if (opportunityId) {
        query = query.eq('opportunity_id', opportunityId);
      }

      if (contractorId) {
        query = query.eq('contractor_id', contractorId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      
      setBids(data as BidWithContractor[] || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();
  }, [opportunityId, contractorId]);

  const submitBid = async (bid: Omit<Bid, 'id' | 'created_at' | 'status'>) => {
    const { data, error } = await supabase
      .from('bids')
      .insert({ ...bid, status: 'pending' })
      .select()
      .single();

    if (error) throw error;
    await fetchBids();
    return data;
  };

  const updateBidStatus = async (bidId: string, status: 'accepted' | 'rejected') => {
    const { data, error } = await supabase
      .from('bids')
      .update({ status })
      .eq('id', bidId)
      .select()
      .single();

    if (error) throw error;
    await fetchBids();
    return data;
  };

  return {
    bids,
    loading,
    error,
    refetch: fetchBids,
    submitBid,
    updateBidStatus,
  };
}
