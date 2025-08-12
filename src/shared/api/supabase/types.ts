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


