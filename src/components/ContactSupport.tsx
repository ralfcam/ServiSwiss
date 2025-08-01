import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, Globe, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How does the 48-hour confirmation work?',
    answer: 'After you book, our AI system matches you with the best available service providers. Within 48 hours, we call to confirm your booking details and provider information. You only pay after confirmation.'
  },
  {
    question: 'What if I need to cancel or reschedule?',
    answer: 'You can cancel or reschedule up to 24 hours before your service without any fees. For same-day changes, a small administrative fee may apply.'
  },
  {
    question: 'Are all service providers insured?',
    answer: 'Yes, all our service providers are fully licensed, insured, and background-checked. We maintain strict quality standards and regular performance reviews.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, bank transfers, and popular Swiss payment methods like Twint. Payment is processed securely through our encrypted platform.'
  },
  {
    question: 'Do you offer services outside Geneva?',
    answer: 'Currently, we focus on the Geneva metropolitan area to ensure the highest quality service. We plan to expand to other Swiss cities in 2024.'
  }
];

const ContactSupport = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-red-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Need{' '}
            <span className="text-red-600">Help?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our multilingual support team is here to assist you every step of the way
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Phone Support</div>
                  <div className="text-gray-600">+41 22 XXX-XXXX</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email Support</div>
                  <div className="text-gray-600">booking@serviswiss.ai</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Clock className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Business Hours</div>
                  <div className="text-gray-600">Mon-Fri: 8:00-18:00</div>
                  <div className="text-gray-600">Sat: 9:00-16:00</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Globe className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Languages</div>
                  <div className="text-gray-600">English, Français, Deutsch, Italiano</div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl">
              <div className="font-semibold text-gray-900 mb-2">Emergency Support</div>
              <div className="text-sm text-gray-600">
                For urgent service issues during your booking, call our 24/7 emergency line: +41 22 XXX-XXXX
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="text-red-600" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </button>
                  
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;