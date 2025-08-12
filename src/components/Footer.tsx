import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Services': [
      'Home Cleaning',
      'Transportation',
      'Appliance Repair',
      'Premium Services',
      'Business Solutions'
    ],
    'Company': [
      'About Us',
      'How It Works',
      'Pricing',
      'Careers',
      'Press'
    ],
    'Support': [
      'Help Center',
      'Contact Us',
      'Service Areas',
      'Safety',
      'Insurance'
    ],
    'Legal': [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy',
      'GDPR Compliance',
      'Licensing'
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white font-semibold text-xl">ServiSwiss AI</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Geneva's premier AI-powered household services platform. 
              Swiss precision meets smart automation for all your home needs.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={16} />
                <span>Geneva, Switzerland</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone size={16} />
                <a href="tel:+4122XXXXXXX" className="hover:text-white">+41 22 XXX-XXXX</a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={16} />
                <a href="mailto:booking@serviswiss.ai" className="hover:text-white">booking@serviswiss.ai</a>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <Globe size={16} />
                <select className="bg-transparent text-gray-400 text-sm focus:outline-none">
                  <option>English</option>
                  <option>Français</option>
                  <option>Deutsch</option>
                  <option>Italiano</option>
                </select>
              </div>
              <div className="text-gray-400 text-sm">
                © 2024 ServiSwiss AI. All rights reserved.
              </div>
            </div>

            <div className="flex items-center space-x-6 text-gray-400 text-sm">
              <span>Made with ❤️ in Geneva</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;