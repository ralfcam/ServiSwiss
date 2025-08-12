import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Award, Bot, TrendingDown, Users, Shield, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Target,
    title: '47% Cost Savings',
    description: 'From CHF 42-55 to CHF 22/hour',
    color: 'from-red-500 to-red-600',
    metric: '47%',
    detail: 'Average savings vs traditional services'
  },
  {
    icon: Clock,
    title: 'Save 10+ Hours Monthly',
    description: 'Let AI handle the coordination',
    color: 'from-blue-500 to-blue-600',
    metric: '10+',
    detail: 'Hours saved per month'
  },
  {
    icon: Award,
    title: 'Swiss Quality Guaranteed',
    description: 'Premium service standards',
    color: 'from-green-500 to-green-600',
    metric: '4.8/5',
    detail: 'Customer satisfaction rating'
  },
  {
    icon: Bot,
    title: 'AI-Powered Matching',
    description: 'Smart provider selection',
    color: 'from-purple-500 to-purple-600',
    metric: '48h',
    detail: 'Maximum confirmation time'
  }
];

const stats = [
  { icon: TrendingDown, label: 'Cost Reduction', value: '47%', color: 'text-red-600' },
  { icon: Clock, label: 'Time Saved', value: '10+ hrs', color: 'text-blue-600' },
  { icon: Users, label: 'Happy Customers', value: '500+', color: 'text-green-600' },
  { icon: Shield, label: 'Success Rate', value: '99.2%', color: 'text-purple-600' }
];

const ValueProposition = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Why{' '}
            <span className="text-red-600 relative">
              ServiSwiss AI?
              <motion.div
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full"
              />
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of household services with our AI-powered platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
              }}
              className="relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-3xl mb-6 shadow-lg`}
                >
                  <benefit.icon className="text-white" size={32} />
                </motion.div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{benefit.metric}</div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-2">
                  {benefit.description}
                </p>
                
                <p className="text-sm text-gray-500 font-medium">
                  {benefit.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Proven Results
            </h3>
            <p className="text-gray-600">
              Real data from our satisfied customers in Geneva
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4 group-hover:bg-gray-200 transition-colors"
                >
                  <stat.icon className={`${stat.color}`} size={24} />
                </motion.div>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-red-50 via-white to-blue-50 rounded-3xl p-12 text-center border border-gray-200 shadow-xl"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="text-red-600 mx-auto mb-4" size={48} />
          </motion.div>
          
          <h3 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience the Difference?
          </h3>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of Geneva residents who have already discovered smarter, more affordable household services.
          </p>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(213, 43, 30, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-5 rounded-full text-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-xl"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Saving Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;