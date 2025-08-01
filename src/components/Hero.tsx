import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-red-50">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      />

      {/* Floating AI Icons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-8 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-4 shadow-lg"
      >
        <div className="text-3xl mb-2">🧹</div>
        <div className="text-sm text-gray-600">AI Cleaning</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-48 left-8 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-4 shadow-lg"
      >
        <div className="text-3xl mb-2">🚚</div>
        <div className="text-sm text-gray-600">Smart Transport</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 right-16 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-4 shadow-lg"
      >
        <div className="text-3xl mb-2">🔧</div>
        <div className="text-sm text-gray-600">Auto Repair</div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="text-sm text-gray-600 mb-4 font-medium">
            Willkommen | Bienvenue | Benvenuto | Welcome
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight"
        >
          Finally, One Platform for{' '}
          <span className="text-red-600">All Your Household</span>{' '}
          Needs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-blue-900 mb-6 max-w-4xl mx-auto font-medium leading-relaxed"
        >
          Save up to 47% on cleaning, transportation, and repairs with Geneva's AI-powered coordination platform – Swiss precision meets smart automation.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto"
        >
          Tired of high costs, scheduling hassles, and unreliable services? ServiSwiss AI handles it all seamlessly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Book Your Service Now – Get Confirmed in 48h</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center space-x-4 text-sm text-gray-600"
        >
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-400 fill-current" />
            ))}
          </div>
          <span>4.8/5 from 500+ satisfied customers</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;