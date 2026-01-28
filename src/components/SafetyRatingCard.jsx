import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Star, MapPin, Info, StarHalf, X, Video, ShieldCheck, Sun, HandHeart } from 'lucide-react';

const SafetyRatingCard = ({ location = "Samyan Mitrtown" }) => {
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
            <div className={`w-full ${bgGradient} rounded-[24px] py-3 px-4 relative overflow-hidden shadow-lg transition-colors duration-500`}>
                <div className="relative z-10 flex flex-col items-center justify-center text-white w-full">
                    <div className="w-full flex justify-between items-center mb-1">
                        <div className="w-5"></div> {/* Spacer for centering with button */}
                    
                        <div className="text-center flex-1">
                            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase">Safety Rating</h2>
                        </div>
                        
                        <button 
                            onClick={handleInfoClick}
                            className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <Info size={16} />
                        </button>
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

            {/* Detailed Popup Modal */}
            {showDetails && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
                    <div className={`w-full max-w-sm ${bgGradient} rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]`}>
                        
                        {/* Close Button */}
                        <button 
                            onClick={handleClose} 
                            className="absolute top-4 right-4 z-20 text-white bg-black/20 hover:bg-black/40 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        {/* Content Scrollable Area */}
                        <div className="overflow-y-auto no-scrollbar pb-6">
                            
                            {/* Header Image */}
                            <div className="h-56 w-full bg-gray-800 relative mb-4">
                                <img 
                                    src="https://images.unsplash.com/photo-1567449303078-5c93527e2682?q=80&w=2574&auto=format&fit=crop" 
                                    alt="Location" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>

                            <div className="px-6 text-white text-center relative z-10 -mt-12">
                                {/* Title */}
                                <h1 className="text-2xl font-sans font-medium tracking-wide mb-1 uppercase text-white drop-shadow-md">
                                    {location}
                                </h1>

                                {/* Rating */}
                                <div className="flex flex-col items-center justify-center mb-6">
                                    <span className="text-sm font-bold mb-2">Safety Rating</span>
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => {
                                                const val = Number(rating);
                                                if (val >= star) return <Star key={star} size={22} className="fill-white text-white" strokeWidth={0} />;
                                                if (val >= star - 0.5) return <StarHalf key={star} size={22} className="fill-white text-white" strokeWidth={0} />;
                                                return <Star key={star} size={22} className="text-white/30" strokeWidth={0} />;
                                            })}
                                        </div>
                                        <span className="text-sm opacity-90 font-mono">({reviews})</span>
                                    </div>
                                </div>

                                {/* Icons Grid */}
                                <div className="grid grid-cols-2 gap-x-4 gap-y-6 my-6 px-4">
                                    <div className="flex items-start gap-3 text-left">
                                        <Video size={24} className="stroke-2 mt-1 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold uppercase leading-tight opacity-70">Several</p>
                                            <p className="text-sm font-bold leading-tight">CCTV</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 text-left">
                                        <ShieldCheck size={24} className="stroke-2 mt-1 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold uppercase leading-tight opacity-70">Security</p>
                                            <p className="text-sm font-bold leading-tight">Nearby</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 text-left">
                                        <Sun size={24} className="stroke-2 mt-1 shrink-0" />
                                         <div>
                                            <p className="text-xs font-bold uppercase leading-tight opacity-70">Well lit</p>
                                            <p className="text-sm font-bold leading-tight">Area</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-left col-span-2 justify-center mt-2 bg-white/10 py-2 rounded-xl border border-white/5">
                                        <HandHeart size={20} className="stroke-2" />
                                        <p className="text-sm font-bold">4 Safe Havens Nearby</p>
                                    </div>
                                </div>

                                {/* AI Summary */}
                                <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10 mb-8 text-left shadow-lg">
                                    <h3 className="font-bold text-lg mb-2">Summary (by AI)</h3>
                                    <p className="text-sm font-medium opacity-90 leading-relaxed">
                                        Area with a lot of people. Feels safe, well illuminated and monitored by security personnel.
                                    </p>
                                </div>

                                {/* Footer Link */}
                                <button className="text-[10px] font-bold uppercase tracking-widest opacity-70 hover:opacity-100 mb-4 transition-opacity">
                                    View All Reviews....
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default SafetyRatingCard;
