import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, Shield, Scale, Camera, Mic, ChevronLeft, Download, Video, Sparkles } from 'lucide-react';
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
                                <label className="block text-l font-sans font-bold text-white mb-3">Video Recording</label>
                                <div className="flex gap-3 mb-4">
                                    <div className="flex-1 bg-black/40 rounded-xl border border-white/10 overflow-hidden aspect-[3/4] relative flex flex-col items-center justify-center">
                                        <Video size={32} className="text-white/40 mb-2" />
                                        <span className="text-xs text-white/60 font-sans font-bold">Front Camera</span>
                                        <div className="absolute top-2 right-2 flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-[10px] font-mono text-white/80">{formatDuration(incident.recordingDuration || '00:00')}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 bg-black/40 rounded-xl border border-white/10 overflow-hidden aspect-[3/4] relative flex flex-col items-center justify-center">
                                        <Video size={32} className="text-white/40 mb-2" />
                                        <span className="text-xs text-white/60 font-sans font-bold">Back Camera</span>
                                        <div className="absolute top-2 right-2 flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-[10px] font-mono text-white/80">{formatDuration(incident.recordingDuration || '00:00')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5"><Shield size={16} className="text-green-500" /></div>
                                        <div className="flex-1 space-y-2">
                                            <p className="text-xs font-sans text-white"><span className="text-white/50 w-24 inline-block">File Name:</span> INCIDENT_VIDEO_{id || '001'}.mp4</p>
                                            <p className="text-xs font-sans text-white"><span className="text-white/50 w-24 inline-block">Date/Time:</span> {incident.date || '12 March 2026'}, {incident.time || '04:05:22'} ICT</p>
                                            <p className="text-xs font-sans text-white"><span className="text-white/50 w-24 inline-block">Location:</span> 13.7563° N, 100.5018° E (Bangkok)</p>
                                            <div className="mt-3 pt-3 border-t border-white/10">
                                                <p className="text-xs font-sans text-white/50 mb-1">Digital Fingerprint (Hash):</p>
                                                <p className="text-xs font-mono text-green-400 break-all bg-green-500/10 p-2 rounded border border-green-500/20">SHA-256: 8f92j9x8m2nb4v5c6x7z8a9s0d1f2g3h4j5k6l7m8n9b0...k92</p>
                                            </div>
                                        </div>
                                    </div>
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

                            <button
                                onClick={() => navigate('/partnered-lawyers')}
                                className="w-full py-3.5 rounded-full bg-orange-gradient font-bold text-white active:scale-95 transition-transform flex items-center justify-center gap-2 border border-white/20"
                            >
                                <Scale size={20} />
                                FIND A PARTNERED LAWYER
                            </button>

                            <button
                                onClick={() => navigate('/chat', { state: { fromIncident: true, incidentData: incident } })}
                                className="w-full py-3.5 rounded-full bg-white/10 font-bold text-white active:scale-95 transition-transform flex items-center justify-center gap-2 border border-white/20 hover:bg-white/20"
                            >
                                <Sparkles size={20} />
                                CHAT WITH AI
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
