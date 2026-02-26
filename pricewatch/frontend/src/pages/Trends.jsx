import React, { useState, useEffect, useMemo } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
} from 'chart.js';
import {
    TrendingUp,
    TrendingDown,
    Filter,
    Calendar,
    MapPin,
    Loader2,
    Activity,
    AlertTriangle,
    Zap,
    Scale,
    Info,
    Satellite,
    Briefcase
} from 'lucide-react';
import locationsData from '../utils/locations.json';
import GlassCard from '../components/ui/GlassCard';
import BackButton from '../components/ui/BackButton';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
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

const Trends = () => {
    const [selectedState, setSelectedState] = useState('Tamil Nadu');
    const [selectedDistrict, setSelectedDistrict] = useState('Chennai');
    const [selectedArea, setSelectedArea] = useState('Ambattur');
    const [timeRange, setTimeRange] = useState('1Y');
    const [loading, setLoading] = useState(false);

    const states = Object.keys(locationsData).sort();
    const districts = selectedState && locationsData[selectedState] ? Object.keys(locationsData[selectedState]).sort() : [];
    const areas = (selectedState && selectedDistrict && locationsData[selectedState]?.[selectedDistrict])
        ? locationsData[selectedState][selectedDistrict].sort()
        : [];

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [selectedArea, selectedDistrict, timeRange]);

    const marketData = useMemo(() => {
        const locationName = selectedArea || selectedDistrict || selectedState;
        const seed = getHash(locationName);

        // 1. Investment Score (0-100)
        // Deterministic but varies by location
        const investmentScore = (seed % 40) + 50; // Range 50-90
        const roiPotential = (seed % 15) + 5; // 5-20%

        // 2. Buyer vs Seller Market
        const demandSupplyRatio = (investmentScore / 100);
        const marketType = demandSupplyRatio > 0.7 ? "Seller's Strategy" : "Buyer's Opportunity";
        const marketReason = demandSupplyRatio > 0.7
            ? 'High demand & low inventory driving leverage.'
            : 'Inventory surplus creates negotiation power.';

        // 3. Growth Drivers (The "Why")
        const infraEvents = [
            { type: 'INFRA', label: 'Metro Phase 2 Expansion', impact: 'High', icon: Zap },
            { type: 'SOCIAL', label: 'New Tech Park Approved', impact: 'Medium', icon: Briefcase },
            { type: 'DATA', label: 'Green Cover +15%', impact: 'Positive', icon: Satellite },
        ];
        // Shuffle based on seed
        const activeDrivers = infraEvents.sort(() => 0.5 - (seed % 10) / 10).slice(0, (seed % 3) + 1);

        // 4. Price History
        let labels = [];
        let priceData = [];
        const basePrice = 4500 + (seed % 5000);

        if (timeRange === '1Y') {
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            priceData = labels.map((_, i) => basePrice + (i * (seed % 50)) + Math.sin(i) * 500);
        } else {
            labels = ['Q1', 'Q2', 'Q3', 'Q4'];
            priceData = labels.map((_, i) => basePrice + (i * 200));
        }

        // 5. Neighbors
        const neighbors = [
            { name: 'Anna Nagar', growth: 12.5 },
            { name: 'T Nagar', growth: 8.2 },
            { name: 'Velachery', growth: -1.5 },
            { name: 'OMR', growth: 15.3 },
            { name: 'Porur', growth: 5.8 }
        ].sort((a, b) => b.growth - a.growth);

        return {
            score: investmentScore,
            roi: roiPotential,
            marketType,
            marketReason,
            drivers: activeDrivers,
            priceHistory: { labels, data: priceData },
            neighbors,
            distribution: [55, 15, 20, 10] // Apt, Villa, Plot, House
        };
    }, [selectedArea, selectedDistrict, selectedState, timeRange]);

    // Chart Configuration
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                titleColor: '#2DD4BF',
                bodyColor: '#fff',
                borderColor: 'rgba(45, 212, 191, 0.3)',
                borderWidth: 1,
                padding: 12,
                displayColors: false,
            }
        },
        scales: {
            y: {
                grid: { borderDash: [4, 4], color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#9ca3af', callback: (val) => '₹' + (val / 1000).toFixed(1) + 'k' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#9ca3af' }
            }
        }
    };

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in relative z-10">
                    <div>
                        <BackButton to="/" />
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3 mt-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                                Market Intelligence
                            </span>
                            <span className="text-xs bg-teal-500/10 text-teal-400 px-2 py-1 rounded border border-teal-500/20 font-mono">BETA</span>
                        </h1>
                        <p className="text-gray-400 mt-1">AI-powered hyperlocal insights for {selectedArea || selectedDistrict}</p>
                    </div>
                </div>

                {/* Filters */}
                <GlassCard className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
                    <div>
                        <label className="text-xs text-teal-400 font-bold uppercase mb-2 block">State</label>
                        <div className="bg-black/40 rounded-lg border border-white/10 flex items-center px-3">
                            <select
                                value={selectedState}
                                onChange={(e) => {
                                    setSelectedState(e.target.value);
                                    setSelectedDistrict('');
                                    setSelectedArea('');
                                }}
                                className="w-full bg-transparent text-white text-sm py-2 focus:outline-none cursor-pointer"
                            >
                                {states.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-teal-400 font-bold uppercase mb-2 block">District</label>
                        <div className="bg-black/40 rounded-lg border border-white/10 flex items-center px-3">
                            <select
                                value={selectedDistrict}
                                onChange={(e) => {
                                    setSelectedDistrict(e.target.value);
                                    setSelectedArea('');
                                }}
                                className="w-full bg-transparent text-white text-sm py-2 focus:outline-none cursor-pointer"
                                disabled={!selectedState}
                            >
                                <option value="" className="bg-gray-900">Select District</option>
                                {districts.map(d => <option key={d} value={d} className="bg-gray-900">{d}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-teal-400 font-bold uppercase mb-2 block">Target Area</label>
                        <div className="bg-black/40 rounded-lg border border-white/10 flex items-center px-3">
                            <select
                                value={selectedArea}
                                onChange={(e) => setSelectedArea(e.target.value)}
                                className="w-full bg-transparent text-white text-sm py-2 focus:outline-none cursor-pointer"
                                disabled={!selectedDistrict}
                            >
                                <option value="" className="bg-gray-900">Select Locality</option>
                                {areas.map(a => <option key={a} value={a} className="bg-gray-900">{a}</option>)}
                            </select>
                        </div>
                    </div>
                </GlassCard>

                {loading ? (
                    <div className="h-96 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
                        <p className="text-teal-400 font-mono animate-pulse">Processing Satellite & Market Data...</p>
                    </div>
                ) : (
                    <>
                        {/* Top Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">

                            {/* 1. Locality Investment Score */}
                            <GlassCard className="p-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-teal-500/20"></div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Investment Score</h3>
                                        <div className="text-4xl font-extrabold text-white mt-1">{marketData.score}<span className="text-lg text-gray-500 font-normal">/100</span></div>
                                    </div>
                                    <div className={`p-2 rounded-lg ${marketData.score > 70 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        <Activity className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-500">Growth Potential</span>
                                            <span className="text-teal-400 font-bold">High</span>
                                        </div>
                                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-teal-400 h-full transition-all duration-1000" style={{ width: `${marketData.score}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                        <div className="text-xs text-gray-400">Proj. ROI (1Y)</div>
                                        <div className="text-lg font-bold text-green-400">+{marketData.roi}%</div>
                                    </div>
                                </div>
                            </GlassCard>

                            {/* 2. Market Pulse (Buyer Vs Seller) */}
                            <GlassCard className="p-6 relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Market Pulse</h3>
                                        <div className="text-xl font-bold text-white mt-1">{marketData.marketType}</div>
                                    </div>
                                    <Scale className="w-6 h-6 text-purple-400" />
                                </div>
                                <div className="relative pt-6 pb-4">
                                    <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase mb-2">
                                        <span>Buyer's Market</span>
                                        <span>Seller's Market</span>
                                    </div>
                                    <div className="w-full h-2 bg-gradient-to-r from-blue-500 via-gray-600 to-red-500 rounded-full relative">
                                        <div
                                            className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] border-2 border-black top-1/2 -translate-y-1/2 transition-all duration-700"
                                            style={{ left: marketData.score > 70 ? '85%' : '25%' }}
                                        ></div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 italic border-l-2 border-purple-500 pl-3">
                                    "{marketData.marketReason}"
                                </p>
                            </GlassCard>

                            {/* 3. Growth Drivers */}
                            <GlassCard className="p-6 relative overflow-hidden">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Growth Drivers</h3>
                                        <div className="text-sm font-medium text-white mt-1">Key Catalysts (6 Months)</div>
                                    </div>
                                    <Zap className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div className="space-y-3">
                                    {marketData.drivers.map((driver, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="p-1.5 bg-black/40 rounded-md text-teal-400">
                                                <driver.icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-200">{driver.label}</div>
                                                <div className="text-[10px] text-teal-500 uppercase font-bold tracking-wider">{driver.type} • Impact: {driver.impact}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {marketData.drivers.length === 0 && (
                                        <div className="text-xs text-gray-500 italic p-2">No major infrastructure alerts currently.</div>
                                    )}
                                </div>
                            </GlassCard>
                        </div>

                        {/* Main Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Price Trends */}
                            <GlassCard className="lg:col-span-2 p-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-teal-400" /> Price Trend Analysis
                                        </h3>
                                        <p className="text-xs text-gray-400">Fused historical data with ML-based future prediction.</p>
                                    </div>
                                    <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
                                        {['1Y', '3Y', '5Y'].map(r => (
                                            <button
                                                key={r}
                                                onClick={() => setTimeRange(r)}
                                                className={`px-3 py-1 text-xs rounded transition-all ${timeRange === r ? 'bg-teal-500 text-black font-bold shadow-lg shadow-teal-500/20' : 'text-gray-400 hover:text-white'}`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-72 w-full">
                                    <Line
                                        data={{
                                            labels: marketData.priceHistory.labels,
                                            datasets: [{
                                                data: marketData.priceHistory.data,
                                                borderColor: '#2DD4BF',
                                                borderWidth: 2,
                                                backgroundColor: (context) => {
                                                    const ctx = context.chart.ctx;
                                                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                                                    gradient.addColorStop(0, 'rgba(45, 212, 191, 0.2)');
                                                    gradient.addColorStop(1, 'rgba(45, 212, 191, 0)');
                                                    return gradient;
                                                },
                                                fill: true,
                                                tension: 0.4,
                                                pointRadius: 4,
                                                pointHoverRadius: 6,
                                                pointBackgroundColor: '#111827',
                                                pointBorderColor: '#2DD4BF',
                                                pointBorderWidth: 2
                                            }]
                                        }}
                                        options={lineOptions}
                                    />
                                </div>
                            </GlassCard>

                            {/* Top Appreciating & Distribution */}
                            <div className="space-y-6">
                                <GlassCard className="p-6">
                                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wider">
                                        <TrendingUp className="w-4 h-4 text-green-400" /> Top Performing Micro-Markets
                                    </h3>
                                    <div className="space-y-1">
                                        {marketData.neighbors.map((n, idx) => (
                                            <div key={idx} className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-2 rounded transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-gray-600 font-mono font-bold">0{idx + 1}</span>
                                                    <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">{n.name}</span>
                                                </div>
                                                <div className={`text-sm font-bold ${n.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {n.growth > 0 ? '+' : ''}{n.growth}%
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>

                                <GlassCard className="p-6">
                                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Market Composition</h3>
                                    <div className="flex items-center gap-6">
                                        <div className="h-28 w-28 relative">
                                            <Doughnut
                                                data={{
                                                    labels: ['Apt', 'Villa', 'Plot', 'House'],
                                                    datasets: [{
                                                        data: marketData.distribution,
                                                        backgroundColor: ['#2DD4BF', '#3B82F6', '#F59E0B', '#10B981'],
                                                        borderWidth: 0,
                                                        hoverOffset: 4
                                                    }]
                                                }}
                                                options={{ cutout: '75%', plugins: { legend: { display: false } } }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span className="text-xs font-bold text-white">Mix</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <div className="w-2 h-2 rounded-full bg-teal-400"></div> Apt
                                                </div>
                                                <span className="text-white font-bold">{marketData.distribution[0]}%</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div> Villa
                                                </div>
                                                <span className="text-white font-bold">{marketData.distribution[3]}%</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Plot
                                                </div>
                                                <span className="text-white font-bold">{marketData.distribution[2]}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Trends;
