import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book, HelpCircle, MapPin, ArrowRight } from "lucide-react";
import LocationHeader from "../components/LocationHeader";
import { useEvidence } from "../context/EvidenceContext";

const PanicMode = () => {
    const navigate = useNavigate();
    const { startRecording, currentRecording } = useEvidence();
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    useEffect(() => {
        if (!currentRecording) {
            startRecording("SAMYAN MITRTOWN");
        }
    }, [currentRecording, startRecording]);
    const [dots, setDots] = useState(".");

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : "."));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const onTouchStart = (e) => {
        setTouchEnd(null); // Reset touch end
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        // const isRightSwipe = distance < -minSwipeDistance;

        // User requested to change direction. Previously was Right Swipe. Now using Left Swipe (standard "Next" gesture).
        if (isLeftSwipe) {
            navigate("/panic-map");
        }
    };

    return (
        <div
            className="h-full w-full bg-black text-white flex flex-col justify-between overflow-hidden relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 opacity-10 z-20">
                <button className="p-2">
                    <Book size={24} />
                </button>

                <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full flex items-center gap-2">
                    <MapPin size={14} className="fill-current" />
                    <span className="text-xs font-medium tracking-wide">SAMYAN MITRTOWN</span>
                </div>

                <button className="p-2">
                    <HelpCircle size={24} />
                </button>
            </div>

            {/* Sound Recording Text - Moved to Top */}
            <div className="flex flex-col items-center gap-2 mt-4 z-10">
                <h1 className="text-3xl md:text-4xl font-sans font-bold text-white opacity-10 tracking-wider">
                    SOUND
                </h1>
                <h1 className="text-3xl md:text-4xl font-sans font-bold text-white opacity-10 tracking-wider">
                    RECORDING{dots}
                </h1>
            </div>

            {/* Spacer to push footer down */}
            <div className="flex-1">
            </div>

            {/* Bottom Swipe Indicator */}
            {/* "More towards the center" - added significant bottom margin/padding to push it up */}
            <div
                className="absolute bottom-24 w-full px-8 flex items-center justify-center z-30 cursor-pointer"
                onClick={() => navigate("/panic-map")}
            >
                <div className="flex items-center gap-2 opacity-20">
                    <span className="font-bold tracking-widest text-xl">SWIPE TO MAP MODE</span>
                    <ArrowRight size={40} />
                </div>
            </div>
        </div>
    );
};

export default PanicMode;
