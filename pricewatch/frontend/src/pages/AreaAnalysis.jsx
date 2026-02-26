import React, { useState, useMemo, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import {
    MapPin,
    ArrowUpRight,
    ArrowDownRight,
    Users,
    School,
    Building2,
    Loader2,
    Info,
    ShieldAlert,
    Activity,
    Zap,
    Heart,
    TrendingUp,
    Swords,
    X,
    CheckCircle2
} from 'lucide-react';
import locationsData from '../utils/locations.json';
import GlassCard from '../components/ui/GlassCard';
import BackButton from '../components/ui/BackButton';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

// Helper to generate deterministic data
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
    const [battleMode, setBattleMode] = useState(false);
    const [battleOpponent, setBattleOpponent] = useState(null);

    // Suggestion visibility state
    const [showStateSuggestions, setShowStateSuggestions] = useState(false);
    const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
    const [showAreaSuggestions, setShowAreaSuggestions] = useState(false);

    // Derived full lists
    const states = Object.keys(locationsData).sort();
    const districts = selectedState && locationsData[selectedState] ? Object.keys(locationsData[selectedState]).sort() : [];
    const areas = (selectedState && selectedDistrict && locationsData[selectedState]?.[selectedDistrict])
        ? locationsData[selectedState][selectedDistrict].sort()
        : [];

    // Filtered lists for autocomplete
    const filteredStates = states.filter(s => s.toLowerCase().includes(selectedState.toLowerCase()));
    const filteredDistricts = districts.filter(d => d.toLowerCase().includes(selectedDistrict.toLowerCase()));
    const filteredAreas = areas.filter(a => a.toLowerCase().includes(selectedArea.toLowerCase()));

    // Handlers
    const handleStateSelect = (val) => {
        setSelectedState(val);
        setSelectedDistrict('');
        setSelectedArea('');
        setShowStateSuggestions(false);
    };

    const handleDistrictSelect = (val) => {
        setSelectedDistrict(val);
        setSelectedArea('');
        setShowDistrictSuggestions(false);
    };

    const handleAreaSelect = (val) => {
        setSelectedArea(val);
        setShowAreaSuggestions(false);
    };

    useEffect(() => {
        if (selectedArea) {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 800);
            return () => clearTimeout(timer);
        }
    }, [selectedArea, selectedDistrict]);

    const generatedData = useMemo(() => {
        const baseArea = selectedArea || (areas.length > 0 ? areas[0] : 'Adyar');
        const availableAreas = areas.length > 0 ? areas : ['Adyar', 'Anna Nagar', 'T Nagar', 'Velachery', 'Mylapore'];

        const seed = getHash(baseArea);

        // Generate list of 6 areas (1 selected + 5 neighbors)
        const targetAreas = [];
        if (selectedArea) targetAreas.push(selectedArea);

        let i = 0;
        while (targetAreas.length < 6 && i < availableAreas.length * 2) {
            const idx = (seed + i * 7 + 3) % availableAreas.length;
            const candidate = availableAreas[idx];
            if (!targetAreas.includes(candidate)) targetAreas.push(candidate);
            i++;
        }

        return targetAreas.map((name, idx) => {
            const h = getHash(name);

            // 5 Dimensions (0-100)
            const investment = 60 + (h % 35); // 60-95
            const liveability = 50 + ((h * 3) % 45); // 50-95
            const infra = 40 + ((h * 7) % 55); // 40-95
            const risk = 20 + ((h * 2) % 60); // 20-80 (Lower is better usually, but here 100=Low Risk for chart consistency? Let's say 100=Safe)
            // Actually let's map Risk Score where 100 is SAFE.
            const safetyScore = 100 - (h % 40);
            const social = 50 + ((h * 5) % 45);

            const avgPrice = 4500 + (h % 12000);

            // Entry Signal
            const signalVal = investment + infra - (100 - safetyScore);
            let signal = { text: "HOLD", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
            if (signalVal > 110) signal = { text: "BUY NOW", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" };
            if (signalVal < 60) signal = { text: "OVERPRICED", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };

            // Radar Data
            const radarData = {
                labels: ['Investment', 'Liveability', 'Infrastructure', 'Safety', 'Social'],
                datasets: [
                    {
                        label: name,
                        data: [investment, liveability, infra, safetyScore, social],
                        backgroundColor: 'rgba(20, 184, 166, 0.2)',
                        borderColor: '#14B8A6',
                        borderWidth: 2,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#14B8A6',
                    },
                ],
            };

            return {
                name,
                price: avgPrice,
                stats: { investment, liveability, infra, safetyScore, social },
                signal,
                radarData,
                isPrimary: name === selectedArea
            };
        });
    }, [selectedArea, areas]);

    const primaryData = generatedData.find(d => d.isPrimary) || generatedData[0];
    const comparisonList = generatedData.filter(d => d.name !== primaryData.name);

    if (battleMode && battleOpponent) {
        const opData = generatedData.find(d => d.name === battleOpponent);

        // Battle Chart Data (Head-to-Head)
        const battleChartData = {
            labels: ['Investment Potential', 'Liveability Index', 'Infra Momentum', 'Safety Score', 'Social Pulse'],
            datasets: [
                {
                    label: primaryData.name,
                    data: [
                        primaryData.stats.investment,
                        primaryData.stats.liveability,
                        primaryData.stats.infra,
                        primaryData.stats.safetyScore,
                        primaryData.stats.social
                    ],
                    backgroundColor: 'rgba(20, 184, 166, 0.2)',
                    borderColor: '#14B8A6',
                    pointBackgroundColor: '#14B8A6',
                    borderWidth: 2,
                },
                {
                    label: opData.name,
                    data: [
                        opData.stats.investment,
                        opData.stats.liveability,
                        opData.stats.infra,
                        opData.stats.safetyScore,
                        opData.stats.social
                    ],
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    borderColor: '#EF4444',
                    pointBackgroundColor: '#EF4444',
                    borderWidth: 2,
                }
            ]
        };

        const radarOptions = {
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: { color: '#fff', font: { size: 10, weight: 'bold' } },
                    ticks: { display: false, backdropColor: 'transparent' },
                    suggestedMin: 0,
                    suggestedMax: 100,
                },
            },
            plugins: {
                legend: { position: 'top', labels: { color: '#fff' } }
            },
            maintainAspectRatio: false
        };

        return (
            <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto space-y-6">
                    <button
                        onClick={() => setBattleMode(false)}
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                    >
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 border border-white/5 transition-all">
                            <ArrowUpRight className="w-5 h-5 rotate-[225deg]" />
                        </div>
                        <span className="font-medium">Exit Battle Mode</span>
                    </button>

                    <div className="text-center mb-8 animate-fade-in">
                        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-white to-red-400 uppercase italic tracking-tighter">
                            Head-to-Head Battle
                        </h1>
                        <p className="text-gray-400 mt-2">Versus Mode: Comparison Analysis</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center cursor-default">
                        {/* Player 1 */}
                        <GlassCard className="p-6 border-teal-500/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-20 bg-teal-500/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                            <h2 className="text-2xl font-bold text-teal-400 mb-2">{primaryData.name}</h2>
                            <div className="text-4xl font-bold text-white mb-4">₹{primaryData.price.toLocaleString()}<span className="text-sm text-gray-400">/sqft</span></div>
                            <div className={`inline-block px-3 py-1 rounded border ${primaryData.signal.bg} ${primaryData.signal.border} ${primaryData.signal.color} text-xs font-bold mb-6`}>
                                {primaryData.signal.text}
                            </div>
                            <div className="space-y-4">
                                {Object.entries(primaryData.stats).map(([k, v]) => (
                                    <div key={k} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                        <span className="capitalize text-gray-400">{k}</span>
                                        <span className="font-bold text-white">{v}/100</span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>

                        {/* VS Chart */}
                        <div className="h-96 relative">
                            <Radar data={battleChartData} options={radarOptions} />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                <Swords className="w-48 h-48 text-white" />
                            </div>
                        </div>

                        {/* Player 2 */}
                        <GlassCard className="p-6 border-red-500/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-20 bg-red-500/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                            <h2 className="text-2xl font-bold text-red-400 mb-2">{opData.name}</h2>
                            <div className="text-4xl font-bold text-white mb-4">₹{opData.price.toLocaleString()}<span className="text-sm text-gray-400">/sqft</span></div>
                            <div className={`inline-block px-3 py-1 rounded border ${opData.signal.bg} ${opData.signal.border} ${opData.signal.color} text-xs font-bold mb-6`}>
                                {opData.signal.text}
                            </div>
                            <div className="space-y-4">
                                {Object.entries(opData.stats).map(([k, v]) => (
                                    <div key={k} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                        <span className="capitalize text-gray-400">{k}</span>
                                        <span className="font-bold text-white">{v}/100</span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <BackButton to="/" />
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3 mt-4">
                            <Activity className="text-teal-400 w-8 h-8" />
                            Area DNA Engine
                        </h1>
                        <p className="text-gray-400 mt-2">Deep-dive 5-dimensional health reports for every locality.</p>
                    </div>
                </div>

                {/* Filters */}
                <GlassCard className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
                    <div className="relative">
                        <label className="text-xs font-bold text-teal-400 uppercase mb-2 block">State</label>
                        <input
                            type="text"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 placeholder-gray-500"
                            value={selectedState}
                            onChange={(e) => {
                                setSelectedState(e.target.value);
                                setShowStateSuggestions(true);
                            }}
                            onFocus={() => setShowStateSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowStateSuggestions(false), 200)}
                            placeholder="Type State"
                        />
                        {showStateSuggestions && filteredStates.length > 0 && (
                            <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-auto bg-black border border-teal-500/30 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] custom-scrollbar">
                                {filteredStates.map((s, idx) => (
                                    <div
                                        key={idx}
                                        onMouseDown={() => handleStateSelect(s)}
                                        className="px-4 py-3 text-white hover:bg-teal-500/20 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                    >
                                        {s}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <label className="text-xs font-bold text-teal-400 uppercase mb-2 block">District</label>
                        <input
                            type="text"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 placeholder-gray-500 disabled:opacity-50"
                            value={selectedDistrict}
                            onChange={(e) => {
                                setSelectedDistrict(e.target.value);
                                setShowDistrictSuggestions(true);
                            }}
                            onFocus={() => setShowDistrictSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowDistrictSuggestions(false), 200)}
                            placeholder="Type District"
                            disabled={!selectedState}
                        />
                        {showDistrictSuggestions && filteredDistricts.length > 0 && (
                            <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-auto bg-black border border-teal-500/30 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] custom-scrollbar">
                                {filteredDistricts.map((d, idx) => (
                                    <div
                                        key={idx}
                                        onMouseDown={() => handleDistrictSelect(d)}
                                        className="px-4 py-3 text-white hover:bg-teal-500/20 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                    >
                                        {d}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <label className="text-xs font-bold text-teal-400 uppercase mb-2 block">Target Locality</label>
                        <input
                            type="text"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 placeholder-gray-500 disabled:opacity-50"
                            value={selectedArea}
                            onChange={(e) => {
                                setSelectedArea(e.target.value);
                                setShowAreaSuggestions(true);
                            }}
                            onFocus={() => setShowAreaSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowAreaSuggestions(false), 200)}
                            placeholder="Type Locality"
                            disabled={!selectedDistrict}
                        />
                        {showAreaSuggestions && filteredAreas.length > 0 && (
                            <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-auto bg-black border border-teal-500/30 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] custom-scrollbar">
                                {filteredAreas.map((a, idx) => (
                                    <div
                                        key={idx}
                                        onMouseDown={() => handleAreaSelect(a)}
                                        className="px-4 py-3 text-white hover:bg-teal-500/20 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                    >
                                        {a}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </GlassCard>

                {/* Main Content */}
                {loading ? (
                    <div className="h-96 flex flex-col items-center justify-center text-teal-400">
                        <Loader2 className="w-12 h-12 animate-spin mb-4" />
                        <p className="font-mono animate-pulse">Scanning Infrastructure & Pricing Data...</p>
                    </div>
                ) : (
                    <>
                        {!selectedArea ? (
                            <GlassCard className="p-8 text-center border-dashed border-white/20">
                                <Info className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Select a Target Locality</h3>
                                <p className="text-gray-400 max-w-md mx-auto">Choose an area above to unlock its full DNA report, entry signals, and battle mode.</p>
                            </GlassCard>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                                {/* 1. Main DNA Card (Selected Area) */}
                                <GlassCard className="lg:col-span-1 p-6 border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.1)] relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-teal-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20">
                                        PRIMARY TARGET
                                    </div>

                                    <div className="mb-6 relative z-10">
                                        <h2 className="text-2xl font-bold text-white mb-1">{primaryData.name}</h2>
                                        <div className="text-teal-400 text-sm font-medium flex items-center gap-2">
                                            <MapPin className="w-4 h-4" /> {selectedDistrict}, {selectedState}
                                        </div>
                                    </div>

                                    {/* Entry Signal */}
                                    <div className={`mb-6 p-4 rounded-xl border ${primaryData.signal.bg} ${primaryData.signal.border} flex items-center justify-between`}>
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Entry Signal</div>
                                            <div className={`text-xl font-black ${primaryData.signal.color} tracking-tight`}>{primaryData.signal.text}</div>
                                        </div>
                                        <div className={`p-2 rounded-full ${primaryData.signal.bg} ${primaryData.signal.color}`}>
                                            {primaryData.signal.text === 'BUY NOW' ? <CheckCircle2 className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                                        </div>
                                    </div>

                                    {/* Radar Chart */}
                                    <div className="h-64 relative mb-6">
                                        <Radar
                                            data={primaryData.radarData}
                                            options={{
                                                scales: {
                                                    r: {
                                                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                                                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                                                        pointLabels: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 9 } },
                                                        ticks: { display: false, backdropColor: 'transparent' },
                                                        suggestedMin: 0,
                                                        suggestedMax: 100,
                                                    },
                                                },
                                                plugins: { legend: { display: false } },
                                                maintainAspectRatio: false
                                            }}
                                        />
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/5 p-3 rounded-lg text-center">
                                            <div className="text-[10px] text-gray-500 uppercase">Avg Price</div>
                                            <div className="text-white font-bold text-lg">₹{(primaryData.price / 1000).toFixed(1)}k</div>
                                        </div>
                                        <div className="bg-white/5 p-3 rounded-lg text-center">
                                            <div className="text-[10px] text-gray-500 uppercase">Safety</div>
                                            <div className="text-green-400 font-bold text-lg">{primaryData.stats.safetyScore}%</div>
                                        </div>
                                    </div>
                                </GlassCard>

                                {/* 2. Comparison / Battle List */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            <Swords className="w-5 h-5 text-teal-400" /> Top Alternatives
                                        </h3>
                                        <span className="text-xs text-gray-500">Select card to Battle</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {comparisonList.map((area, idx) => (
                                            <GlassCard
                                                key={idx}
                                                className="p-5 hover:bg-white/5 cursor-pointer group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                                                onClick={() => {
                                                    setBattleOpponent(area.name);
                                                    setBattleMode(true);
                                                }}
                                            >
                                                <div className="absolute top-0 right-0 p-16 bg-gradient-to-br from-teal-500/0 to-teal-500/5 group-hover:to-teal-500/10 rounded-full -mr-8 -mt-8 transition-colors"></div>

                                                <div className="flex justify-between items-start mb-3 relative z-10">
                                                    <div>
                                                        <h4 className="font-bold text-white text-lg group-hover:text-teal-300 transition-colors">{area.name}</h4>
                                                        <div className="text-xs text-gray-400 mt-0.5">₹{(area.price / 1000).toFixed(1)}k/sqft</div>
                                                    </div>
                                                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold border ${area.signal.bg} ${area.signal.border} ${area.signal.color}`}>
                                                        {area.signal.text}
                                                    </div>
                                                </div>

                                                <div className="space-y-2 relative z-10">
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-gray-500">Investment</span>
                                                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full bg-teal-500" style={{ width: `${area.stats.investment}%` }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-gray-500">Liveability</span>
                                                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full bg-blue-500" style={{ width: `${area.stats.liveability}%` }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className="text-gray-500">Infrastructure</span>
                                                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                            <div className="h-full bg-purple-500" style={{ width: `${area.stats.infra}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="w-full mt-4 py-2 rounded-lg bg-white/5 text-xs font-bold text-gray-300 border border-white/5 group-hover:bg-teal-500/20 group-hover:text-teal-300 group-hover:border-teal-500/30 transition-all flex items-center justify-center gap-2">
                                                    <Swords className="w-3 h-3" /> Compare Head-to-Head
                                                </div>
                                            </GlassCard>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AreaAnalysis;
