import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Camera, Mic, HelpCircle, Shield, Scale } from 'lucide-react';
import LocationHeader from '../components/LocationHeader';
import PerpetratorDescriptionModal from '../components/PerpetratorDescriptionModal';
import { useEvidence } from '../context/EvidenceContext';

const IncidentFormPage = () => {
    const navigate = useNavigate();
    const locationState = useLocation();
    const { saveIncident } = useEvidence();
    const recordingData = locationState.state?.recordingData;

    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [perpetratorData, setPerpetratorData] = useState({
        gender: '',
        age: '',
        height: '',
        clothing: ''
    });

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Mock initial data - in real app this would come from context/state
    const [formData, setFormData] = useState({
        reporterName: 'John Doe',
        nationalId: '1-1002-12345-12-1',
        telephone: '081-234-5678',
        location: recordingData?.location || 'Samyan Mitrtown',
        proximity: '',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'Harassment',
        context: ''
    });

    const handleSaveToVault = () => {
        const incidentToSave = {
            ...formData,
            perpetratorGender: perpetratorData.gender,
            perpetratorAge: perpetratorData.age,
            perpetratorHeight: perpetratorData.height,
            perpetratorClothing: perpetratorData.clothing,
            evidence: 'Audio Recording',
            recordingDuration: recordingData ? formatDuration(recordingData.duration) : '00:00',
            lawyer: '-'
        };
        saveIncident(incidentToSave);
        navigate('/evidence');
    };

    const handlePerpetratorSubmit = (data) => {
        setPerpetratorData(data);
    };

    return (
        <div className="h-full w-full bg-black text-white flex flex-col overflow-hidden">
            <div className="z-20 pt-4 px-4 pb-2 shrink-0">
                <LocationHeader locationName="SAMYAN MITRTOWN" />
            </div>

            <div className="flex-1 px-4 pb-4 overflow-y-auto">
                <div className="w-full min-h-full bg-primary-gradient rounded-[2rem] p-6 animate-fade-in-up shadow-2xl border border-white/10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-serif font-bold text-white drop-shadow-md leading-tight">
                            PROVIDE MORE<br />INFORMATION
                        </h1>
                    </div>

                    <div className="space-y-6 animate-fade-in-up [animation-delay:100ms]">

                        {/* Reporter Info Section */}
                        <div className="space-y-3">
                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-serif font-bold text-white mb-1">Reporter name</label>
                                <input
                                    type="text"
                                    value={formData.reporterName}
                                    readOnly
                                    className="w-full bg-transparent text-white/90 focus:outline-none font-sans text-sm"
                                />
                            </div>
                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-serif font-bold text-white mb-1">National ID</label>
                                <input
                                    type="text"
                                    value={formData.nationalId}
                                    readOnly
                                    className="w-full bg-transparent text-white/90 focus:outline-none font-sans text-sm"
                                />
                            </div>
                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-serif font-bold text-white mb-1">Telephone Number</label>
                                <input
                                    type="text"
                                    value={formData.telephone}
                                    readOnly
                                    className="w-full bg-transparent text-white/90 focus:outline-none font-sans text-sm"
                                />
                            </div>
                        </div>

                        <div className="h-px w-full bg-white/40 my-4" />

                        {/* Incident Details Section */}
                        <div className="space-y-3">
                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-serif font-bold text-white mb-1">Location of Incident</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full bg-transparent text-white/90 focus:outline-none font-sans text-sm placeholder-white/50"
                                />
                            </div>
                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-serif font-bold text-white mb-1">Location in Proximity</label>
                                <input
                                    type="text"
                                    value={formData.proximity}
                                    onChange={(e) => setFormData({ ...formData, proximity: e.target.value })}
                                    className="w-full bg-transparent text-white/90 focus:outline-none font-sans text-sm placeholder-white/50"
                                />
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 border-b border-white/30 pb-1">
                                    <label className="block text-sm font-serif font-bold text-white mb-1">Date</label>
                                    <input
                                        type="text"
                                        value={formData.date}
                                        readOnly
                                        className="w-full bg-transparent text-white/90 focus:outline-none font-sans text-sm"
                                    />
                                </div>
                                <div className="flex-1 border-b border-white/30 pb-1">
                                    <label className="block text-sm font-serif font-bold text-white mb-1">Time</label>
                                    <input
                                        type="text"
                                        value={formData.time}
                                        readOnly
                                        className="w-full bg-transparent text-white/90 focus:outline-none font-sans text-sm"
                                    />
                                </div>
                            </div>

                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-serif font-bold text-white mb-1">Type of Incident</label>
                                <input
                                    type="text"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full bg-transparent text-white/90 focus:outline-none font-sans text-sm placeholder-white/50"
                                />
                            </div>
                            <div className="border-b border-white/30 pb-1">
                                <label className="block text-sm font-serif font-bold text-white mb-1">Context</label>
                                <textarea
                                    value={formData.context}
                                    onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                                    rows={2}
                                    className="w-full bg-transparent text-white/90 focus:outline-none font-sans text-sm resize-none placeholder-white/50"
                                    placeholder="Describe the incident..."
                                />
                            </div>
                        </div>

                        <div className="h-px w-full bg-white/40 my-4" />

                        {/* Media Section */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-l font-serif font-bold text-white mb-3">Photos</label>
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    <button className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 shrink-0 active:scale-95 transition-transform">
                                        <Camera className="text-white/80" />
                                    </button>
                                    {/* Placeholder for captured photos */}
                                </div>
                            </div>

                            <div>
                                <label className="block text-l font-serif font-bold text-white mb-3">Recording</label>
                                <div className="w-full bg-black/20 rounded-xl p-3 flex items-center gap-3 border border-white/10">
                                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                        <Mic size={20} className="text-red-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-8 flex items-center gap-0.5">
                                            {/* Fake waveform */}
                                            {[...Array(20)].map((_, i) => (
                                                <div key={i} className="w-1 bg-white/40 rounded-full" style={{ height: `${Math.random() * 100}%` }} />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-white/80">
                                        {recordingData ? formatDuration(recordingData.duration) : '00:00'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px w-full bg-white/40 my-4" />

                        {/* Perpetrator Description Section */}
                        <div onClick={() => setIsDescriptionModalOpen(true)} className="cursor-pointer group">
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-l font-serif font-bold text-white">Perpetrator Description</label>
                                <span className="text-xs bg-white/20 px-2 py-1 rounded text-white group-hover:bg-white/30 transition-colors">Edit</span>
                            </div>

                            <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                                <div>
                                    <label className="block text-l font-serif font-bold text-white mb-1">Gender</label>
                                    <p className="text-sm font-sans text-white/80 min-h-[1.25rem]">{perpetratorData.gender || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-l font-serif font-bold text-white mb-1">Age</label>
                                    <p className="text-sm font-sans text-white/80 min-h-[1.25rem]">{perpetratorData.age || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-l font-serif font-bold text-white mb-1">Height</label>
                                    <p className="text-sm font-sans text-white/80 min-h-[1.25rem]">{perpetratorData.height || '-'}</p>
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-l font-serif font-bold text-white mb-1">Clothing</label>
                                    <p className="text-sm font-sans text-white/80 min-h-[1.25rem]">{perpetratorData.clothing || '-'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-6">
                            <button className="w-full py-3.5 rounded-full bg-yellow-gradient font-bold text-white active:scale-95 transition-transform flex items-center justify-center gap-2">
                                <HelpCircle size={20} />
                                FAQs
                            </button>

                            {/* <button
                                onClick={() => navigate('/partnered-lawyers')}
                                className="w-full py-3.5 rounded-full bg-orange-gradient font-bold text-white active:scale-95 transition-transform flex items-center justify-center gap-2">
                                <Scale size={20} />
                                PARTNERED LAWYERS
                            </button> */}

                            <button
                                onClick={handleSaveToVault}
                                className="w-full py-3.5 rounded-full bg-green-gradient font-bold text-white active:scale-95 transition-transform flex items-center justify-center gap-2"
                            >
                                <Shield size={20} />
                                SAVE TO EVIDENCE VAULT
                            </button>
                        </div>

                    </div>

                </div>
            </div>

            <PerpetratorDescriptionModal
                isOpen={isDescriptionModalOpen}
                onClose={() => setIsDescriptionModalOpen(false)}
                onSubmit={handlePerpetratorSubmit}
                initialData={perpetratorData}
            />
        </div>
    );
};

export default IncidentFormPage;
