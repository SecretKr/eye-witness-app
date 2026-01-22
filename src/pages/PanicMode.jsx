import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, ArrowRight, ShieldCheck, Volume2 } from "lucide-react";

const PanicMode = () => {
    const navigate = useNavigate();
    const [recordingTime, setRecordingTime] = useState(0);

    const waveHeights = React.useMemo(
        // eslint-disable-next-line react-hooks/purity
        () => [...Array(20)].map(() => Math.random() * 100),
        [],
    );
    const waveDurations = React.useMemo(
        // eslint-disable-next-line react-hooks/purity
        () => [...Array(20)].map(() => 0.5 + Math.random()),
        [],
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setRecordingTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="h-screen flex flex-col items-center justify-between p-6 bg-black text-white relative overflow-hidden">
            {/* Background Pulse Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="z-10 w-full pt-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/50 rounded-full mb-8">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                    <span className="text-red-400 font-bold tracking-wider text-sm">
                        LIVE RECORDING
                    </span>
                </div>

                <h1 className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">
                    SOUND
                </h1>
                <h2 className="text-2xl font-bold tracking-[0.3em] text-white/80">
                    RECORDING.
                </h2>
            </div>

            <div className="z-10 flex flex-col items-center justify-center w-full my-auto">
                {/* Mock Waveform */}
                <div className="flex items-center justify-center gap-1 h-24 w-full px-10">
                    {waveHeights.map((height, i) => (
                        <div
                            key={i}
                            className="w-1 bg-gradient-to-t from-red-500 to-orange-400 rounded-full animate-pulse"
                            style={{
                                height: `${height}%`,
                                animationDuration: `${waveDurations[i]}s`,
                            }}
                        ></div>
                    ))}
                </div>
                <p className="font-mono text-xl mt-4 text-gray-300">
                    {formatTime(recordingTime)}
                </p>
            </div>

            <div className="z-10 w-full space-y-4 pb-20">
                <button
                    onClick={() => {
                        // In a real app, this would play a loud siren audio file
                        const audio = new Audio(
                            "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
                        ); // Example siren
                        audio
                            .play()
                            .catch((e) => console.log("Audio play failed", e));
                        alert("PLAYING LOUD ALARM SOUND!");
                    }}
                    className="w-full bg-white/10 border border-white/20 py-4 rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                    <Volume2 className="text-red-500 animate-pulse" />
                    <span className="font-bold text-red-500">PLAY ALARM</span>
                </button>

                <button
                    onClick={() =>
                        navigate("/safe-mode", { state: { safe: true } })
                    }
                    className="w-full glass py-4 rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                    <ShieldCheck className="text-secondary" />
                    <span className="font-bold">I AM SAFE NOW</span>
                </button>

                <button
                    onClick={() => navigate("/map")}
                    className="w-full py-4 flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <span className="text-xs tracking-widest">
                        SWIPE TO MAP MODE
                    </span>
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default PanicMode;
