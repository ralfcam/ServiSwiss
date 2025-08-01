import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const languages = [
    { code: 'EN', label: 'English' },
    { code: 'DE', label: 'Deutsch' },
    { code: 'FR', label: 'Français' },
    { code: 'IT', label: 'Italiano' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-gray-900 font-semibold text-xl">ServiSwiss AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-red-600 transition-colors">Services</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-red-600 transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-700 hover:text-red-600 transition-colors">Pricing</a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors">Contact</a>
            
            {/* Language Selector */}
            <div className="relative">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors">
                <Globe size={18} />
                <span>{language}</span>
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors"
            >
              Book Now
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
          >
            <div className="flex flex-col space-y-4">
              <a href="#services" className="text-gray-700 hover:text-red-600 transition-colors">Services</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-red-600 transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-red-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors">Contact</a>
              <button className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors w-full">
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;