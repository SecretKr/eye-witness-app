import React from 'react';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const InfoPage = () => {
    return (
        <div className="min-h-screen bg-background text-white p-6 pb-24">
            <header className="flex items-center mb-8">
                <Link to="/" className="mr-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-secondary" />
                    Information
                </h1>
            </header>
            
            <div className="space-y-6">
                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold mb-3 text-secondary">Sexual Harassment Guide</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Sexual harassment includes unwelcome sexual advances, requests for sexual favors, and other verbal or physical harassment of a sexual nature. It can happen anywhere: at work, school, or in public spaces.
                    </p>
                </div>

                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold mb-3 text-secondary">What to do?</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Trust your instincts. If you feel uncomfortable, leave the situation if possible.</li>
                        <li>Call for help or use the Panic Button in this app.</li>
                        <li>Document the incident (time, location, details).</li>
                        <li>Report to authorities.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
