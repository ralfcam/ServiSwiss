import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, CheckCircle, Star, Clock, Shield } from 'lucide-react';

const FinalCTA = () => {
  const [preferredTime, setPreferredTime] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleTimePreference = (time: string) => {
    setPreferredTime(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Final CTA submission:', { preferredTime, email, phone });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Ready to Save Time &{' '}
            <span className="text-yellow-300 relative">
              Money?
              <motion.div
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-yellow-300 rounded-full"
              />
            </span>
          </h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join the growing community of Geneva residents who trust ServiSwiss AI for all their household needs
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center space-x-6 mb-8"
          >
            <div className="flex items-center space-x-2">
              <Users className="text-yellow-300" size={32} />
              <span className="text-2xl font-bold text-white">500+ Users</span>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-300 fill-current" />
                ))}
              </div>
              <span className="text-white font-semibold">4.8/5</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {[
                { icon: CheckCircle, title: 'No Upfront Payment', desc: 'Pay only after service confirmation' },
                { icon: Clock, title: '48h Guarantee', desc: 'Confirmed booking within 48 hours' },
                { icon: Shield, title: 'Swiss Quality', desc: 'Licensed, insured, and guaranteed' }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                    <benefit.icon className="text-yellow-300" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{benefit.title}</h4>
                    <p className="text-red-100">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h4 className="text-white font-bold text-xl mb-4">Average Savings</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-300">47%</div>
                  <div className="text-red-100 text-sm">Cost Reduction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">10+</div>
                  <div className="text-red-100 text-sm">Hours Saved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-300">CHF 150</div>
                  <div className="text-red-100 text-sm">Monthly Savings</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Book Your Service Now
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:border-yellow-300 focus:outline-none transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-4 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:border-yellow-300 focus:outline-none transition-all"
                    placeholder="+41 XX XXX XX XX"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-4">
                  Preferred call time for confirmation:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Morning (8-12)', 'Afternoon (12-17)', 'Evening (17-20)'].map((time) => (
                    <motion.button
                      key={time}
                      type="button"
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
                        <span className="font-medium">{time}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 py-6 rounded-full text-xl font-bold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-xl inline-flex items-center justify-center space-x-3"
              >
                <span>Book Your Service Now</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={24} />
                </motion.div>
              </motion.button>

              <div className="text-center text-red-100 text-sm">
                No setup fees • No monthly fees • No minimum commitment
              </div>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-6">
              What Happens Next?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Instant Confirmation', desc: 'Receive booking reference immediately' },
                { step: '2', title: '48h Call', desc: 'We confirm details and match providers' },
                { step: '3', title: 'Secure Payment', desc: 'Pay only after confirmation via email link' }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-yellow-300 text-red-900 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {step.step}
                  </div>
                  <h5 className="text-white font-bold mb-2">{step.title}</h5>
                  <p className="text-red-100 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;