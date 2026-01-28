import React from 'react';
import { Home, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BusinessNavbar = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
             <div className="h-20 w-fit mx-auto bg-orange-gradient rounded-full px-12 flex items-center gap-20 shadow-2xl border border-white/10">
                <button onClick={() => navigate('/')} className="p-2 hover:scale-110 transition-transform cursor-pointer">
                    <Home size={32} className="fill-white text-white" />
                </button>
                <button className="p-2 hover:scale-110 transition-transform opacity-50 cursor-pointer">
                     <User size={32} className="fill-white text-white" />
                </button>
            </div>
        </div>
    );
};

export default BusinessNavbar;
