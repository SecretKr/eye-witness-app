import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Upload, Mic } from 'lucide-react';
import { useEvidence } from '../context/EvidenceContext';

const IncidentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getIncident } = useEvidence();

    const incident = getIncident(id);

    if (!incident) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Incident Not Found</h1>
                    <button
                        onClick={() => navigate('/evidence')}
                        className="px-6 py-2 bg-white/10 rounded-full border border-white/20"
                    >
                        Back to Evidence Vault
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24 relative bg-background">
            {/* Header with Location */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center gap-3 p-4">
                    <button className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <ChevronLeft size={20} className="text-white" onClick={() => navigate('/evidence')} />
                    </button>
                    <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-teal-500/30 via-purple-500/30 to-purple-600/30 border border-white/20">
                        <MapPin size={18} className="text-white" />
                        <span className="text-white font-semibold text-sm tracking-wide">SAMYAN MITRTOWN</span>
                    </div>
                    <button className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <div className="w-5 h-5 rounded-full bg-white/20" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4">
                {/* Incident Card */}
                <div className="bg-primary-gradient rounded-3xl border border-white/20 p-6 mb-4">
                    <div className="flex items-start justify-between mb-4">
                        <h1 className="text-2xl font-bold text-white">INCIDENT #{id}</h1>
                        <div className="text-right">
                            <span className="text-xs font-semibold text-white/90 block">Status</span>
                            <span className="text-xs font-bold text-white">{incident.status}</span>
                        </div>
                    </div>

                    {/* Reporter Information */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-white block">Reporter name</label>
                            <input
                                type="text"
                                className="flex-1 rounded bg-white/10 text-white placeholder-white/50 px-2 py-1 focus:outline-none focus:border-white/60 transition-colors"
                                defaultValue={incident.reporterName}
                                readOnly
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-white block">National ID</label>
                            <input
                                type="text"
                                className="flex-1 rounded bg-white/10 text-white placeholder-white/50 px-2 py-1 focus:outline-none focus:border-white/60 transition-colors"
                                defaultValue={incident.nationalId}
                                readOnly
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-white block">Telephone Number</label>
                            <input
                                type="tel"
                                className="flex-1 rounded bg-white/10 text-white placeholder-white/50 px-2 py-1 focus:outline-none focus:border-white/60 transition-colors"
                                defaultValue={incident.telephone}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/40 my-2"></div>

                    {/* Location and Time */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-white block">Location of Incident</label>
                            <input
                                type="text"
                                className="flex-1 rounded bg-white/10 text-white placeholder-white/50 px-2 py-1 focus:outline-none focus:border-white/60 transition-colors"
                                defaultValue={incident.location}
                                readOnly
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className='flex w-full items-center gap-2'>
                                <label className="text-sm font-semibold text-white block">Date</label>
                                <input
                                    type="text"
                                    className="w-full rounded bg-white/10 text-white placeholder-white/50 px-2 py-1 focus:outline-none focus:border-white/60 transition-colors"
                                    defaultValue={incident.date}
                                    readOnly
                                />
                            </div>
                            <div className='flex w-full items-center gap-2'>
                                <label className="text-sm font-semibold text-white block">Time</label>
                                <input
                                    type="text"
                                    className="w-full rounded bg-white/10 text-white placeholder-white/50 px-2 py-1 focus:outline-none focus:border-white/60 transition-colors"
                                    defaultValue={incident.time}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <label className="text-sm font-semibold text-white block">Type of Incident</label>
                            <input
                                type="text"
                                className="flex-1 rounded bg-white/10 text-white placeholder-white/50 px-2 py-1 focus:outline-none focus:border-white/60 transition-colors"
                                defaultValue={incident.type}
                                readOnly
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label className="text-sm font-semibold text-white block">Context</label>
                            <input
                                type="text"
                                className="flex-1 rounded bg-white/10 text-white placeholder-white/50 px-2 py-1 focus:outline-none focus:border-white/60 transition-colors"
                                defaultValue={incident.context}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/40 my-2"></div>

                    {/* Photos Section */}
                    <div className="flex mb-2 gap-2">
                        <label className="w-20 text-sm font-semibold text-white block mb-2">Photos</label>
                        <div className="flex-1 h-16 bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center">
                            <Upload className="text-white/40" size={32} />
                        </div>
                    </div>

                    {/* Recording Section */}
                    <div className="flex mb-2 gap-2">
                        <label className="w-20 text-sm font-semibold text-white block mb-2">Recording</label>
                        <div className="flex-1 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center px-4 gap-3">
                            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                                <Mic size={16} className="text-red-400" />
                            </div>
                            <div className="flex-1">
                                <div className="h-6 flex items-center gap-0.5">
                                    {[...Array(15)].map((_, i) => (
                                        <div key={i} className="w-1 bg-white/40 rounded-full" style={{ height: `${Math.random() * 80 + 20}%` }} />
                                    ))}
                                </div>
                            </div>
                            <span className="text-xs font-mono text-white/80">{incident.recordingDuration || '00:00'}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/40 my-2"></div>

                    {/* Perpetrator Description */}
                    <div className="space-y-2 mb-2">
                        <h3 className="text-sm font-semibold text-white">Perpetrator Description</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-white/80 block mb-2">Gender</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/10 rounded text-white placeholder-white/50 px-2 py-1 text-sm focus:outline-none focus:border-white/60 transition-colors"
                                    defaultValue={incident.perpetratorGender}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-white/80 block mb-2">Age</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/10 rounded text-white placeholder-white/50 px-2 py-1 text-sm focus:outline-none focus:border-white/60 transition-colors"
                                    defaultValue={incident.perpetratorAge}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-white/80 block mb-2">Height</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/10 rounded text-white placeholder-white/50 px-2 py-1 text-sm focus:outline-none focus:border-white/60 transition-colors"
                                    defaultValue={incident.perpetratorHeight}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-semibold text-white block">Clothing</label>
                            <input
                                type="text"
                                className="w-full bg-white/10 rounded text-white placeholder-white/50 px-2 py-1 focus:outline-none focus:border-white/60 transition-colors"
                                defaultValue={incident.perpetratorClothing}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mt-6 text-center">
                        <button className="w-[80%] py-3.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-sm shadow-lg active:scale-[0.98] transition-transform">
                            FAQs
                        </button>
                        <button className="w-[80%] py-3.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold text-sm shadow-lg active:scale-[0.98] transition-transform">
                            PARTNERED LAWYERS
                        </button>
                        <button className="w-[80%] py-3.5 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white font-bold text-sm shadow-lg active:scale-[0.98] transition-transform">
                            <div className="flex items-center justify-center gap-2">
                                <Upload size={18} />
                                Export Document
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncidentPage;
