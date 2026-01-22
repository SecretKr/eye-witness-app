import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, ChevronRight } from 'lucide-react';

const EvidencePage = () => {
    const incidents = [
        { id: 1, date: 'Oct 24', time: '22:30', location: 'Siam Paragon', status: 'Verified' },
        { id: 2, date: 'Sep 12', time: '14:15', location: 'Central World', status: 'Archived' },
    ];

    return (
        <div className="pb-24 px-4">
            <header className="mb-8 pt-6 animate-fade-in-up">
                <h1 className="text-2xl font-black text-white tracking-widest text-center">
                    EVIDENCE <span className="text-purple-400">VAULT</span>
                </h1>
                <p className="text-[10px] text-gray-500 text-center font-bold uppercase tracking-[0.3em] mt-1">Legally credible storage</p>
            </header>

            <div className="space-y-4">
                {incidents.map((incident, index) => (
                    <Link
                        to={`/incident/${incident.id}`}
                        key={incident.id}
                        className="block animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
                        style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                        <div className="glass-card flex items-center justify-between group active:scale-[0.98] transition-all border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 group-hover:border-purple-500/50 transition-colors">
                                    <FileText className="text-purple-400" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-white text-sm">Incident #{incident.id}</h3>
                                    <p className="text-[10px] text-gray-400 font-medium">{incident.location}</p>
                                    <p className="text-[10px] text-gray-500 font-mono tracking-tighter">{incident.date} • {incident.time}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-3">
                                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold tracking-wider uppercase border ${incident.status === 'Verified'
                                        ? 'bg-secondary/10 text-secondary border-secondary/30'
                                        : 'bg-gray-500/10 text-gray-400 border-gray-500/30'
                                    }`}>
                                    {incident.status}
                                </span>
                                <ChevronRight size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </Link>
                ))}

                <div className="mt-12 p-6 rounded-[2rem] border border-dashed border-white/10 text-center bg-white/[0.01] animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
                    <Shield className="mx-auto text-gray-600 mb-3 w-8 h-8 opacity-50" />
                    <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">All evidence is encrypted and stored securely on the <span className="text-gray-400">Arweave Permaweb</span>.</p>
                </div>
            </div>
        </div>
    );
};

export default EvidencePage;
