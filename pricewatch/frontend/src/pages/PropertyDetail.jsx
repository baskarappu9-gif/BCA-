import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Calendar, Heart, Share2, CheckCircle, ArrowLeft, Phone, Mail } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const PropertyDetail = () => {
    const { id } = useParams();

    // Mock data fetching based on ID (In a real app, you'd fetch from API)
    // We use deterministic mock data similar to Listings page for consistency
    const property = {
        id,
        title: "Luxury 3 BHK Apartment with Garden View",
        price: "₹1.25 Cr",
        address: "Greenwood Avenue, Whitefield, Bangalore",
        description: "Experience luxury living in this spacious 3 BHK apartment located in the heart of Whitefield. This property features modern amenities, a private garden view, and is close to major IT hubs and international schools. Perfect for families looking for a blend of comfort and convenience.",
        specs: {
            bhk: 3,
            baths: 3,
            sqft: 1850,
            type: "Apartment",
            status: "Ready to Move",
            furnishing: "Semi-Furnished"
        },
        images: [
            "https://images.unsplash.com/photo-1600596542815-225065c72a81?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
        ],
        amenities: ["Swimming Pool", "Gym", "Clubhouse", "24/7 Security", "Power Backup", "Children's Play Area", "Jogging Track"],
        agent: {
            name: "Rajesh Kumar",
            role: "Senior Property Consultant",
            phone: "+91 98765 43210",
            email: "rajesh.k@pricewatch.ai",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
        }
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Breadcrumb / Back */}
                <Link to="/listings" className="inline-flex items-center text-gray-400 hover:text-teal-400 mb-6 font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Listings
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <GlassCard className="h-[400px] overflow-hidden p-0 relative group">
                                <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button className="bg-black/50 backdrop-blur-md p-2.5 rounded-full hover:bg-black/70 text-white hover:text-red-400 transition-all border border-white/10">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                    <button className="bg-black/50 backdrop-blur-md p-2.5 rounded-full hover:bg-black/70 text-white hover:text-blue-400 transition-all border border-white/10">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="absolute top-4 left-4 bg-teal-500/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(20,184,166,0.5)]">
                                    Verified Property
                                </div>
                            </GlassCard>
                            <div className="grid grid-cols-3 gap-4">
                                {property.images.slice(1).map((img, idx) => (
                                    <GlassCard key={idx} className="h-28 overflow-hidden cursor-pointer hover:border-teal-500/50 transition-colors p-0">
                                        <img src={img} alt={`View ${idx + 2}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                    </GlassCard>
                                ))}
                            </div>
                        </div>

                        {/* Property Details */}
                        <GlassCard className="p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-white mb-2">{property.title}</h1>
                                    <p className="text-gray-400 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-teal-400" /> {property.address}
                                    </p>
                                </div>
                                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 border-l-4 border-teal-500 pl-4 py-1">
                                    {property.price}
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/10 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400"><Bed className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase">Bedrooms</p>
                                        <p className="font-bold text-white">{property.specs.bhk} BHK</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400"><Bath className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase">Bathrooms</p>
                                        <p className="font-bold text-white">{property.specs.baths} Baths</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400"><Square className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase">Area</p>
                                        <p className="font-bold text-white">{property.specs.sqft} sq ft</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400"><CheckCircle className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold uppercase">Status</p>
                                        <p className="font-bold text-white">{property.specs.status}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-lg font-bold text-white">Description</h2>
                                <p className="text-gray-400 leading-relaxed">{property.description}</p>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-lg font-bold text-white mb-4">Amenities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {property.amenities.map(amenity => (
                                        <div key={amenity} className="flex items-center gap-2 text-gray-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-teal-500/30 transition-colors">
                                            <CheckCircle className="w-4 h-4 text-teal-400" />
                                            <span className="text-sm font-medium">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Sidebar / Contact Agent */}
                    <div className="space-y-6">
                        <GlassCard className="p-6 sticky top-24 border-teal-500/20">
                            <h2 className="text-xl font-bold text-white mb-6">Contact Agent</h2>

                            <div className="flex items-center gap-4 mb-6">
                                <img src={property.agent.image} alt={property.agent.name} className="w-16 h-16 rounded-full object-cover border-2 border-teal-500/30" />
                                <div>
                                    <h3 className="font-bold text-white text-lg">{property.agent.name}</h3>
                                    <p className="text-teal-400 text-sm font-medium">{property.agent.role}</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <button className="w-full btn-primary-glow text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4" /> Call Agent
                                </button>
                                <button className="w-full bg-white/5 text-white font-bold py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                    <Mail className="w-4 h-4" /> Send Message
                                </button>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <p className="text-xs text-gray-500 text-center">
                                    By contacting, you agree to PriceWatch's Terms & Conditions.
                                </p>
                            </div>
                        </GlassCard>

                        <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative border border-indigo-500/30">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2">Need a Loan?</h3>
                                <p className="text-indigo-200 text-sm mb-4">Get pre-approved for a home loan with our banking partners.</p>
                                <button className="bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                                    Check Eligibility
                                </button>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
