import React from 'react';
import { User, Mail, Phone, MapPin, Shield, Edit } from 'lucide-react';

const Profile = () => {
    const [user, setUser] = React.useState({
        name: "User",
        email: "user@example.com",
        phone: "",
        location: "",
        role: "Property Seller & Buyer",
        joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    });
    const [isEditing, setIsEditing] = React.useState(false);
    const [tempUser, setTempUser] = React.useState({});

    React.useEffect(() => {
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

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header/Cover */}
                    <div className="h-32 bg-gradient-to-r from-teal-500 to-cyan-600 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                                <div className="w-full h-full bg-teal-100 flex items-center justify-center text-teal-600 text-4xl font-bold">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4">
                            {!isEditing ? (
                                <button
                                    onClick={handleEdit}
                                    className="bg-white/20 text-white hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm flex items-center gap-2 transition-colors"
                                >
                                    <Edit className="w-4 h-4" /> Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20 px-8 pb-8">
                        {isEditing ? (
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={tempUser.name || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-lg border p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role</label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={tempUser.role || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2"
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                                <p className="text-gray-500 font-medium">{user.role}</p>
                            </>
                        )}

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-xl">
                                    <Mail className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={tempUser.email || ''}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-1"
                                            placeholder="Email Address"
                                        />
                                    ) : (
                                        <span className="truncate">{user.email}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-xl">
                                    <Phone className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={tempUser.phone || ''}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-1"
                                            placeholder="Phone Number"
                                        />
                                    ) : (
                                        <span>{user.phone || 'Add phone number'}</span>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-xl">
                                    <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={tempUser.location || ''}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-1"
                                            placeholder="Location"
                                        />
                                    ) : (
                                        <span>{user.location || 'Add location'}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-xl">
                                    <Shield className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                    <span>Member since {user.joinDate}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-100 pt-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                                    Change Password
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                                    Notification Preferences
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-medium transition-colors"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
