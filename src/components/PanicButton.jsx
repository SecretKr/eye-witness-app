import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PanicButton = () => {
    const navigate = useNavigate();
    const [isPressed, setIsPressed] = useState(false);

    const triggerPanic = () => {
        // Haptic feedback if available
        if (window.navigator.vibrate) {
            window.navigator.vibrate([100, 50, 100]);
        }
        navigate("/panic-mode");
    };

    const handlePressStart = () => setIsPressed(true);
    const handlePressEnd = () => setIsPressed(false);

    return (
        <div className="flex justify-center items-center py-2 select-none">
            <button
                onClick={triggerPanic}
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                className={`
                    group
                    relative w-56 h-56 sm:w-64 sm:h-64 rounded-full
                    bg-panic-gradient
                    shadow-2xl
                    flex flex-col items-center justify-center
                    transition-all duration-100 ease-out
                    hover:scale-[1.02]
                    cursor-pointer
                    ${isPressed ? "scale-[1.02] translate-y-2" : ""}
                `}
                style={{
                    boxShadow: isPressed
                        ? "0 0 15px rgba(255, 12, 16, 0.6), 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255,255,255,0.2)"
                        : "0 0 15px rgba(255, 12, 16, 0.8), 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255,255,255,0.2), 0 8px 0 #cc0a0d"
                }}
            >
                {/* 3D bevel effect at bottom is handled by the third shadow in style prop or we can use border-b-8 */}
                
                <div className="flex flex-col items-center justify-center z-10 space-y-[-10px]">
                    <span className="font-sans text-4xl text-white font-bold tracking-wider drop-shadow-lg">
                        PANIC
                    </span>
                    <span className="font-sans text-4xl text-white font-bold tracking-wider drop-shadow-lg">
                        BUTTON
                    </span>
                </div>
                
                {/* Texture/Grain overlay if possible, otherwise just gradient */}
                <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
        </div>
    );
};

export default PanicButton;
