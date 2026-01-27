import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft, ArrowRight, Map as MapIcon } from "lucide-react";
import Map from "../components/Map";
import LocationHeader from "../components/LocationHeader";

const PanicMapMode = () => {
    const navigate = useNavigate();
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [dots, setDots] = useState(".");

    const minSwipeDistance = 50;
    
    // Define locations for routing
    const userLocation = [13.7351, 100.5293];
    const safeHavenLocation = [13.7344, 100.5282]; // Samyan Mitrtown

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : "."));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            // Swipe Left (Right-to-Left motion) -> Go to Safe Button (Placeholder)
             navigate("/safe-mode");
        }
        if (isRightSwipe) {
            // Swipe Right (Left-to-Right motion) -> Go back to Panic Mode
            navigate("/panic-mode");
        }
    };

    return (
        <div 
            className="h-screen w-full bg-black text-white flex flex-col overflow-hidden relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
             {/* Replaced Header with LocationHeader */}
            <div className="z-20 pt-4">
                 <LocationHeader locationName="SAMYAN MITRTOWN" />
            </div>

            {/* Sound Recording Text */}
            <div className="flex flex-col items-center gap-2 mt-0 z-10 shrink-0 mb-4">
                 <h1 className="text-3xl font-serif font-bold text-white opacity-100 tracking-wider">
                    SOUND
                </h1>
                <h1 className="text-3xl font-serif font-bold text-white opacity-100 tracking-wider">
                    RECORDING{dots}
                </h1>
            </div>

            {/* Main Content Card */}
            <div className="flex-1 mx-4 mb-20 rounded-3xl overflow-hidden relative flex flex-col border border-white/10">
                {/* Map Part (Top Half) */}
                <div className="h-[55%] w-full bg-[#242424] relative overflow-hidden">
                     <Map 
                        enablePopup={false} 
                        userLocation={userLocation}
                        route={[userLocation, safeHavenLocation]}
                        zoomLevel={16}
                    />
                </div>

                {/* Details Part (Bottom Half) */}
                <div className="flex-1 p-6 text-white flex flex-col bg-primary-gradient">
                    <div className="text-center mb-4">
                         <span className="text-xs uppercase tracking-wider text-white/70">Closest Safe Haven Partner</span>
                         <h2 className="text-2xl font-serif mt-1">SAMYAN MITRTOWN</h2>
                    </div>

                    <div className="flex items-center justify-between mb-6 px-2">
                        <div className="flex items-center gap-2 text-sm text-white/90">
                            <MapPin size={16} />
                            <span>3rd Flr Samyan Mitrtown</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/90">
                             <MapIcon size={16} />
                            <span>150 Meters Away</span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <p className="text-sm mb-2 text-white/80">Photos</p>
                        <div className="h-24 w-40 rounded-lg overflow-hidden border border-white/20 relative bg-black/20">
                             <img 
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                                alt="Shop Front" 
                                className="w-full h-full object-cover"
                             />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Swipe Controls */}
            <div className="absolute bottom-8 w-full px-8 flex items-center justify-between z-30">
                <div className="flex items-center gap-2 opacity-100">
                    <ArrowLeft size={20} />
                    <span className="font-bold tracking-widest text-sm">STEALTH MODE</span>
                </div>
                 <div className="flex items-center gap-2 opacity-100">
                    <span className="font-bold tracking-widest text-sm">SAFE BUTTON</span>
                    <ArrowRight size={20} />
                </div>
            </div>
        </div>
    );
};

export default PanicMapMode;
