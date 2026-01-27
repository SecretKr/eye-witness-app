import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LocationHeader from "../components/LocationHeader";
import SafetyConfirmationModal from "../components/SafetyConfirmationModal";

const SafeMode = () => {
    const navigate = useNavigate();
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [dots, setDots] = useState(".");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const minSwipeDistance = 50;

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
        const isRightSwipe = distance < -minSwipeDistance;

        if (isRightSwipe) {
            // Swipe Right (Left-to-Right motion) -> Go back to Map Mode
            navigate("/panic-map");
        }
    };

    const handleConfirmSafe = () => {
        setIsModalOpen(false);
        navigate("/incident-form");
    };

    return (
        <div 
            className="h-screen w-full bg-black text-white flex flex-col overflow-hidden relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Header */}
            <div className="z-20 pt-4">
                 <LocationHeader locationName="SAMYAN MITRTOWN" />
            </div>

            {/* Sound Recording Text */}
            <div className="flex flex-col items-center gap-2 mt-8 z-10 shrink-0 mb-12">
                 <h1 className="text-3xl font-serif font-bold text-white opacity-100 tracking-wider">
                    SOUND
                </h1>
                <h1 className="text-3xl font-serif font-bold text-white opacity-100 tracking-wider">
                    RECORDING{dots}
                </h1>
            </div>

            {/* Main Content - Safe Button */}
            <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-72 h-72 rounded-full bg-green-gradient flex flex-col items-center justify-center shadow-[0_0_50px_rgba(74,222,128,0.3)] active:scale-95 transition-transform duration-200"
                >
                    <h2 className="text-4xl font-serif font-bold text-white leading-tight text-center drop-shadow-md">
                        I AM
                        <br />
                        SAFE NOW
                    </h2>
                    <p className="text-xs font-sans tracking-widest text-white mt-2 font-medium opacity-90">
                        END PANIC MODE
                    </p>
                </button>
            </div>

            {/* Footer Navigation Hint */}
            <div className="absolute bottom-8 w-full px-8 flex items-center justify-start z-30">
                <div className="flex items-center gap-2 opacity-100">
                    <ArrowLeft size={40} className="text-white" />
                    <span className="font-bold tracking-widest text-sm text-white">MAP MODE</span>
                </div>
            </div>

            {/* Safety Confirmation Modal */}
            <SafetyConfirmationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleConfirmSafe} 
            />
        </div>
    );
};

export default SafeMode;
