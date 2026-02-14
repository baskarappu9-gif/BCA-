import React from 'react';
import { Building2, Plus, Users, TrendingUp, Eye, MessageSquare, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatters';

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
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
                        <p className="text-gray-600">Manage your listings and leads.</p>
                    </div>
                    <Link to="/post-property" className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-teal-600/20">
                        <Plus className="w-5 h-5" /> Post New Property
                    </Link>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                <Eye className="w-6 h-6" />
                            </div>
                            <span className="text-green-500 text-sm font-bold flex items-center bg-green-50 px-2 py-1 rounded-lg">
                                <TrendingUp className="w-3 h-3 mr-1" /> +12%
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">2.4k</h3>
                        <p className="text-gray-500 text-sm">Total Views</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-teal-50 rounded-xl text-teal-600">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <span className="text-green-500 text-sm font-bold flex items-center bg-green-50 px-2 py-1 rounded-lg">
                                <TrendingUp className="w-3 h-3 mr-1" /> +5%
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">23</h3>
                        <p className="text-gray-500 text-sm">Active Inquiries</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                                <Building2 className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">{myListings.length}</h3>
                        <p className="text-gray-500 text-sm">Active Listings</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                                <Wallet className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900">Premium</h3>
                        <p className="text-gray-500 text-sm">Plan Status</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* My Listings */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">My Listings</h2>
                        <div className="space-y-4">
                            {myListings.map(listing => (
                                <div key={listing.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-shadow group relative">
                                    <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{listing.title}</h3>
                                                <p className="text-teal-600 font-bold">{formatPrice(listing.price)}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${listing.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {listing.status}
                                            </span>
                                        </div>
                                        <div className="flex gap-4 mt-3 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {listing.views} Views</span>
                                            <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {listing.inquiries} Inquiries</span>
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(listing.id)}
                                        className="absolute top-4 right-12 p-2 bg-white text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 shadow-sm border border-gray-100"
                                        title="Delete Listing"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Leads */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Inquiries</h2>
                            <div className="space-y-6">
                                {recentLeads.map(lead => (
                                    <div key={lead.id} className="relative pl-4 border-l-2 border-gray-100">
                                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-white"></div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-gray-900 text-sm">{lead.name}</h4>
                                            <span className="text-xs text-gray-400">{lead.time}</span>
                                        </div>
                                        <p className="text-xs text-teal-600 mb-2 font-medium">Interested in: {lead.interest}</p>
                                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg relative">
                                            "{lead.message}"
                                            <div className="absolute top-0 left-4 w-2 h-2 bg-gray-50 transform rotate-45 -translate-y-1"></div>
                                        </div>
                                        <div className="mt-2 flex gap-2">
                                            <button className="text-xs font-bold text-white bg-teal-600 px-3 py-1.5 rounded-lg hover:bg-teal-700">Reply</button>
                                            <button className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200">Ignore</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
