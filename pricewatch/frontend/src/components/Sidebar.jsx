import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Sparkles, Calculator, BarChart3, MapPin, Building, PlusCircle, Wrench, Palette, Truck, CreditCard, User, Store, LogIn, ChevronRight, Info } from 'lucide-react';
import { NAV_ITEMS } from '../utils/constants';

const iconMap = {
    Home, Sparkles, Calculator, BarChart3, MapPin, Building, PlusCircle, Wrench, Palette, Truck, CreditCard, User, Store, LogIn, Info
};

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    <nav className="space-y-1">
                        {NAV_ITEMS.filter(item => {
                            const user = localStorage.getItem('user');
                            if (user) {
                                return item.id !== 'login';
                            } else {
                                return item.id !== 'profile' && item.id !== 'seller-dash' && item.id !== 'buyer-dash';
                            }
                        }).map((item) => {
                            const Icon = iconMap[item.icon] || Home;
                            return (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    onClick={onClose}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive(item.path)
                                        ? 'bg-teal-50 text-teal-700 font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive(item.path) ? 'text-teal-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                    <span className="flex-1">{item.label}</span>
                                    <ChevronRight className={`w-4 h-4 ${isActive(item.path) ? 'text-teal-600' : 'text-gray-300'}`} />
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <div className="text-xs text-gray-400 text-center">
                            PriceWatch • India Only • ₹ INR
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
