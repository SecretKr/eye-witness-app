import React, { useState } from 'react';
import { Star, Shield, Users, Video, Sun, X, ChevronDown } from 'lucide-react';

const LocationPopup = ({ location, onClose }) => {
    const [expanded, setExpanded] = useState(false);

    // Dummy data if location doesn't have it all
    const {
        name = "Unknown Location",
        rating = 4.5,
        reviewCount = 14,
        amenities = ["CCTV", "Security", "Well-lit"],
        image = "https://images.unsplash.com/photo-1519567241046-7f570eee3c9b?auto=format&fit=crop&w=800&q=80" // Fallback image
    } = location || {};

    return (
        <div className={`absolute left-4 right-4 z-[1000] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] bottom-20`}>
            <div
                className={`w-full bg-gradient-to-b from-[#6B9080] to-[#4F6D60] backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 rounded-3xl cursor-pointer ${expanded ? 'h-[420px]' : 'h-36'}`}
                onClick={() => !expanded && setExpanded(true)}
            >
                {/* Close Button or Collapse Button */}
                {expanded ? (
                    <button
                        onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                    >
                        <ChevronDown size={20} />
                    </button>
                ) : (
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="absolute top-3 right-3 z-20 w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-white/80 hover:bg-black/30 transition-colors"
                    >
                        <X size={14} />
                    </button>
                )}

                <div className="relative h-full flex flex-col">
                    {/* Expanded Content - Image */}
                    <div className={`relative w-full transition-all duration-500 overflow-hidden ${expanded ? 'h-48 opacity-100' : 'h-0 opacity-0'}`}>
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#4F6D60] via-[#4F6D60]/20 to-transparent"></div>
                    </div>

                    {/* Content Container */}
                    <div className={`p-5 flex flex-col items-center justify-center ${expanded ? 'flex-1 pt-2' : 'h-full'}`}>
                        {/* Header */}
                        <div className="text-center w-full">
                            <h3 className="text-xl font-serif text-white tracking-wide mb-1 drop-shadow-md font-medium">{name}</h3>

                            {/* Rating */}
                            <div className="flex items-center justify-center gap-1 mb-2">
                                <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider mr-1">Safety Rating</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} size={12} className={`${star <= Math.round(rating) ? 'fill-white text-white' : 'text-white/30'}`} />
                                    ))}
                                </div>
                                <span className="text-[10px] text-white/80 ml-1">({reviewCount})</span>
                            </div>

                            {/* Safe Havens Count Badge (Collapsed Only) */}
                            {!expanded && (
                                <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 mt-1">
                                    <Shield size={12} className="text-white" />
                                    <span className="text-[10px] font-medium text-white">4 Safe Havens Nearby</span>
                                </div>
                            )}
                        </div>

                        {/* Expanded Details */}
                        <div className={`transition-all duration-500 w-full overflow-hidden flex flex-col items-center ${expanded ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                            {/* Amenities Icons */}
                            <div className="flex justify-center gap-8 mb-4 w-full">
                                <div className="flex flex-col items-center gap-1">
                                    <Video size={16} className="text-white/90" />
                                    <span className="text-[8px] uppercase tracking-widest text-white/70">Several CCTV</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <Users size={16} className="text-white/90" />
                                    <span className="text-[8px] uppercase tracking-widest text-white/70">Security Nearby</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <Sun size={16} className="text-white/90" />
                                    <span className="text-[8px] uppercase tracking-widest text-white/70">Well-lit Area</span>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="text-center mb-4 w-full px-4">
                                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Summary (by AI)</p>
                                <p className="text-xs text-white/90 leading-relaxed font-light">
                                    Area with a lot of people. Feels safe.
                                </p>
                            </div>

                            {/* Action */}
                            <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white transition-colors">
                                View All Reviews...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationPopup;
