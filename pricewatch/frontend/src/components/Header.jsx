import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3, Menu, Sparkles, X, Home, Calculator, MapPin,
  Building, PlusCircle, Wrench, Palette, Truck, CreditCard,
  User, Store, Info, LogIn, ChevronRight, MoreHorizontal
} from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const mainNavLinks = [
    { name: 'AI Prediction', path: '/prediction', icon: Sparkles },
    { name: 'Market Trends', path: '/trends', icon: BarChart3 },
    { name: 'Listings', path: '/listings', icon: Building },
    { name: 'Post Property', path: '/post-property', icon: PlusCircle },
  ];

  const moreNavLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Property Valuation', path: '/valuation', icon: Calculator },
    { name: 'Area Analysis', path: '/analysis', icon: MapPin },
    { name: 'Buyer Dashboard', path: '/dashboard/buyer', icon: User },
    { name: 'Seller Dashboard', path: '/dashboard/seller', icon: Store },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'About Project', path: '/about', icon: Info },
  ];

  const sidebarItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'AI Predicted Fair Value', icon: Sparkles, path: '/prediction', highlight: true },
    { name: 'Property Valuation', icon: Calculator, path: '/valuation', highlight: true },
    { name: 'Market Intelligence', icon: BarChart3, path: '/trends' },
    { name: 'Area Analysis', icon: MapPin, path: '/analysis' },
    { name: 'Property Listings', icon: Building, path: '/listings' },
    { name: 'Post Property', icon: PlusCircle, path: '/post-property' },
    { name: 'Buyer Dashboard', icon: User, path: '/dashboard/buyer' },
    { name: 'Seller Dashboard', icon: Store, path: '/dashboard/seller' },
    { name: 'Project Team / About', icon: Info, path: '/about' },
    { name: 'Login / Signup', icon: LogIn, path: '/login' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">PriceWatch<span className="text-teal-500">.AI</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {mainNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${location.pathname === link.path
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* More Menu (Three Dots) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors outline-none focus:bg-white/10">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] rounded-2xl p-2 mt-2" align="end">
                <DropdownMenuLabel className="text-xs font-bold text-teal-400 uppercase tracking-widest px-3 py-2">More Features</DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1 h-px bg-white/10" />
                {moreNavLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <DropdownMenuItem key={link.path} asChild>
                      <Link
                        to={link.path}
                        className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all group ${isActive
                          ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                          }`}
                      >
                        <Icon className={`mr-3 h-4 w-4 transition-colors ${isActive ? 'text-teal-400' : 'text-gray-500 group-hover:text-teal-400'}`} />
                        <span>{link.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 ml-4 border-l border-white/10 pl-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5">
                Login
              </Button>
            </Link>
            <Link to="/prediction">
              <Button className="bg-teal-500 hover:bg-teal-600 text-black font-bold border-0">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-white text-black border-l border-gray-200 p-0 flex flex-col h-full font-sans">
                {/* Header of Sidebar */}
                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
                  {/* Close button is handled by Sheet primitive usually, but we can add explicit close if needed or rely on default */}
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
                  <nav className="space-y-1">
                    {sidebarItems.map((item, index) => {
                      const Icon = item.icon;
                      const isHighlighted = item.highlight;
                      const isActive = location.pathname === item.path;

                      return (
                        <Link
                          key={index}
                          to={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`
                            flex items-center justify-between px-4 py-3 rounded-xl transition-all group
                            ${isHighlighted
                              ? 'bg-teal-50 text-teal-900 hover:bg-teal-100 mb-2 font-semibold'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${isHighlighted ? 'text-teal-600' : 'text-gray-400 group-hover:text-gray-900'}`} />
                            <span>{item.name}</span>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isHighlighted ? 'text-teal-400' : 'text-gray-300 group-hover:text-gray-400'}`} />
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-400 font-medium">
                    PriceWatch · India Only · ₹ INR
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
