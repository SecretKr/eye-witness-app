import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PanicButton = () => {
    const [progress, setProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const navigate = useNavigate();
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);

    const HOLD_DURATION = 2000; // Reduced to 2s for better UX feel, but logic is same

    const startHolding = () => {
        setIsHolding(true);
        setProgress(0);

        // eslint-disable-next-line react-hooks/purity
        const now = Date.now();
        startTimeRef.current = now;

        timerRef.current = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            const p = Math.min((elapsed / HOLD_DURATION) * 100, 100);
            setProgress(p);

            if (elapsed >= HOLD_DURATION) {
                clearInterval(timerRef.current);
                triggerPanic();
            }
        }, 16); // ~60fps
    };

    const stopHolding = () => {
        setIsHolding(false);
        clearInterval(timerRef.current);
        setProgress(0);
    };

    const triggerPanic = () => {
        // Haptic feedback if available
        if (window.navigator.vibrate) {
            window.navigator.vibrate([100, 50, 100]);
        }
        navigate("/panic-mode");
    };

    return (
        <div className="flex justify-center items-center py-4 select-none">
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Outer Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="46%"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="4"
                    />
                    <circle
                        cx="50%"
                        cy="50%"
                        r="46%"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="4"
                        strokeDasharray="290%" // Approximate circumference
                        strokeDashoffset={`${290 - progress * 2.9}%`}
                        className="transition-all duration-75 ease-linear"
                        strokeLinecap="round"
                    />
                </svg>

                {/* The Button */}
                <button
                    onMouseDown={startHolding}
                    onMouseUp={stopHolding}
                    onMouseLeave={stopHolding}
                    onTouchStart={startHolding}
                    onTouchEnd={stopHolding}
                    className={`
                        relative w-48 h-48 rounded-full 
                        bg-panic-gradient shadow-[0_0_50px_rgba(16,185,129,0.2)]
                        flex items-center justify-center
                        transition-all duration-300
                        border-4 border-white/10
                        ${isHolding ? "scale-110 shadow-[0_0_80px_rgba(16,185,129,0.5)]" : "hover:scale-105"}
                        ${progress === 100 ? "animate-ping" : ""}
                    `}
                >
                    <div className="absolute inset-2 rounded-full border border-white/20 animate-pulse"></div>

                    {/* Ripple effects while holding */}
                    {isHolding && (
                        <>
                            <div className="absolute inset-0 rounded-full border-2 border-secondary/50 animate-[ping_1s_infinite]"></div>
                            <div className="absolute inset-0 rounded-full border-2 border-secondary/30 animate-[ping_1.5s_infinite]"></div>
                        </>
                    )}

                    <div className="text-center z-10">
                        <span
                            className={`block text-3xl font-black text-white tracking-widest transition-transform ${isHolding ? "scale-110" : ""}`}
                        >
                            PANIC
                        </span>
                        <div className="h-1 w-12 bg-white/30 mx-auto my-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-75 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="block text-[10px] font-bold text-white/70 tracking-[0.2em]">
                            {isHolding ? "HOLDING..." : "HOLD TO START"}
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PanicButton;
