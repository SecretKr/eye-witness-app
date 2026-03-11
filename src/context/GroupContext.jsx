import React, { createContext, useContext, useState, useEffect } from 'react';

const GroupContext = createContext();

export const useGroup = () => {
    const context = useContext(GroupContext);
    if (!context) {
        throw new Error('useGroup must be used within a GroupProvider');
    }
    return context;
};

export const GroupProvider = ({ children }) => {
    const [isSharingLocation, setIsSharingLocation] = useState(() => {
        const saved = localStorage.getItem('eye-witness-location-sharing');
        return saved !== null ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem('eye-witness-location-sharing', JSON.stringify(isSharingLocation));
    }, [isSharingLocation]);

    const toggleLocationSharing = () => {
        setIsSharingLocation(prev => !prev);
    };

    return (
        <GroupContext.Provider value={{
            isSharingLocation,
            toggleLocationSharing,
            setIsSharingLocation
        }}>
            {children}
        </GroupContext.Provider>
    );
};
