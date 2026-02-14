import React, { useState } from 'react';
import { Building2, Sparkles, CheckCircle2, LineChart, TrendingUp, Award, Home, MapPin, Loader2 } from 'lucide-react';
import { PROPERTY_TYPES, AMENITIES, DEFAULT_PROPERTY_FORM } from '../utils/constants';
import { formatPrice } from '../utils/formatters';
import { validatePropertyForm } from '../utils/validators';
import { predictPrice } from '../api/client';
import locationsData from '../utils/locations.json';

const Prediction = () => {
  // We use a local form state that includes state/district which aren't in default form
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
  const [error, setError] = useState(null); // General error

  // Derived state for dropdowns
  const states = Object.keys(locationsData).sort();
  const districts = formData.state ? Object.keys(locationsData[formData.state]).sort() : [];
  const areas = (formData.state && formData.district) ? locationsData[formData.state][formData.district].sort() : [];

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updates = { [field]: value };
      // Reset dependent fields
      if (field === 'state') {
        updates.district = '';
        updates.area = '';
      }
      if (field === 'district') {
        updates.area = '';
      }
      return { ...prev, ...updates };
    });

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
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
      // Calculate age from yearBuilt
      const currentYear = new Date().getFullYear();
      const age = currentYear - parseInt(formData.yearBuilt);

      // Construct payload for API
      // Mapping: District -> City, Area -> Area/Locality
      // This aligns with how we trained the model (City + Locality)
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

      // Basic validation before sending
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

      if (response.success) {
        setPrediction(response.data);
        setShowPrediction(true);
      } else {
        setError(response.message || 'Failed to get prediction');
      }
    } catch (err) {
      setError('An error occurred while communicating with the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">AI Predicted Fair Value</h1>
        </div>
        <p className="text-lg sm:text-xl text-gray-600">
          Enter property details to get ML-powered price prediction with 5-year forecast.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-primary-500" />
              <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {/* Location Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <select
                      className={`input-field w-full p-3 rounded-xl border ${errors.state ? 'border-red-500' : 'border-gray-200'}`}
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    >
                      <option value="">Select State</option>
                      {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                      <select
                        className={`input-field w-full p-3 rounded-xl border ${errors.district ? 'border-red-500' : 'border-gray-200'} disabled:bg-gray-50`}
                        value={formData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        disabled={!formData.state}
                      >
                        <option value="">Select District</option>
                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area / Locality</label>
                      <select
                        className={`input-field w-full p-3 rounded-xl border ${errors.area ? 'border-red-500' : 'border-gray-200'} disabled:bg-gray-50`}
                        value={formData.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        disabled={!formData.district}
                      >
                        <option value="">Select Area</option>
                        {areas.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                      {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Property Details Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Home className="w-4 h-4" /> Specs
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select
                      className={`input-field w-full p-3 rounded-xl border ${errors.propertyType ? 'border-red-500' : 'border-gray-200'}`}
                      value={formData.propertyType}
                      onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    >
                      {PROPERTY_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size (sq ft)</label>
                    <input
                      type="number"
                      className={`input-field w-full p-3 rounded-xl border ${errors.size ? 'border-red-500' : 'border-gray-200'}`}
                      value={formData.size}
                      onChange={(e) => handleInputChange('size', e.target.value)}
                      placeholder="e.g. 1200"
                    />
                    {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <input
                      type="number"
                      className="input-field w-full p-3 rounded-xl border border-gray-200"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <input
                      type="number"
                      className="input-field w-full p-3 rounded-xl border border-gray-200"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                    <input
                      type="number"
                      className="input-field w-full p-3 rounded-xl border border-gray-200"
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                      placeholder="e.g. 2020"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Amenities */}
              <div>
                <label className="block text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map((amenity) => (
                    <button
                      type="button"
                      key={amenity.value}
                      onClick={() => toggleAmenity(amenity.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${formData.amenities.includes(amenity.value)
                        ? 'bg-teal-50 border-teal-500 text-teal-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                    >
                      {amenity.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Predict Button */}
              <button
                onClick={handlePredictPrice}
                disabled={loading}
                className={`w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Predict Fair Value
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {!showPrediction ? (
            <div className="bg-white rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center h-full min-h-[400px] text-center border border-gray-100">
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                <Home className="w-10 h-10 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Value?</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                Fill in the property details to get an instant AI-powered valuation estimate.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Predicted Price Card */}
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2 text-teal-100">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold uppercase tracking-wide text-sm">Estimated Value</span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold mb-4">
                    {formatPrice(prediction.predictedPrice)}
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1.5 w-fit text-sm backdrop-blur-sm">
                    <Award className="w-4 h-4" />
                    <span className="font-semibold">{prediction.confidence}% AI Confidence</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="text-sm text-teal-100 mb-1">Estimated Range</div>
                    <div className="font-semibold text-xl">
                      {formatPrice(prediction.priceRange.min)} - {formatPrice(prediction.priceRange.max)}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5-Year Forecast */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <LineChart className="w-5 h-5 text-teal-600" />
                  <h3 className="font-bold text-gray-900">5-Year Price Forecast</h3>
                </div>
                <div className="space-y-4">
                  {prediction.forecast.map((year, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-500">
                          {year.year}
                        </div>
                        <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: `${(idx + 5) * 10}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">{formatPrice(year.value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Insights */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-gray-900">Market Insights</h3>
                </div>
                <div className="space-y-3">
                  {prediction.insights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700 font-medium">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
