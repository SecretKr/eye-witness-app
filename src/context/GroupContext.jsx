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
    // UI-only toggle state (switch position). Real sharing stays enabled.
    const [isSharingLocationUi, setIsSharingLocationUi] = useState(() => {
        const saved = localStorage.getItem('eye-witness-location-sharing');
        return saved !== null ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem('eye-witness-location-sharing', JSON.stringify(isSharingLocationUi));
    }, [isSharingLocationUi]);

    const toggleLocationSharing = () => {
        setIsSharingLocationUi(prev => !prev);
    };

    return (
        <GroupContext.Provider value={{
            // Real sharing flag is always on (toggle should not change behavior).
            isSharingLocation: true,
            // UI-only state for switch animation / styling.
            isSharingLocationUi,
            toggleLocationSharing,
            setIsSharingLocation: () => {},
            setIsSharingLocationUi
        }}>
            {children}
        </GroupContext.Provider>
    );
};
