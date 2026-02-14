
import React from 'react';
import { Building, Heart, Bell, Clock, ArrowRight, User, Search, MapPin, TrendingUp } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

const BuyerDashboard = () => {
    // Mock Data
    const savedProperties = [
        { id: 1, name: "Luxury Apartment", area: "Whitefield", city: "Bangalore", price: 12500000, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400", type: "3 BHK Apartment" },
        { id: 2, name: "Green Villa", area: "Sarjapur", city: "Bangalore", price: 21000000, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400", type: "4 BHK Villa" },
        { id: 3, name: "City Heights", area: "Indiranagar", city: "Bangalore", price: 18500000, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=400", type: "3 BHK Apartment" }
    ];

    const recentSearches = [
        { id: 1, label: "2 BHK in Whitefield under 80L", time: "2 hours ago" },
        { id: 2, label: "Villas in North Bangalore", time: "Yesterday" },
        { id: 3, label: "Rentals in Koramangala", time: "3 days ago" }
    ];

    const alerts = [
        { id: 1, title: "Price Drop Alert", message: "A property in Whitefield just dropped by 5%", time: "10 mins ago", type: "price" },
        { id: 2, title: "New Listing", message: "New 3 BHK listed in your preferred area", time: "1 hour ago", type: "new" },
        { id: 3, title: "Market Trend", message: "Prices in Sarjapur are up by 2% this week", time: "5 hours ago", type: "trend" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
                        <p className="text-gray-600">Welcome back, Rahul!</p>
                    </div>
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">
                        R
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 border border-gray-100">
                        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                            <Heart className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Saved Properties</p>
                            <h3 className="text-2xl font-bold text-gray-900">12</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 border border-gray-100">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                            <Search className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Recent Searches</p>
                            <h3 className="text-2xl font-bold text-gray-900">28</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 border border-gray-100">
                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Alerts</p>
                            <h3 className="text-2xl font-bold text-gray-900">5</h3>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Saved Properties */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Saved Properties</h2>
                            <button className="text-teal-600 text-sm font-semibold hover:text-teal-700 flex items-center gap-1">
                                View All <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {savedProperties.map(property => (
                                <div key={property.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="h-48 relative">
                                        <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-sm">
                                            <Heart className="w-4 h-4 fill-current" />
                                        </button>
                                        <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                            {property.type}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 mb-1">{property.name}</h3>
                                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                                            <MapPin className="w-3 h-3" />
                                            {property.area}, {property.city}
                                        </div>
                                        <div className="text-xl font-bold text-teal-600">
                                            {formatPrice(property.price)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Searches */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                {recentSearches.map(search => (
                                    <div key={search.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{search.label}</p>
                                                <p className="text-xs text-gray-500">{search.time}</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Alerts & Recommendations */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Market Alerts</h2>
                            <div className="space-y-4">
                                {alerts.map(alert => (
                                    <div key={alert.id} className="flex gap-3 items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${alert.type === 'price' ? 'bg-green-500' :
                                                alert.type === 'new' ? 'bg-blue-500' : 'bg-amber-500'
                                            }`} />
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm">{alert.title}</h4>
                                            <p className="text-sm text-gray-500 mt-0.5">{alert.message}</p>
                                            <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-sm font-semibold text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">
                                Manage Alerts
                            </button>
                        </div>

                        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2">Premium Support</h3>
                                <p className="text-teal-100 text-sm mb-4">Get expert advice on your property journey.</p>
                                <button className="bg-white text-teal-600 px-4 py-2 rounded-lg text-sm font-bold hover:shadow-lg transition-shadow">
                                    Contact Expert
                                </button>
                            </div>
                            <div className="absolute bottom-0 right-0 p-16 bg-white/10 rounded-full -mr-8 -mb-8 blur-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboard;
