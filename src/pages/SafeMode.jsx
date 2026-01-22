import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SafeMode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isExplicitlySafe = location.state?.safe;

    useEffect(() => {
        // In a real app, we would verify GPS location here
        if (isExplicitlySafe) {
            // Logic to log safety confirmation
            console.log("User confirmed safety manually");
        }
    }, [isExplicitlySafe]);

    return (
        <div className="h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-secondary/20 to-background text-white relative">
            <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 mx-auto bg-secondary/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12 text-secondary" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Glad you're safe.</h1>
                <p className="text-gray-400 mb-8">
                    {isExplicitlySafe
                        ? "You have marked yourself as safe. Evidence is secured."
                        : "Evidence has been securely saved to the cloud."}
                </p>

                <div className="space-y-4 w-64 mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full btn-primary transform transition hover:scale-105"
                    >
                        Return Home
                    </button>
                    <button
                        onClick={() => navigate('/evidence')}
                        className="w-full py-3 text-sm text-gray-400"
                    >
                        View Evidence
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SafeMode;
