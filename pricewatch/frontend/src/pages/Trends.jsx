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
import { TrendingUp, Filter, Calendar, MapPin, Loader2 } from 'lucide-react';
import locationsData from '../utils/locations.json';

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

// Helper to generate deterministic data based on string hash
const getHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

const Trends = () => {
    const [selectedState, setSelectedState] = useState('Tamil Nadu');
    const [selectedDistrict, setSelectedDistrict] = useState('Chennai');
    const [selectedArea, setSelectedArea] = useState('');
    const [timeRange, setTimeRange] = useState('1Y');
    const [loading, setLoading] = useState(false);

    // Derived lists
    const states = Object.keys(locationsData).sort();
    const districts = selectedState ? Object.keys(locationsData[selectedState]).sort() : [];
    const areas = (selectedState && selectedDistrict) ? locationsData[selectedState][selectedDistrict].sort() : [];

    // Simulate data fetching effect
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, [selectedArea, selectedDistrict, timeRange]);

    // Generate Dynamic Data based on selection
    const generatedData = useMemo(() => {
        const locationName = selectedArea || selectedDistrict || selectedState;
        const seed = getHash(locationName) + getHash(timeRange); // Add timeRange to seed variance

        // 1. Price History Generation
        const basePrice = 4000 + (getHash(locationName) % 12000); // Keep base price consistent for location
        const volatility = (seed % 20) + 5;

        let historyPoints = 12;
        let labels = [];
        let trendFactor = 0.5;

        // Configure based on Time Range
        if (timeRange === '1M') {
            historyPoints = 30;
            labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
            trendFactor = 0.1;
        } else if (timeRange === '6M') {
            historyPoints = 6;
            labels = ['M-5', 'M-4', 'M-3', 'M-2', 'Last Month', 'Current'];
            trendFactor = 0.8;
        } else if (timeRange === '1Y') {
            historyPoints = 12;
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            trendFactor = 1.2;
        } else if (timeRange === '3Y') {
            historyPoints = 12; // Quarters or key points
            labels = Array.from({ length: 12 }, (_, i) => `Q${(i % 4) + 1} '2${Math.floor(i / 4) + 3}`);
            trendFactor = 3.0;
        } else if (timeRange === '5Y') {
            historyPoints = 10; // Half-yearly
            labels = Array.from({ length: 10 }, (_, i) => `202${Math.floor(i / 2)} H${(i % 2) + 1}`);
            trendFactor = 5.0;
        }

        const historyData = Array.from({ length: historyPoints }, (_, i) => {
            // Create a realistic looking trend (upwards with noise)
            const trend = (i * (getHash(locationName) % 50)) * (trendFactor / 5);
            const seasonality = Math.sin((i / historyPoints) * Math.PI * 2) * volatility * 5;
            const randomNoise = (seed * (i + 1) * 9301 + 49297) % (volatility * 10); // Pseudo-random based on seed

            return Math.round(basePrice + trend + seasonality + randomNoise);
        });

        // 2. Top Appreciating Areas (Neighbors)
        let neighbors = [];
        if (selectedState && selectedDistrict) {
            const allDistrictAreas = locationsData[selectedState][selectedDistrict];
            // Pick 5 determinstically based on location only (not time)
            const locSeed = getHash(locationName);
            for (let i = 0; i < 5; i++) {
                const idx = (locSeed + i * 7) % allDistrictAreas.length;
                neighbors.push(allDistrictAreas[idx]);
            }
        } else {
            neighbors = ['Whitefield', 'Indiranagar', 'HSR Layout', 'Koramangala', 'Hebbal'];
        }

        const neighborData = neighbors.map((name, i) => ({
            name,
            value: ((seed + i * 13) % 15) + 3
        }));

        // 3. Distribution (Consistent for location)
        const distSeed = getHash(locationName) % 100;
        const apt = 40 + (distSeed % 30);
        const villa = 10 + (distSeed % 15);
        const plot = 15 + (distSeed % 10);
        const house = 100 - (apt + villa + plot);

        return {
            labels,
            priceHistory: historyData,
            topAreas: neighborData,
            distribution: [apt, villa, plot, house]
        };
    }, [selectedState, selectedDistrict, selectedArea, timeRange]);

    const activeLocationName = selectedArea || selectedDistrict || selectedState;

    const lineChartData = {
        labels: generatedData.labels,
        datasets: [
            {
                label: `${activeLocationName} Price (₹/sqft)`,
                data: generatedData.priceHistory,
                borderColor: '#14B8A6', // Teal-500
                backgroundColor: 'rgba(20, 184, 166, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const barChartData = {
        labels: generatedData.topAreas.map(n => n.name),
        datasets: [
            {
                label: 'Appreciation (YoY %)',
                data: generatedData.topAreas.map(n => n.value),
                backgroundColor: [
                    '#14B8A6', '#06B6D4', '#0F766E', '#0891B2', '#2DD4BF',
                ],
                borderRadius: 8,
            },
        ],
    };

    const doughnutData = {
        labels: ['Apartment', 'Villa', 'Plot', 'Indep. House'],
        datasets: [
            {
                data: generatedData.distribution,
                backgroundColor: ['#14B8A6', '#06B6D4', '#F59E0B', '#6366F1'],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <TrendingUp className="text-teal-600 w-8 h-8" />
                            Market Intelligence
                        </h1>
                        <p className="text-gray-600 mt-2">Real-time analysis and hyperlocal trends</p>
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
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Area / Locality</label>
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
                        {/* Main Chart */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 animate-fade-in-up">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Price History</h3>
                                    <p className="text-sm text-gray-500">Average price trend for {activeLocationName}</p>
                                </div>
                                <div className="flex gap-2">
                                    {['1Y', '3Y', '5Y'].map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => setTimeRange(range)}
                                            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${timeRange === range
                                                ? 'bg-teal-600 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="h-80">
                                <Line data={lineChartData} options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: {
                                            grid: { borderDash: [4, 4], color: '#f3f4f6' },
                                            ticks: { callback: (val) => '₹' + val }
                                        },
                                        x: { grid: { display: false } }
                                    }
                                }} />
                            </div>
                        </div>

                        {/* Secondary Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Bar Chart */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Top Appreciating Areas</h3>
                                <p className="text-sm text-gray-500 mb-6">Highest YoY growth in {selectedDistrict || selectedState}</p>
                                <div className="h-64">
                                    <Bar data={barChartData} options={{
                                        maintainAspectRatio: false,
                                        plugins: { legend: { display: false } },
                                        scales: {
                                            y: { grid: { borderDash: [4, 4] } },
                                            x: { grid: { display: false } }
                                        }
                                    }} />
                                </div>
                            </div>

                            {/* Doughnut Chart */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <h3 className="text-lg font-bold text-gray-900 mb-6 w-full text-left">Property Type Distribution</h3>
                                <div className="h-64 w-64 relative">
                                    <Doughnut data={doughnutData} options={{ cutout: '75%' }} />
                                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                        <span className="text-3xl font-bold text-gray-900">{generatedData.distribution[0]}%</span>
                                        <span className="text-xs text-gray-500">Apartments</span>
                                    </div>
                                </div>
                                <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 w-full">
                                    {doughnutData.labels.map((label, idx) => (
                                        <div key={label} className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: doughnutData.datasets[0].backgroundColor[idx] }}
                                            />
                                            <span className="text-sm text-gray-600 truncate">{label}</span>
                                            <span className="text-sm font-bold text-gray-900 ml-auto">{doughnutData.datasets[0].data[idx]}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Trends;
