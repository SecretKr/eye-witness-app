import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import Map from "../components/Map";
import SafetyRatingCard from "../components/SafetyRatingCard";
import ReviewFormModal from "../components/ReviewFormModal";
import LocationHeader from "../components/LocationHeader";
import useUserLocation from "../hooks/useUserLocation";
import { reverseGeocode } from "../utils/geocoding";
import ad1 from "../assets/711-ad.png";
import ad2 from "../assets/scb-ad.png";

const MapPage = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showFirstAd, setShowFirstAd] = useState(true);
  const location = useLocation();
  const openSafetyCard = location.state?.openSafetyCard || false;

  const { locationName: currentLocationName, userLocation, loading: locationLoading } = useUserLocation();
  const [droppedPin, setDroppedPin] = useState(null);
  const [droppedLocationName, setDroppedLocationName] = useState("");
  const [isGeocoding, setIsGeocoding] = useState(false);

  const handleLocationSelect = async (latlng) => {
    setDroppedPin(latlng);
    setIsGeocoding(true);
    setDroppedLocationName("Locating...");
    
    // Fetch actual address name
    const addressName = await reverseGeocode(latlng.lat, latlng.lng);
    setDroppedLocationName(addressName);
    setIsGeocoding(false);
  };

  const handleRecenter = () => {
    setDroppedPin(null);
    setDroppedLocationName("");
  };

  // Determine what to show in the header
  const headerLocationName = currentLocationName || "Samyan Mitrtown";
  const isHeaderLoading = locationLoading;

  // Determine what to show in the safety card
  const displayLocationName = droppedPin 
    ? droppedLocationName 
    : (currentLocationName || "Samyan Mitrtown");
  const isCardLoading = droppedPin ? isGeocoding : locationLoading;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowFirstAd((prev) => !prev);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Generate deterministic count
  const safeHavenCount = useMemo(() => {
        let hash = 0;
        const str = displayLocationName || "Samyan Mitrtown";
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return (Math.abs(hash) % 8) + 1;
  }, [displayLocationName]);

  return (
    <div className="w-full h-full overflow-hidden bg-background relative">
      <Map 
        userLocation={userLocation}
        onLocationSelect={handleLocationSelect}
        droppedPin={droppedPin}
        onRecenter={handleRecenter}
        recenterPosition="top-[110px]"
      />

      {/* Header & Ads */}
      <div className="absolute top-0 inset-x-0 z-[1000] pt-safe pointer-events-none px-4 mt-6">
        
        {/* Lowered Location Header */}
        <div className="pointer-events-auto relative z-[1001] shadow-lg rounded-full mb-3">
            <LocationHeader 
              locationName={headerLocationName} 
              loading={isHeaderLoading}
            />
        </div>

        {/* Ads Banner */}
        <div className="w-full bg-slate-800/90 rounded-xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center pointer-events-auto relative z-50 h-24 sm:h-28">
            <img 
                src={showFirstAd ? ad1 : ad2} 
                alt="Advertisement" 
                className="w-full h-full object-contain animate-fade-in transition-opacity duration-500"
                key={showFirstAd ? 'ad1' : 'ad2'} // Force re-render for animation
            />
        </div>
      </div>

      <div
        className="absolute inset-x-4 mx-auto z-[1000] max-w-md pointer-events-none"
        style={{ bottom: "max(5.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="relative pointer-events-auto">
            {/* Plus Button - Only show if NO pin is dropped */}
            {!droppedPin && (
              <div className="absolute -top-16 right-0 z-50">
                  <button 
                      onClick={() => setShowReviewForm(true)}
                      className="w-14 h-14 rounded-full bg-primary-gradient shadow-lg flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform"
                  >
                      <Plus size={32} strokeWidth={2.5} />
                  </button>
              </div>
            )}

            <SafetyRatingCard 
                location={isCardLoading ? "Loading..." : displayLocationName}
                showLocationName={true} 
                initialExpanded={openSafetyCard || droppedPin !== null} // Auto-expand when pin dropped
                isPinnedLocation={droppedPin !== null}
                safeHavenCount={safeHavenCount}
            />
        </div>
      </div>

      <ReviewFormModal 
        isOpen={showReviewForm} 
        onClose={() => setShowReviewForm(false)} 
        locationName="Samyan Mitrtown"
      />
    </div>
  );
};

export default MapPage;
