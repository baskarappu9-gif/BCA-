import React from 'react';
import { Check, X, Award, ChevronRight } from 'lucide-react';

const Comparison = () => {
    const properties = [
        {
            id: 1,
            name: "Luxury Villa",
            location: "Whitefield, Bangalore",
            price: "₹3.5 Cr",
            size: "3500 sq ft",
            rate: "₹10,000/sqft",
            bedrooms: 4,
            bathrooms: 5,
            age: "2 years",
            amenities: ["Pool", "Gym", "Garden", "Clubhouse"],
            score: 9.2,
            image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            name: "Modern Apartment",
            location: "Indiranagar, Bangalore",
            price: "₹2.1 Cr",
            size: "1800 sq ft",
            rate: "₹11,666/sqft",
            bedrooms: 3,
            bathrooms: 3,
            age: "5 years",
            amenities: ["Gym", "Security", "Lift"],
            score: 8.5,
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            name: "Penthouse Suite",
            location: "Koramangala, Bangalore",
            price: "₹4.2 Cr",
            size: "4000 sq ft",
            rate: "₹10,500/sqft",
            bedrooms: 4,
            bathrooms: 4,
            age: "1 year",
            amenities: ["Pool", "Gym", "Concierge", "Spa"],
            score: 9.5,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900">Property Comparison</h1>
                    <p className="text-gray-600 mt-2">Compare features, pricing, and value scores side-by-side</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {properties.map((prop, idx) => (
                        <div key={prop.id} className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:-translate-y-2 ${idx === 2 ? 'ring-2 ring-teal-500' : ''}`}>
                            {idx === 2 && (
                                <div className="bg-teal-500 text-white text-xs font-bold text-center py-1">
                                    BEST VALUE
                                </div>
                            )}
                            <div className="h-48 overflow-hidden">
                                <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900">{prop.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">{prop.location}</p>

                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-2xl font-bold text-teal-600">{prop.price}</span>
                                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-bold">
                                        <Award className="w-4 h-4" />
                                        {prop.score}/10
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <FeatureRow label="Size" value={prop.size} />
                                    <FeatureRow label="Rate (sqft)" value={prop.rate} />
                                    <FeatureRow label="Bedrooms" value={prop.bedrooms} />
                                    <FeatureRow label="Bathrooms" value={prop.bathrooms} />
                                    <FeatureRow label="Age" value={prop.age} />

                                    <div className="pt-4 border-t border-gray-100">
                                        <p className="text-sm text-gray-500 mb-2">Amenities</p>
                                        <div className="flex flex-wrap gap-2">
                                            {prop.amenities.map(am => (
                                                <span key={am} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{am}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    View Details <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const FeatureRow = ({ label, value }) => (
    <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
        <span className="text-gray-500">{label}</span>
        <span className="font-semibold text-gray-900">{value}</span>
    </div>
);

export default Comparison;
