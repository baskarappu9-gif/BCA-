import React from 'react';
import { Users, BookOpen, GraduationCap } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import BackButton from '../components/ui/BackButton';

const About = () => {
    const team = [
        { name: 'BARATH.R', id: '234011101057' },
        { name: 'BARRY JUDE MANUEL', id: '234011101058' },
        { name: 'BASKAR.D.A', id: '234011101059' },
        { name: 'BHARATH.R', id: '234011101060' }
    ];

    const coordinator = { name: 'Ms. S. Srividhya Santhi', role: 'Project Coordinator' };

    return (
        <div className="min-h-screen py-12 px-6 lg:px-12 flex flex-col items-center justify-center">
            <div className="max-w-6xl w-full mx-auto relative z-10">
                <BackButton to="/" />

                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 mb-4 drop-shadow-sm">
                        About PriceWatch
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Real Estate Price Prediction & Market Analysis System powered by advanced machine learning algorithms.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="flex items-center gap-4 mb-10 justify-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent w-16 md:w-32"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-widest">Project Members</h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent w-16 md:w-32"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {team.map((member, index) => (
                        <div
                            key={member.id}
                            className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_25px_rgba(20,184,166,0.2)] animate-fade-in-up overflow-hidden"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Decorative Corner Lines */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-teal-500/30 rounded-tl-xl opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30 rounded-br-xl opacity-50 group-hover:opacity-100 transition-all duration-300"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                {/* Avatar Container */}
                                <div className="w-20 h-20 mb-5 relative">
                                    {/* Rotating outer ring */}
                                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-teal-500/30 animate-[spin_10s_linear_infinite] opacity-50"></div>

                                    {/* Inner content */}
                                    <div className="absolute inset-2 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center border border-teal-500/50 shadow-inner shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
                                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-cyan-300">
                                            {member.name.charAt(0)}
                                        </span>
                                    </div>

                                    {/* Notification dot */}
                                    <div className="absolute bottom-1 right-1 w-3 h-3 bg-teal-500 rounded-full border-2 border-black shadow-[0_0_10px_rgba(20,184,166,1)]"></div>
                                </div>

                                {/* Name & ID */}
                                <h3 className="text-white font-bold text-center mb-2 group-hover:text-teal-300 transition-colors duration-300 tracking-wide">
                                    {member.name}
                                </h3>

                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 group-hover:border-teal-500/30 transition-colors">
                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                                    <span className="text-xs font-mono text-gray-400 group-hover:text-teal-100">{member.id}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Guidance & Institute */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard
                        className="p-8 border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 transition-colors relative overflow-hidden flex flex-col justify-center"
                        hoverEffect={true}
                        delay={0.5}
                    >
                        <div className="absolute top-0 right-0 p-24 bg-blue-500/10 rounded-full -mr-12 -mt-12 blur-3xl"></div>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <BookOpen className="w-8 h-8 text-blue-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Guidance</h2>
                        </div>

                        <div className="text-right relative z-10 mt-auto space-y-4">
                            <div>
                                <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Project Guide</p>
                                <div className="font-bold text-xl text-white mb-0.5">Preethi Goswami</div>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Project Coordinator</p>
                                <div className="font-bold text-xl text-white mb-0.5">{coordinator.name}</div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard
                        className="p-8 text-center border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 transition-colors flex flex-col justify-center items-center"
                        hoverEffect={true}
                        delay={0.6}
                    >
                        <div className="p-4 bg-purple-500/20 rounded-full mb-4 duration-[3000ms]">
                            <GraduationCap className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Dr. M.G.R. Educational and Research Institute</h3>
                        <p className="text-gray-400 text-sm">Department of Computer Applications</p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default About;
