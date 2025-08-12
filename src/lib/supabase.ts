// Compatibility re-exports to avoid breaking imports during refactor
export { supabase } from '../shared/api/supabase/client';
export type { ServiceCategory, Service, Provider, Booking, BookingService, Payment, Review } from '../shared/api/supabase/types';
export { getServices, getServiceCategories } from '../shared/api/supabase/catalog';
export { getUserBookings, createBooking } from '../shared/api/supabase/bookings';
export { getCurrentUser, signIn, signOut, signUp } from '../shared/api/supabase/auth';