import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, Shield, Scale, Camera, Mic, ChevronLeft, Download } from 'lucide-react';
import { useEvidence } from '../context/EvidenceContext';
import LocationHeader from '../components/LocationHeader';

const IncidentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getIncident } = useEvidence();

    const incident = getIncident(id);

    const formatDuration = (seconds) => {
        if (typeof seconds === 'string') return seconds;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const [waveform] = useState(() => [...Array(20)].map(() => Math.random() * 80 + 20));

    if (!incident) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-black">
                <div className="text-center">
                    <h1 className="text-2xl font-sans font-bold mb-4">Incident Not Found</h1>
                    <button
                        onClick={() => navigate('/evidence')}
                        className="px-6 py-2 bg-white/10 rounded-full border border-white/20 font-sans"
                    >
                        Back to Evidence Vault
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col overflow-hidden">
            <div className="z-20 pt-4 px-4 pb-2 shrink-0 mt-5">
                <LocationHeader locationName="SAMYAN MITRTOWN" />
            </div>

            <div className="flex-1 px-4 pb-4 mb-20 overflow-y-auto">
                <div className="w-full min-h-full bg-primary-gradient rounded-[2rem] p-6 animate-fade-in-up shadow-2xl border border-white/10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-sans font-bold text-white drop-shadow-md leading-tight uppercase">
                            INCIDENT #{id}
                        </h1>
                        <div className="mt-2">
                            <span className="text-xs font-sans font-bold text-white/90 uppercase tracking-widest">Status: </span>
                            <span className="text-xs font-sans font-bold text-white uppercase">{incident.status}</span>
                        </div>
                    </div>

                    <div className="space-y-6 animate-fade-in-up [animation-delay:100ms]">

                        {/* Reporter Info Section */}
                        <div className="space-y-3">
                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-sans font-bold text-white mb-1">Reporter name</label>
                                <div className="w-full bg-transparent text-white/90 font-sans text-sm">
                                    {incident.reporterName}
                                </div>
                            </div>
                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-sans font-bold text-white mb-1">National ID</label>
                                <div className="w-full bg-transparent text-white/90 font-sans text-sm">
                                    {incident.nationalId}
                                </div>
                            </div>
                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-sans font-bold text-white mb-1">Telephone Number</label>
                                <div className="w-full bg-transparent text-white/90 font-sans text-sm">
                                    {incident.telephone}
                                </div>
                            </div>
                        </div>

                        <div className="h-px w-full bg-white/40 my-4" />

                        {/* Incident Details Section */}
                        <div className="space-y-3">
                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-sans font-bold text-white mb-1">Location of Incident</label>
                                <div className="w-full bg-transparent text-white/90 font-sans text-sm">
                                    {incident.location}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 border-b border-white/30 pb-1">
                                    <label className="block text-sm font-sans font-bold text-white mb-1">Date</label>
                                    <div className="w-full bg-transparent text-white/90 font-sans text-sm">
                                        {incident.date}
                                    </div>
                                </div>
                                <div className="flex-1 border-b border-white/30 pb-1">
                                    <label className="block text-sm font-sans font-bold text-white mb-1">Time</label>
                                    <div className="w-full bg-transparent text-white/90 font-sans text-sm">
                                        {incident.time}
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-sans font-bold text-white mb-1">Type of Incident</label>
                                <div className="w-full bg-transparent text-white/90 font-sans text-sm">
                                    {incident.type}
                                </div>
                            </div>
                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-sans font-bold text-white mb-1">Context</label>
                                <div className="w-full bg-transparent text-white/90 font-sans text-sm min-h-[3rem]">
                                    {incident.context || '-'}
                                </div>
                            </div>
                        </div>

                        <div className="h-px w-full bg-white/40 my-4" />

                        {/* Media Section */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-l font-sans font-bold text-white mb-3">Photos</label>
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shrink-0">
                                        <Camera className="text-white/40" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-l font-sans font-bold text-white mb-3">Recording</label>
                                <div className="w-full bg-black/20 rounded-xl p-3 flex items-center gap-3 border border-white/10">
                                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                        <Mic size={20} className="text-red-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-8 flex items-center gap-0.5">
                                            {waveform.map((h, i) => (
                                                <div key={i} className="w-1 bg-white/40 rounded-full" style={{ height: `${h}%` }} />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-white/80">
                                        {formatDuration(incident.recordingDuration || '00:00')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px w-full bg-white/40 my-4" />

                        {/* Perpetrator Description Section */}
                        <div className="space-y-4">
                            <label className="block text-l font-sans font-bold text-white">Perpetrator Description</label>

                            <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                                <div>
                                    <label className="block text-l font-sans font-bold text-white mb-1">Gender</label>
                                    <p className="text-sm font-sans text-white/80 min-h-[1.25rem]">{incident.perpetratorGender || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-l font-sans font-bold text-white mb-1">Age</label>
                                    <p className="text-sm font-sans text-white/80 min-h-[1.25rem]">{incident.perpetratorAge || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-l font-sans font-bold text-white mb-1">Height</label>
                                    <p className="text-sm font-sans text-white/80 min-h-[1.25rem]">{incident.perpetratorHeight || '-'}</p>
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-l font-sans font-bold text-white mb-1">Clothing</label>
                                    <p className="text-sm font-sans text-white/80 min-h-[1.25rem]">{incident.perpetratorClothing || '-'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-6">
                            <button className="w-full py-3.5 rounded-full bg-yellow-gradient font-bold text-white active:scale-95 transition-transform flex items-center justify-center gap-2">
                                <HelpCircle size={20} />
                                FAQs
                            </button>

                            <button
                                className="w-full py-3.5 rounded-full bg-red-gradient font-bold text-white active:scale-95 transition-transform flex items-center justify-center gap-2">
                                <Download size={20} />
                                EXPORT EVIDENCE
                            </button>

                            <div className="flex justify-left pt-2">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="p-3 rounded-full bg-white/5 text-white/70 hover:bg-white/10 active:scale-95 transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default IncidentPage;
