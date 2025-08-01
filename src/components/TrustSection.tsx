import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Star, CreditCard } from 'lucide-react';

const trustItems = [
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description: 'All service providers are fully licensed and insured'
  },
  {
    icon: CheckCircle,
    title: 'GDPR Compliant',
    description: 'Your data is protected according to Swiss and EU standards'
  },
  {
    icon: Star,
    title: '4.8/5 Ratings',
    description: 'Consistently high ratings from satisfied customers'
  },
  {
    icon: CreditCard,
    title: 'Money-Back Guarantee',
    description: '100% satisfaction guarantee or your money back'
  }
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-red-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Secure &{' '}
            <span className="text-red-600">Reliable</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trust is our foundation. We maintain the highest standards of security and reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-gray-100"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4"
              >
                <item.icon className="text-white" size={28} />
              </motion.div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Geneva's Community
            </h3>
            <p className="text-gray-600">
              Join hundreds of satisfied customers who trust ServiSwiss AI
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-600 text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">2,000+</div>
              <div className="text-gray-600 text-sm">Services Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">4.8/5</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Customer Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;