import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, AlertCircle, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getUserBookings, Booking, BookingService } from '../lib/supabase';

const BookingDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<(Booking & { 
    booking_services: (BookingService & { services: any })[];
    payments: any[];
  })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadBookings();
    }
  }, [isAuthenticated]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const data = await getUserBookings();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'confirmed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in_progress': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'confirmed': return <CheckCircle size={16} />;
      case 'in_progress': return <AlertCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'cancelled': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h2>
        <p className="text-gray-600">Please sign in to view your bookings.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="text-4xl mb-4">❌</div>
        <p className="text-red-600">{error}</p>
        <button 
          onClick={loadBookings}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">My Bookings</h2>
        <p className="text-gray-600">Track and manage your service bookings</p>
      </motion.div>

      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white rounded-3xl shadow-lg"
        >
          <div className="text-6xl mb-6">📋</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No Bookings Yet</h3>
          <p className="text-gray-600 mb-8">Start by booking your first service!</p>
          <button 
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold hover:from-red-700 hover:to-red-800 transition-all"
          >
            Book a Service
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Booking #{booking.booking_reference}
                  </h3>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="capitalize">{booking.status.replace('_', ' ')}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    CHF {booking.total_amount_chf}
                  </div>
                  <div className={`text-sm font-medium ${
                    booking.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {booking.payment_status === 'paid' ? 'Paid' : 'Payment Pending'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-gray-400" size={20} />
                    <span className="text-gray-700">
                      {new Date(booking.preferred_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="text-gray-400" size={20} />
                    <span className="text-gray-700 capitalize">
                      {booking.preferred_time.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-gray-400" size={20} />
                    <span className="text-gray-700">{booking.customer_email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-gray-400" size={20} />
                    <span className="text-gray-700">{booking.customer_phone}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-gray-400 mt-1" size={20} />
                    <div className="text-gray-700">
                      <div>{booking.customer_address.street}</div>
                      <div>{booking.customer_address.postalCode} {booking.customer_address.city}</div>
                    </div>
                  </div>
                  {booking.general_notes && (
                    <div className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                      <strong>Notes:</strong> {booking.general_notes}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Services</h4>
                <div className="space-y-3">
                  {booking.booking_services.map((bookingService) => (
                    <div key={bookingService.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{bookingService.services.icon}</div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {bookingService.services.name}
                          </div>
                          {bookingService.scheduled_date && (
                            <div className="text-sm text-gray-600">
                              {new Date(bookingService.scheduled_date).toLocaleDateString()}
                              {bookingService.scheduled_time && ` • ${bookingService.scheduled_time}`}
                            </div>
                          )}
                          {bookingService.service_notes && (
                            <div className="text-sm text-gray-500 mt-1">
                              {bookingService.service_notes}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          CHF {bookingService.price_chf}
                        </div>
                        <div className={`text-sm font-medium ${getStatusColor(bookingService.status).split(' ')[0]}`}>
                          {bookingService.status.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {booking.status === 'pending' && booking.payment_status === 'pending' && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="text-yellow-600" size={20} />
                    <div>
                      <div className="font-semibold text-yellow-800">Confirmation Pending</div>
                      <div className="text-yellow-700 text-sm">
                        You will receive a confirmation call within 48 hours. Payment link will be sent after confirmation.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 text-xs text-gray-500">
                Created: {new Date(booking.created_at).toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingDashboard;