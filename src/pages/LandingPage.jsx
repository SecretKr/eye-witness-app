import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#eeebe3] p-6">
            <h1 className="text-6xl font-black text-[#1c4e89] mb-12 font-['Inter'] tracking-tighter">EYE-WITNESS</h1>
            <h2 className="text-2xl font-bold text-[#1c4e89] mb-4">I am a</h2>
            
            <div className="flex flex-col gap-6 w-full max-w-xs">
                <button
                    onClick={() => navigate('/home')}
                    className="cursor-pointer w-full bg-primary-gradient text-white py-4 rounded-full text-xl font-bold shadow-lg transform transition-transform active:scale-95"
                >
                    User
                </button>
                
                <button
                    onClick={() => navigate('/safe-haven-business')}
                    className="cursor-pointer w-full bg-orange-gradient text-white py-4 rounded-full text-xl font-bold shadow-lg transform transition-transform active:scale-95"
                >
                    Safe Haven Business
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
