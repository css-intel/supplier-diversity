'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ContractorWithProfile } from '@/lib/types/database';

interface UseContractorsOptions {
  naicsCodes?: string[];
  certifications?: string[];
  location?: string;
  searchQuery?: string;
  minRating?: number;
}

export function useContractors(options: UseContractorsOptions = {}) {
  const [contractors, setContractors] = useState<ContractorWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const supabase = createClient();

  const fetchContractors = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('profiles')
        .select(`
          *,
          contractor_profile:contractor_profiles(*)
        `)
        .eq('account_type', 'contractor');

      if (options.searchQuery) {
        query = query.or(`full_name.ilike.%${options.searchQuery}%,company_name.ilike.%${options.searchQuery}%,location.ilike.%${options.searchQuery}%`);
      }

      if (options.location) {
        query = query.ilike('location', `%${options.location}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      
      let filteredData = data as ContractorWithProfile[] || [];

      // Filter by NAICS codes (client-side since it's in related table)
      if (options.naicsCodes && options.naicsCodes.length > 0) {
        filteredData = filteredData.filter(c => 
          c.contractor_profile?.naics_codes?.some((code: string) => 
            options.naicsCodes!.some(filter => code.includes(filter))
          )
        );
      }

      // Filter by certifications (client-side)
      if (options.certifications && options.certifications.length > 0) {
        filteredData = filteredData.filter(c => 
          c.contractor_profile?.certifications?.some((cert: string) => 
            options.certifications!.includes(cert)
          )
        );
      }

      // Filter by minimum rating
      if (options.minRating) {
        filteredData = filteredData.filter(c => 
          (c.contractor_profile?.rating || 0) >= options.minRating!
        );
      }

      setContractors(filteredData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContractors();
  }, [options.searchQuery, options.location, options.minRating]);

  return {
    contractors,
    loading,
    error,
    refetch: fetchContractors,
  };
}
