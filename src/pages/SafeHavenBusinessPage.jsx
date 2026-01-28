import React from 'react';
import { Star, Video, ShieldCheck, Sun, HandHeart, UserCheck, Users, Home, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LocationHeader from '../components/LocationHeader';
import BusinessNavbar from '../components/BusinessNavbar';

const SafeHavenBusinessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background pb-24 text-white font-sans max-w-md mx-auto relative overflow-x-hidden">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 p-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
                <LocationHeader locationName="SAMYAN MITRTOWN" />
            </div>

            {/* Content Padding for Header */}
            <div className="h-24"></div>

            <div className="px-4 space-y-6">
                
                {/* Main Business Card */}
                <div className="w-full bg-orange-gradient rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center text-center">
                        
                        {/* Title */}
                        <h1 className="text-3xl font-bold uppercase mb-1 tracking-wide">ABC</h1>
                        <h1 className="text-3xl font-bold uppercase mb-4 tracking-wide">Restaurant</h1>

                        {/* Certified Pill */}
                        <div className="bg-[#5c9176] backdrop-blur-md px-6 py-2 rounded-full flex items-center gap-2 mb-6 border border-white/20">
                            <HandHeart size={20} className="text-white" />
                            <span className="text-xs font-bold tracking-widest uppercase text-white">Certified Safe Haven</span>
                        </div>

                        {/* Storefront Image */}
                        <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 shadow-lg border border-white/10">
                            <img 
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" 
                                alt="Storefront" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Safety Rating */}
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-sm font-bold tracking-wide">Safety Rating</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} size={24} className="fill-white text-white" />
                                ))}
                            </div>
                            <span className="text-sm font-medium opacity-90">(14)</span>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 w-full mb-8">
                             <div className="flex flex-col items-center">
                                <Video size={28} className="mb-2 stroke-[2.5]" />
                                <span className="text-[10px] font-bold uppercase opacity-80 leading-tight">Several</span>
                                <span className="text-[10px] font-bold uppercase leading-tight">CCTV</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <UserCheck size={28} className="mb-2 stroke-[2.5]" />
                                <span className="text-[10px] font-bold uppercase opacity-80 leading-tight">Security</span>
                                <span className="text-[10px] font-bold uppercase leading-tight">Nearby</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Sun size={28} className="mb-2 stroke-[2.5]" />
                                <span className="text-[10px] font-bold uppercase opacity-80 leading-tight">Well lit</span>
                                <span className="text-[10px] font-bold uppercase leading-tight">Area</span>
                            </div>
                        </div>

                        {/* Footer Stats */}
                        <div className="flex justify-between w-full px-2 border-t border-white/20 pt-6">
                            <div className="flex flex-col items-center w-1/2 border-r border-white/20">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-lg font-bold mb-1">Assisted</span>
                                <span className="text-[10px] opacity-80">13 People Helped</span>
                            </div>
                            <div className="flex flex-col items-center w-1/2">
                                <span className="text-lg font-bold">Staff</span>
                                <span className="text-lg font-bold mb-1">Readiness</span>
                                <span className="text-[10px] opacity-80">Staff Training Completed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community Reviews Header */}
                <h2 className="text-center text-xl font-medium tracking-widest uppercase py-2">Community Reviews</h2>

                {/* Community Review Card (Example 1) */}
                <div className="w-full bg-orange-gradient rounded-[32px] p-6 shadow-xl relative overflow-hidden mb-24">
                    <div className="relative z-10">
                        {/* Rating Row */}
                        <div className="grid grid-cols-3 gap-4 w-full mb-6">
                             <div className="flex flex-col items-center">
                                <Video size={24} className="mb-1 stroke-[2]" />
                                <span className="text-[9px] font-bold uppercase opacity-80 leading-tight">Several</span>
                                <span className="text-[9px] font-bold uppercase leading-tight">CCTV</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <UserCheck size={24} className="mb-1 stroke-[2]" />
                                <span className="text-[9px] font-bold uppercase opacity-80 leading-tight">Security</span>
                                <span className="text-[9px] font-bold uppercase leading-tight">Nearby</span>
                            </div>
                             <div className="flex flex-col items-center">
                                <Sun size={24} className="mb-1 stroke-[2]" />
                                <span className="text-[9px] font-bold uppercase opacity-80 leading-tight">Well lit</span>
                                <span className="text-[9px] font-bold uppercase leading-tight">Area</span>
                            </div>
                        </div>

                        {/* Stars centered */}
                        <div className="flex justify-center gap-2 mb-4">
                             {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} size={28} className="fill-white text-white" />
                            ))}
                        </div>

                         {/* Reviewer Name */}
                         <div className="flex justify-end mt-4">
                             <span className="text-xs font-medium tracking-wider opacity-90">• A....... B.......</span>
                         </div>
                    </div>
                </div>
                
                 <BusinessNavbar />

            </div>
        </div>
    );
};

export default SafeHavenBusinessPage;
