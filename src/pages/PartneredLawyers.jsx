import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsLeft, Phone, Mail } from 'lucide-react';
import LocationHeader from '../components/LocationHeader';

const PartneredLawyers = () => {
    const navigate = useNavigate();

    // Mock Data for Lawyers
    const lawyers = [
        {
            id: 1,
            name: 'Lawyer James Smith',
            tel: '081-111-2222',
            contact: 'james.smith@lawfirm.com',
            image: null 
        },
        {
            id: 2,
            name: 'Lawyer Sarah Johnson',
            tel: '089-333-4444',
            contact: 'sarah.j@legalhelp.co',
            image: null
        },
        {
            id: 3,
            name: 'Lawyer David Williams',
            tel: '02-555-6666',
            contact: 'david.w@justice.org',
            image: null
        },
        {
            id: 4,
            name: 'Lawyer Emily Brown',
            tel: '086-777-8888',
            contact: 'emily.brown@counsel.net',
            image: null
        }
    ];

    return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="z-20 pt-4 px-4 pb-2 shrink-0">
                 <LocationHeader locationName="SAMYAN MITRTOWN" />
                 <div className="text-center mt-4 mb-2">
                    <h1 className="text-2xl font-sans font-bold text-white tracking-wide uppercase">
                        PARTNERED LAWYER<br/>AND LAWFIRMS
                    </h1>
                 </div>
            </div>

            {/* Content List */}
            <div className="flex-1 px-4 pb-4 overflow-y-auto space-y-4">
                {lawyers.map((lawyer) => (
                    <div key={lawyer.id} className="w-full bg-primary-gradient rounded-xl p-4 flex items-center gap-4 shadow-lg border border-white/10 animate-fade-in-up">
                         {/* Avatar Placeholder */}
                        <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center shrink-0 border-2 border-white/20">
                            <span className="text-purple-600 font-bold text-2xl">
                                {lawyer.image ? <img src={lawyer.image} alt={lawyer.name} className="w-full h-full object-cover rounded-full" /> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-purple-800"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" /></svg>}
                            </span>
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-sans font-medium text-white mb-1 truncate">{lawyer.name}</h3>
                            <div className="flex items-center gap-2 text-white/90 text-sm mb-0.5">
                                <span className="font-bold">Tel</span>
                                <span>{lawyer.tel}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/90 text-sm truncate">
                                <span>{lawyer.contact}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Back Button */}
            <div className="p-4 shrink-0 pb-8">
                 <button 
                    onClick={() => navigate('/incident-form')}
                    className="flex items-center text-white/80 hover:text-white transition-colors"
                >
                    <ChevronsLeft size={32} />
                </button>
            </div>
        </div>
    );
};

export default PartneredLawyers;
