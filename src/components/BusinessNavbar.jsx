import React from 'react';
import { Home, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BusinessNavbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="z-50 p-3 pointer-events-none w-full">
            <div className="w-full max-w-sm mx-auto bg-orange-gradient rounded-full flex justify-around items-center h-16 pointer-events-auto shadow-2xl px-2">
                <button
                    onClick={() => navigate('/safe-haven-business')}
                    className="flex flex-col items-center justify-center w-full h-full transition-colors duration-200 text-white hover:text-white"
                >
                    <Home className="w-7 h-7" strokeWidth={2.5} />
                </button>

                <button
                    className="flex flex-col items-center justify-center w-full h-full transition-colors duration-200 text-white/50 hover:text-white"
                >
                    <User className="w-7 h-7" strokeWidth={2.5} />
                </button>
            </div>
        </nav>
    );
};

export default BusinessNavbar;
