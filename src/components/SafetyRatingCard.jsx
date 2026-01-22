import React from 'react';
import { Star, MapPin } from 'lucide-react';

const SafetyRatingCard = ({ location = "Saiyan Midtown", rating = 4.5, reviews = 120 }) => {
    return (
        <div className="glass-card mb-6 relative overflow-hidden">
            {/* Background gradient overlay for style */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-sm text-gray-400 flex items-center gap-1 uppercase tracking-wider font-semibold">
                            <MapPin size={14} /> Current Location
                        </h3>
                        <h2 className="text-2xl font-bold text-white mt-1">{location}</h2>
                    </div>
                    <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
                        <span className="text-secondary font-bold text-sm">Safe Zone</span>
                    </div>
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <p className="text-xs text-gray-400 mb-1">Safety Rating</p>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={18}
                                    className={`${star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                                />
                            ))}
                            <span className="ml-2 text-white font-bold">{rating}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-white">24°C</p>
                        <p className="text-xs text-gray-400">{reviews} Verified Reviews</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SafetyRatingCard;
