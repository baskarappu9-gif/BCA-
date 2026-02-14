import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login/signup logic
        localStorage.setItem('user', JSON.stringify({ name: 'Demo User', role: 'buyer' }));
        window.location.href = '/dashboard/seller';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isLogin ? 'Sign in to access your dashboard' : 'Join PriceWatch for smart real estate analysis'}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                required
                                className="appearance-none rounded-xl relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                            />
                        </div>
                    )}

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            required
                            className="appearance-none rounded-xl relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            required
                            className="appearance-none rounded-xl relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm font-medium text-teal-600 hover:text-teal-500"
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
