/*
  # Core Database Schema for ServiSwiss AI Beta

  1. New Tables
    - `service_categories` - Service category definitions
    - `services` - Available services with pricing
    - `bookings` - Customer bookings with status tracking
    - `booking_services` - Many-to-many relationship for multi-service bookings
    - `providers` - Service provider profiles
    - `provider_services` - Services offered by each provider
    - `booking_confirmations` - 48h confirmation call tracking
    - `payments` - Payment tracking and status
    - `reviews` - Customer reviews and ratings

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Separate policies for customers, providers, and admins

  3. Features
    - Multi-service booking support
    - Provider matching system
    - Payment workflow tracking
    - Review and rating system
*/

-- Service Categories
CREATE TABLE IF NOT EXISTS service_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text NOT NULL,
  color text DEFAULT '#6B7280',
  sort_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES service_categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  short_description text,
  icon text NOT NULL,
  base_price_chf decimal(10,2) NOT NULL,
  price_unit text DEFAULT 'hour', -- hour, service, item
  duration_minutes integer DEFAULT 60,
  popular boolean DEFAULT false,
  active boolean DEFAULT true,
  requirements jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Providers
CREATE TABLE IF NOT EXISTS providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  address jsonb NOT NULL, -- {street, city, postal_code, canton}
  languages text[] DEFAULT ARRAY['en'],
  license_number text,
  insurance_policy text,
  verified boolean DEFAULT false,
  active boolean DEFAULT true,
  rating decimal(3,2) DEFAULT 0.00,
  total_reviews integer DEFAULT 0,
  total_bookings integer DEFAULT 0,
  availability jsonb DEFAULT '{}', -- weekly schedule
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Provider Services (many-to-many)
CREATE TABLE IF NOT EXISTS provider_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  custom_price_chf decimal(10,2),
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(provider_id, service_id)
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_reference text UNIQUE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded')),
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_address jsonb NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL, -- morning, afternoon, evening
  general_notes text DEFAULT '',
  total_amount_chf decimal(10,2) DEFAULT 0.00,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method text,
  confirmation_deadline timestamptz,
  confirmed_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Booking Services (many-to-many for multi-service bookings)
CREATE TABLE IF NOT EXISTS booking_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  provider_id uuid REFERENCES providers(id) ON DELETE SET NULL,
  scheduled_date date,
  scheduled_time text,
  service_notes text DEFAULT '',
  recurring_interval text CHECK (recurring_interval IN ('weekly', 'biweekly', 'monthly', 'custom')),
  recurring_interval_days integer,
  price_chf decimal(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Booking Confirmations (48h confirmation tracking)
CREATE TABLE IF NOT EXISTS booking_confirmations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  confirmation_type text DEFAULT 'phone' CHECK (confirmation_type IN ('phone', 'email', 'sms')),
  attempted_at timestamptz,
  confirmed_at timestamptz,
  confirmed_by uuid REFERENCES auth.users(id),
  notes text DEFAULT '',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'attempted', 'confirmed', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  stripe_payment_intent_id text UNIQUE,
  amount_chf decimal(10,2) NOT NULL,
  currency text DEFAULT 'CHF',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refunded')),
  payment_method text,
  paid_at timestamptz,
  refunded_at timestamptz,
  refund_amount_chf decimal(10,2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  comment text,
  response text, -- provider response
  response_at timestamptz,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_confirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Service Categories (Public Read)
CREATE POLICY "Anyone can view active service categories"
  ON service_categories
  FOR SELECT
  USING (active = true);

-- RLS Policies for Services (Public Read)
CREATE POLICY "Anyone can view active services"
  ON services
  FOR SELECT
  USING (active = true);

-- RLS Policies for Providers (Public Read for Active)
CREATE POLICY "Anyone can view active verified providers"
  ON providers
  FOR SELECT
  USING (active = true AND verified = true);

CREATE POLICY "Providers can update their own profile"
  ON providers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for Provider Services
CREATE POLICY "Anyone can view available provider services"
  ON provider_services
  FOR SELECT
  USING (available = true);

CREATE POLICY "Providers can manage their own services"
  ON provider_services
  FOR ALL
  TO authenticated
  USING (provider_id IN (SELECT id FROM providers WHERE user_id = auth.uid()));

-- RLS Policies for Bookings
CREATE POLICY "Customers can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Customers can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Customers can update their own pending bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (customer_id = auth.uid() AND status = 'pending');

-- RLS Policies for Booking Services
CREATE POLICY "Customers can view their booking services"
  ON booking_services
  FOR SELECT
  TO authenticated
  USING (booking_id IN (SELECT id FROM bookings WHERE customer_id = auth.uid()));

CREATE POLICY "Customers can create booking services"
  ON booking_services
  FOR INSERT
  TO authenticated
  WITH CHECK (booking_id IN (SELECT id FROM bookings WHERE customer_id = auth.uid()));

-- RLS Policies for Booking Confirmations
CREATE POLICY "Customers can view their booking confirmations"
  ON booking_confirmations
  FOR SELECT
  TO authenticated
  USING (booking_id IN (SELECT id FROM bookings WHERE customer_id = auth.uid()));

-- RLS Policies for Payments
CREATE POLICY "Customers can view their own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (booking_id IN (SELECT id FROM bookings WHERE customer_id = auth.uid()));

-- RLS Policies for Reviews
CREATE POLICY "Anyone can view verified reviews"
  ON reviews
  FOR SELECT
  USING (verified = true);

CREATE POLICY "Customers can create reviews for their bookings"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid() AND booking_id IN (SELECT id FROM bookings WHERE customer_id = auth.uid() AND status = 'completed'));

CREATE POLICY "Customers can update their own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (customer_id = auth.uid());

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_services_category_id ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);
CREATE INDEX IF NOT EXISTS idx_providers_verified_active ON providers(verified, active);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_booking_services_booking_id ON booking_services(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_services_provider_id ON booking_services(provider_id);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_provider_id ON reviews(provider_id);
CREATE INDEX IF NOT EXISTS idx_reviews_verified ON reviews(verified);

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON service_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_booking_services_updated_at BEFORE UPDATE ON booking_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate booking reference
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
BEGIN
    RETURN 'SW' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(gen_random_uuid()::text, 1, 6));
END;
$$ LANGUAGE plpgsql;

-- Function to update provider ratings
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE providers 
    SET 
        rating = (
            SELECT COALESCE(AVG(rating::decimal), 0.00)
            FROM reviews 
            WHERE provider_id = NEW.provider_id AND verified = true
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM reviews 
            WHERE provider_id = NEW.provider_id AND verified = true
        )
    WHERE id = NEW.provider_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update provider ratings when reviews are added/updated
CREATE TRIGGER update_provider_rating_trigger
    AFTER INSERT OR UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_provider_rating();