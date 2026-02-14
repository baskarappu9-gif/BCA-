import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';

const PlaceholderPage = ({ title }) => {
    const location = useLocation();
    const displayTitle = title || location.pathname.substring(1).replace('-', ' ').toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Construction className="w-10 h-10 text-teal-600 animate-pulse" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{displayTitle}</h1>
                <p className="text-gray-600 mb-8">
                    We are working hard to bring you this feature. Stay tuned for updates!
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default PlaceholderPage;
