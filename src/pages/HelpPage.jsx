import React from 'react';
import { CircleHelp, ChevronLeft, ShieldAlert, MapPin, MessageSquare, Shield, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LocationHeader from '../components/LocationHeader';
import useUserLocation from '../hooks/useUserLocation';

const HelpPage = () => {
    const navigate = useNavigate();
    const { locationName, loading } = useUserLocation();

    return (
        <div className="h-screen w-full bg-black text-white pb-32 px-6 pt-safe-top relative overflow-y-auto overflow-x-hidden">
            {/* Background enhancement for premium feel */}
            <div className="absolute top-0 left-0 w-full h-96 bg-primary/20 blur-[100px] pointer-events-none rounded-full -translate-y-1/2"></div>

            {/* Header */}
            <div className="mt-10 mb-8 relative z-10 animate-fade-in-up">
                <LocationHeader locationName={locationName} loading={loading} />
            </div>

            <h1 className="text-center text-2xl font-sans text-white tracking-wider mb-8 drop-shadow-md animate-fade-in-up">
                <div className="flex items-center justify-center gap-2">
                    <CircleHelp className="w-6 h-6 text-white" />
                    HELP & SUPPORT
                </div>
            </h1>
            
            <div className="space-y-6 animate-fade-in-up [animation-delay:100ms] relative z-10">
                <div className="bg-primary-gradient rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                    <h2 className="text-xl font-bold mb-4 text-white drop-shadow-md">Features Guide</h2>
                    <div className="space-y-4 text-white/90">
                        <div className="border-b border-white/10 pb-4">
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                                <ShieldAlert size={18} className="text-red-400" /> Panic Button
                            </h3>
                            <p className="text-sm">Hold the red button on the home screen for 3 seconds to activate emergency mode. It will record your surroundings and alert your emergency contacts.</p>
                        </div>
                        <div className="border-b border-white/10 pb-4">
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                                <MapPin size={18} className="text-blue-400" /> Safe Havens
                            </h3>
                            <p className="text-sm">Check the map to find nearby verified safe locations like 24/7 cafes, police stations, and hospitals if you need immediate shelter.</p>
                        </div>
                        <div className="border-b border-white/10 pb-4">
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                                <MessageSquare size={18} className="text-emerald-400" /> Legal Chatbot
                            </h3>
                            <p className="text-sm">Use the AI Legal Assistant to get quick advice on personal safety, emergency situations, or how to properly gather and report evidence.</p>
                        </div>
                        <div className="border-b border-white/10 pb-4">
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                                <FolderOpen size={18} className="text-yellow-400" /> Evidence Vault
                            </h3>
                            <p className="text-sm">Securely store and manage your incident recordings, perpetrator descriptions, and other crucial evidence needed for legal proceedings.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                                <Shield size={18} className="text-purple-400" /> Partnered Lawyers
                            </h3>
                            <p className="text-sm">Connect with verified pro-bono or specialized partnered lawyers who can provide immediate legal counsel and representation based on your evidence vault data.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-primary-gradient rounded-3xl p-6 shadow-2xl relative overflow-hidden animate-fade-in-up [animation-delay:200ms]">
                    <h2 className="text-xl font-bold mb-4 text-white drop-shadow-md">FAQs</h2>
                     <div className="space-y-4 text-white/90">
                        <div className="border-b border-white/10 pb-4">
                            <h3 className="font-bold text-white mb-1">Is my location tracked constantly?</h3>
                            <p className="text-sm">Your location is only actively tracked and shared with emergency contacts when you trigger the Panic Button or explicitly share a live tracking session.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1">How secure is my Evidence Vault?</h3>
                            <p className="text-sm">All media and metadata saved into your Evidence Vault are encrypted. Only you can access them with your PIN, until you explicitly choose to share them with authorities or lawyers.</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start pt-4 animate-fade-in-up [animation-delay:300ms]">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 rounded-full bg-white/5 text-white/70 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center"
                    >
                        <ChevronLeft size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
