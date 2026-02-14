import React from 'react';
import { BarChart3 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">PriceWatch</span>
          </div>
          
          <p className="text-gray-400 mb-2">
            © 2026 PriceWatch — AI-Powered Real Estate Intelligence
          </p>
          
          <p className="text-sm text-gray-500">
            Zero Brokerage · India Only · All prices in ₹ INR · Demo Project
          </p>
          
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-700">|</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <span className="text-gray-700">|</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
