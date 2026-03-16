import React from 'react';
import { CircleHelp, ShieldAlert, Users, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LocationHeader from '../components/LocationHeader';

const SafeHavenHelpPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full bg-black text-white pb-32 px-6 pt-safe-top relative overflow-y-auto overflow-x-hidden">
            <div className="absolute top-0 left-0 w-full h-96 bg-orange-500/25 blur-[100px] pointer-events-none rounded-full -translate-y-1/2" />

            <div className="mt-10 mb-6 relative z-10">
                <LocationHeader
                    locationName="SAFE HAVEN · ABC RESTAURANT"
                    hideProfile={true}
                    helpTo="/safe-haven-help"
                    HelpIcon={CircleHelp}
                />
            </div>

            <h1 className="text-center text-2xl font-sans text-white tracking-wider mb-6 drop-shadow-md relative z-10">
                <div className="flex items-center justify-center gap-2">
                    <CircleHelp className="w-6 h-6 text-white" />
                    SAFE HAVEN HELP
                </div>
            </h1>

            <div className="space-y-6 relative z-10">
                <div className="bg-orange-gradient rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                    <h2 className="text-xl font-bold mb-4 text-white drop-shadow-md">
                        For Business Staff
                    </h2>
                    <div className="space-y-4 text-white/90 text-sm">
                        <div className="border-b border-white/10 pb-4">
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                                <ShieldAlert size={18} className="text-red-300" /> Incoming Alert
                            </h3>
                            <p>
                                When you see the red “Incoming Alert” banner, tap it to open the
                                live map of the person coming to your Safe Haven. Prepare a safe
                                seat and, if possible, have one staff member ready at the
                                entrance.
                            </p>
                        </div>
                        <div className="border-b border-white/10 pb-4">
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                                <Users size={18} className="text-emerald-300" /> Staff Readiness
                            </h3>
                            <p>
                                Make sure at least one trained staff member is available when an
                                alert is active. Follow your internal Safe Haven protocol and keep
                                communication calm and discreet.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                                <MapPin size={18} className="text-blue-300" /> Location Visibility
                            </h3>
                            <p>
                                Keep your storefront lighting on and the Safe Haven sticker
                                visible from the street so incoming users can easily identify your
                                location.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start pt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 rounded-full bg-white/5 text-white/80 hover:bg-white/10 active:scale-95 transition-all text-sm font-medium"
                    >
                        Back to Safe Haven
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SafeHavenHelpPage;

