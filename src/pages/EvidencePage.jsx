import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight, Menu, HelpCircle } from 'lucide-react';
import { useEvidence } from '../context/EvidenceContext';

const EvidencePage = () => {
    const { incidents } = useEvidence();

    return (
        <div className="pb-24 px-4 min-h-screen">
            {/* Location Header */}
            <div className="flex items-center gap-3 mb-6 pt-4">
                <button className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Menu size={20} className="text-white" />
                </button>
                <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-teal-500/30 via-purple-500/30 to-purple-600/30 border border-white/20">
                    <MapPin size={18} className="text-white" />
                    <span className="text-white font-semibold text-sm tracking-wide">SAMYAN MITRTOWN</span>
                </div>
                <button className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <HelpCircle size={20} className="text-white" />
                </button>
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
                    <Link
                        to={`/incident/${incident.id}`}
                        key={incident.id}
                        className="block animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
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
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EvidencePage;
