import React from 'react';
import { User, Phone, Mail, Calendar, MapPin, BadgeCheck, ChevronRight, Edit2, Book, Bell, HelpCircle, FileText, Trash2, Asterisk, Contact, Cake, Users, Plus } from 'lucide-react';
import LocationHeader from '../components/LocationHeader';
import useUserLocation from '../hooks/useUserLocation';

const ProfilePage = () => {
    const { locationName, loading } = useUserLocation();
    return (
        <div className="min-h-screen pb-24 px-6 pt-safe-top relative overflow-hidden bg-black">
            {/* Background enhancement for premium feel */}
            <div className="absolute top-0 left-0 w-full h-96 bg-primary/20 blur-[100px] pointer-events-none rounded-full -translate-y-1/2"></div>

            {/* Header */}
            <header className="mt-10 relative z-10 animate-fade-in-up [animation-delay:0ms] opacity-0 [animation-fill-mode:forwards]">
                <LocationHeader locationName={locationName} loading={loading} />
            </header>

            {/* Title */}
            <h1 className="text-center text-4xl font-serif text-white tracking-widest mb-28 drop-shadow-md animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">PROFILE</h1>

            {/* Main User Card */}
            <div className="relative mb-6 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
                {/* Avatar - Positioned overlapping the card top */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-44 h-44 rounded-full p-1 bg-gradient-to-b from-purple-500/50 via-teal-500/50 to-transparent backdrop-blur-sm">
                        <div className="w-full h-full rounded-full bg-surface border-4 border-background overflow-hidden relative shadow-2xl">
                            {/* Avatar Image */}
                            <img 
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
                                alt="Profile Avatar" 
                                className="w-full h-full object-cover bg-teal-50"
                            />
                        </div>
                    </div>
                </div>

                {/* Card Content */}
                <div className="bg-gradient-to-br from-slate-600/80 to-slate-800/90 backdrop-blur-md rounded-2xl pt-24 pb-6 px-6 shadow-2xl relative overflow-hidden border border-white/10">
                    {/* Noise texture overlay */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                    <div className="absolute top-4 right-4 text-white/80 z-10 font-bold">
                        <Edit2 size={16} className="text-white/80" />
                    </div>

                    <div className="grid grid-cols-2 gap-y-5 text-white relative z-10 w-full mt-2">
                        <div className="col-span-1 flex items-center gap-3">
                            <User size={18} className="text-white/80" />
                            <span className="font-medium text-[13px] text-white/90">John Doe</span>
                        </div>
                        <div className="col-span-1 flex items-center gap-3">
                            {/* Male Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><circle cx="10" cy="14" r="5"></circle><line x1="13.5" y1="10.5" x2="19" y2="5"></line><polyline points="15 5 19 5 19 9"></polyline></svg>
                            <span className="font-medium text-[13px] text-white/90">Male</span>
                        </div>

                        <div className="col-span-1 flex items-center gap-3">
                            <Cake size={18} className="text-white/80" />
                            <span className="font-medium text-[13px] text-white/90">29 Feb 2005</span>
                        </div>
                        <div className="col-span-1 flex items-center gap-3">
                            <Contact size={18} className="text-white/80" />
                            <span className="font-medium text-[13px] text-white/90 tracking-widest">11XXXXXXXXXXX</span>
                        </div>

                        <div className="col-span-1 flex items-center gap-3">
                            <Phone size={18} className="text-white/80" />
                            <span className="font-medium text-[13px] text-white/90">089-999-9999</span>
                        </div>
                        <div className="col-span-1 flex items-center gap-3 w-full pr-0">
                            <Mail size={18} className="text-white/80 shrink-0" />
                            <span className="font-medium text-[13px] text-white/90 underline truncate">johndoe@gmail.com</span>
                        </div>

                        <div className="col-span-1 flex items-center gap-3">
                            <Asterisk size={18} className="text-white/80" />
                            <span className="font-medium text-[13px] text-white/90">099-999-9999</span>
                        </div>
                        <div className="col-span-1 flex items-center gap-3">
                            <div className="bg-[#609a47] rounded-md px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                <span className="text-white text-[11px] font-semibold">verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* User In Your Group Card */}
            <div className="relative mb-8 animate-fade-in-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
                <div className="bg-gradient-to-br from-slate-600/80 to-slate-800/90 backdrop-blur-md rounded-2xl p-5 shadow-2xl relative overflow-hidden border border-white/10">
                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
                    
                    <div className="flex items-center gap-2 text-white mb-4 relative z-10 w-full">
                        <Users size={16} className="text-white/90" />
                        <span className="font-medium text-sm text-white/90">User In Your Group</span>
                    </div>

                    <div className="flex items-center relative z-10">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-b from-purple-500/50 via-teal-500/50 to-transparent">
                                    <div className="w-full h-full rounded-full bg-gray-300 border-2 border-slate-700 overflow-hidden flex items-center justify-center">
                                        <img 
                                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} 
                                            alt={`Group member ${i}`} 
                                            className="w-full h-full object-cover bg-slate-100"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-center justify-center ml-4 relative">
                            {/* <span className="text-white/50 text-xl font-black leading-none tracking-widest absolute -top-4">...</span> */}
                            <div className="w-9 h-9 rounded-full bg-gray-300 drop-shadow-lg flex items-center justify-center mt-1">
                                <Plus size={20} className="text-slate-800 stroke-[3]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Options */}
            <div className="space-y-0.5 animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
                <MenuOption label="Change PIN" />
                <MenuOption label="Notifications" />
                <MenuOption label="App Terms & Conditions" />
                <MenuOption label="Delete Account" isDestructive />
            </div>

            {/* Log Out */}
            <div className="mt-12 flex justify-end animate-fade-in-up [animation-delay:500ms] opacity-0 [animation-fill-mode:forwards]">
                <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                    Log Out
                </button>
            </div>
        </div>
    );
};

// Helper Component for Menu Items
const MenuOption = ({ label, isDestructive = false }) => (
    <div className="group flex items-center justify-between py-4 border-b border-white/10 cursor-pointer active:bg-white/5 transition-colors">
        <span className={`text-sm font-medium ${isDestructive ? 'text-red-500' : 'text-white'}`}>
            {label}
        </span>
        <ChevronRight size={18} className="text-gray-500 group-hover:text-white transition-colors" />
    </div>
);

export default ProfilePage;
