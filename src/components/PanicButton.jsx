import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const PanicButton = () => {
    const navigate = useNavigate();
    const [isPressed, setIsPressed] = useState(false);
    const [holdProgress, setHoldProgress] = useState(0); // 0 to 100
    const timerRef = useRef(null);
    const startTimeRef = useRef(null);
    const animationFrameRef = useRef(null);

    const HOLD_DURATION = 1000; // 1 second

    const triggerPanic = () => {
        // Haptic feedback if available
        if (window.navigator.vibrate) {
            window.navigator.vibrate([100, 50, 100]);
        }
        navigate("/panic-mode");
    };

    const updateProgress = () => {
        if (!startTimeRef.current) return;
        
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
        
        setHoldProgress(progress);
        
        if (progress < 100) {
            animationFrameRef.current = requestAnimationFrame(updateProgress);
        } else {
            triggerPanic();
            handlePressEnd();
        }
    };

    const handlePressStart = (e) => {
        // Prevent default behavior to avoid context menus on long press on mobile
        if (e.cancelable) e.preventDefault();
        
        // Initial haptic feedback
        if (window.navigator.vibrate) {
            window.navigator.vibrate(15);
        }

        setIsPressed(true);
        setHoldProgress(0);
        startTimeRef.current = Date.now();
        animationFrameRef.current = requestAnimationFrame(updateProgress);
    };

    const handlePressEnd = () => {
        setIsPressed(false);
        setHoldProgress(0);
        startTimeRef.current = null;
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    };

    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // SVG parameters for progress circle
    const size = 250;
    const center = size / 2;
    const radius = 110;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (holdProgress / 100) * circumference;

    return (
        <div className="flex justify-center items-center py-2 select-none">
            <div className="relative group">
                {/* Visual Progress Ring - Robust SVG with viewBox */}
                <svg 
                    viewBox={`0 0 ${size} ${size}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] -rotate-90 pointer-events-none z-20"
                >
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke="rgba(255, 255, 255, 0.4)"
                        strokeWidth="10"
                        className="transition-all duration-75"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: isPressed ? offset : circumference,
                            strokeLinecap: "round",
                            opacity: isPressed ? 1 : 0
                        }}
                    />
                </svg>

                <button
                    onMouseDown={handlePressStart}
                    onMouseUp={handlePressEnd}
                    onMouseLeave={handlePressEnd}
                    onTouchStart={handlePressStart}
                    onTouchEnd={handlePressEnd}
                    className={`
                        relative w-56 h-56 sm:w-64 sm:h-64 rounded-full
                        bg-panic-gradient
                        shadow-2xl
                        flex flex-col items-center justify-center
                        transition-all duration-100 ease-out
                        hover:scale-[1.02]
                        cursor-pointer
                        active:scale-95
                        ${isPressed ? "scale-[0.98] translate-y-1" : ""}
                    `}
                    style={{
                        boxShadow: isPressed
                            ? "0 0 15px rgba(255, 12, 16, 0.6), 0 5px 15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255,255,255,0.2)"
                            : "0 0 15px rgba(255, 12, 16, 0.8), 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255,255,255,0.2), 0 8px 0 #cc0a0d"
                    }}
                >
                    <div className="flex flex-col items-center justify-center z-10 space-y-[-10px]">
                        <span className="font-sans text-4xl text-white font-bold tracking-wider drop-shadow-lg pt-5">
                            PANIC
                        </span>
                        <span className="font-sans text-4xl text-white font-bold tracking-wider drop-shadow-lg">
                            BUTTON
                        </span>
                        <span className="font-sans text-[18px] text-white font-bold tracking-wider drop-shadow-lg py-2">
                            hold to activate
                        </span>
                    </div>
                    
                    {/* Hold Instruction Overlay */}
                    {isPressed && (
                        <div className="absolute bottom-10 animate-pulse">
                            <span className="text-white/80 text-xs font-bold tracking-widest">
                                activating...
                            </span>
                        </div>
                    )}

                    <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
            </div>
        </div>
    );
};

export default PanicButton;
