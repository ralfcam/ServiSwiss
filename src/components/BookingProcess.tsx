import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Mail, Shield } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Calendar,
    title: 'Select & Reserve Instantly',
    description: 'Choose your service and preferred time slot'
  },
  {
    number: 2,
    icon: Mail,
    title: 'Receive Booking Reference',
    description: 'Get instant confirmation email with reference number'
  },
  {
    number: 3,
    icon: Phone,
    title: '48h Confirmation Call',
    description: 'Our team confirms details and matches you with providers'
  },
  {
    number: 4,
    icon: Shield,
    title: 'Secure Payment Link via Email',
    description: 'Pay securely only after service confirmation'
  }
];

const BookingProcess = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-red-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple Booking in{' '}
            <span className="text-red-600">4 Steps</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process ensures you get the service you need with complete transparency
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-200 via-blue-200 to-red-200 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline Node */}
                <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow-lg z-10" />

                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white border-2 border-blue-100 rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6">
                    <step.icon className="text-white" size={28} />
                  </div>

                  <div className="text-sm font-bold text-red-600 mb-2">
                    STEP {step.number}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-6 lg:hidden">
                    <div className="w-1 h-8 bg-gradient-to-b from-red-300 to-blue-300 rounded-full" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 p-8 bg-white rounded-3xl border-2 border-blue-100 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Security & Trust Guaranteed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Shield className="text-red-600 mx-auto mb-2" size={32} />
              <div className="font-semibold text-gray-900">No Upfront Payment</div>
              <div className="text-sm text-gray-600">Pay only after confirmation</div>
            </div>
            <div>
              <Shield className="text-blue-600 mx-auto mb-2" size={32} />
              <div className="font-semibold text-gray-900">Swiss Security Standards</div>
              <div className="text-sm text-gray-600">GDPR compliant & encrypted</div>
            </div>
            <div>
              <Shield className="text-red-600 mx-auto mb-2" size={32} />
              <div className="font-semibold text-gray-900">Money-Back Guarantee</div>
              <div className="text-sm text-gray-600">100% satisfaction guaranteed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingProcess;