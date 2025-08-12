import { supabase } from './client';
import { getCurrentUser } from './auth';
import type { Booking, BookingService, Service, ServiceCategory } from './types';

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

  const { data: refData, error: refError } = await supabase.rpc('generate_booking_reference');
  if (refError) throw refError;
  const booking_reference = refData as string;

  const total_amount_chf = bookingData.services.reduce((sum, service) => sum + service.price_chf, 0);

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
      confirmation_deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    })
    .select()
    .single();
  if (bookingError) throw bookingError;

  const bookingServices = bookingData.services.map((service) => ({
    booking_id: booking.id,
    service_id: service.service_id,
    scheduled_date: service.scheduled_date,
    scheduled_time: service.scheduled_time,
    service_notes: service.service_notes || '',
    recurring_interval: service.recurring_interval as any,
    recurring_interval_days: service.recurring_interval_days,
    price_chf: service.price_chf,
  }));

  const { error: servicesError } = await supabase.from('booking_services').insert(bookingServices);
  if (servicesError) throw servicesError;

  return booking as Booking;
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
  return data as Array<
    Booking & {
      booking_services: Array<BookingService & { services: Service }>;
      payments: any[];
    }
  >;
};

export type { Booking, BookingService };


