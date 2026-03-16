import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
  Circle,
  SVGOverlay, // 1. Import SVGOverlay
  useMapEvents 
} from "react-leaflet";
import { LocateFixed } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import LocationPopup from "./LocationPopup";
import { useGroup } from '../context/GroupContext';

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
      map.setView(center, zoom, { animate: true });
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
const RecenterControl = ({ onRecenter, visible, position = "bottom-24", behindPopup = false }) => {
  if (!visible) return null;
  return (
    <div
      className={`absolute left-4 flex flex-col gap-3 transition-opacity duration-300 ${position}`}
      style={{ zIndex: behindPopup ? 900 : 1100 }}
    >
      <button
        onClick={onRecenter}
        className="w-12 h-12 bg-primary-gradient backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_4px_15px_rgba(16,185,129,0.3)] active:scale-90 transition-all hover:opacity-90"
      >
        <LocateFixed size={22} className="text-white drop-shadow-md" />
      </button>
    </div>
  );
};

// Map events handler for dropping pins
const MapEventsHandler = ({ onLocationSelect }) => {
  useMapEvents({
    contextmenu(e) { // Long press on mobile / Right click on PC
      if (onLocationSelect) {
        onLocationSelect(e.latlng);
      }
    },
    dblclick(e) {
      if (onLocationSelect) {
        onLocationSelect(e.latlng);
      }
    }
  });
  return null;
};

// --- Helpers ---

// 2. Helper to calculate LatLng bounds from a center point and radius (in meters)
const getGeoBounds = (lat, lng, radius) => {
  const earthRadius = 6378137; // meters
  const latDelta = (radius / earthRadius) * (180 / Math.PI);
  const lngDelta = (latDelta) / Math.cos(lat * (Math.PI / 180));

  return [
    [lat - latDelta, lng - lngDelta], // SouthWest
    [lat + latDelta, lng + lngDelta]  // NorthEast
  ];
};

const MAP_STYLES = {
  voyager: {
    name: "Voyager",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: "&copy; OpenStreetMap &copy; CARTO",
  },
};

// --- Icons ---

const createUserIcon = () =>
  L.divIcon({
    className: "custom-user-icon",
    html: `
        <div class="relative w-full h-full flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-secondary/40 rounded-full animate-ping"></div>
            <div class="relative w-5 h-5 bg-secondary rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(16,185,129,0.8),0_2px_10px_rgba(0,0,0,0.5)]"></div>
        </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const createSafeIcon = (isSelected) =>
  L.divIcon({
    className: "custom-safe-icon",
    html: `
        <div class="relative group transition-transform duration-300 ${isSelected ? "scale-125" : ""}">
            <div class="w-10 h-10 bg-green-gradient bg-cover bg-center rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-white drop-shadow-md"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            ${isSelected ? '<div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"></div>' : ""}
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/40 blur-sm rounded-full"></div>
        </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

const createPoliceIcon = () =>
  L.divIcon({
    className: "custom-police-icon",
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

const createGroupMemberIcon = (imageSrc) =>
  L.divIcon({
    className: "custom-group-icon",
    html: `
        <div class="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-b from-purple-500/50 via-teal-500/50 to-transparent shadow-lg transition-transform hover:scale-110">
            <div class="w-full h-full rounded-full bg-surface border-2 border-background overflow-hidden relative shadow-inner flex items-center justify-center">
                <img src="${imageSrc}" alt="Group" class="w-full h-full object-cover bg-teal-50" />
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/40 blur-sm rounded-full"></div>
        </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

const createDroppedPinIcon = () =>
  L.divIcon({
    className: "custom-dropped-pin-icon",
    html: `
        <div class="relative w-full h-full flex flex-col items-center justify-end group transition-transform hover:scale-110">
            <div class="w-8 h-8 bg-orange-gradient rounded-full border-2 border-white flex items-center justify-center shadow-lg relative z-10 animate-bounce">
                <div class="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div class="w-1 h-3 bg-orange-500 -mt-2.5 relative z-0"></div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/40 blur-[2px] rounded-full"></div>
        </div>
    `,
    iconSize: [32, 44],
    iconAnchor: [16, 44],
  });

// --- Data ---
const USER_POS = [13.7351, 100.5293];
const SAFE_HAVENS = [
  {
    pos: [13.7344, 100.5282],
    name: "Samyan Mitrtown",
    rating: 4,
    reviewCount: 14,
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    pos: [13.7393, 100.5276],
    name: "Chula Library",
    rating: 4.2,
    reviewCount: 9,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    pos: [13.7328, 100.5305],
    name: "Chamchuri Square",
  },
  {
    pos: [13.7355, 100.5315],
    name: "Sala Phra Kieo",
  },
  {
    pos: [13.7360, 100.5256],
    name: "Chamchuri 9",
  },
  {
    pos: [13.7427, 100.5294],
    name: "Sasin School of Management",
    image: "sasin.jpg"
  },
  {
    pos: [13.7435, 100.5260],
    name: "Chulalongkorn Stadium",
  },
  {
    pos: [13.7380, 100.5225],
    name: "CU Centenary Park",
  }
];
const POLICE = [[13.7422, 100.5255], [13.7300, 100.5233], [13.7440, 100.5380]];
const WATCH_OUT_AREAS = [
  {
    pos: [13.7420, 100.5305],
    radius: 160,
    label: "Watch Out\nArea",
    color: "#ef4444"
  },
  {
    pos: [13.7290, 100.5340],
    radius: 240,
    label: "Watch Out\nArea",
    color: "#ef4444"
  }
];

const GROUP_MEMBERS = [
  {
    pos: [13.7348, 100.5298],
    name: "Sammy",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=User1",
  },
  {
    pos: [13.7355, 100.5285],
    name: "Sis",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=User2",
  },
  {
    pos: [13.7362, 100.5290],
    name: "Pim",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=User3",
  },
  {
    pos: [13.7340, 100.5300],
    name: "Bro",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=User4",
  }
];

const Map = ({
  userLocation,
  zoomLevel = 15,
  route = null,
  onLocationSelect,
  droppedPin,
  onRecenter,
  recenterPosition,
  recenterBehindOverlay = false,
  showGroupMembers = true,
}) => {
  const defaultPos = USER_POS;
  const currentPos = userLocation || defaultPos;

  const mapRef = useRef(null);
  const [target, setTarget] = useState(currentPos);
  const [zoom, setZoom] = useState(zoomLevel);
  const [mapStyle] = useState('voyager');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { isSharingLocation } = useGroup();
  const [dangerToast, setDangerToast] = useState(null);
  const dangerToastDelayTimerRef = useRef(null);
  const dangerToastHideTimerRef = useRef(null);

  // Update target when userLocation loads IF no dropped pin
  useEffect(() => {
    if (userLocation && !droppedPin) setTarget(userLocation);
  }, [userLocation, droppedPin]);

  // If droppedPin changes, center the map on it
  useEffect(() => {
    if (droppedPin) {
      setTarget([droppedPin.lat, droppedPin.lng]);
    }
  }, [droppedPin]);

  // Respond to zoom prop changes
  useEffect(() => {
    setZoom(zoomLevel);
  }, [zoomLevel]);


  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.setView(currentPos, zoomLevel, { animate: true });
    }
    setTarget(currentPos);
    setZoom(zoomLevel);
    setSelectedLocation(null);
    if (onRecenter) onRecenter();
  };

  const showDangerToast = (area) => {
    if (dangerToastDelayTimerRef.current) clearTimeout(dangerToastDelayTimerRef.current);
    if (dangerToastHideTimerRef.current) clearTimeout(dangerToastHideTimerRef.current);

    // Show ~1s after double click (hidden control)
    dangerToastDelayTimerRef.current = setTimeout(() => {
      setDangerToast({
        title: "Warning",
        message: "You are entering a potentially unsafe area.",
        areaIndex: area?.index ?? null,
      });
      dangerToastDelayTimerRef.current = null;

      dangerToastHideTimerRef.current = setTimeout(() => {
        setDangerToast(null);
        dangerToastHideTimerRef.current = null;
      }, 5000);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (dangerToastDelayTimerRef.current) clearTimeout(dangerToastDelayTimerRef.current);
      if (dangerToastHideTimerRef.current) clearTimeout(dangerToastHideTimerRef.current);
    };
  }, []);

  // const handleMarkerClick = (location) => {
  //   if (!enablePopup) return;
  //   setSelectedLocation(location);
  //   setTarget(location.pos); // Optional: Center map on click
  //   // zoom stays same or zooms in slightly?
  // };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#09090b]">
      <MapContainer
        ref={mapRef}
        center={currentPos}
        zoom={zoom}
        style={{ height: '100%', width: '100%', background: '#09090b', zIndex: 1 }}
        zoomControl={false}
        attributionControl={false}
        tap={false}
        doubleClickZoom={false} // Disable default double click zoom to allow pin dropping
        bounceAtZoomLimits={false}
        wheelPxPerZoomLevel={120}
        onClick={() => setSelectedLocation(null)}
      >
        <MapEventsHandler onLocationSelect={onLocationSelect} />
        <TileLayer
          url={MAP_STYLES[mapStyle].url}
          attribution={MAP_STYLES[mapStyle].attribution}
        />

        <SetMapCenter center={target} zoom={zoom} />
        <MapInitializer center={currentPos} zoom={zoom} />

        {/* Render Route if available */}
        {route && <Polyline positions={route} pathOptions={{ color: '#9333ea', dashArray: '8 4', weight: 4 }} />}


        {/* User */}
        <Marker position={currentPos} icon={createUserIcon()}>
          <Popup className="glass-popup">You are here</Popup>
        </Marker>

        {/* Dropped Pin */}
        {droppedPin && (
          <Marker position={[droppedPin.lat, droppedPin.lng]} icon={createDroppedPinIcon()}>
             <Popup className="glass-popup">Dropped Pin</Popup>
          </Marker>
        )}

        {/* Group Members (Conditionally rendered) */}
        {showGroupMembers && isSharingLocation && GROUP_MEMBERS.map((member, i) => (
          <Marker key={i} position={member.pos} icon={createGroupMemberIcon(member.image)}>
            <Popup className="glass-popup">
              <div className="font-bold">{member.name}</div>
              <div className="text-xs text-gray-400">Group Member</div>
            </Popup>
          </Marker>
        ))}

        {/* Safe Havens */}
        {SAFE_HAVENS.map((h, i) => (
          <Marker
            key={i}
            position={h.pos}
            icon={createSafeIcon(selectedLocation?.name === h.name)}
          // eventHandlers={{
          //   click: () => handleMarkerClick(h),
          // }}
          >
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

        {/* Watch Out Areas */}
        {WATCH_OUT_AREAS.map((area, i) => {
          // Calculate bounds for the SVG Overlay based on radius
          const bounds = getGeoBounds(area.pos[0], area.pos[1], area.radius);

          return (
            <React.Fragment key={i}>
              <Circle
                center={area.pos}
                pathOptions={{
                  color: area.color,
                  fillColor: area.color,
                  fillOpacity: 0.2,
                  dashArray: '5, 5',
                  weight: 2
                }}
                radius={area.radius}
                eventHandlers={{
                  dblclick: (e) => {
                    // Prevent map dblclick handler (pin drop) from also firing.
                    if (e?.originalEvent) {
                      L.DomEvent.stop(e.originalEvent);
                    }
                    showDangerToast({ ...area, index: i });
                  },
                }}
              />

              <SVGOverlay attributes={{}} bounds={bounds}>
                <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <text
                    x="50%"
                    y="45%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={area.color}
                    style={{
                      fontSize: '32px',
                      fontWeight: '800',
                      textShadow: '0px 2px 4px rgba(0,0,0,0.8)',
                      fontFamily: 'sans-serif'
                    }}
                  >
                    {/* Split text by newline if needed */}
                    {area.label.split('\n').map((line, index) => (
                      <tspan key={index} x="50%" dy={index === 0 ? "0" : "1.2em"}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </svg>
              </SVGOverlay>
            </React.Fragment>
          );
        })}
      </MapContainer>

      <RecenterControl
        onRecenter={handleRecenter}
        visible={true} // Keep available; z-index drops behind popup when open
        position={recenterPosition}
        behindPopup={recenterBehindOverlay || !!selectedLocation}
      />

      {selectedLocation && (
        <LocationPopup
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}

      {/* Hidden control: dblclick Watch Out Area circle */}
      {dangerToast && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-12 z-[99999] pointer-events-none"
          role="status"
          aria-live="polite"
        >
          <div
            className="w-[calc(100vw-40px)] max-w-[320px] rounded-2xl border border-white/20 bg-red-gradient px-6 py-3 shadow-[0_14px_60px_rgba(0,0,0,0.65)]"
            style={{ animation: "dangerToastSlideDown 260ms ease-out both" }}
          >
            <div className="flex items-center gap-4">
              <div className="h-2.5 w-2.5 rounded-full bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.65)]" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-white/95">{dangerToast.title}</div>
                <div className="text-xs text-white/90 mt-0.5">{dangerToast.message}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dangerToastSlideDown {
          0% { transform: translateY(-18px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Subtle Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.3)] z-[800]" />
    </div>
  );
};

export default Map;
