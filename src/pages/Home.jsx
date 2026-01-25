import React from 'react';
import SafetyRatingCard from '../components/SafetyRatingCard';
import PanicButton from '../components/PanicButton';
import Map from '../components/Map';
import LocationHeader from '../components/LocationHeader';

const Home = () => {
    return (
        <div className="pb-24 px-4 scroll-smooth">
            {/* Minimal Header */}
            <LocationHeader />

            <div className="animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
                <SafetyRatingCard />
            </div>

            {/* Map Preview section */}
            <section className="mb-8 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
                <div className="flex justify-between items-end mb-3 px-1">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nearby Safe Havens</h3>
                    <button className="text-[10px] font-bold text-secondary uppercase tracking-widest">Expand Map</button>
                </div>
                <div className="glass-card h-64 relative overflow-hidden p-0 border-white/5 shadow-2xl group ring-1 ring-white/10">
                    <Map />
                </div>
            </section>

            {/* Emergency Action */}
            <section className="mt-4 animate-fade-in-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
                <PanicButton />
                <p className="text-center text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 opacity-50">
                    Press in case of emergency
                </p>
            </section>
        </div>
    );
};

export default Home;
