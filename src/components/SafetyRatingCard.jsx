import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Star, MapPin, Info, StarHalf, X, Video, ShieldCheck, Sun, HandHeart } from 'lucide-react';

const SafetyRatingCard = ({ location = "Samyan Mitrtown", showLocationName = false }) => {
    const [rating, setRating] = useState(4.5);
    const [reviews, setReviews] = useState(120);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        // Generate random rating between 2.5 and 5.0 for realistic variety
        const randomRating = (Math.random() * 2.5 + 2.5).toFixed(1);
        setRating(randomRating);
        
        // Generate random review count
        const randomReviews = Math.floor(Math.random() * 400) + 12;
        setReviews(randomReviews);
    }, []);

    // Determine background gradient based on rating
    let bgGradient = 'bg-green-gradient';
    if (rating < 2.5) {
        bgGradient = 'bg-red-gradient';
    } else if (rating < 3.5) {
        bgGradient = 'bg-orange-gradient';
    } else if (rating < 4.2) {
        bgGradient = 'bg-yellow-gradient';
    }

    const handleInfoClick = (e) => {
        e.stopPropagation();
        setShowDetails(true);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setShowDetails(false);
    };

    return (
        <>
            <div 
                onClick={handleInfoClick}
                className={`w-full ${bgGradient} rounded-[24px] overflow-hidden shadow-lg transition-all duration-500 cursor-pointer active:scale-[0.99] relative z-50 flex flex-col`}
                style={{ maxHeight: showDetails ? '80vh' : 'auto' }}
            >
                {!showDetails ? (
                    /* SUMMARY VIEW */
                    <div className="py-3 px-4 relative">
                        <div className="relative z-10 flex flex-col items-center justify-center text-white w-full">
                            <div className="w-full flex justify-between items-center mb-1">
                                <div className="w-5"></div> {/* Spacer */}
                            
                                <div className="text-center flex-1 flex flex-col items-center">
                                {showLocationName && (
                                        <h1 className="text-sm font-bold tracking-wide uppercase mb-1 text-center line-clamp-1 px-2">
                                            {location}
                                        </h1>
                                    )}
                                    <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-90">Safety Rating</h2>
                                </div>
                                
                                <div className="bg-white/20 p-1 rounded-full opacity-80 hover:opacity-100 transition-opacity">
                                    <Info size={14} />
                                </div>
                            </div>

                            <div className="mb-1 flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => {
                                            const val = Number(rating);
                                            if (val >= star) return <Star key={star} size={20} className="fill-white text-white" strokeWidth={2.5} />;
                                            if (val >= star - 0.5) return <StarHalf key={star} size={20} className="fill-white text-white" strokeWidth={2.5} />;
                                            return <Star key={star} size={20} className="text-white/30" strokeWidth={2.5} />;
                                        })}
                                    </div>
                                </div>
                            </div>

                            <p className="text-[9px] font-bold opacity-80 uppercase tracking-widest">Avg: {rating} ({reviews} Reviews)</p>
                        </div>
                    </div>
                ) : (
                    /* EXPANDED DETAILED VIEW */
                    <div className="w-full flex flex-col animate-fade-in overflow-y-auto no-scrollbar">
                         {/* Close Button */}
                         <button 
                            onClick={handleClose} 
                            className="absolute top-4 right-4 z-20 text-white bg-black/20 hover:bg-black/40 p-1.5 rounded-full backdrop-blur-md transition-colors"
                        >
                            <X size={18} />
                        </button>

                         {/* Header Image */}
                         <div className="h-40 w-full bg-gray-800 shrink-0">
                            <img 
                                src="samyan.jpg" 
                                alt="Location" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="px-5 text-white text-center flex flex-col items-center pt-4">
                            {/* Title */}
                            <h1 className="text-2xl font-sans tracking-wide mb-1 uppercase text-white drop-shadow-md">
                                {location}
                            </h1>

                            {/* Rating */}
                            <div className="flex flex-col items-center justify-center mb-4 w-full">
                                <div className="flex items-center justify-between w-full px-4 mb-1">
                                    <span className="text-sm font-bold">Safety Rating</span>
                                    <div className="flex items-center gap-2">
                                         <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => {
                                                const val = Number(rating);
                                                if (val >= star) return <Star key={star} size={22} className="fill-white text-white" strokeWidth={0} />;
                                                if (val >= star - 0.5) return <StarHalf key={star} size={22} className="fill-white text-white" strokeWidth={0} />;
                                                return <Star key={star} size={22} className="text-white/30" strokeWidth={0} />;
                                            })}
                                        </div>
                                        <span className="text-sm opacity-90">({reviews})</span>
                                    </div>
                                </div>
                            </div>

                             {/* Icons Grid */}
                             <div className="grid grid-cols-2 gap-x-2 gap-y-4 mb-4 w-full px-1">
                                <div className="flex items-start gap-3 text-left">
                                    <Video size={20} className="stroke-2 mt-0.5 shrink-0" />
                                    <div className="leading-tight">
                                        <p className="text-[10px] uppercase opacity-90">Several</p>
                                        <p className="text-xs font-bold">CCTV</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-left">
                                    <ShieldCheck size={20} className="stroke-2 mt-0.5 shrink-0" />
                                    <div className="leading-tight">
                                        <p className="text-[10px] uppercase opacity-90">Security</p>
                                        <p className="text-xs font-bold">Nearby</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-left">
                                    <Sun size={20} className="stroke-2 mt-0.5 shrink-0" />
                                     <div className="leading-tight">
                                        <p className="text-[10px] uppercase opacity-90">Well lit</p>
                                        <p className="text-xs font-bold">Area</p>
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-center justify-center gap-2 mt-1">
                                     <HandHeart size={18} className="stroke-2" />
                                     <p className="text-xs font-bold">4 Safe Havens Nearby</p>
                                </div>
                            </div>

                            {/* AI Summary */}
                            <div className="text-center mb-4 w-full px-2">
                                <h3 className="font-bold text-base mb-1">Summary (by AI)</h3>
                                <p className="text-xs opacity-90 leading-relaxed">
                                    Area with a lot of people. Feels safe.
                                </p>
                            </div>

                            {/* Footer Link */}
                            <button className="text-[10px] font-bold uppercase tracking-widest opacity-70 hover:opacity-100 mb-2 transition-opacity">
                                View All Reviews....
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SafetyRatingCard;
