import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter, Bed, Bath, Square, Home, ArrowRight, Heart, Share2, CheckCircle2 } from 'lucide-react';
import { MAJOR_CITIES, LOCALITIES, PROPERTY_TYPES } from '../utils/constants';
import locationsData from '../utils/locations.json';
import GlassCard from '../components/ui/GlassCard';
import BackButton from '../components/ui/BackButton';

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        city: '',
        type: 'all',
        bhk: '',
        price: ''
    });
    const [showCitySuggestions, setShowCitySuggestions] = useState(false);

    // Get all cities from locations.json
    const allCities = React.useMemo(() => {
        return Object.values(locationsData)
            .flatMap(cities => Object.keys(cities))
            .sort();
    }, []);

    const filteredCities = allCities.filter(c =>
        c.toLowerCase().includes(filters.city.toLowerCase())
    );

    // Mock Data Generator & User Listings
    useEffect(() => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            const generateListings = () => {
                const data = [];

                // 1. Fetch User Listings from LocalStorage
                try {
                    const storedListings = JSON.parse(localStorage.getItem('seller_listings') || '[]');
                    const userListings = storedListings.map(item => ({
                        id: item.id,
                        title: item.title,
                        location: `${item.locality || ''}, ${item.city || ''}`,
                        city: (item.city || '').toLowerCase(),
                        price: Number(item.price) || 0,
                        type: item.type,
                        bhk: parseInt(item.bhk) || 0, // Extract number if user typed "3 BHK"
                        sqft: Number(item.size) || 0,
                        bathrooms: Number(item.bathrooms) || 0,
                        image: item.image,
                        realImage: item.image,
                        posted: 'Just now',
                        isVerified: false, // User listings are unverified by default
                        isUserListing: true // Flag to identify user listings
                    }));
                    data.push(...userListings);
                } catch (err) {
                    console.error("Failed to load user listings:", err);
                }

                // 2. Generate Mock Data
                const cities = MAJOR_CITIES.map(c => c.value);
                const types = PROPERTY_TYPES.map(t => t.value);

                // Generate 150 realistic listings to ensure density
                for (let i = 1; i <= 150; i++) {
                    const city = cities[Math.floor(Math.random() * cities.length)];
                    const cityLabel = MAJOR_CITIES.find(c => c.value === city)?.label;
                    const localityList = LOCALITIES[city] || [{ label: 'Central Area', value: 'central' }];
                    const locality = localityList[Math.floor(Math.random() * localityList.length)].label;
                    const type = types[Math.floor(Math.random() * types.length)];
                    const bhk = Math.floor(Math.random() * 4) + 1;

                    // Realistic price variations based on city
                    const baseMultiplier = city === 'mumbai' ? 1.5 : city === 'delhi' ? 1.2 : 1;
                    const priceBase = bhk * 2500000 * baseMultiplier;
                    const price = Math.floor(priceBase + Math.random() * 5000000);

                    data.push({
                        id: `mock-${i}`, // distinct ID format
                        title: `${bhk} BHK ${type} in ${locality}`,
                        location: `${locality}, ${cityLabel}`,
                        city: city, // Ensure this matches filter value (lowercase)
                        price: price,
                        type: type,
                        bhk: bhk,
                        sqft: bhk * 500 + Math.floor(Math.random() * 300),
                        bathrooms: Math.max(1, bhk - 1),
                        image: `https://images.unsplash.com/photo-${1600000000000 + (i % 30)}?auto=format&fit=crop&q=80&w=600`,
                        // Reliable unsplash IDs rotated
                        realImage: [
                            "https://images.unsplash.com/photo-1600596542815-225065c72a81?auto=format&fit=crop&q=80&w=800",
                            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
                            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
                            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
                            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
                            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800", // New
                            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"  // New
                        ][i % 7],
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
        if (filters.city && !item.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
        if (filters.type !== 'all' && item.type !== filters.type) return false;
        if (filters.bhk && item.bhk !== parseInt(filters.bhk)) return false;
        if (filters.price && item.price > parseInt(filters.price)) return false;
        return true;
    });

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-7xl mx-auto z-10 relative">
                <div className="mb-8 text-center sm:text-left">
                    <BackButton to="/" />
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center sm:justify-start gap-3 mt-4">
                        <div className="bg-teal-500/10 p-2 rounded-xl border border-teal-500/20 animate-float">
                            <Home className="text-teal-400 w-8 h-8" />
                        </div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                            Property Listings
                        </span>
                    </h1>
                    <p className="text-gray-400 ml-1">Find your dream home from our verified listings.</p>
                </div>

                {/* Search & Filters */}
                <GlassCard className="p-4 mb-8 sticky top-20 z-30 backdrop-blur-xl" floating={true} delay={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* City Filter */}
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 text-teal-400 w-5 h-5 z-10" />
                            <input
                                type="text"
                                value={filters.city}
                                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                                onFocus={() => setShowCitySuggestions(true)}
                                onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                                placeholder="Search City..."
                                className="input-field-glass pl-10 w-full"
                            />
                            {showCitySuggestions && filters.city.length > 0 && filteredCities.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-black/90 border border-teal-500/30 rounded-xl z-50 backdrop-blur-xl custom-scrollbar shadow-2xl">
                                    {filteredCities.map((city, idx) => (
                                        <div
                                            key={idx}
                                            onMouseDown={() => setFilters({ ...filters, city: city })}
                                            className="px-4 py-3 text-gray-300 hover:bg-teal-500/20 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                        >
                                            {city}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Property Type */}
                        <div className="relative">
                            <Home className="absolute left-3 top-3.5 text-teal-400 w-5 h-5 z-10" />
                            <select
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                className="input-field-glass pl-10 appearance-none cursor-pointer w-full"
                            >
                                <option value="all" className="bg-black text-gray-400">All Property Types</option>
                                {PROPERTY_TYPES.map(type => (
                                    <option key={type.value} value={type.value} className="bg-black text-white">{type.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* BHK */}
                        <div className="relative">
                            <Bed className="absolute left-3 top-3.5 text-teal-400 w-5 h-5 z-10" />
                            <input
                                type="number"
                                value={filters.bhk}
                                onChange={(e) => setFilters({ ...filters, bhk: e.target.value })}
                                placeholder="BHK (Any)"
                                min="1"
                                className="input-field-glass pl-10 w-full"
                            />
                        </div>

                        {/* Price Range */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-3.5 text-teal-400 w-5 h-5 z-10" />
                            <input
                                type="number"
                                value={filters.price}
                                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                                placeholder="Max Price"
                                className="input-field-glass pl-10 w-full"
                            />
                        </div>
                    </div>
                </GlassCard>

                {/* Listings Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white/5 h-96 rounded-2xl border border-white/10"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-teal-200 font-medium">
                            Showing {filteredListings.length} properties {filters.city && `in ${filters.city}`}
                        </div>

                        {filteredListings.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredListings.map((item, index) => (
                                    <GlassCard
                                        key={item.id}
                                        className="p-0 overflow-hidden"
                                        hoverEffect={true}
                                        delay={0.1 + (index % 5) * 0.1}
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={item.realImage}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 right-4 flex gap-2">
                                                <button className="bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-black/70 text-white transition-colors border border-white/10">
                                                    <Heart className="w-4 h-4" />
                                                </button>
                                                <button className="bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-black/70 text-white transition-colors border border-white/10">
                                                    <Share2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            {item.isVerified && (
                                                <div className="absolute top-4 left-4 bg-teal-500/90 backdrop-blur-sm text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-[0_0_10px_rgba(20,184,166,0.5)] animate-pulse">
                                                    <CheckCircle2 className="w-3 h-3" /> Verified
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
                                                <p className="text-white font-bold text-2xl drop-shadow-md">₹ {item.price.toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">{item.title}</h3>
                                            <p className="text-gray-400 text-sm mb-4 flex items-center gap-1">
                                                <MapPin className="w-3 h-3 text-teal-500" /> {item.location}
                                            </p>

                                            <div className="flex items-center justify-between py-4 border-t border-white/10">
                                                <div className="flex items-center gap-2 text-gray-300" title="Bedrooms">
                                                    <Bed className="w-4 h-4 text-teal-400" />
                                                    <span className="text-sm font-semibold">{item.bhk} BHK</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-300" title="Bathrooms">
                                                    <Bath className="w-4 h-4 text-teal-400" />
                                                    <span className="text-sm font-semibold">{item.bathrooms} Bath</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-300" title="Sqaure Feet">
                                                    <Square className="w-4 h-4 text-teal-400" />
                                                    <span className="text-sm font-semibold">{item.sqft} sqft</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mt-2 pt-2">
                                                <span className="text-xs text-gray-500">Posted {item.posted}</span>
                                                <Link to={`/property/${item.id}`} className="btn-primary-glow flex items-center gap-2 px-4 py-2 text-sm">
                                                    View Details <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        ) : (
                            <GlassCard className="text-center py-20 flex flex-col items-center justify-center">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                    <Search className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No properties found</h3>
                                <p className="text-gray-400 mb-6">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={() => setFilters({ city: '', type: 'all', bhk: '', price: '' })}
                                    className="px-6 py-2 bg-teal-500 text-black font-bold rounded-lg hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/20"
                                >
                                    Clear All Filters
                                </button>
                            </GlassCard>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Listings;
