
import React, { useState, useRef } from 'react';
import { Camera, MapPin, Home, DollarSign, Upload, CheckCircle2, Loader2, Sparkles, ArrowRight } from 'lucide-react';

const PostProperty = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);

    const [formData, setFormData] = useState({
        purpose: 'Sell',
        type: 'Apartment',
        bhk: '2 BHK',
        bathrooms: '2',
        balconies: '1',
        city: '',
        locality: '',
        size: '',
        floor: 'Ground',
        price: '',
        negotiable: false
    });

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Posted!</h2>
                    <p className="text-gray-600 mb-8">Your listing is now under review and will be live shortly.</p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => window.location.href = '/dashboard/seller'} className="px-6 py-2 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700">
                            Go to Dashboard
                        </button>
                        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200">
                            Post Another
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Post Your Property</h1>
                    <p className="text-gray-600 mt-2">Reach millions of buyers and sell faster with PriceWatch.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Progress Bar */}
                    <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</span>
                            <span className={`text-sm font-medium ${step >= 1 ? 'text-teal-600' : 'text-gray-400'}`}>Basic Details</span>
                        </div>
                        <div className={`h-1 flex-1 mx-4 rounded-full ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
                        <div className="flex items-center gap-2">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
                            <span className={`text-sm font-medium ${step >= 2 ? 'text-teal-600' : 'text-gray-400'}`}>Location & Info</span>
                        </div>
                        <div className={`h-1 flex-1 mx-4 rounded-full ${step >= 3 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
                        <div className="flex items-center gap-2">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</span>
                            <span className={`text-sm font-medium ${step >= 3 ? 'text-teal-600' : 'text-gray-400'}`}>Media & Price</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        {step === 1 && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">I want to</label>
                                        <div className="flex gap-4">
                                            <label className="flex-1 cursor-pointer">
                                                <input type="radio" name="purpose" value="Sell" checked={formData.purpose === 'Sell'} onChange={handleInput} className="peer sr-only" />
                                                <div className="text-center py-3 px-4 rounded-xl border-2 border-gray-200 peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:text-teal-700 font-bold transition-all hover:bg-gray-50">
                                                    Sell
                                                </div>
                                            </label>
                                            <label className="flex-1 cursor-pointer">
                                                <input type="radio" name="purpose" value="Rent" checked={formData.purpose === 'Rent'} onChange={handleInput} className="peer sr-only" />
                                                <div className="text-center py-3 px-4 rounded-xl border-2 border-gray-200 peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:text-teal-700 font-bold transition-all hover:bg-gray-50">
                                                    Rent / Lease
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Property Type</label>
                                        <select name="type" value={formData.type} onChange={handleInput} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none">
                                            <option>Apartment</option>
                                            <option>Villa</option>
                                            <option>Independent House</option>
                                            <option>Plot / Land</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">BHK</label>
                                        <select name="bhk" value={formData.bhk} onChange={handleInput} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none">
                                            <option>1 BHK</option>
                                            <option>2 BHK</option>
                                            <option>3 BHK</option>
                                            <option>4+ BHK</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Bathrooms</label>
                                        <select name="bathrooms" value={formData.bathrooms} onChange={handleInput} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4+</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Balconies</label>
                                        <div className="flex gap-2">
                                            {['0', '1', '2', '3+'].map(n => (
                                                <button
                                                    type="button"
                                                    key={n}
                                                    onClick={() => setFormData(prev => ({ ...prev, balconies: n }))}
                                                    className={`flex-1 py-3 border rounded-xl font-medium transition-all ${formData.balconies === n ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button type="button" onClick={() => setStep(2)} className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 shadow-lg shadow-teal-500/20 flex items-center gap-2">
                                        Next <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                        <input name="city" value={formData.city} onChange={handleInput} type="text" placeholder="Enter City" className="w-full pl-12 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Locality / Area</label>
                                    <input name="locality" value={formData.locality} onChange={handleInput} type="text" placeholder="Enter Locality" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Property Size</label>
                                        <div className="relative">
                                            <input name="size" value={formData.size} onChange={handleInput} type="number" placeholder="Area" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none pr-16" />
                                            <span className="absolute right-4 top-3.5 text-gray-500 font-medium text-sm">sq.ft</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Floor</label>
                                        <select name="floor" value={formData.floor} onChange={handleInput} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none">
                                            <option>Ground</option>
                                            <option>1st - 5th</option>
                                            <option>6th - 10th</option>
                                            <option>10th+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <button type="button" onClick={() => setStep(1)} className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Back</button>
                                    <button type="button" onClick={() => setStep(3)} className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 shadow-lg shadow-teal-500/20 flex items-center gap-2">
                                        Next <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Add Photos</label>
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
                                        className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer"
                                    >
                                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                                            <Camera className="w-8 h-8" />
                                        </div>
                                        <h3 className="font-bold text-gray-900">Click to upload photos</h3>
                                        <p className="text-sm text-gray-500 mt-1">or drag and drop here (Max 5MB)</p>
                                    </div>

                                    {/* Image Previews */}
                                    {images.length > 0 && (
                                        <div className="grid grid-cols-3 gap-4 mt-4">
                                            {images.map((img, idx) => (
                                                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
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
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Expected Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3.5 text-gray-900 font-bold">₹</span>
                                        <input name="price" value={formData.price} onChange={handleInput} type="number" placeholder="Enter Amount" className="w-full pl-8 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-lg font-bold" />
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                            <input name="negotiable" checked={formData.negotiable} onChange={handleInput} type="checkbox" className="rounded text-teal-600 focus:ring-teal-500" />
                                            Price Negotiable
                                        </label>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-blue-800 text-sm">
                                    <Sparkles className="w-5 h-5 flex-shrink-0" />
                                    <p>Get a simplified valuation report for this property to help you price it right. <span onClick={() => window.open('/prediction', '_blank')} className="font-bold underline cursor-pointer hover:text-blue-900">Check Valuation</span></p>
                                </div>

                                <div className="flex justify-between pt-4">
                                    <button type="button" onClick={() => setStep(2)} className="px-6 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl">Back</button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 shadow-lg shadow-teal-500/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Post Property'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostProperty;

// Helper component for ArrowRight (since it was missing in imports)
const ArrowRightComponent = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
