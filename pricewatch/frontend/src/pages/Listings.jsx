import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Bed, Bath, Square, Home, ArrowRight, Heart, Share2 } from 'lucide-react';
import { MAJOR_CITIES, LOCALITIES, PROPERTY_TYPES } from '../utils/constants';

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        city: 'bangalore',
        type: 'all',
        bhk: 'all',
        priceRange: 'all'
    });

    // Mock Data Generator
    useEffect(() => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            const generateListings = () => {
                const data = [];
                const cities = MAJOR_CITIES.map(c => c.value);
                const types = PROPERTY_TYPES.map(t => t.value);

                // Generate 50 realistic listings
                for (let i = 1; i <= 50; i++) {
                    const city = cities[Math.floor(Math.random() * cities.length)];
                    const cityLabel = MAJOR_CITIES.find(c => c.value === city)?.label;
                    const localityList = LOCALITIES[city] || [{ label: 'Central Area', value: 'central' }];
                    const locality = localityList[Math.floor(Math.random() * localityList.length)].label;
                    const type = types[Math.floor(Math.random() * types.length)];
                    const bhk = Math.floor(Math.random() * 4) + 1;
                    const priceBase = bhk * 2500000; // Base price calc
                    const price = priceBase + Math.floor(Math.random() * 5000000);

                    data.push({
                        id: i,
                        title: `${bhk} BHK ${type} in ${locality}`,
                        location: `${locality}, ${cityLabel}`,
                        city: city,
                        price: price,
                        type: type,
                        bhk: bhk,
                        sqft: bhk * 500 + Math.floor(Math.random() * 300),
                        bathrooms: Math.max(1, bhk - 1),
                        image: `https://images.unsplash.com/photo-${1600000000000 + i}?auto=format&fit=crop&q=80&w=600`, // Placeholder dynamic URL structure
                        // Using real reliable unsplash IDs for demo
                        realImage: [
                            "https://images.unsplash.com/photo-1600596542815-225065c72a81?auto=format&fit=crop&q=80&w=800",
                            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
                            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
                            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
                            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800"
                        ][Math.floor(Math.random() * 5)],
                        posted: `${Math.floor(Math.random() * 10)} days ago`,
                        isVerified: Math.random() > 0.5
                    });
                }
                return data;
            };

            setListings(generateListings());
            setLoading(false);
        }, 800);
    }, []);

    // Filter Logic
    const filteredListings = listings.filter(item => {
        if (filters.city !== 'all' && item.city !== filters.city) return false;
        if (filters.type !== 'all' && item.type !== filters.type) return false;
        if (filters.bhk !== 'all' && item.bhk !== parseInt(filters.bhk)) return false;

        if (filters.priceRange !== 'all') {
            const [min, max] = filters.priceRange.split('-').map(Number);
            if (max && (item.price < min || item.price > max)) return false;
            if (!max && item.price < min) return false; // for "Above X"
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Listings</h1>
                    <p className="text-gray-600">Find your dream home from our verified listings.</p>
                </div>

                {/* Search & Filters */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* City Filter */}
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <select
                                value={filters.city}
                                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none appearance-none bg-white font-medium text-gray-700"
                            >
                                {MAJOR_CITIES.map(city => (
                                    <option key={city.value} value={city.value}>{city.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Property Type */}
                        <div className="relative">
                            <Home className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <select
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none appearance-none bg-white font-medium text-gray-700"
                            >
                                <option value="all">All Property Types</option>
                                {PROPERTY_TYPES.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* BHK */}
                        <div className="relative">
                            <Bed className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <select
                                value={filters.bhk}
                                onChange={(e) => setFilters({ ...filters, bhk: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none appearance-none bg-white font-medium text-gray-700"
                            >
                                <option value="all">Any BHK</option>
                                <option value="1">1 BHK</option>
                                <option value="2">2 BHK</option>
                                <option value="3">3 BHK</option>
                                <option value="4">4+ BHK</option>
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <select
                                value={filters.priceRange}
                                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none appearance-none bg-white font-medium text-gray-700"
                            >
                                <option value="all">Any Price</option>
                                <option value="0-5000000">Under ₹50 Lakhs</option>
                                <option value="5000000-10000000">₹50L - ₹1 Cr</option>
                                <option value="10000000-20000000">₹1 Cr - ₹2 Cr</option>
                                <option value="20000000-500000000">Above ₹2 Cr</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Listings Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-gray-200 h-96 rounded-2xl"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-gray-600 font-medium">
                            Showing {filteredListings.length} properties in {MAJOR_CITIES.find(c => c.value === filters.city)?.label}
                        </div>

                        {filteredListings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredListings.map(item => (
                                    <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={item.realImage}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 right-4 flex gap-2">
                                                <button className="bg-white/90 p-2 rounded-full hover:bg-white text-gray-600 hover:text-red-500 transition-colors">
                                                    <Heart className="w-4 h-4" />
                                                </button>
                                                <button className="bg-white/90 p-2 rounded-full hover:bg-white text-gray-600 hover:text-blue-500 transition-colors">
                                                    <Share2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {item.isVerified && (
                                                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                    Verified
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                                <p className="text-white font-bold text-lg">₹ {item.price.toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                                            <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {item.location}
                                            </p>

                                            <div className="flex items-center justify-between py-4 border-t border-gray-100">
                                                <div className="flex items-center gap-2 text-gray-600" title="Bedrooms">
                                                    <Bed className="w-4 h-4 text-teal-500" />
                                                    <span className="text-sm font-semibold">{item.bhk} BHK</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600" title="Bathrooms">
                                                    <Bath className="w-4 h-4 text-teal-500" />
                                                    <span className="text-sm font-semibold">{item.bathrooms} Bath</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600" title="Sqaure Feet">
                                                    <Square className="w-4 h-4 text-teal-500" />
                                                    <span className="text-sm font-semibold">{item.sqft} sqft</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mt-2 pt-2">
                                                <span className="text-xs text-gray-400">Posted {item.posted}</span>
                                                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 group-hover:gap-3">
                                                    View Details <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                                <Search className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-400">No properties found</h3>
                                <p className="text-gray-400">Try adjusting your filters to find what you're looking for.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Listings;
