import React, { useState } from 'react';
import { Building2, Sparkles, CheckCircle2, LineChart, TrendingUp, Award, Home, MapPin, Loader2 } from 'lucide-react';
import { PROPERTY_TYPES, AMENITIES } from '../utils/constants';
import { formatPrice } from '../utils/formatters';
import { predictPrice } from '../api/client';
import locationsData from '../utils/locations.json';
import GlassCard from '../components/ui/GlassCard';
import BackButton from '../components/ui/BackButton';

const Prediction = () => {
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    area: '',
    propertyType: 'Apartment',
    size: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    amenities: []
  });

  const [prediction, setPrediction] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  const [showDistrictSuggestions, setShowDistrictSuggestions] = useState(false);
  const [showAreaSuggestions, setShowAreaSuggestions] = useState(false);

  // Helper for case-insensitive lookup
  const getCaseInsensitiveKey = (obj, key) => {
    if (!obj || !key) return null;
    return Object.keys(obj).find(k => k.toLowerCase() === key.toLowerCase());
  };

  const states = Object.keys(locationsData).sort();
  const filteredStates = states.filter(state =>
    state.toLowerCase().includes(formData.state.toLowerCase())
  );

  const matchedState = getCaseInsensitiveKey(locationsData, formData.state);
  const districts = matchedState ? Object.keys(locationsData[matchedState]).sort() : [];
  const filteredDistricts = districts.filter(d =>
    d.toLowerCase().includes(formData.district.toLowerCase())
  );

  const matchedDistrict = matchedState ? getCaseInsensitiveKey(locationsData[matchedState], formData.district) : null;
  const areas = (matchedState && matchedDistrict) ? locationsData[matchedState][matchedDistrict].sort() : [];
  const filteredAreas = areas.filter(a =>
    a.toLowerCase().includes(formData.area.toLowerCase())
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updates = { [field]: value };
      if (field === 'state') {
        updates.district = '';
        updates.area = '';
      }
      if (field === 'district') {
        updates.area = '';
      }
      return { ...prev, ...updates };
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleStateSelect = (stateName) => {
    setFormData(prev => ({
      ...prev,
      state: stateName,
      district: '',
      area: ''
    }));
    setShowStateSuggestions(false);
    if (errors.state) {
      setErrors(prev => ({ ...prev, state: null }));
    }
  };

  const handleDistrictSelect = (districtName) => {
    setFormData(prev => ({
      ...prev,
      district: districtName,
      area: ''
    }));
    setShowDistrictSuggestions(false);
    if (errors.district) {
      setErrors(prev => ({ ...prev, district: null }));
    }
  };

  const handleAreaSelect = (areaName) => {
    setFormData(prev => ({
      ...prev,
      area: areaName
    }));
    setShowAreaSuggestions(false);
    if (errors.area) {
      setErrors(prev => ({ ...prev, area: null }));
    }
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handlePredictPrice = async () => {
    setLoading(true);
    setErrors({});
    setError(null);
    setPrediction(null);
    setShowPrediction(false);

    try {
      const currentYear = new Date().getFullYear();
      const age = currentYear - parseInt(formData.yearBuilt);

      const payload = {
        city: formData.district,
        area: formData.area,
        propertyType: formData.propertyType,
        size: parseInt(formData.size),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        yearBuilt: parseInt(formData.yearBuilt),
        age: age,
        amenities: formData.amenities
      };

      const newErrors = {};
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.district) newErrors.district = 'District is required';
      if (!formData.area) newErrors.area = 'Area is required';
      if (!formData.size) newErrors.size = 'Size is required';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      const response = await predictPrice(payload);

      if (response && response.predictedPrice) {
        setPrediction(response);
        setShowPrediction(true);
      } else {
        setError('Failed to get valid prediction data');
      }
    } catch (err) {
      setError('An error occurred while communicating with the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">
      <BackButton to="/" />

      <div className="mb-8 animate-fade-in text-center lg:text-left">
        <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30 animate-pulse-slow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
            AI Predicted Fair Value
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl">
          Enter property details to get ML-powered price prediction with 5-year forecast.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-3">
          <div className="relative">
            {/* Decorative background element */}
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50"></div>

            <GlassCard floating={true} hoverEffect={false} className="relative bg-black/60 border-white/10 backdrop-blur-xl">
              {/* Tech Header */}
              <div className="flex items-center justify-between gap-3 mb-8 border-b border-white/5 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20 shadow-[0_0_10px_rgba(20,184,166,0.2)]">
                    <Building2 className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-wide">Property Configuration</h2>
                    <p className="text-xs text-teal-400/70 font-mono uppercase tracking-widest">AI Valuation Engine v2.0</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 text-red-200 rounded-xl border border-red-500/30 backdrop-blur-sm flex items-center gap-3">
                  <div className="w-1 h-8 bg-red-500 rounded-full"></div>
                  {error}
                </div>
              )}

              <div className="space-y-8">
                {/* Module 1: Location */}
                <div className="relative group">
                  <div className="absolute -left-[1px] top-6 bottom-6 w-1 bg-gradient-to-b from-teal-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="pl-6 border-l border-white/5">
                    <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      01 // Location Data
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-[10px] text-teal-400 font-bold uppercase tracking-wider mb-2 ml-1">Select State</label>
                        <div className="bg-white/5 rounded-xl p-1 border border-white/5 focus-within:border-teal-500/30 transition-colors relative">
                          <input
                            type="text"
                            className={`w-full px-4 py-3 bg-transparent border-none text-white focus:ring-0 font-medium placeholder-gray-500 ${errors.state ? 'text-red-400' : ''}`}
                            value={formData.state}
                            onChange={(e) => {
                              handleInputChange('state', e.target.value);
                              setShowStateSuggestions(true);
                            }}
                            onFocus={() => setShowStateSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowStateSuggestions(false), 200)}
                            placeholder="Type State Name"
                            autoComplete="off"
                          />
                          {showStateSuggestions && filteredStates.length > 0 && (
                            <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-auto bg-black border border-teal-500/30 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] custom-scrollbar">
                              {filteredStates.map((s, index) => (
                                <div
                                  key={index}
                                  onMouseDown={() => handleStateSelect(s)}
                                  className="px-4 py-3 text-white hover:bg-teal-500/20 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                >
                                  {s}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] text-teal-400 font-bold uppercase tracking-wider mb-2 ml-1">Select District</label>
                          <div className="bg-white/5 rounded-xl p-1 border border-white/5 focus-within:border-teal-500/30 transition-colors relative">
                            <input
                              type="text"
                              className={`w-full px-4 py-3 bg-transparent border-none text-white focus:ring-0 font-medium placeholder-gray-500 disabled:opacity-50 ${errors.district ? 'text-red-400' : ''}`}
                              value={formData.district}
                              onChange={(e) => {
                                handleInputChange('district', e.target.value);
                                setShowDistrictSuggestions(true);
                              }}
                              onFocus={() => setShowDistrictSuggestions(true)}
                              onBlur={() => setTimeout(() => setShowDistrictSuggestions(false), 200)}
                              placeholder="Type District"
                              disabled={!formData.state}
                              autoComplete="off"
                            />
                            {showDistrictSuggestions && filteredDistricts.length > 0 && (
                              <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-auto bg-black border border-teal-500/30 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] custom-scrollbar">
                                {filteredDistricts.map((d, index) => (
                                  <div
                                    key={index}
                                    onMouseDown={() => handleDistrictSelect(d)}
                                    className="px-4 py-3 text-white hover:bg-teal-500/20 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                  >
                                    {d}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] text-teal-400 font-bold uppercase tracking-wider mb-2 ml-1">Select Area Locality</label>
                          <div className="bg-white/5 rounded-xl p-1 border border-white/5 focus-within:border-teal-500/30 transition-colors relative">
                            <input
                              type="text"
                              className={`w-full px-4 py-3 bg-transparent border-none text-white focus:ring-0 font-medium placeholder-gray-500 disabled:opacity-50 ${errors.area ? 'text-red-400' : ''}`}
                              value={formData.area}
                              onChange={(e) => {
                                handleInputChange('area', e.target.value);
                                setShowAreaSuggestions(true);
                              }}
                              onFocus={() => setShowAreaSuggestions(true)}
                              onBlur={() => setTimeout(() => setShowAreaSuggestions(false), 200)}
                              placeholder="Type Area"
                              disabled={!formData.district}
                              autoComplete="off"
                            />
                            {showAreaSuggestions && filteredAreas.length > 0 && (
                              <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-auto bg-black border border-teal-500/30 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] custom-scrollbar">
                                {filteredAreas.map((a, index) => (
                                  <div
                                    key={index}
                                    onMouseDown={() => handleAreaSelect(a)}
                                    className="px-4 py-3 text-white hover:bg-teal-500/20 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                  >
                                    {a}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Module 2: Specs */}
                <div className="relative group">
                  <div className="absolute -left-[1px] top-6 bottom-6 w-1 bg-gradient-to-b from-purple-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="pl-6 border-l border-white/5">
                    <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      02 // Property Specs
                    </h3>

                    <div className="bg-black/40 rounded-xl border border-white/10 overflow-hidden relative transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                      {/* Top Row: Type & Size */}
                      <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="p-5 border-b sm:border-b-0 sm:border-r border-white/10 hover:bg-white/5 transition-colors group/type relative">
                          <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-2 block flex items-center gap-2">
                            <Building2 className="w-3 h-3" /> Property Type
                          </label>
                          <select
                            className="w-full bg-transparent border-none text-white text-lg font-medium p-0 focus:ring-0 cursor-pointer"
                            value={formData.propertyType}
                            onChange={(e) => handleInputChange('propertyType', e.target.value)}
                          >
                            {PROPERTY_TYPES.map(type => (
                              <option key={type.value} value={type.value} className="bg-gray-900 text-white">{type.label}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 mt-2 text-white/20 group-hover/type:text-purple-400 transition-colors pointer-events-none">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>

                        <div className="p-5 hover:bg-white/5 transition-colors group/size relative">
                          <label className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-2 block flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> Size (Sq Ft)
                          </label>
                          <input
                            type="number"
                            className={`w-full bg-transparent border-none text-white text-lg font-bold p-0 focus:ring-0 outline-none placeholder-white/50 ${errors.size ? 'text-red-400' : ''}`}
                            value={formData.size}
                            onChange={(e) => handleInputChange('size', e.target.value)}
                            placeholder="0"
                          />
                          <div className="absolute right-4 top-1/2 mt-2 text-white/60 group-hover/size:text-purple-400 transition-colors pointer-events-none">
                            <span className="text-xs font-mono border border-white/20 rounded px-1">FT²</span>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-white/10"></div>

                      {/* Bottom Row: Beds, Baths, Year */}
                      <div className="grid grid-cols-3 divide-x divide-white/10">
                        <div className="p-4 text-center hover:bg-white/5 transition-colors group/num">
                          <label className="block text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Bedrooms</label>
                          <input
                            type="number"
                            className="w-full bg-transparent border-none text-center text-2xl font-bold text-white p-0 focus:ring-0 placeholder-white/30"
                            value={formData.bedrooms}
                            onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                            placeholder="-"
                          />
                        </div>
                        <div className="p-4 text-center hover:bg-white/5 transition-colors group/num">
                          <label className="block text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Bathrooms</label>
                          <input
                            type="number"
                            className="w-full bg-transparent border-none text-center text-2xl font-bold text-white p-0 focus:ring-0 placeholder-white/30"
                            value={formData.bathrooms}
                            onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                            placeholder="-"
                          />
                        </div>
                        <div className="p-4 text-center hover:bg-white/5 transition-colors group/num">
                          <label className="block text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Built Year</label>
                          <input
                            type="number"
                            className="w-full bg-transparent border-none text-center text-2xl font-bold text-white p-0 focus:ring-0 placeholder-white/30"
                            value={formData.yearBuilt}
                            onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                            placeholder="-"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Module 3: Amenities */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-teal-500" /> Premium Features
                    </h3>
                    <span className="text-[10px] text-gray-600 bg-white/5 px-2 py-1 rounded-full">{formData.amenities.length} Selected</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {AMENITIES.map((amenity) => (
                      <button
                        type="button"
                        key={amenity.value}
                        onClick={() => toggleAmenity(amenity.value)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-300 ${formData.amenities.includes(amenity.value)
                          ? 'bg-teal-500 text-black border-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.2)] scale-105'
                          : 'bg-black/40 border-white/5 text-gray-500 hover:text-gray-300 hover:bg-white/5'
                          }`}
                      >
                        {amenity.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handlePredictPrice}
                  disabled={loading}
                  className={`relative w-full group overflow-hidden rounded-xl p-[1px] ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 animate-gradient-x"></div>
                  <div className="relative bg-black h-full rounded-xl px-6 py-4 flex items-center justify-center gap-3 transition-bg group-hover:bg-black/90">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-teal-400" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-200 font-bold uppercase tracking-wider">Analyzing Data...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 text-teal-400 group-hover:text-yellow-300 transition-colors" />
                        <span className="text-white font-bold uppercase tracking-widest group-hover:text-teal-200 transition-colors">Start Prediction Analysis</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {!showPrediction ? (
            <GlassCard className="h-full flex flex-col items-center justify-center text-center p-8 backdrop-blur-md">
              <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,217,255,0.2)]">
                <Home className="w-10 h-10 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to Value?</h3>
              <p className="text-gray-400 max-w-xs mx-auto">
                Fill in the property details to get an instant AI-powered valuation estimate.
              </p>
            </GlassCard>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Predicted Price Card */}
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-8 text-black shadow-2xl relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 right-0 p-32 bg-white/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2 text-teal-950 font-medium">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="uppercase tracking-wide text-sm">Estimated Value</span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow-sm">
                    {formatPrice(prediction.predictedPrice)}
                  </div>
                  <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-1.5 w-fit text-sm backdrop-blur-sm text-white">
                    <Award className="w-4 h-4 text-teal-200" />
                    <span className="font-semibold">{prediction.confidence}% AI Confidence</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-black/10">
                    <div className="text-sm text-teal-900 mb-1 font-medium">Estimated Range</div>
                    <div className="font-bold text-xl text-white">
                      {formatPrice(prediction.priceRange.min)} - {formatPrice(prediction.priceRange.max)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5-Year Forecast */}
              <GlassCard>
                <div className="flex items-center gap-2 mb-6">
                  <LineChart className="w-5 h-5 text-teal-400" />
                  <h3 className="font-bold text-white">5-Year Price Forecast</h3>
                </div>
                <div className="space-y-4">
                  {prediction.forecast.map((year, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-teal-300 border border-white/5">
                          {year.year}
                        </div>
                        <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-400 rounded-full shadow-[0_0_10px_rgba(0,217,255,0.4)]"
                            style={{ width: `${(idx + 5) * 10}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="font-bold text-white">{formatPrice(year.value)}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Investment Insights */}
              <GlassCard>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white">Market Insights</h3>
                </div>
                <div className="space-y-3">
                  {prediction.insights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-900/20 border border-emerald-500/20 rounded-xl">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                      <p className="text-sm text-emerald-100 font-medium">{insight}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
