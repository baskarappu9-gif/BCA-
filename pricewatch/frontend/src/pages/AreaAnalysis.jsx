import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, ArrowUpRight, ArrowDownRight, Users, School, Building2, Loader2, Info } from 'lucide-react';
import locationsData from '../utils/locations.json';

// Helper to generate deterministic data based on string hash
const getHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
};

const AreaAnalysis = () => {
    const [selectedState, setSelectedState] = useState('Tamil Nadu');
    const [selectedDistrict, setSelectedDistrict] = useState('Chennai');
    const [selectedArea, setSelectedArea] = useState('');
    const [loading, setLoading] = useState(false);

    // Derived lists
    const states = Object.keys(locationsData).sort();
    const districts = selectedState ? Object.keys(locationsData[selectedState]).sort() : [];
    const areas = (selectedState && selectedDistrict) ? locationsData[selectedState][selectedDistrict].sort() : [];

    // Simulate loading on change
    useEffect(() => {
        if (selectedArea || selectedDistrict) {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 600);
            return () => clearTimeout(timer);
        }
    }, [selectedArea, selectedDistrict]);

    // Generate comparison data automatically
    const comparisonData = useMemo(() => {
        const baseArea = selectedArea || (areas.length > 0 ? areas[0] : 'Adyar');
        const availableAreas = areas.length > 0 ? areas : ['Adyar', 'Anna Nagar', 'T Nagar', 'Velachery', 'Mylapore', 'Besant Nagar'];

        // Seed based on the selected area
        const seed = getHash(baseArea);

        // Pick 6 areas: The selected one + 5 "neighbors" (deterministically chosen from the list)
        const targetAreas = [];

        // 1. Add selected area first
        if (selectedArea) {
            targetAreas.push(selectedArea);
        }

        // 2. Add others to fill up to 6
        let i = 0;
        while (targetAreas.length < 6 && i < availableAreas.length * 2) {
            // Pseudo-random index based on seed
            const idx = (seed + i * 7 + 3) % availableAreas.length;
            const candidate = availableAreas[idx];
            if (!targetAreas.includes(candidate)) {
                targetAreas.push(candidate);
            }
            i++;
        }

        // Generate stats for each
        return targetAreas.map(name => {
            const h = getHash(name);
            const priceVal = 4000 + (h % 15000);
            const growthVal = ((h % 25) - 5); // Range -5 to 20
            const scoreVal = 70 + (h % 25); // 70 to 95

            const types = ["IT Hub", "Residential", "Premium", "Developing", "Commercial"];
            const type = types[h % types.length];

            return {
                name: name,
                price: `₹${priceVal.toLocaleString()}`,
                growth: growthVal,
                score: (scoreVal / 10).toFixed(1),
                type: type,
                projects: 10 + (h % 50),
                schools: 5 + (h % 20),
                isPrimary: name === selectedArea
            };
        });

    }, [selectedArea, areas]);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <MapPin className="text-teal-600 w-8 h-8" />
                            Area Analysis
                        </h1>
                        <p className="text-gray-600 mt-2">Compare your selected locality with top alternatives.</p>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">State</label>
                        <select
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                            value={selectedState}
                            onChange={(e) => {
                                setSelectedState(e.target.value);
                                setSelectedDistrict('');
                                setSelectedArea('');
                            }}
                        >
                            {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">District / City</label>
                        <select
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none disabled:opacity-50"
                            value={selectedDistrict}
                            onChange={(e) => {
                                setSelectedDistrict(e.target.value);
                                setSelectedArea('');
                            }}
                            disabled={!selectedState}
                        >
                            <option value="">Select District</option>
                            {districts.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Locality</label>
                        <select
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none disabled:opacity-50"
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                            disabled={!selectedDistrict}
                        >
                            <option value="">Select Area</option>
                            {areas.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="h-96 flex flex-col items-center justify-center text-teal-600">
                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Analyzing market data...</p>
                    </div>
                ) : (
                    <>
                        {!selectedArea && (
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800 text-sm mb-4">
                                <Info className="w-5 h-5 flex-shrink-0" />
                                <p>Select a locality above to see a detailed comparison with similar areas.</p>
                            </div>
                        )}

                        {/* Comparison Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {comparisonData.map((data, index) => (
                                <div
                                    key={index}
                                    className={`bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border transform hover:-translate-y-1 ${data.isPrimary ? 'border-teal-500 ring-1 ring-teal-500 relative overflow-hidden' : 'border-gray-100'}`}
                                >
                                    {data.isPrimary && (
                                        <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                            SELECTED
                                        </div>
                                    )}

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 line-clamp-1" title={data.name}>{data.name}</h3>
                                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{data.type}</span>
                                        </div>
                                        <div className={`flex items-center gap-1 text-sm font-bold ${data.growth > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                            {data.growth > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                            {Math.abs(data.growth)}% YoY
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-gray-500 text-sm">Avg Price</span>
                                            <span className="text-2xl font-bold text-gray-900">{data.price}<span className="text-sm font-normal text-gray-400">/sqft</span></span>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>Livability Score</span>
                                                <span className="font-bold text-gray-900">{data.score}/10</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${parseFloat(data.score) > 8 ? 'bg-green-500' : 'bg-teal-500'}`}
                                                    style={{ width: `${parseFloat(data.score) * 10}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-50 flex justify-between gap-2">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded-lg">
                                                <Building2 className="w-3.5 h-3.5 text-teal-600" />
                                                <span>{data.projects} New</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded-lg">
                                                <School className="w-3.5 h-3.5 text-teal-600" />
                                                <span>{data.schools} Edu</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded-lg">
                                                <Users className="w-3.5 h-3.5 text-teal-600" />
                                                <span>High Vol</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AreaAnalysis;
