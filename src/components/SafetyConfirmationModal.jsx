import React, { useState, useEffect } from "react";
import { X, Delete } from "lucide-react";

const SafetyConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm,
    title = (
        <>
            ENTER PIN
            <br />
            OR
            <br />
            FACE ID
        </>
    ),
    subtitle = "TO CONFIRM YOU ARE SAFE"
}) => {
    const [pin, setPin] = useState("");
    const pinLength = 6;

    useEffect(() => {
        if (isOpen) {
            setPin("");
        }
    }, [isOpen]);

    const handleNumberClick = (num) => {
        if (pin.length < pinLength) {
            const newPin = pin + num;
            setPin(newPin);
            if (newPin.length === pinLength) {
                // Auto-confirm when full
                setTimeout(() => {
                    onConfirm();
                }, 300);
            }
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative w-[90%] max-w-sm rounded-[32px] overflow-hidden p-8 flex flex-col items-center bg-primary-gradient shadow-2xl animate-in zoom-in-95 duration-200">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/80 hover:text-white"
                >
                    <X size={24} />
                </button>

                {/* Title */}
                <div className="text-center mb-8 mt-4">
                    <h2 className="text-3xl font-serif font-bold text-white leading-tight">
                        {title}
                    </h2>
                    <p className="text-xs uppercase tracking-widest text-white/80 mt-2 font-medium">
                        {subtitle}
                    </p>
                </div>

                {/* Pin Circles */}
                <div className="flex gap-4 mb-10">
                    {[...Array(pinLength)].map((_, i) => (
                        <div 
                            key={i}
                            className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-200 ${
                                i < pin.length ? "bg-white" : "bg-transparent"
                            }`}
                        />
                    ))}
                </div>


                {/* Keypad */}
                <div className="grid grid-cols-3 gap-y-4 gap-x-8 w-full max-w-[280px]">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleNumberClick(num)}
                            className="w-16 h-16 rounded-full bg-white text-secondary text-3xl font-bold flex items-center justify-center active:scale-95 transition-transform mx-auto shadow-lg"
                        >
                            {num}
                        </button>
                    ))}
                    
                    {/* Empty Bottom Left */}
                    <div />

                    {/* 0 */}
                    <button
                        onClick={() => handleNumberClick(0)}
                        className="w-16 h-16 rounded-full bg-white text-secondary text-3xl font-bold flex items-center justify-center active:scale-95 transition-transform mx-auto shadow-lg"
                    >
                        0
                    </button>

                    {/* Delete */}
                    <button
                        onClick={handleDelete}
                        className="w-16 h-16 rounded-full bg-white text-secondary flex items-center justify-center active:scale-95 transition-transform mx-auto shadow-lg"
                    >
                        <Delete size={24} />
                    </button>
                </div>

                {/* Face ID / Fingerprint Placeholder (Optional, just visual) */}
                 {/* Not in functional requirements, but consistent with "Enter PIN or Face ID" */}
            </div>
        </div>
    );
};

export default SafetyConfirmationModal;
