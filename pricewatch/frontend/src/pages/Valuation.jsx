import React, { useState } from 'react';
import { Calculator, MapPin, Home, Info, ArrowRight, CheckCircle, TrendingUp, DollarSign } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import BackButton from '../components/ui/BackButton';
import { formatPrice } from '../utils/formatters';
import locationsData from '../utils/locations.json';

const Valuation = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        state: '',
        city: '',
        locality: '',
        type: 'Apartment',
        bhk: '2',
        area: '',
        age: '0-5'
    });
    const [valuation, setValuation] = useState(null);
    const [reportLoading, setReportLoading] = useState(false);
    const [reportSent, setReportSent] = useState(false);

    const handleGetReport = () => {
        setReportLoading(true);
        // Simulate report generation
        setTimeout(() => {
            setReportLoading(false);
            setReportSent(true);
            setTimeout(() => setReportSent(false), 3000); // Reset after 3s
        }, 2000);
    };

    const [showStateSuggestions, setShowStateSuggestions] = useState(false);
    const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
    const [showLocalitySuggestions, setShowLocalitySuggestions] = useState(false);

    const states = Object.keys(locationsData).sort();
    const districts = formData.state && locationsData[formData.state] ? Object.keys(locationsData[formData.state]).sort() : [];
    const localities = (formData.state && formData.city && locationsData[formData.state]?.[formData.city])
        ? locationsData[formData.state][formData.city].sort()
        : [];

    const filteredStates = states.filter(s => s.toLowerCase().includes(formData.state.toLowerCase()));
    const filteredDistricts = districts.filter(d => d.toLowerCase().includes(formData.city.toLowerCase()));
    const filteredLocalities = localities.filter(l => l.toLowerCase().includes(formData.locality.toLowerCase()));

    const handleStateSelect = (val) => {
        setFormData(prev => ({ ...prev, state: val, city: '', locality: '' }));
        setShowStateSuggestions(false);
    };

    const handleDistrictSelect = (val) => {
        setFormData(prev => ({ ...prev, city: val, locality: '' }));
        setShowDistrictSuggestions(false);
    };

    const handleLocalitySelect = (val) => {
        setFormData(prev => ({ ...prev, locality: val }));
        setShowLocalitySuggestions(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updates = { [name]: value };
            if (name === 'state') {
                updates.city = '';
                updates.locality = '';
            } else if (name === 'city') {
                updates.locality = '';
            }
            return { ...prev, ...updates };
        });
    };

    const calculateValuation = () => {
        setLoading(true);
        // Simulate API call and calculation
        setTimeout(() => {
            const baseRate = {
                'Bangalore': 6500,
                'Mumbai': 18000,
                'Hyderabad': 5500,
                'Delhi': 8000,
                'Pune': 6000
            }[formData.city] || 5000;

            const localityMultiplier = formData.locality.toLowerCase().includes('whitefield') || formData.locality.toLowerCase().includes('cbd') ? 1.2 : 1.0;
            const typeMultiplier = formData.type === 'Villa' ? 1.3 : formData.type === 'Plot' ? 0.8 : 1.0;
            const ageMultiplier = formData.age === '0-5' ? 1.0 : formData.age === '5-10' ? 0.9 : 0.8;

            const estimatedPrice = baseRate * parseFloat(formData.area || 1000) * localityMultiplier * typeMultiplier * ageMultiplier;

            setValuation({
                price: estimatedPrice,
                range: {
                    min: estimatedPrice * 0.95,
                    max: estimatedPrice * 1.05
                },
                pricePerSqFt: Math.round(estimatedPrice / (parseFloat(formData.area) || 1000)),
                demand: 'High',
                rentalYield: '3.5%'
            });
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8 relative z-10">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-start">
                        <BackButton to="/" />
                    </div>
                    <div className="inline-flex items-center justify-center p-3 bg-teal-500/10 rounded-2xl mb-4 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.3)] animate-float">
                        <Calculator className="w-8 h-8 text-teal-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 animate-fade-in-up">
                        Instant Property Valuation
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                        Get an accurate market estimate for your property in seconds using our advanced AI algorithms.
                    </p>
                </div>

                {step === 1 && (
                    <GlassCard className="p-8 md:p-10 animate-fade-in-up animation-delay-400 max-w-2xl mx-auto">
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); calculateValuation(); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-teal-400 uppercase tracking-wider">Select State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setShowStateSuggestions(true);
                                        }}
                                        onFocus={() => setShowStateSuggestions(true)}
                                        onBlur={() => setTimeout(() => setShowStateSuggestions(false), 200)}
                                        placeholder="Type State"
                                        className="input-field-glass w-full"
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
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-teal-400 uppercase tracking-wider">Select District</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setShowDistrictSuggestions(true);
                                        }}
                                        onFocus={() => setShowDistrictSuggestions(true)}
                                        onBlur={() => setTimeout(() => setShowDistrictSuggestions(false), 200)}
                                        placeholder="Type District"
                                        disabled={!formData.state}
                                        className="input-field-glass w-full disabled:opacity-50"
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

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-teal-400 uppercase tracking-wider">Property Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="input-field-glass w-full"
                                    >
                                        <option value="Apartment" className="bg-black text-gray-300">Apartment</option>
                                        <option value="Independent House" className="bg-black text-gray-300">Independent House</option>
                                        <option value="Villa" className="bg-black text-gray-300">Villa</option>
                                        <option value="Plot" className="bg-black text-gray-300">Plot / Land</option>
                                    </select>
                                </div>

                                <div className="space-y-2 md:col-span-2 relative">
                                    <label className="text-sm font-bold text-teal-400 uppercase tracking-wider">Locality</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none z-10" />
                                        <input
                                            type="text"
                                            name="locality"
                                            value={formData.locality}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setShowLocalitySuggestions(true);
                                            }}
                                            onFocus={() => setShowLocalitySuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowLocalitySuggestions(false), 200)}
                                            placeholder="Type Locality"
                                            disabled={!formData.city}
                                            className="input-field-glass w-full pl-12 disabled:opacity-50"
                                        />
                                    </div>
                                    {showLocalitySuggestions && filteredLocalities.length > 0 && (
                                        <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-auto bg-black border border-teal-500/30 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] custom-scrollbar">
                                            {filteredLocalities.map((l, idx) => (
                                                <div
                                                    key={idx}
                                                    onMouseDown={() => handleLocalitySelect(l)}
                                                    className="px-4 py-3 text-white hover:bg-teal-500/20 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                                >
                                                    {l}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-teal-400 uppercase tracking-wider">BHK</label>
                                    <select
                                        name="bhk"
                                        value={formData.bhk}
                                        onChange={handleChange}
                                        className="input-field-glass w-full"
                                    >
                                        <option value="1" className="bg-black text-gray-300">1 BHK</option>
                                        <option value="2" className="bg-black text-gray-300">2 BHK</option>
                                        <option value="3" className="bg-black text-gray-300">3 BHK</option>
                                        <option value="4" className="bg-black text-gray-300">4 BHK</option>
                                        <option value="5" className="bg-black text-gray-300">5+ BHK</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-teal-400 uppercase tracking-wider">Area (Sq. Ft.)</label>
                                    <input
                                        type="number"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        placeholder="e.g. 1200"
                                        className="input-field-glass w-full"
                                        required
                                        min="100"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-teal-400 uppercase tracking-wider">Property Age</label>
                                    <select
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="input-field-glass w-full"
                                    >
                                        <option value="0-5" className="bg-black text-gray-300">0-5 Years</option>
                                        <option value="5-10" className="bg-black text-gray-300">5-10 Years</option>
                                        <option value="10+" className="bg-black text-gray-300">10+ Years</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full group relative flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-black bg-teal-500 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all shadow-[0_0_20px_rgba(20,184,166,0.5)] ${loading ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing Market Data...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Calculate Value <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </button>
                        </form>
                    </GlassCard>
                )}

                {step === 2 && valuation && (
                    <div className="space-y-8 animate-fade-in-up">
                        <GlassCard className="p-8 md:p-12 relative overflow-hidden border-teal-500/50 shadow-[0_0_30px_rgba(20,184,166,0.15)]" floating={true} hoverEffect={true}>
                            <div className="absolute top-0 right-0 bg-teal-500 text-black font-bold px-6 py-2 rounded-bl-2xl shadow-lg z-10">
                                AI ESTIMATE
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Estimated Market Value</p>
                                        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
                                            {formatPrice(valuation.price)}
                                        </h2>
                                        <p className="text-teal-400 font-medium">
                                            Range: {formatPrice(valuation.range.min)} - {formatPrice(valuation.range.max)}
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                                            <p className="text-xs text-gray-400 uppercase">Avg Price/Sq.ft</p>
                                            <p className="text-xl font-bold text-white">₹{valuation.pricePerSqFt.toLocaleString()}</p>
                                        </div>
                                        <div className="px-4 py-3 bg-white/5 rounded-xl border border-white/10">
                                            <p className="text-xs text-gray-400 uppercase">Confidence</p>
                                            <p className="text-xl font-bold text-green-400">92%</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="text-gray-400 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
                                        >
                                            ← Calculate Another Property
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-black/30 rounded-2xl p-6 border border-white/10">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-teal-400" /> Market Insights
                                        </h3>
                                        <ul className="space-y-4">
                                            <li className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">Demand in {formData.locality || 'this area'}</span>
                                                <span className="text-green-400 font-bold bg-green-500/10 px-2 py-1 rounded">{valuation.demand}</span>
                                            </li>
                                            <li className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">Price Trend (YoY)</span>
                                                <span className="text-green-400 font-bold">+8.5%</span>
                                            </li>
                                            <li className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">Rental Yield</span>
                                                <span className="text-white font-bold">{valuation.rentalYield}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <button
                                        onClick={handleGetReport}
                                        disabled={reportLoading || reportSent}
                                        className={`w-full py-3 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${reportSent
                                            ? 'bg-green-500 text-black hover:bg-green-400'
                                            : 'bg-white text-black hover:bg-gray-200'
                                            } ${reportLoading ? 'opacity-80 cursor-wait' : ''}`}
                                    >
                                        {reportLoading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Generating Report...
                                            </>
                                        ) : reportSent ? (
                                            <>
                                                <CheckCircle className="w-5 h-5" /> Report Sent to Email
                                            </>
                                        ) : (
                                            <>
                                                <Info className="w-5 h-5" /> Get Detailed Report
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Extra Grid for Upsell/Context */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <GlassCard className="p-6 text-center hover:border-teal-500/30 transition-colors group" hoverEffect={true} delay={0.1}>
                                <div className="w-12 h-12 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Home className="w-6 h-6 text-teal-400" />
                                </div>
                                <h3 className="font-bold text-white mb-2">Sell Faster</h3>
                                <p className="text-sm text-gray-400">List your property with this valuation to attract serious buyers quickly.</p>
                            </GlassCard>
                            <GlassCard className="p-6 text-center hover:border-teal-500/30 transition-colors group" hoverEffect={true} delay={0.2}>
                                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <CheckCircle className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="font-bold text-white mb-2">Get Certified</h3>
                                <p className="text-sm text-gray-400">Request a professional on-site valuation for a certified report.</p>
                            </GlassCard>
                            <GlassCard className="p-6 text-center hover:border-teal-500/30 transition-colors group" hoverEffect={true} delay={0.3}>
                                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <DollarSign className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="font-bold text-white mb-2">Loan Eligibility</h3>
                                <p className="text-sm text-gray-400">Check how much loan you can get against this property value.</p>
                            </GlassCard>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Valuation;
