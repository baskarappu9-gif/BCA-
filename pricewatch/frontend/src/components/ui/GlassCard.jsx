import React from 'react';
import { cn } from "../../lib/utils";

const GlassCard = ({
    children,
    className,
    floating = false,
    hoverEffect = false,
    delay = 0,
    ...props
}) => {
    return (
        <div
            className={cn(
                "glassmorphism rounded-2xl p-6 shadow-xl transition-all duration-500 backdrop-blur-md bg-white/5 border border-white/10",
                floating && "animate-float",
                hoverEffect && "hover:border-teal-400/30 hover:shadow-[0_10px_40px_-10px_rgba(20,184,166,0.1)] hover:-translate-y-1 group perspective-1000",
                className
            )}
            style={{
                animationDelay: `${delay}s`,
                ...(hoverEffect ? { transformStyle: 'preserve-3d' } : {})
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default GlassCard;
