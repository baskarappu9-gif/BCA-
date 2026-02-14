import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-teal-500/20 transition-all">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">PriceWatch</span>
            </Link>

            {/* Desktop Navigation (Simplified for neatness, main nav in sidebar) */}
            <div className="flex items-center gap-6">
              <Link to="/prediction" className="hidden md:block font-medium text-gray-600 hover:text-teal-600 transition-colors">
                AI Prediction
              </Link>
              <Link to="/trends" className="hidden md:block font-medium text-gray-600 hover:text-teal-600 transition-colors">
                Trends
              </Link>

              <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

              {/* Menu Button */}
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Header;
