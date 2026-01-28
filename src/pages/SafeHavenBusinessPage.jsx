import React from 'react';
import { Star, Video, ShieldCheck, Sun, HandHeart, UserCheck, Users, Home, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LocationHeader from '../components/LocationHeader';
import BusinessNavbar from '../components/BusinessNavbar';

const SafeHavenBusinessPage = () => {
    const navigate = useNavigate();
    const [incomingUser, setIncomingUser] = React.useState(false);

    // Auto-trigger simulation after 3 seconds
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIncomingUser(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div className="h-full bg-background pb-24 text-white font-sans w-full relative overflow-y-auto overflow-x-hidden no-scrollbar">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-50 p-4 pt-12">
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

             {/* INCOMING ALERT OVERLAY */}
             {incomingUser && (
                <div className="fixed bottom-32 left-0 right-0 z-[100] px-4 animate-in slide-in-from-bottom duration-700 ease-out flex justify-center pointer-events-none">
                    <div 
                        onClick={() => navigate('/business/tracking')}
                        className="w-[95%] max-w-[380px] bg-red-gradient text-white rounded-[20px] p-3 pt-5 shadow-[0_8px_30px_rgba(171,42,45,0.4)] flex items-center justify-between border border-white/20 cursor-pointer hover:scale-[1.02] transition-all duration-500 relative overflow-hidden group animate-pulse-scale hover:animate-none pointer-events-auto"
                    >
                         {/* Smoother Pulse Effect Background */}
                         <div className="absolute inset-0 bg-red-500/30 animate-pulse duration-[2000ms]"></div>
                         
                         {/* Live Tag */}
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-3 py-0.5 rounded-b-lg border-x border-b border-white/10 flex items-center gap-1.5 shadow-lg z-20">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 duration-1000"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
                            </span>
                            <span className="text-[9px] font-bold tracking-[0.2em] text-white">LIVE</span>
                         </div>

                        <div className="flex items-center gap-3 relative z-10">
                            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/20 shadow-inner group-hover:bg-white/20 transition-colors duration-500">
                                <ShieldCheck size={24} className="animate-[pulse_2s_ease-in-out_infinite]" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-bold text-base leading-none uppercase tracking-wide drop-shadow-sm mb-0.5">Incoming Alert</h3>
                                <p className="text-[10px] text-white/90 font-medium tracking-wide">Panic Button Pressed <span className="mx-0.5">•</span> <span className="font-bold">1 min</span></p>
                            </div>
                        </div>
                        
                        <div className="relative z-10 pl-2">
                             <div className="bg-white text-[#AB2A2D] px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1 group-hover:bg-gray-100 transition-colors duration-300 text-center whitespace-nowrap">
                                View Map
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SafeHavenBusinessPage;
