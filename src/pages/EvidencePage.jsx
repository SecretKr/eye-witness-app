import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SafetyConfirmationModal from '../components/SafetyConfirmationModal';
import { MapPin, ChevronRight, Menu, HelpCircle } from 'lucide-react';
import { useEvidence } from '../context/EvidenceContext';
import LocationHeader from '../components/LocationHeader';
import useUserLocation from '../hooks/useUserLocation';

const EvidencePage = () => {
    const { incidents } = useEvidence();
    const { locationName, loading } = useUserLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIncidentId, setSelectedIncidentId] = useState(null);

    const handleCardClick = (id) => {
        setSelectedIncidentId(id);
        setIsModalOpen(true);
    };

    const handleConfirmPin = () => {
        setIsModalOpen(false);
        if (selectedIncidentId) {
            navigate(`/incident/${selectedIncidentId}`);
        }
    };

    return (
        <div className="pb-24 px-4 min-h-screen">
            {/* Location Header */}
            <div className="shrink-0 mt-10">
                <LocationHeader locationName={locationName} loading={loading} />
            </div>

            {/* Title */}
            <header className="mb-6 animate-fade-in-up">
                <h1 className="text-3xl font-bold text-white tracking-wide text-center">
                    EVIDENCE VAULT
                </h1>
            </header>

            {/* Incident Cards */}
            <div className="space-y-4">
                {incidents.map((incident, index) => (
                    <div
                        onClick={() => handleCardClick(incident.id)}
                        key={incident.id}
                        className="block animate-fade-in-up opacity-0 [animation-fill-mode:forwards] cursor-pointer"
                        style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                        <div className={`relative p-4 rounded-3xl border border-white/20 group active:scale-[0.98] transition-all overflow-hidden bg-primary-gradient`}>
                            {/* Status Badge */}
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-white">INCIDENT #{incident.id}</h3>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-semibold text-white/90">Status</span>
                                    <span className="text-xs font-bold text-white">{incident.status}</span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-white">
                                <div className="flex gap-2">
                                    <span className="text-xs font-semibold block">Location</span>
                                    <p className="text-xs opacity-90">{incident.location}</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-xs font-semibold block">Timestamp</span>
                                    <p className="text-xs opacity-90">{incident.timestamp}</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-xs font-semibold block">Evidence</span>
                                    <p className="text-xs opacity-90">{incident.evidence}</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-xs font-semibold block">Lawyer involved</span>
                                    <p className="text-xs opacity-90">{incident.lawyer}</p>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="absolute bottom-4 right-4">
                                <ChevronRight size={24} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <SafetyConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmPin}
                subtitle="TO ACCESS EVIDENCE VAULT"
            />
        </div>
    );
};

export default EvidencePage;
