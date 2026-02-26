import React, { useState } from 'react';
import { Building, Heart, Bell, Clock, ArrowRight, User, Search, MapPin, TrendingUp, Sparkles, Calculator, Wallet, DollarSign, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import GlassCard from '../components/ui/GlassCard';

const BuyerDashboard = () => {
    const [user, setUser] = React.useState({ name: 'Guest', initial: 'G' });
    const [monthlyIncome, setMonthlyIncome] = useState('');
    const [loanAmount, setLoanAmount] = useState(null);

    React.useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (storedUser.name) {
            setUser({
                name: storedUser.name,
                initial: storedUser.name.charAt(0).toUpperCase()
            });
        }
    }, []);

    const calculateLoan = () => {
        if (!monthlyIncome) return;
        // Simple mock calculation: 60x monthly income
        const amount = parseInt(monthlyIncome) * 60;
        setLoanAmount(amount);
    };

    // Mock Data
    const savedProperties = [
        { id: 1, name: "Luxury Apartment", area: "Whitefield", city: "Bangalore", price: 12500000, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400", type: "3 BHK Apartment" },
        { id: 2, name: "Green Villa", area: "Sarjapur", city: "Bangalore", price: 21000000, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400", type: "4 BHK Villa" },
        { id: 3, name: "City Heights", area: "Indiranagar", city: "Bangalore", price: 18500000, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=400", type: "3 BHK Apartment" }
    ];

    const alerts = [
        { id: 1, title: "Price Drop Alert", message: "A property in Whitefield just dropped by 5%", time: "10 mins ago", type: "price" },
        { id: 2, title: "New Listing", message: "New 3 BHK listed in your preferred area", time: "1 hour ago", type: "new" },
        { id: 3, title: "Market Trend", message: "Prices in Sarjapur are up by 2% this week", time: "5 hours ago", type: "trend" }
    ];

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background enhancement */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                            Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">{user.name}</span>
                        </h1>
                        <p className="text-gray-400 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            Here's what's happening with your property search
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                                {user.initial}
                            </div>
                            <div className="text-sm">
                                <p className="text-white font-medium">Premium Member</p>
                                <p className="text-gray-500 text-xs">View Profile</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column (8 cols) */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* New Feature: Loan Calculator */}
                        <GlassCard className="relative overflow-hidden border-teal-500/20 bg-gradient-to-br from-black/40 to-teal-900/10">
                            <div className="absolute top-0 right-0 p-32 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-teal-500/20 rounded-xl text-teal-400">
                                        <Calculator className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Quick Loan Eligibility</h2>
                                        <p className="text-gray-400 text-sm">Estimate how much you can borrow based on your income</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-400 font-medium mb-1.5 block">Monthly Income (₹)</label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                                                <input
                                                    type="number"
                                                    value={monthlyIncome}
                                                    onChange={(e) => setMonthlyIncome(e.target.value)}
                                                    placeholder="e.g. 100000"
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all outline-none placeholder-gray-600"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={calculateLoan}
                                            className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                                        >
                                            Check Eligibility
                                        </button>
                                    </div>

                                    <div className="bg-black/40 rounded-2xl p-6 border border-white/5 text-center">
                                        {loanAmount ? (
                                            <div className="animate-fade-in space-y-2">
                                                <p className="text-gray-400 text-sm">You are eligible for approximately</p>
                                                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                                                    {formatPrice(loanAmount)}
                                                </h3>
                                                <p className="text-xs text-teal-500/70 font-medium bg-teal-500/10 inline-block px-3 py-1 rounded-full">
                                                    *Based on 60x income multiplier
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="text-gray-500 flex flex-col items-center justify-center h-full gap-2">
                                                <Wallet className="w-8 h-8 opacity-50" />
                                                <p className="text-sm">Enter income to see result</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Saved Properties - Redesigned List */}
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Heart className="w-5 h-5 text-red-500 fill-current" /> Saved Homes
                                </h2>
                                <button className="text-sm text-gray-400 hover:text-white transition-colors">View All</button>
                            </div>
                            <div className="space-y-4">
                                {savedProperties.map((property) => (
                                    <div key={property.id} className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-teal-500/30 rounded-2xl p-3 flex gap-4 transition-all duration-300">
                                        <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                            <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors">{property.name}</h3>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                        <MapPin className="w-3 h-3" /> {property.area}, {property.city}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-teal-400">{formatPrice(property.price)}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{property.type}</p>
                                                </div>
                                            </div>
                                            <div className="mt-3 flex gap-2">
                                                <button className="text-xs bg-teal-500/10 text-teal-400 px-3 py-1.5 rounded-lg hover:bg-teal-500/20 transition-colors font-medium">Contact Agent</button>
                                                <button className="text-xs bg-white/5 text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Compact Alerts */}
                        <GlassCard className="p-0 overflow-hidden">
                            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Bell className="w-4 h-4 text-purple-400" /> Notifications
                                </h3>
                                <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">3 New</span>
                            </div>
                            <div className="divide-y divide-white/5 p-2">
                                {alerts.map(alert => (
                                    <div key={alert.id} className="p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                                        <div className="flex gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${alert.type === 'price' ? 'bg-green-500/20 text-green-400' :
                                                    alert.type === 'new' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                                                }`}>
                                                {alert.type === 'price' ? <TrendingUp className="w-4 h-4" /> :
                                                    alert.type === 'new' ? <Building className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-200 line-clamp-1">{alert.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 border-t border-white/10">
                                <button className="w-full py-2 text-xs text-gray-400 hover:text-white transition-colors">View All Notifications</button>
                            </div>
                        </GlassCard>

                        {/* Profile Completion / Status */}
                        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl p-6 border border-white/10">
                            <h3 className="font-bold text-white mb-4">Profile Status</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm text-gray-300">
                                    <span>Completion</span>
                                    <span>85%</span>
                                </div>
                                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                    <div className="h-full w-[85%] bg-gradient-to-r from-purple-500 to-blue-500"></div>
                                </div>
                                <div className="space-y-2 pt-2">
                                    <div className="flex items-center gap-2 text-xs text-green-400">
                                        <CheckCircle2 className="w-3 h-3" /> Email Verified
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-green-400">
                                        <CheckCircle2 className="w-3 h-3" /> Phone Verified
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full border border-gray-600"></div> KYC Pending
                                    </div>
                                </div>
                                <button className="w-full mt-2 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold text-white transition-colors">
                                    Complete Profile
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboard;
