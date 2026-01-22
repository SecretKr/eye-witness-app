import React from 'react';
import { User, Settings, Phone, Lock } from 'lucide-react';

const ProfilePage = () => {
    return (
        <div className="pb-20">
            <header className="mb-8 pt-2 text-center">
                <h1 className="text-white font-bold tracking-widest text-lg">PROFILE</h1>
            </header>

            <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-teal-400 p-1 mb-4 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    <div className="w-full h-full rounded-full bg-surface border-4 border-background overflow-hidden relative">
                        <User size={48} className="absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-400" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white">Alex Citizen</h2>
                <p className="text-gray-400 text-sm">Target Protected</p>
            </div>

            <div className="space-y-3">
                <div className="glass-card flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400"><User size={20} /></div>
                    <div className="flex-1">
                        <h3 className="font-semibold">Personal Information</h3>
                        <p className="text-xs text-gray-400">Name, Age, Medical ID</p>
                    </div>
                </div>

                <div className="glass-card flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-red-500/20 text-red-400"><Phone size={20} /></div>
                    <div className="flex-1">
                        <h3 className="font-semibold">Emergency Contacts</h3>
                        <p className="text-xs text-gray-400">3 Trusted Contacts Configured</p>
                    </div>
                </div>

                <div className="glass-card flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-green-500/20 text-green-400"><Lock size={20} /></div>
                    <div className="flex-1">
                        <h3 className="font-semibold">Security & Privacy</h3>
                        <p className="text-xs text-gray-400">FaceID, PIN, Cloud Backup</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <button className="text-red-500 text-sm font-semibold hover:text-red-400">Log Out</button>
            </div>
        </div>
    );
};

export default ProfilePage;
