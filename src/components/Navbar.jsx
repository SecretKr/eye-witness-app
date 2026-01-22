import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Shield, User } from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/map', icon: Map, label: 'Map' },
        { path: '/evidence', icon: Shield, label: 'Evidence' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 p-3 pointer-events-none">
            <div className="glass rounded-full flex justify-around items-center h-14 max-w-md mx-auto relative overflow-hidden pointer-events-auto">
                {/* Background Blur Layer is handled by 'glass' class */}

                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors duration-200 ${isActive ? 'text-secondary' : 'text-gray-400 hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-6 h-6 mb-1" />
                        {/* Label is optional if we prefer icon-only, but design shows icons mostly. Keeping simple for now. */}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
