import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from "../../lib/utils";
import GlassCard from './GlassCard';

const BackButton = ({ to = "/", label = "Back to Home", className }) => {
    return (
        <Link to={to} className={cn("inline-block mb-6 relative z-20 group", className)}>
            <GlassCard className="px-4 py-2 flex items-center gap-2 hover:bg-white/10 hover:border-teal-400/30 transition-all duration-300 floating-animation">
                <ArrowLeft className="w-4 h-4 text-teal-400 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {label}
                </span>
            </GlassCard>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </Link>
    );
};

export default BackButton;
