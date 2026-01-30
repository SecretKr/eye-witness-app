import React, { createContext, useContext, useState, useEffect } from 'react';

const EvidenceContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useEvidence = () => {
    const context = useContext(EvidenceContext);
    if (!context) {
        throw new Error('useEvidence must be used within an EvidenceProvider');
    }
    return context;
};

export const EvidenceProvider = ({ children }) => {
    const [incidents, setIncidents] = useState(() => {
        const saved = localStorage.getItem('eye-witness-incidents');
        return saved ? JSON.parse(saved) : [
            {
                id: 1,
                location: 'BTS Onnut - Phra Khanong, Khlong Toei, Bangkok 10110',
                timestamp: '14 Jan 2025, 17:00 p.m - 17:17 p. m.',
                evidence: 'CCTV, Audio Recording',
                lawyer: 'Saul Goodman',
                status: 'Case Closed',
                reporterName: 'John Doe',
                nationalId: '1-1002-12345-12-1',
                telephone: '081-234-5678',
                type: 'Harassment',
                context: 'Initial sample incident'
            }
        ];
    });

    const [currentRecording, setCurrentRecording] = useState(null);

    useEffect(() => {
        localStorage.setItem('eye-witness-incidents', JSON.stringify(incidents));
    }, [incidents]);

    const startRecording = (location) => {
        setCurrentRecording({
            startTime: Date.now(),
            location: location || 'SAMYAN MITRTOWN',
            duration: 0
        });
    };

    const stopRecording = () => {
        if (!currentRecording) return null;
        const duration = Math.floor((Date.now() - currentRecording.startTime) / 1000);
        const finalRecording = { ...currentRecording, duration };
        setCurrentRecording(null);
        return finalRecording;
    };

    const saveIncident = (incidentData) => {
        const newIncident = {
            ...incidentData,
            id: incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1,
            status: 'Case Opened',
            timestamp: new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        };
        setIncidents(prev => [newIncident, ...prev]);
        return newIncident;
    };

    const getIncident = (id) => {
        return incidents.find(i => i.id === parseInt(id));
    };

    return (
        <EvidenceContext.Provider value={{
            incidents,
            currentRecording,
            startRecording,
            stopRecording,
            saveIncident,
            getIncident
        }}>
            {children}
        </EvidenceContext.Provider>
    );
};
