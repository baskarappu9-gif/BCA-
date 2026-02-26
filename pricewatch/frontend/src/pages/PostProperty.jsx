import React, { useState, useRef } from 'react';
import { Camera, MapPin, Home, DollarSign, Upload, CheckCircle2, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import BackButton from '../components/ui/BackButton';
import locationsData from '../utils/locations.json';

const PostProperty = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [showStateSuggestions, setShowStateSuggestions] = useState(false);

    const [formData, setFormData] = useState({
        purpose: 'Sell',
        type: 'Apartment',
        bhk: '',
        bedrooms: '',
        bathrooms: '',
        balconies: '1',
        state: '',
        city: '',
        locality: '',
        size: '',
        floor: 'Ground',
        price: '',
        negotiable: false,
        contactName: '',
        contactPhone: '',
        contactEmail: ''
    });


    const states = Object.keys(locationsData).sort();
    const filteredStates = states.filter(state =>
        state.toLowerCase().includes(formData.state.toLowerCase())
    );
    const districts = (formData.state && locationsData[formData.state]) ? Object.keys(locationsData[formData.state]).sort() : [];
    const localities = (formData.state && formData.city && locationsData[formData.state] && locationsData[formData.state][formData.city]) ? locationsData[formData.state][formData.city].sort() : [];

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => {
            const updates = { [name]: type === 'checkbox' ? checked : value };
            if (name === 'state') {
                updates.city = '';
                updates.locality = '';
            } else if (name === 'city') {
                updates.locality = '';
            }
            return { ...prev, ...updates };
        });
    };

    const handleStateChange = (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            state: value,
            city: '',
            locality: ''
        }));
        setShowStateSuggestions(true);
    };

    const handleStateSelect = (stateName) => {
        setFormData(prev => ({
            ...prev,
            state: stateName,
            city: '',
            locality: ''
        }));
        setShowStateSuggestions(false);
    };

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newImages]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Create new listing object
        const newListing = {
            id: Date.now(), // simple unique id
            title: `${formData.bhk} ${formData.type} in ${formData.locality || 'City'}`,
            price: formData.price,
            views: 0,
            inquiries: 0,
            status: 'Active',
            image: images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=400",
            ...formData
        };

        // Save to localStorage
        const existingListings = JSON.parse(localStorage.getItem('seller_listings') || '[]');
        localStorage.setItem('seller_listings', JSON.stringify([newListing, ...existingListings]));

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <GlassCard className="max-w-md w-full text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                        <CheckCircle2 className="w-10 h-10 text-teal-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Property Posted!</h2>
                    <p className="text-gray-400 mb-8">Your listing is now under review and will be live shortly.</p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => window.location.href = '/dashboard/seller'} className="btn-primary-glow px-6 py-2 text-sm">
                            Go to Dashboard
                        </button>
                        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors">
                            Post Another
                        </button>
                    </div>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-4xl mx-auto z-10 relative">
                <BackButton to="/" />

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Post Your Property</h1>
                    <p className="text-gray-400 mt-2">Reach millions of buyers and sell faster with PriceWatch.</p>
                </div>

                <GlassCard className="overflow-hidden p-0 border-white/10" floating={true} hoverEffect={true}>
                    {/* Progress Bar */}
                    <div className="bg-white/5 px-8 py-6 border-b border-white/10 flex items-center justify-between relative overflow-hidden">
                        {/* Glow background behind steps */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0"></div>

                        <div className="flex items-center gap-2 relative z-10">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= 1 ? 'bg-teal-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'bg-white/10 text-gray-500'}`}>1</span>
                            <span className={`text-sm font-medium hidden sm:block ${step >= 1 ? 'text-teal-400' : 'text-gray-500'}`}>Basic Details</span>
                        </div>
                        <div className={`h-1 flex-1 mx-4 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'bg-white/10'}`}></div>
                        <div className="flex items-center gap-2 relative z-10">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= 2 ? 'bg-teal-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'bg-white/10 text-gray-500'}`}>2</span>
                            <span className={`text-sm font-medium hidden sm:block ${step >= 2 ? 'text-teal-400' : 'text-gray-500'}`}>Location & Info</span>
                        </div>
                        <div className={`h-1 flex-1 mx-4 rounded-full transition-all duration-500 ${step >= 3 ? 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'bg-white/10'}`}></div>
                        <div className="flex items-center gap-2 relative z-10">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= 3 ? 'bg-teal-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.5)]' : 'bg-white/10 text-gray-500'}`}>3</span>
                            <span className={`text-sm font-medium hidden sm:block ${step >= 3 ? 'text-teal-400' : 'text-gray-500'}`}>Media & Price</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        {step === 1 && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-bold text-teal-400 mb-3 tracking-wide uppercase">I want to</label>
                                        <div className="flex gap-4">
                                            <label className="flex-1 cursor-pointer group">
                                                <input type="radio" name="purpose" value="Sell" checked={formData.purpose === 'Sell'} onChange={handleInput} className="peer sr-only" />
                                                <div className="text-center py-4 px-6 rounded-2xl border border-white/10 transition-all duration-300 peer-checked:border-teal-400 peer-checked:bg-gradient-to-br peer-checked:from-teal-500/20 peer-checked:to-cyan-900/40 peer-checked:text-teal-300 peer-checked:shadow-[0_0_20px_rgba(20,184,166,0.15)] font-bold hover:bg-white/5 text-gray-500 backdrop-blur-md peer-checked:scale-[1.02]">
                                                    <span className="flex items-center justify-center gap-2 text-lg">
                                                        <Home className="w-5 h-5" /> Sell Property
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-teal-400 mb-3 tracking-wide uppercase">Property Type</label>
                                        <div className="relative">
                                            <select name="type" value={formData.type} onChange={handleInput} className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white appearance-none cursor-pointer focus:outline-none focus:border-teal-500/50 focus:shadow-[0_0_20px_rgba(20,184,166,0.1)] transition-all hover:bg-white/5 font-medium">
                                                <option className="bg-gray-900 text-white">Apartment</option>
                                                <option className="bg-gray-900 text-white">Villa</option>
                                                <option className="bg-gray-900 text-white">Independent House</option>
                                                <option className="bg-gray-900 text-white">Plot / Land</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-teal-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-teal-400 mb-3 tracking-wide uppercase">BHK</label>
                                        <input
                                            type="text"
                                            name="bhk"
                                            value={formData.bhk}
                                            onChange={handleInput}
                                            placeholder="e.g. 3 BHK"
                                            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-teal-500/50 focus:shadow-[0_0_20px_rgba(20,184,166,0.1)] transition-all hover:bg-white/5 font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-teal-400 mb-3 tracking-wide uppercase">Bedrooms</label>
                                        <input
                                            type="number"
                                            name="bedrooms"
                                            value={formData.bedrooms}
                                            onChange={handleInput}
                                            placeholder="0"
                                            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-teal-500/50 focus:shadow-[0_0_20px_rgba(20,184,166,0.1)] transition-all hover:bg-white/5 font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-teal-400 mb-3 tracking-wide uppercase">Bathrooms</label>
                                        <input
                                            type="number"
                                            name="bathrooms"
                                            value={formData.bathrooms}
                                            onChange={handleInput}
                                            placeholder="0"
                                            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-teal-500/50 focus:shadow-[0_0_20px_rgba(20,184,166,0.1)] transition-all hover:bg-white/5 font-medium"
                                        />
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <label className="block text-sm font-bold text-teal-400 mb-3 tracking-wide uppercase">Balconies</label>
                                        <div className="flex gap-3 bg-black/20 p-1.5 rounded-2xl border border-white/5">
                                            {['0', '1', '2', '3+'].map(n => (
                                                <button
                                                    type="button"
                                                    key={n}
                                                    onClick={() => setFormData(prev => ({ ...prev, balconies: n }))}
                                                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${formData.balconies === n ? 'bg-teal-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6">
                                    <button type="button" onClick={() => setStep(2)} className="group btn-primary-glow flex items-center gap-3 px-8 py-4 text-lg">
                                        Next Step <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-teal-400 mb-2">State</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleStateChange}
                                                onFocus={() => setShowStateSuggestions(true)}
                                                onBlur={() => setTimeout(() => setShowStateSuggestions(false), 200)}
                                                placeholder="Type State Name"
                                                className="input-field-glass w-full"
                                                autoComplete="off"
                                            />
                                            {showStateSuggestions && filteredStates.length > 0 && (
                                                <div className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-black border border-teal-500/30 rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.2)] custom-scrollbar">
                                                    {filteredStates.map((state, index) => (
                                                        <div
                                                            key={index}
                                                            onMouseDown={() => handleStateSelect(state)}
                                                            className="px-4 py-3 text-white hover:bg-teal-500/20 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                                        >
                                                            {state}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-teal-400 mb-2">City / District</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 pointer-events-none" />
                                            <select name="city" value={formData.city} onChange={handleInput} disabled={!formData.state} className="input-field-glass w-full pl-12 appearance-none disabled:opacity-50">
                                                <option value="" className="bg-black text-gray-500">Select City</option>
                                                {districts.map(city => (
                                                    <option key={city} value={city} className="bg-black text-white">{city}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-teal-400 mb-2">Locality / Area</label>
                                    <select name="locality" value={formData.locality} onChange={handleInput} disabled={!formData.city} className="input-field-glass w-full appearance-none disabled:opacity-50">
                                        <option value="" className="bg-black text-gray-500">Select Locality</option>
                                        {localities.map(loc => (
                                            <option key={loc} value={loc} className="bg-black text-white">{loc}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-teal-400 mb-2">Property Size</label>
                                        <div className="relative">
                                            <input name="size" value={formData.size} onChange={handleInput} type="number" placeholder="Area" className="input-field-glass pr-16" />
                                            <span className="absolute right-4 top-3.5 text-gray-500 font-medium text-sm">sq.ft</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-teal-400 mb-2">Floor</label>
                                        <select name="floor" value={formData.floor} onChange={handleInput} className="input-field-glass appearance-none cursor-pointer">
                                            <option className="text-black">Ground</option>
                                            <option className="text-black">1st - 5th</option>
                                            <option className="text-black">6th - 10th</option>
                                            <option className="text-black">10th+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <button type="button" onClick={() => setStep(1)} className="px-6 py-3 text-gray-400 font-bold hover:text-white transition-colors">Back</button>
                                    <button type="button" onClick={() => setStep(3)} className="btn-primary-glow flex items-center gap-2">
                                        Next <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-bold text-teal-400 mb-2">Add Photos</label>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        multiple
                                        accept="image/*"
                                    />
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-teal-500/50 hover:bg-teal-500/5 transition-all cursor-pointer group"
                                    >
                                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Camera className="w-8 h-8 text-teal-400" />
                                        </div>
                                        <h3 className="font-bold text-white">Click to upload photos</h3>
                                        <p className="text-sm text-gray-400 mt-1">or drag and drop here (Max 5MB)</p>
                                    </div>

                                    {/* Image Previews */}
                                    {images.length > 0 && (
                                        <div className="grid grid-cols-3 gap-4 mt-4 animate-fade-in">
                                            {images.map((img, idx) => (
                                                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-white/10 group">
                                                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-teal-400 mb-2">Expected Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3.5 text-teal-400 font-bold">₹</span>
                                        <input name="price" value={formData.price} onChange={handleInput} type="number" placeholder="Enter Amount" className="input-field-glass pl-8 text-lg font-bold" />
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                                            <input name="negotiable" checked={formData.negotiable} onChange={handleInput} type="checkbox" className="rounded text-teal-600 focus:ring-teal-500 accent-teal-500 bg-white/10 border-white/20" />
                                            Price Negotiable
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-teal-400 mb-4 border-b border-white/10 pb-2">Contact Details</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Name</label>
                                            <input
                                                type="text"
                                                name="contactName"
                                                value={formData.contactName}
                                                onChange={handleInput}
                                                placeholder="Your Name"
                                                className="input-field-glass w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="contactPhone"
                                                value={formData.contactPhone}
                                                onChange={handleInput}
                                                placeholder="Mobile Number"
                                                className="input-field-glass w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={formData.contactEmail}
                                            onChange={handleInput}
                                            placeholder="Email Address"
                                            className="input-field-glass w-full"
                                        />
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3 text-blue-200 text-sm items-start">
                                    <Sparkles className="w-5 h-5 flex-shrink-0 text-blue-400 mt-0.5" />
                                    <p>Get a simplified valuation report for this property to help you price it right. <span onClick={() => window.open('/prediction', '_blank')} className="font-bold underline cursor-pointer text-blue-300 hover:text-white transition-colors">Check Valuation</span></p>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <button type="button" onClick={() => setStep(2)} className="px-6 py-3 text-gray-400 font-bold hover:text-white transition-colors">Back</button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-primary-glow flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Post Property'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </GlassCard>
            </div>
        </div>
    );
};

export default PostProperty;
