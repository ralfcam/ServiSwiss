import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Phone, CreditCard, CheckCircle } from 'lucide-react';

const workflowSteps = [
  {
    step: 1,
    icon: Calendar,
    title: 'Book',
    description: 'Book cleaning for Friday',
    example: 'Select "Essential Home Cleaning" for this Friday at 2 PM'
  },
  {
    step: 2,
    icon: Phone,
    title: 'Confirm',
    description: 'Call confirms provider',
    example: 'Receive confirmation call within 48 hours with provider details'
  },
  {
    step: 3,
    icon: CreditCard,
    title: 'Pay',
    description: 'Pay CHF 150 via link',
    example: 'Secure payment link sent via email - pay only after confirmation'
  },
  {
    step: 4,
    icon: CheckCircle,
    title: 'Service',
    description: 'Professional service delivered',
    example: 'Certified cleaner arrives on time with all equipment'
  }
];

const BookingWorkflow = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Booking{' '}
            <span className="text-red-600">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See exactly how our streamlined process works with real examples
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Desktop Flow Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-200 via-blue-200 to-green-200 transform -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline Node */}
                <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow-lg z-10" />

                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-blue-50 to-red-50 border-2 border-gray-200 rounded-3xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-4">
                    <step.icon className="text-white" size={28} />
                  </div>

                  <div className="text-sm font-bold text-red-600 mb-2">
                    STEP {step.step}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-gray-700 font-medium mb-3">
                    {step.description}
                  </p>

                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-sm text-gray-600 italic">
                      {step.example}
                    </p>
                  </div>
                </motion.div>

                {/* Mobile Arrow */}
                {index < workflowSteps.length - 1 && (
                  <div className="flex justify-center my-6 lg:hidden">
                    <ArrowRight className="text-gray-400" size={24} />
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
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Typical Service Example
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600 mb-2">3-Room Cleaning</div>
                <div className="text-gray-600">Standard apartment</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-2">CHF 150</div>
                <div className="text-gray-600">Total cost (vs CHF 280 traditional)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-2">3 Hours</div>
                <div className="text-gray-600">Professional service</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingWorkflow;