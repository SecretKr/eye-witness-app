import React from 'react';
import { HandHeart } from 'lucide-react';
import SafetyRatingCard from '../components/SafetyRatingCard';
import PanicButton from '../components/PanicButton';
import Map from '../components/Map';
import LocationHeader from '../components/LocationHeader';

import useUserLocation from '../hooks/useUserLocation';

const Home = () => {

    const { locationName, userLocation, loading } = useUserLocation();

    return (
        <div className="flex flex-col h-[calc(100vh-85px)] px-4 pt-4 pb-2 overflow-hidden">
            {/* Minimal Header */}
            <div className="shrink-0 mt-5">
                <LocationHeader locationName={locationName} loading={loading} />
            </div>

            <div className="shrink-0 animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
                <SafetyRatingCard location={locationName} />
            </div>

            {/* Map Preview section - Flexible Height */}
            <section className="flex-1 min-h-[140px] my-2 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards] flex flex-col">
                <div className="w-full h-full bg-primary-gradient rounded-[24px] px-2 pt-2 shadow-xl shadow-primary/20 flex flex-col">
                    <div className="glass-card flex-1 relative overflow-hidden rounded-[20px] border-none p-0 group min-h-0">
                        <Map userLocation={userLocation} />
                    </div>
                    <div className="flex items-center justify-end px-2 py-2 text-white gap-2 shrink-0">
                        <HandHeart size={20} strokeWidth={2.5} />
                        <span className="font-bold text-sm tracking-wide">4 Safe Haven Nearby</span>
                    </div>
                </div>
            </section>

            {/* Emergency Action - Fixed at bottom */}
            <section className="shrink-0 animate-fade-in-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
                <PanicButton />
                <p className="text-center text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1 opacity-50">
                    Press in case of emergency
                </p>
            </section>
        </div>
    );
};

export default Home;
