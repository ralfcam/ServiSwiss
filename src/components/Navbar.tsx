import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe, Phone, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../features/auth/components/AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [language, setLanguage] = useState('EN');
  const { user, isAuthenticated, signOut } = useAuth();

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
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <span className="text-gray-900 font-bold text-xl">ServiSwiss AI</span>
              <div className="text-xs text-gray-500 font-medium">Geneva's Smart Platform</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a 
              whileHover={{ y: -2 }}
              href="#services" 
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Services
            </motion.a>
            <motion.a 
              whileHover={{ y: -2 }}
              href="#how-it-works" 
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              How It Works
            </motion.a>
            <motion.a 
              whileHover={{ y: -2 }}
              href="#contact"
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Contact
            </motion.a>
            
            {isAuthenticated && (
              <motion.a 
                whileHover={{ y: -2 }}
                href="#bookings"
                className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  // Scroll to bookings section or navigate to bookings page
                  const bookingsSection = document.getElementById('bookings');
                  if (bookingsSection) {
                    bookingsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                My Bookings
              </motion.a>
            )}
            
            {/* Language Selector */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors font-medium">
                <Globe size={18} />
                <span>{language}</span>
              </button>
            </motion.div>

            {/* Phone Number */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-gray-700"
            >
              <Phone size={16} />
              <span className="text-sm font-medium">+41 22 XXX-XXXX</span>
            </motion.div>

            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-all"
                >
                  <User size={18} />
                  <span>{user?.user_metadata?.first_name || 'Account'}</span>
                </motion.button>
                
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Book Service
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        // Navigate to bookings
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      My Bookings
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        signOut();
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAuthModal(true)}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  Sign In
                </motion.button>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 20px rgba(213, 43, 30, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Now
                </motion.button>
              </>
            )}
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
            className="md:hidden mt-6 pb-6 border-t border-gray-200 pt-6 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl"
          >
            <div className="flex flex-col space-y-6 px-4">
              <a href="#services" className="text-gray-700 hover:text-red-600 transition-colors font-medium py-2">Services</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-red-600 transition-colors font-medium py-2">How It Works</a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors font-medium py-2">Contact</a>
              
              {isAuthenticated && (
                <a href="#bookings" className="text-gray-700 hover:text-red-600 transition-colors font-medium py-2">My Bookings</a>
              )}
              
              <div className="flex items-center space-x-2 text-gray-700 py-2">
                <Phone size={16} />
                <span className="text-sm font-medium">+41 22 XXX-XXXX</span>
              </div>
              
              {isAuthenticated ? (
                <div className="space-y-3">
                  <button 
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-full font-bold hover:from-red-700 hover:to-red-800 transition-all w-full shadow-lg"
                    onClick={() => {
                      setIsOpen(false);
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Book Service
                  </button>
                  <button 
                    className="bg-gray-100 text-gray-700 px-6 py-4 rounded-full font-bold hover:bg-gray-200 transition-all w-full flex items-center justify-center space-x-2"
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button 
                    className="bg-gray-100 text-gray-700 px-6 py-4 rounded-full font-bold hover:bg-gray-200 transition-all w-full"
                    onClick={() => {
                      setIsOpen(false);
                      setShowAuthModal(true);
                    }}
                  >
                    Sign In
                  </button>
                  <button 
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-full font-bold hover:from-red-700 hover:to-red-800 transition-all w-full shadow-lg"
                    onClick={() => {
                      setIsOpen(false);
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </motion.nav>
  );
};

export default Navbar;