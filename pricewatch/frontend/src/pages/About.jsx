import React from 'react';
import { Users, BookOpen } from 'lucide-react';

const About = () => {
    const team = [
        { name: 'BARATH.R', id: '234011101057' },
        { name: 'BARRY JUDE MANUEL', id: '234011101058' },
        { name: 'BASKAR.D.A', id: '234011101059' },
        { name: 'BHARATH.R', id: '234011101060' }
    ];

    const coordinator = { name: 'Ms. S. Srividhya Santhi', role: 'Project Coordinator' };

    return (
        <div className="min-h-screen bg-white py-12 px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About PriceWatch</h1>
                    <p className="text-xl text-gray-600">Real Estate Price Prediction & Market Analysis System</p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 mb-12 shadow-lg border border-teal-100">
                    <div className="flex items-center gap-4 mb-6">
                        <Users className="w-8 h-8 text-teal-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Project Team</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {team.map((member) => (
                            <div key={member.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center group hover:shadow-md transition-shadow">
                                <span className="font-bold text-gray-800">{member.name}</span>
                                <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{member.id}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <BookOpen className="w-8 h-8 text-indigo-600" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Guidance</h2>
                            <p className="text-gray-600">Under the supervision of</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-bold text-lg text-gray-900">{coordinator.name}</div>
                        <div className="text-sm text-indigo-600 font-semibold">{coordinator.role}</div>
                    </div>
                </div>

                <div className="mt-16 text-center text-gray-400">
                    <p>Dr. M.G.R. Educational and Research Institute</p>
                    <p className="text-sm">Department of Computer Applications</p>
                </div>
            </div>
        </div>
    );
};

export default About;
