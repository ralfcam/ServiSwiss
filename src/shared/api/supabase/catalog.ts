import { supabase } from './client';
import type { Service, ServiceCategory } from './types';

export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      service_categories (*)
    `)
    .eq('active', true)
    .order('popular', { ascending: false });
  if (error) throw error;
  return data as (Service & { service_categories: ServiceCategory })[];
};

export const getServiceCategories = async () => {
  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('active', true)
    .order('sort_order');
  if (error) throw error;
  return data as ServiceCategory[];
};

export type { Service, ServiceCategory };


