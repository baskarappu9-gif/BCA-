import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        let users = [];
        try {
            users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        } catch (err) {
            users = [];
        }

        if (!isLogin) {
            if (users.some(u => u.email === formData.email)) {
                setError('Email already exists. Please sign in.');
                setLoading(false);
                return;
            }

            const newUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: 'buyer',
                joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            };
            users.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            const { password, ...userProfile } = newUser;
            localStorage.setItem('user', JSON.stringify(userProfile));
            setLoading(false);
            navigate('/dashboard/buyer'); // Redirect to dashboard
        } else {
            const user = users.find(u => u.email === formData.email && u.password === formData.password);
            if (user) {
                const { password, ...userProfile } = user;
                localStorage.setItem('user', JSON.stringify(userProfile));
                setLoading(false);
                navigate('/dashboard/buyer');
            } else {
                setError('Invalid email or password.');
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <GlassCard className="max-w-md w-full p-8 sm:p-10 relative z-10 animate-fade-in-up">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/20 border border-teal-500/20 transform rotate-45">
                        <Sparkles className="h-8 w-8 text-teal-400 transform -rotate-45" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        {isLogin ? 'Sign in to access your dashboard' : 'Join PriceWatch for smart real estate analysis'}
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 md:text-sm text-xs p-3 rounded-lg text-center animate-pulse">
                            {error}
                        </div>
                    )}
                    {!isLogin && (
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="input-field-glass pl-12 w-full"
                                placeholder="Full Name"
                            />
                        </div>
                    )}

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input-field-glass pl-12 w-full"
                            placeholder="Email address"
                        />
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="input-field-glass pl-12 w-full"
                            placeholder="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn-primary-glow w-full flex justify-center py-3.5 px-4 text-sm font-bold items-center gap-2 group ${loading ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                {isLogin ? 'Sign In' : 'Create Account'}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setFormData({ name: '', email: '', password: '' });
                            setError('');
                        }}
                        className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        {isLogin ? (
                            <>Don't have an account? <span className="text-teal-400">Sign up</span></>
                        ) : (
                            <>Already have an account? <span className="text-teal-400">Sign in</span></>
                        )}
                    </button>
                </div>
            </GlassCard>
        </div>
    );
};

export default Login;
