import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Clock, Calendar, Shield, Share2, Download } from 'lucide-react';

const IncidentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock Data (matches EvidencePage)
    const incidentData = {
        1: {
            id: 1,
            date: 'Oct 24, 2024',
            time: '22:30',
            location: 'Siam Paragon',
            status: 'Verified',
            description: 'Harassment reported near the north exit. Audio and location data captured securely.',
            evidenceCount: 3,
            locationCoords: '13.7462° N, 100.5350° E'
        },
        2: {
            id: 2,
            date: 'Sep 12, 2024',
            time: '14:15',
            location: 'Central World',
            status: 'Archived',
            description: 'Verbal confrontation recorded. Witness statements appended.',
            evidenceCount: 1,
            locationCoords: '13.7469° N, 100.5387° E'
        }
    };

    const incident = incidentData[id] || incidentData[1]; // Fallback to 1 if ID not found

    return (
        <div className="min-h-screen pb-24 relative bg-background">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4">
                <button
                    onClick={() => navigate('/evidence')}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <ChevronLeft size={24} className="text-white" />
                </button>
                <h1 className="text-lg font-bold text-white">Incident #{id}</h1>
            </header>

            <div className="p-4 space-y-6">
                {/* Status Card */}
                <div className="glass-card">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-xs text-gray-400 block mb-1">STATUS</span>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${incident.status === 'Verified'
                                    ? 'bg-secondary/20 text-secondary border-secondary/50'
                                    : 'bg-gray-700/50 text-gray-300 border-gray-600'
                                }`}>
                                {incident.status}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all outline-none border border-white/10">
                                <Share2 size={18} className="text-purple-400" />
                            </button>
                            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all outline-none border border-white/10">
                                <Download size={18} className="text-blue-400" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Location</p>
                            <p className="font-medium text-white">{incident.location}</p>
                            <p className="text-[10px] text-gray-500 font-mono">{incident.locationCoords}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Date</p>
                            <p className="font-medium text-white">{incident.date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Time</p>
                            <p className="font-medium text-white">{incident.time}</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="glass-card">
                    <h3 className="text-sm font-bold text-gray-300 mb-2">Description</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        {incident.description}
                    </p>
                </div>

                {/* Blockchain Verification */}
                <div className="p-4 rounded-3xl border border-dashed border-gray-700 bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="text-secondary" size={20} />
                        <h3 className="text-sm font-bold text-white">Blockchain Verified</h3>
                    </div>
                    <p className="text-xs text-gray-500 break-all font-mono">
                        0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IncidentPage;
