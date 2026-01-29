import React, { useState } from 'react';
import { X, Camera, Star, StarHalf } from 'lucide-react';

const ReviewFormModal = ({ isOpen, onClose, locationName = "Current Location" }) => {
    if (!isOpen) return null;

    const [rating, setRating] = useState(0);
    const [cctvCount, setCctvCount] = useState('Several'); // Default to middle option
    const [hasSecurity, setHasSecurity] = useState(false);
    const [lighting, setLighting] = useState('Good');
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the submission logic
        console.log({
            rating,
            cctvCount,
            hasSecurity,
            lighting,
            reviewText
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-sm bg-primary-gradient rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh] animate-scale-in">
                
                {/* Header */}
                <div className="px-6 py-5 text-center relative shrink-0">
                    <button 
                        onClick={onClose} 
                        className="absolute top-5 right-6 text-white/80 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <h2 className="text-xl font-bold text-white mb-1 uppercase tracking-wider">Write a Review</h2>
                    <p className="text-white/70 text-xs uppercase tracking-widest">{locationName}</p>
                </div>

                {/* Scrollable Form Content */}
                <div className="overflow-y-auto no-scrollbar flex-1 px-6 pb-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        
                        {/* 1. Rate Safety */}
                        <div className="flex flex-col items-center gap-2">
                            <label className="text-white text-sm font-bold uppercase tracking-wide">Rate Safety</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="focus:outline-none transition-transform active:scale-95"
                                    >
                                        <Star 
                                            size={32} 
                                            className={`${rating >= star ? 'fill-white text-white' : 'text-white/30'} transition-colors`} 
                                            strokeWidth={1.5}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Add Photo */}
                        <div className="flex flex-col gap-2">
                             <label className="text-white text-sm font-bold uppercase tracking-wide">Add Photo</label>
                             <button type="button" className="h-28 w-full rounded-2xl border-2 border-dashed border-white/30 flex flex-col items-center justify-center text-white/50 hover:bg-white/10 transition-colors gap-2">
                                <div className="p-2.5 bg-white/10 rounded-full">
                                    <Camera size={20} className="text-white" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider">Tap to upload</span>
                             </button>
                        </div>

                        {/* 3. Short Review */}
                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm font-bold uppercase tracking-wide">Review</label>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Share your experience regarding safety in this area..."
                                className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 min-h-[80px] resize-none"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* 4. CCTV */}
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-xs font-bold uppercase tracking-wide">CCTVs Nearby</label>
                                <select 
                                    value={cctvCount}
                                    onChange={(e) => setCctvCount(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white text-xs focus:outline-none appearance-none"
                                >
                                    <option className="bg-gray-800" value="Few">Few</option>
                                    <option className="bg-gray-800" value="Several">Several</option>
                                    <option className="bg-gray-800" value="Many">Many</option>
                                </select>
                            </div>

                             {/* 5. Security */}
                             <div className="flex flex-col gap-2">
                                <label className="text-white text-xs font-bold uppercase tracking-wide">Security Guard</label>
                                <div className="flex bg-white/10 rounded-xl p-1 border border-white/20 h-[42px]">
                                    <button
                                        type="button"
                                        onClick={() => setHasSecurity(true)}
                                        className={`flex-1 rounded-lg text-xs font-bold transition-all ${hasSecurity ? 'bg-white text-primary' : 'text-white/60'}`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setHasSecurity(false)}
                                        className={`flex-1 rounded-lg text-xs font-bold transition-all ${!hasSecurity ? 'bg-white text-primary' : 'text-white/60'}`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 6. Lighting */}
                        <div className="flex flex-col gap-2">
                             <label className="text-white text-xs font-bold uppercase tracking-wide">Lighting Quality</label>
                             <div className="grid grid-cols-3 gap-2">
                                {['Poor', 'Good', 'Well Lit'].map((opt) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setLighting(opt)}
                                        className={`py-3 rounded-xl border border-white/20 text-xs font-bold transition-all ${lighting === opt ? 'bg-white text-primary' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                             </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-white text-primary font-bold py-4 rounded-2xl mt-4 uppercase tracking-widest hover:bg-white/90 transition-colors shadow-lg active:scale-[0.98] text-sm"
                        >
                            Submit Review
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewFormModal;
