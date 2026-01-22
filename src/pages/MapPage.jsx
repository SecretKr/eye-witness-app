import React from 'react';
import { Navigation } from 'lucide-react';
import Map from '../components/Map';

const MapPage = () => {
    return (
        <div className="w-full h-full overflow-hidden bg-background">
            <Map />

            <div className="absolute left-4 right-4 z-[1000]" style={{ top: 'max(1.5rem, env(safe-area-inset-top))' }}>
                <div className="glass-card flex items-center justify-between border-white/10 shadow-2xl animate-scale-in">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                            <Navigation size={20} className="text-secondary" />
                        </div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Nearest Safe Zone</p>
                            <p className="font-bold text-sm">Saiyan Midtown (0.5km)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
