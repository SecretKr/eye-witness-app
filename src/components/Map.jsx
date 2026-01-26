import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LocateFixed } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Components ---

const SetMapCenter = ({ center, zoom = 15 }) => {
    const map = useMap();
    const isFirstMount = useRef(true);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }
        if (center) {
            map.setView(center, zoom, { animate: false });
        }
    }, [map, center, zoom]);
    return null;
};

// Robust fix for map shaking and initial layout
const MapInitializer = ({ center, zoom }) => {
    const map = useMap();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            // Instantly jump to location without animation on first load
            map.setView(center, zoom, { animate: false });

            // Force a size recalculation twice (immediately and after a tiny delay)
            map.invalidateSize();
            const timer = setTimeout(() => {
                map.invalidateSize();
            }, 50);

            initialized.current = true;
            return () => clearTimeout(timer);
        }
    }, [map, center, zoom]);

    return null;
};

// Re-center floating button
const RecenterControl = ({ onRecenter }) => {
    return (
        <div className="absolute bottom-20 right-4 z-[1000] flex flex-col gap-3">
            <button
                onClick={onRecenter}
                className="w-12 h-12 bg-surface/90 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all hover:bg-surface"
            >
                <LocateFixed size={20} className="text-secondary" />
            </button>
        </div>
    );
};

// Map Style Switcher
const MAP_STYLES = {
    voyager: {
        name: 'Voyager',
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution: '&copy; OpenStreetMap &copy; CARTO'
    }
};

// --- Icons ---

const createUserIcon = () => L.divIcon({
    className: 'custom-user-icon',
    html: `
        <div class="relative w-full h-full flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-secondary/40 rounded-full animate-ping"></div>
            <div class="relative w-5 h-5 bg-secondary rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(16,185,129,0.8),0_2px_10px_rgba(0,0,0,0.5)]"></div>
        </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

const createSafeIcon = () => L.divIcon({
    className: 'custom-safe-icon',
    html: `
        <div class="relative group">
            <div class="w-10 h-10 bg-green-gradient bg-cover bg-center rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white drop-shadow-md"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/40 blur-sm rounded-full"></div>
        </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

const createPoliceIcon = () => L.divIcon({
    className: 'custom-police-icon',
    html: `
        <div class="relative group">
            <div class="w-10 h-10 bg-primary-gradient rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white drop-shadow-md"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/40 blur-sm rounded-full"></div>
        </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

// --- Data ---
const USER_POS = [13.7563, 100.5018];
const SAFE_HAVENS = [
    { pos: [13.7580, 100.5050], name: 'Samyan Mitrtown' },
    { pos: [13.7520, 100.4950], name: 'Safe Haven West' }
];
const POLICE = [[13.7540, 100.4980]];

const Map = ({ userLocation }) => {
    const defaultPos = USER_POS;
    const currentPos = userLocation || defaultPos;

    const [target, setTarget] = useState(currentPos);
    const [zoom, setZoom] = useState(15);
    const [mapStyle] = useState('voyager');

    // Update target when userLocation loads
    useEffect(() => {
        if (userLocation) {
            setTarget(userLocation);
        }
    }, [userLocation]);

    const handleRecenter = () => {
        setTarget(currentPos);
        setZoom(15);
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-[#09090b]">
            <MapContainer
                center={currentPos}
                zoom={zoom}
                style={{ height: '100%', width: '100%', background: '#09090b', zIndex: 1 }}
                zoomControl={false}
                attributionControl={false}
                tap={false}
                bounceAtZoomLimits={false}
                wheelPxPerZoomLevel={120}
            >
                <TileLayer
                    url={MAP_STYLES[mapStyle].url}
                    attribution={MAP_STYLES[mapStyle].attribution}
                />

                <SetMapCenter center={target} zoom={zoom} />
                <MapInitializer center={currentPos} zoom={15} />

                {/* User */}
                <Marker position={currentPos} icon={createUserIcon()}>
                    <Popup className="glass-popup">You are here</Popup>
                </Marker>

                {/* Safe Havens */}
                {SAFE_HAVENS.map((h, i) => (
                    <Marker key={i} position={h.pos} icon={createSafeIcon()}>
                        <Popup className="glass-popup">
                            <div className="font-bold">{h.name}</div>
                            <div className="text-xs text-gray-400">Verified Safe Haven</div>
                        </Popup>
                    </Marker>
                ))}

                {/* Police */}
                {POLICE.map((p, i) => (
                    <Marker key={i} position={p} icon={createPoliceIcon()}>
                        <Popup className="glass-popup">Police Station</Popup>
                    </Marker>
                ))}
            </MapContainer>

            <RecenterControl onRecenter={handleRecenter} />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.3)] z-[999]" />
        </div>
    );
};

export default Map;
