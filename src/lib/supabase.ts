import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface ServiceCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  color: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  short_description: string | null;
  icon: string;
  base_price_chf: number;
  price_unit: string;
  duration_minutes: number;
  popular: boolean;
  active: boolean;
  requirements: Record<string, any>;
  created_at: string;
  updated_at: string;
  service_categories?: ServiceCategory;
}

export interface Provider {
  id: string;
  user_id: string | null;
  company_name: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: Record<string, any>;
  languages: string[];
  license_number: string | null;
  insurance_policy: string | null;
  verified: boolean;
  active: boolean;
  rating: number;
  total_reviews: number;
  total_bookings: number;
  availability: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  customer_id: string;
  booking_reference: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded';
  customer_email: string;
  customer_phone: string;
  customer_address: Record<string, any>;
  preferred_date: string;
  preferred_time: string;
  general_notes: string;
  total_amount_chf: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string | null;
  confirmation_deadline: string | null;
  confirmed_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingService {
  id: string;
  booking_id: string;
  service_id: string;
  provider_id: string | null;
  scheduled_date: string | null;
  scheduled_time: string | null;
  service_notes: string;
  recurring_interval: 'weekly' | 'biweekly' | 'monthly' | 'custom' | null;
  recurring_interval_days: number | null;
  price_chf: number;
  status: 'pending' | 'assigned' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  services?: Service;
  providers?: Provider;
}

export interface Payment {
  id: string;
  booking_id: string;
  stripe_payment_intent_id: string | null;
  amount_chf: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'cancelled' | 'refunded';
  payment_method: string | null;
  paid_at: string | null;
  refunded_at: string | null;
  refund_amount_chf: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  customer_id: string;
  provider_id: string;
  service_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  response: string | null;
  response_at: string | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
  providers?: Provider;
  services?: Service;
}

// Auth helper functions
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });
  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Database helper functions
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

export const createBooking = async (bookingData: {
  customer_email: string;
  customer_phone: string;
  customer_address: Record<string, any>;
  preferred_date: string;
  preferred_time: string;
  general_notes?: string;
  services: Array<{
    service_id: string;
    scheduled_date?: string;
    scheduled_time?: string;
    service_notes?: string;
    recurring_interval?: string;
    recurring_interval_days?: number;
    price_chf: number;
  }>;
}) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User must be authenticated');

  // Generate booking reference
  const { data: refData, error: refError } = await supabase
    .rpc('generate_booking_reference');
  
  if (refError) throw refError;
  
  const booking_reference = refData;
  
  // Calculate total amount
  const total_amount_chf = bookingData.services.reduce((sum, service) => sum + service.price_chf, 0);
  
  // Create booking
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      customer_id: user.id,
      booking_reference,
      customer_email: bookingData.customer_email,
      customer_phone: bookingData.customer_phone,
      customer_address: bookingData.customer_address,
      preferred_date: bookingData.preferred_date,
      preferred_time: bookingData.preferred_time,
      general_notes: bookingData.general_notes || '',
      total_amount_chf,
      confirmation_deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() // 48 hours from now
    })
    .select()
    .single();
  
  if (bookingError) throw bookingError;
  
  // Create booking services
  const bookingServices = bookingData.services.map(service => ({
    booking_id: booking.id,
    service_id: service.service_id,
    scheduled_date: service.scheduled_date,
    scheduled_time: service.scheduled_time,
    service_notes: service.service_notes || '',
    recurring_interval: service.recurring_interval,
    recurring_interval_days: service.recurring_interval_days,
    price_chf: service.price_chf
  }));
  
  const { error: servicesError } = await supabase
    .from('booking_services')
    .insert(bookingServices);
  
  if (servicesError) throw servicesError;
  
  return booking;
};

export const getUserBookings = async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User must be authenticated');
  
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      booking_services (
        *,
        services (*),
        providers (*)
      ),
      payments (*)
    `)
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};