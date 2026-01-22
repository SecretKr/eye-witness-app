import React from 'react';
import SafetyRatingCard from '../components/SafetyRatingCard';
import PanicButton from '../components/PanicButton';
import Map from '../components/Map';

const Home = () => {
    return (
        <div className="pb-24 px-4 scroll-smooth">
            {/* Minimal Header */}
            <header className="flex justify-between items-center mb-8 pt-4 animate-fade-in-up">
                <div>
                    <h1 className="text-xl font-black tracking-tighter text-white">
                        EYE<span className="text-secondary">WITNESS</span>
                    </h1>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_#10B981]"></div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Status: Secured</p>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-surface-glass border border-white/10 flex items-center justify-center group cursor-pointer hover:bg-surface transition-colors">
                    <div className="w-5 h-5 rounded-full border-2 border-secondary border-t-transparent animate-spin opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-2 h-2 bg-secondary rounded-full absolute group-hover:scale-125 transition-transform shadow-[0_0_10px_#10B981]"></div>
                </div>
            </header>

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
                    Hold for 3s to call emergency
                </p>
            </section>
        </div>
    );
};

export default Home;
