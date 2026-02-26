import React from 'react';
import { Building2, Plus, Users, TrendingUp, Eye, MessageSquare, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatters';
import GlassCard from '../components/ui/GlassCard';

const SellerDashboard = () => {
    const [myListings, setMyListings] = React.useState([]);

    React.useEffect(() => {
        const storedListings = localStorage.getItem('seller_listings');
        if (storedListings) {
            setMyListings(JSON.parse(storedListings));
        } else {
            // Initial Seed
            const initialData = [
                { id: 1, title: "Modern Villa in Bandra", price: 45000000, views: 1240, inquiries: 15, status: "Active", image: "https://images.unsplash.com/photo-1600596542815-225065c72a81?auto=format&fit=crop&q=80&w=400" },
                { id: 2, title: "2 BHK in Andheri West", price: 18500000, views: 850, inquiries: 8, status: "Pending", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=400" }
            ];
            setMyListings(initialData);
            localStorage.setItem('seller_listings', JSON.stringify(initialData));
        }
    }, []);

    const recentLeads = [
        { id: 1, name: "Vikram Singh", interest: "Modern Villa in Bandra", time: "2 hours ago", message: "Is the price negotiable?" },
        { id: 2, name: "Anjali Sharma", interest: "Modern Villa in Bandra", time: "5 hours ago", message: "Can I schedule a visit this weekend?" },
        { id: 3, name: "Rajesh Kumar", interest: "2 BHK in Andheri West", time: "1 day ago", message: "Please share floor plan." }
    ];

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            const updatedListings = myListings.filter(listing => listing.id !== id);
            setMyListings(updatedListings);
            localStorage.setItem('seller_listings', JSON.stringify(updatedListings));
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Seller Dashboard</h1>
                        <p className="text-gray-400">Manage your listings and leads.</p>
                    </div>
                    <Link to="/post-property" className="btn-primary-glow flex items-center gap-2 px-5 py-2.5 text-black font-bold text-sm">
                        <Plus className="w-5 h-5" /> Post New Property
                    </Link>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <GlassCard className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                                <Eye className="w-6 h-6" />
                            </div>
                            <span className="text-green-400 text-sm font-bold flex items-center bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                                <TrendingUp className="w-3 h-3 mr-1" /> +12%
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white">2.4k</h3>
                        <p className="text-gray-400 text-sm">Total Views</p>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <span className="text-green-400 text-sm font-bold flex items-center bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                                <TrendingUp className="w-3 h-3 mr-1" /> +5%
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white">23</h3>
                        <p className="text-gray-400 text-sm">Active Inquiries</p>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                                <Building2 className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white">{myListings.length}</h3>
                        <p className="text-gray-400 text-sm">Active Listings</p>
                    </GlassCard>

                    <GlassCard className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                                <Wallet className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white">Premium</h3>
                        <p className="text-gray-400 text-sm">Plan Status</p>
                    </GlassCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* My Listings */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-white">My Listings</h2>
                        <div className="space-y-4">
                            {myListings.map(listing => (
                                <GlassCard key={listing.id} className="p-4 flex gap-4 hover:border-teal-500/30 transition-all group relative overflow-hidden">
                                    <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                                        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-white">{listing.title}</h3>
                                                <p className="text-teal-400 font-bold">{formatPrice(listing.price)}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${listing.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}>
                                                {listing.status}
                                            </span>
                                        </div>
                                        <div className="flex gap-4 mt-3 text-sm text-gray-400">
                                            <span className="flex items-center gap-1"><Eye className="w-4 h-4 text-teal-500" /> {listing.views} Views</span>
                                            <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4 text-teal-500" /> {listing.inquiries} Inquiries</span>
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(listing.id)}
                                        className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 hover:text-red-300 border border-red-500/20"
                                        title="Delete Listing"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    </button>
                                </GlassCard>
                            ))}
                        </div>
                    </div>

                    {/* Recent Leads */}
                    <div className="space-y-6">
                        <GlassCard className="p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Recent Inquiries</h2>
                            <div className="space-y-6">
                                {recentLeads.map(lead => (
                                    <div key={lead.id} className="relative pl-4 border-l-2 border-white/10">
                                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-black/50"></div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-white text-sm">{lead.name}</h4>
                                            <span className="text-xs text-gray-500">{lead.time}</span>
                                        </div>
                                        <p className="text-xs text-teal-400 mb-2 font-medium">Interested in: {lead.interest}</p>
                                        <div className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg relative border border-white/5">
                                            "{lead.message}"
                                            <div className="absolute top-0 left-4 w-2 h-2 bg-white/5 border-l border-t border-white/5 transform rotate-45 -translate-y-1"></div>
                                        </div>
                                        <div className="mt-2 flex gap-2">
                                            <button className="text-xs font-bold text-black bg-teal-500 px-3 py-1.5 rounded-lg hover:bg-teal-400 transition-colors">Reply</button>
                                            <button className="text-xs font-bold text-gray-300 bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors">Ignore</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
