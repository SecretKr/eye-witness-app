import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Shield, User } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { path: '/home', icon: Home, label: 'Home' },
        { path: '/map', icon: Map, label: 'Map' },
        { path: '/evidence', icon: Shield, label: 'Evidence' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <nav className="z-50 p-3 pointer-events-none w-full">
            <div className="w-full max-w-sm mx-auto bg-primary-gradient rounded-full flex justify-around items-center h-16 pointer-events-auto shadow-2xl px-2">
                {/* Background Blur Layer is handled by 'glass' class - REMOVED, using gradient now */}

                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/50 hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-7 h-7" strokeWidth={2.5} />
                        {/* Label is optional if we prefer icon-only, but design shows icons mostly. Keeping simple for now. */}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
