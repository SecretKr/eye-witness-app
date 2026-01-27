import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PanicMapMode = () => {
    return (
        <div className="h-screen w-full bg-black text-white p-6 flex flex-col relative">
            <header className="flex items-center gap-4 mb-6">
                 <Link to="/panic-mode" className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
                    <ArrowLeft size={24} />
                 </Link>
                 <h1 className="text-xl font-bold">Panic Map Mode</h1>
            </header>
            
            <div className="flex-1 flex items-center justify-center bg-gray-900 rounded-xl border border-gray-800">
                <p className="text-gray-500 font-mono">Map Implementation Pending...</p>
            </div>
        </div>
    );
};

export default PanicMapMode;
