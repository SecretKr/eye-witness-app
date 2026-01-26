import React from 'react';
import { CircleHelp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpPage = () => {
    return (
        <div className="min-h-screen bg-background text-white p-6 pb-24">
            <header className="flex items-center mb-8">
                <Link to="/" className="mr-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold flex items-center">
                    <CircleHelp className="w-6 h-6 mr-3 text-secondary" />
                    Help & Support
                </h1>
            </header>
            
            <div className="space-y-6">
                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold mb-3 text-secondary">How to use EYEWITNESS</h2>
                    <div className="space-y-4 text-gray-300">
                        <div>
                            <h3 className="font-bold text-white mb-1">Panic Button</h3>
                            <p>Hold the red button on the home screen for 3 seconds to activate emergency mode.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1">Safe Havens</h3>
                            <p>Check the map to find nearby safe locations like police stations and hospitals.</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold mb-3 text-secondary">FAQs</h2>
                     <div className="space-y-4 text-gray-300">
                        <div className="border-b border-white/10 pb-3">
                            <h3 className="font-bold text-white mb-1">Is my location tracked?</h3>
                            <p>Your location is only used to show you nearby safe places and in emergency mode.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
