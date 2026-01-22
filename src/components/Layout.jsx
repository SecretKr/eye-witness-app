import React from 'react';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const isMapPage = location.pathname === '/map';

    if (isMapPage) {
        return (
            <div className="fixed inset-0 flex flex-col bg-background overflow-hidden">
                <main className="absolute inset-0 z-10">
                    <Outlet />
                </main>
                <Navbar />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen min-h-[100dvh] flex flex-col max-w-md mx-auto bg-background shadow-2xl">
            {/* Mobile container gradient */}
            <div className="absolute inset-0 pointer-events-none" />

            <main className="relative z-10 flex-grow">
                <Outlet />
            </main>
            <Navbar />
        </div>
    );
};

export default Layout;
