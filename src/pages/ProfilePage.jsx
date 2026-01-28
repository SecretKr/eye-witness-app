import React from 'react';
import { User, Phone, Mail, Calendar, MapPin, BadgeCheck, ChevronRight, Edit2, Book, Bell, HelpCircle, FileText, Trash2 } from 'lucide-react';
import LocationHeader from '../components/LocationHeader';
import useUserLocation from '../hooks/useUserLocation';

const ProfilePage = () => {
    const { locationName, loading } = useUserLocation();
    return (
        <div className="min-h-screen pb-24 px-6 pt-safe-top relative overflow-hidden">
            {/* Background enhancement for premium feel */}
            <div className="absolute top-0 left-0 w-full h-96 bg-primary/20 blur-[100px] pointer-events-none rounded-full -translate-y-1/2"></div>

            {/* Header */}
            <header className="mt-10 relative z-10 animate-fade-in-up [animation-delay:0ms] opacity-0 [animation-fill-mode:forwards]">
                <LocationHeader locationName={locationName} loading={loading} />
            </header>

            {/* Title */}
            <h1 className="text-center text-2xl font-serif text-white tracking-wider mb-24 drop-shadow-md animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">PROFILE</h1>

            {/* Main User Card */}
            <div className="relative mb-8 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
                {/* Avatar - Positioned overlapping the card top */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20">
                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-b from-white/30 to-transparent backdrop-blur-sm">
                        <div className="w-full h-full rounded-full bg-surface border-4 border-background overflow-hidden relative shadow-2xl">
                            {/* Placeholder Avatar Image or Icon */}
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <User size={64} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Content */}
                <div className="bg-primary-gradient rounded-3xl pt-20 pb-6 px-6 shadow-2xl relative overflow-hidden">
                    {/* Decorative texture/noise override could go here */}

                    <div className="absolute top-4 right-4 text-white/80">
                        <Edit2 size={18} />
                    </div>

                    <div className="grid grid-cols-2 gap-y-4 text-white">
                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-1 text-white/70 text-xs">
                                <User size={14} />Name
                            </div>
                            <div className="font-semibold text-sm">John Doe</div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-1 text-white/70 text-xs">
                                <User size={14} />Gender
                            </div>
                            <div className="font-semibold text-sm">Male</div>
                        </div>

                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-1 text-white/70 text-xs">
                                <Calendar size={14} />Birth Date
                            </div>
                            <div className="font-semibold text-sm">29 Feb 2005</div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-1 text-white/70 text-xs">
                                <FileText size={14} />National ID
                            </div>
                            <div className="font-semibold text-sm">11XXXXXXXXXXX</div>
                        </div>

                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-1 text-white/70 text-xs">
                                <Phone size={14} />Phone
                            </div>
                            <div className="font-semibold text-sm">089-999-9999</div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-1 text-white/70 text-xs">
                                <Mail size={14} />Email
                            </div>
                            <div className="font-semibold text-sm underline truncate">johndoe@gmail.com</div>
                        </div>

                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-1 text-white/70 text-xs">
                                <Phone size={14} />Emergency
                            </div>
                            <div className="font-semibold text-sm">099-999-9999</div>
                        </div>
                        <div className="col-span-1 flex items-end">
                            <div className="bg-green-500/20 bg-opacity-30 border border-green-500/50 rounded-full px-3 py-1 flex items-center gap-1">
                                <BadgeCheck size={14} className="text-green-400" />
                                <span className="text-green-100 text-xs font-medium">Verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu Options */}
            <div className="space-y-0.5 animate-fade-in-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
                <MenuOption label="Change PIN" />
                <MenuOption label="Notifications" />
                <MenuOption label="App Terms & Conditions" />
                <MenuOption label="Delete Account" isDestructive />
            </div>

            {/* Log Out */}
            <div className="mt-12 flex justify-end animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
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
