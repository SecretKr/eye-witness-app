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
                <div className="absolute bottom-0 left-0 right-0 z-50">
                    <Navbar />
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex flex-col max-w-md mx-auto bg-background shadow-2xl overflow-hidden">
            {/* Mobile container gradient */}
            <div className="absolute inset-0 pointer-events-none" />

            <main className="relative z-10 flex-grow overflow-y-auto no-scrollbar">
                <Outlet />
            </main>
            <div className="shrink-0">
                <Navbar />
            </div>
        </div>
    );
};

export default Layout;
