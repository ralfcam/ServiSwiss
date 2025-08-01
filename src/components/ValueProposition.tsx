import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Award, Bot } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: '47% Cost Savings',
    description: 'From CHF 42-55 to 22/hour',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Clock,
    title: 'Save 10+ Hours Monthly',
    description: 'Let AI handle the coordination',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Award,
    title: 'Swiss Quality Guaranteed',
    description: 'Premium service standards',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Bot,
    title: 'AI-Powered Matching',
    description: 'Smart provider selection',
    color: 'from-blue-500 to-blue-600'
  }
];

const ValueProposition = () => {
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
            Why{' '}
            <span className="text-red-600">ServiSwiss AI?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of household services with our AI-powered platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white border-2 border-gray-100 rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl mb-6`}
              >
                <benefit.icon className="text-white" size={28} />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-br from-red-50 to-blue-50 rounded-3xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Real Savings, Real Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">47%</div>
              <div className="text-gray-700">Average Cost Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-700">Hours Saved Monthly</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-700">Happy Customers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;