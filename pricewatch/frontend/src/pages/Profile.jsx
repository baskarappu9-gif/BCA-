import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, Shield, Edit, Camera, Save, X, Lock, Bell, LogOut, ChevronRight, Award } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import BackButton from '../components/ui/BackButton';

const Profile = () => {
    const [user, setUser] = useState({
        name: "User",
        email: "user@example.com",
        phone: "",
        location: "",
        role: "Property Seller & Buyer",
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        avatar: null
    });
    const [isEditing, setIsEditing] = useState(false);
    const [tempUser, setTempUser] = useState({});
    const fileInputRef = useRef(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (storedUser) {
            setUser(prev => ({ ...prev, ...storedUser }));
        }
    }, []);

    const handleEdit = () => {
        setTempUser(user);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTempUser({});
    };

    const handleSave = () => {
        setUser(tempUser);
        localStorage.setItem('user', JSON.stringify(tempUser));
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempUser(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const newAvatar = reader.result;
                setTempUser(prev => ({ ...prev, avatar: newAvatar }));

                // If not in editing mode, update directly? Better to force editing mode or update immediately
                if (!isEditing) {
                    const updatedUser = { ...user, avatar: newAvatar };
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-500/10 to-transparent pointer-events-none"></div>
            <div className="absolute top-20 right-20 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow delay-700"></div>

            <div className="max-w-5xl mx-auto z-10 relative">
                <BackButton to="/" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Left Column: Identity Card */}
                    <div className="lg:col-span-1">
                        <GlassCard className="h-full relative overflow-hidden border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.1)] p-0" floating={true} hoverEffect={false}>
                            <div className="absolute inset-0 bg-grid-white/5 opacity-50"></div>

                            {/* Holographic Header */}
                            <div className="relative h-32 bg-gradient-to-b from-teal-900/40 to-black/60 border-b border-teal-500/20">
                                <div className="absolute top-4 right-4 text-[10px] text-teal-400 font-mono tracking-widest opacity-70">
                                    ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                                </div>
                            </div>

                            <div className="px-6 pb-6 relative -mt-16 text-center">
                                {/* Avatar Ring */}
                                <div className="relative w-32 h-32 mx-auto mb-4 group">
                                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-teal-500/50 animate-spin-slow"></div>
                                    <div className="absolute inset-2 rounded-full border border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.5)]"></div>

                                    <div className="absolute inset-3 rounded-full overflow-hidden bg-black z-10">
                                        {(isEditing ? tempUser.avatar : user.avatar) ? (
                                            <img src={isEditing ? tempUser.avatar : user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-teal-900/30 text-teal-400 text-4xl font-bold">
                                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>

                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-2 right-2 p-2 bg-teal-500 text-black rounded-full hover:bg-teal-400 transition-all z-20 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 shadow-lg cursor-pointer"
                                    >
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Name & Role */}
                                {isEditing ? (
                                    <div className="space-y-3 mb-6">
                                        <input
                                            type="text"
                                            name="name"
                                            value={tempUser.name || ''}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-teal-500/50 rounded-lg px-3 py-2 text-white text-center font-bold focus:shadow-[0_0_15px_rgba(20,184,166,0.3)] outline-none"
                                            placeholder="Name"
                                        />
                                        <input
                                            type="text"
                                            name="role"
                                            value={tempUser.role || ''}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-teal-500/30 rounded-lg px-3 py-1.5 text-teal-400 text-center text-sm focus:shadow-[0_0_15px_rgba(20,184,166,0.3)] outline-none"
                                            placeholder="Role"
                                        />
                                    </div>
                                ) : (
                                    <div className="mb-6">
                                        <h1 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{user.name}</h1>
                                        <p className="text-teal-400 font-medium text-sm px-3 py-1 rounded-full bg-teal-500/10 inline-block border border-teal-500/20">
                                            {user.role}
                                        </p>
                                    </div>
                                )}

                                {/* Trust Score Feature */}
                                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mb-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Trust Score</span>
                                        <span className="text-xl font-bold text-teal-400">92<span className="text-xs text-gray-500 font-normal">/100</span></span>
                                    </div>
                                    <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                        <div className="h-full bg-gradient-to-r from-teal-600 to-cyan-400 w-[92%] shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-2 text-left flex items-center gap-1">
                                        <Shield className="w-3 h-3 text-teal-500" />
                                        Identity Verified & Secure
                                    </p>
                                </div>

                                {/* Edit/Save Actions */}
                                <div>
                                    {!isEditing ? (
                                        <button
                                            onClick={handleEdit}
                                            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/30 text-white font-semibold transition-all flex items-center justify-center gap-2 group"
                                        >
                                            <div className="w-1 h-1 bg-teal-500 rounded-full group-hover:scale-150 transition-transform"></div>
                                            EDIT IDENTITY
                                            <div className="w-1 h-1 bg-teal-500 rounded-full group-hover:scale-150 transition-transform"></div>
                                        </button>
                                    ) : (
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleSave}
                                                className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-[0_0_20px_rgba(13,148,136,0.3)] transition-all"
                                            >
                                                SAVE
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold"
                                            >
                                                CANCEL
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Right Column: Data Modules */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Contact Module */}
                        <GlassCard className="p-1 relative overflow-hidden bg-black/40 backdrop-blur-xl border-white/10">
                            <div className="p-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                                    Comm_Link_Module_v1
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-black rounded-lg text-purple-400 group-hover:text-white transition-colors">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-mono text-gray-500 uppercase">Email Protocol</span>
                                        </div>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={tempUser.email || ''}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b border-purple-500/50 text-white py-1 focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-lg font-bold text-white truncate">{user.email}</p>
                                        )}
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-black rounded-lg text-purple-400 group-hover:text-white transition-colors">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-mono text-gray-500 uppercase">Voice Line</span>
                                        </div>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={tempUser.phone || ''}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b border-purple-500/50 text-white py-1 focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-lg font-bold text-white">{user.phone || 'N/A'}</p>
                                        )}
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-black rounded-lg text-purple-400 group-hover:text-white transition-colors">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-mono text-gray-500 uppercase">Geo Coordinates</span>
                                        </div>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="location"
                                                value={tempUser.location || ''}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-b border-purple-500/50 text-white py-1 focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-lg font-bold text-white">{user.location || 'Unknown'}</p>
                                        )}
                                    </div>

                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-black rounded-lg text-purple-400 group-hover:text-white transition-colors">
                                                <Award className="w-5 h-5" />
                                            </div>
                                            <span className="text-xs font-mono text-gray-500 uppercase">Clearance Level</span>
                                        </div>
                                        <p className="text-lg font-bold text-white">Level 4 - Executive</p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* System Settings Module */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button className="relative group overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6 text-left hover:border-teal-500/40 transition-all">
                                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-50 transition-opacity">
                                    <Lock className="w-12 h-12 text-teal-500" />
                                </div>
                                <h4 className="text-white font-bold text-lg mb-1 group-hover:text-teal-400 transition-colors">Security Protocol</h4>
                                <p className="text-gray-500 text-xs mb-4">Update encryption keys & password.</p>
                                <span className="text-xs font-bold text-teal-500 uppercase tracking-widest flex items-center gap-2">
                                    Generate <ChevronRight className="w-3 h-3" />
                                </span>
                            </button>

                            <button className="relative group overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6 text-left hover:border-teal-500/40 transition-all">
                                <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-50 transition-opacity">
                                    <Bell className="w-12 h-12 text-teal-500" />
                                </div>
                                <h4 className="text-white font-bold text-lg mb-1 group-hover:text-teal-400 transition-colors">Alert Matrix</h4>
                                <p className="text-gray-500 text-xs mb-4">Configure notification streams.</p>
                                <span className="text-xs font-bold text-teal-500 uppercase tracking-widest flex items-center gap-2">
                                    Configure <ChevronRight className="w-3 h-3" />
                                </span>
                            </button>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full py-4 rounded-xl border border-red-500/20 bg-red-900/10 hover:bg-red-900/20 text-red-400 font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                        >
                            <LogOut className="w-5 h-5" />
                            Log Out
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
