import React from 'react';
import { Home, User, BookOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const BusinessNavbar = () => {
    return (
        <nav className="z-50 p-3 pointer-events-none w-full">
            <div className="w-full max-w-sm mx-auto bg-orange-gradient rounded-full flex justify-around items-center h-16 pointer-events-auto shadow-2xl px-2">
                <NavLink
                    to="/safe-haven-business"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                            isActive ? "text-white" : "text-white/50 hover:text-white"
                        }`
                    }
                >
                    <Home className="w-7 h-7" strokeWidth={2.5} />
                </NavLink>

                <NavLink
                    to="/safe-haven-protocol"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                            isActive ? "text-white" : "text-white/50 hover:text-white"
                        }`
                    }
                >
                    <BookOpen className="w-7 h-7" strokeWidth={2.5} />
                </NavLink>

                <NavLink
                    to="/safe-haven-profile"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                            isActive ? "text-white" : "text-white/50 hover:text-white"
                        }`
                    }
                >
                    <User className="w-7 h-7" strokeWidth={2.5} />
                </NavLink>
            </div>
        </nav>
    );
};

export default BusinessNavbar;
