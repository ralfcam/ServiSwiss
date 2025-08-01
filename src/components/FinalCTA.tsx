import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, CheckCircle } from 'lucide-react';

const FinalCTA = () => {
  const [preferredTime, setPreferredTime] = useState<string[]>([]);

  const handleTimePreference = (time: string) => {
    setPreferredTime(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Save Time &{' '}
            <span className="text-yellow-300">Money?</span>
          </h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
            Join the growing community of Geneva residents who trust ServiSwiss AI for all their household needs
          </p>

          <div className="flex items-center justify-center space-x-4 mb-8">
            <Users className="text-yellow-300" size={32} />
            <span className="text-2xl font-bold text-white">Join 500+ Users</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Book Your Service Now
          </h3>

          <div className="mb-8">
            <label className="block text-white font-medium mb-4">
              Preferred call time for confirmation:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Morning (8-12)', 'Afternoon (12-17)', 'Evening (17-20)'].map((time) => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTimePreference(time)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    preferredTime.includes(time)
                      ? 'border-yellow-300 bg-yellow-300/20 text-yellow-300'
                      : 'border-white/30 text-white hover:border-white/50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle 
                      size={20} 
                      className={preferredTime.includes(time) ? 'text-yellow-300' : 'text-transparent'} 
                    />
                    <span>{time}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-yellow-400 text-red-900 py-6 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors shadow-lg inline-flex items-center justify-center space-x-3"
          >
            <span>Book Your Service Now</span>
            <ArrowRight size={24} />
          </motion.button>

          <div className="mt-6 text-center text-red-100 text-sm">
            No setup fees • No monthly fees • No minimum commitment
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">47%</div>
              <div className="text-red-100">Average Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">48h</div>
              <div className="text-red-100">Confirmation Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">4.8/5</div>
              <div className="text-red-100">Customer Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;