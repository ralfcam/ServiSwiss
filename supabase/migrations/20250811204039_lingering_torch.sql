/*
  # Seed Initial Data for ServiSwiss AI Beta

  1. Service Categories
  2. Services with pricing
  3. Sample providers for testing
*/

-- Insert Service Categories
INSERT INTO service_categories (name, description, icon, color, sort_order) VALUES
('cleaning', 'Home and office cleaning services', '🧹', '#EF4444', 1),
('transport', 'Moving and transportation services', '📦', '#3B82F6', 2),
('repair', 'Appliance repair and maintenance', '🔧', '#10B981', 3),
('premium', 'Premium household services', '👔', '#8B5CF6', 4),
('complete', 'Complete home management packages', '🏠', '#F59E0B', 5),
('business', 'Commercial and business services', '🏢', '#6B7280', 6);

-- Insert Services
INSERT INTO services (category_id, name, description, short_description, icon, base_price_chf, price_unit, duration_minutes, popular) VALUES
-- Cleaning Services
((SELECT id FROM service_categories WHERE name = 'cleaning'), 'Essential Home Cleaning', 'Regular house cleaning including dusting, vacuuming, mopping, and bathroom cleaning', 'Regular, end-of-lease', '🧹', 22.00, 'hour', 180, true),
((SELECT id FROM service_categories WHERE name = 'cleaning'), 'Deep Cleaning Service', 'Comprehensive deep cleaning including inside appliances, baseboards, and detailed sanitization', 'Deep clean, move-in/out', '🧽', 28.00, 'hour', 240, false),
((SELECT id FROM service_categories WHERE name = 'cleaning'), 'Office Cleaning', 'Professional office cleaning including desks, common areas, and restrooms', 'Commercial spaces', '🏢', 25.00, 'hour', 120, false),

-- Transport Services
((SELECT id FROM service_categories WHERE name = 'transport'), 'Small Moves & Transport', 'Local moving services for apartments and small items', 'Relocations, deliveries', '📦', 35.00, 'hour', 240, false),
((SELECT id FROM service_categories WHERE name = 'transport'), 'Furniture Delivery', 'Delivery and setup of furniture and large items', 'Furniture, appliances', '🚚', 40.00, 'hour', 120, false),
((SELECT id FROM service_categories WHERE name = 'transport'), 'Storage Solutions', 'Packing, moving to storage, and organization services', 'Storage, organization', '📋', 30.00, 'hour', 180, false),

-- Repair Services
((SELECT id FROM service_categories WHERE name = 'repair'), 'Appliance Repair & Maintenance', 'Repair of household appliances including washing machines, dishwashers, and ovens', 'Electronics, plumbing', '🔧', 45.00, 'hour', 90, false),
((SELECT id FROM service_categories WHERE name = 'repair'), 'Plumbing Services', 'Basic plumbing repairs including leaks, clogs, and fixture installation', 'Pipes, fixtures', '🚿', 50.00, 'hour', 120, false),
((SELECT id FROM service_categories WHERE name = 'repair'), 'Electrical Services', 'Basic electrical work including outlet installation and light fixture repair', 'Wiring, fixtures', '⚡', 55.00, 'hour', 90, false),

-- Premium Services
((SELECT id FROM service_categories WHERE name = 'premium'), 'Premium Home Services', 'High-end cleaning and maintenance with premium products', 'Laundry, handyman', '👔', 28.00, 'hour', 180, false),
((SELECT id FROM service_categories WHERE name = 'premium'), 'Personal Assistant Services', 'Errands, shopping, and personal task management', 'Errands, shopping', '🛍️', 32.00, 'hour', 120, false),
((SELECT id FROM service_categories WHERE name = 'premium'), 'Concierge Services', 'Luxury household management and coordination', 'Luxury management', '🎩', 45.00, 'hour', 60, false),

-- Complete Packages
((SELECT id FROM service_categories WHERE name = 'complete'), 'Complete Home Management', 'Integrated bundle of cleaning, maintenance, and household services', 'Integrated bundle', '🏠', 0.00, 'service', 0, false),
((SELECT id FROM service_categories WHERE name = 'complete'), 'Monthly Home Care Package', 'Regular monthly maintenance including cleaning, minor repairs, and inspections', 'Monthly maintenance', '📅', 250.00, 'service', 0, false),

-- Business Services
((SELECT id FROM service_categories WHERE name = 'business'), 'Business Facility Services', 'Commercial cleaning and facility maintenance', 'Commercial cleaning, upkeep', '🏢', 25.00, 'hour', 240, false),
((SELECT id FROM service_categories WHERE name = 'business'), 'Event Cleanup', 'Post-event cleaning and restoration services', 'Event cleanup', '🎉', 30.00, 'hour', 180, false);