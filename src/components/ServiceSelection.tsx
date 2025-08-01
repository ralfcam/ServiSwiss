import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Phone, MessageSquare } from 'lucide-react';

const services = [
  { id: 'cleaning', icon: '🧹', label: 'Essential Home Cleaning', desc: 'Regular, end-of-lease' },
  { id: 'transport', icon: '📦', label: 'Small Moves & Transport', desc: 'Relocations, deliveries' },
  { id: 'repair', icon: '🔧', label: 'Appliance Repair & Maintenance', desc: 'Electronics, plumbing' },
  { id: 'premium', icon: '👔', label: 'Premium Home Services', desc: 'Laundry, handyman' },
  { id: 'complete', icon: '🏠', label: 'Complete Home Management', desc: 'Integrated bundle' },
  { id: 'business', icon: '🏢', label: 'Business Facility Services', desc: 'Commercial cleaning, upkeep' }
];

const ServiceSelection = () => {
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Service booking:', { selectedService, ...formData });
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Select and Schedule Your Service{' '}
            <span className="text-red-600">Instantly</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of household services and get instant confirmation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Service Selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white border-2 border-blue-100 rounded-3xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Service</h3>
            
            <div className="space-y-4 mb-8">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{service.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{service.label}</div>
                      <div className="text-sm text-gray-600">{service.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Preference
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (8-12)</option>
                    <option value="afternoon">Afternoon (12-17)</option>
                    <option value="evening">Evening (17-20)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="inline w-4 h-4 mr-2" />
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Any specific requirements or details..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
              >
                Reserve Now – We'll Confirm in 48h
              </motion.button>
            </form>
          </motion.div>

          {/* Service Icons Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-br from-blue-50 to-red-50 p-8 rounded-2xl text-center shadow-lg"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <div className="font-semibold text-gray-900 text-sm">{service.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 p-4 bg-blue-50 rounded-2xl"
        >
          <p className="text-gray-700">
            <strong>No payment until confirmed.</strong> Swiss-standard security guaranteed.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSelection;