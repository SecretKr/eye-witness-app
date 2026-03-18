import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plus, X, ShieldCheck } from "lucide-react";
import Map from "../components/Map";
import SafetyRatingCard from "../components/SafetyRatingCard";
import ReviewFormModal from "../components/ReviewFormModal";
import LocationHeader from "../components/LocationHeader";
import useUserLocation from "../hooks/useUserLocation";
import { reverseGeocode } from "../utils/geocoding";
import ad1 from "../assets/711-ad.png";
import ad2 from "../assets/ptt.png";

const MapPage = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showFirstAd, setShowFirstAd] = useState(true);
  const [showAds, setShowAds] = useState(true);
  const [isSafetyCardExpanded, setIsSafetyCardExpanded] = useState(false);
  const location = useLocation();
  const openSafetyCard = location.state?.openSafetyCard || false;

  const {
    locationName: currentLocationName,
    userLocation,
    loading: locationLoading,
  } = useUserLocation();
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
    : currentLocationName || "Samyan Mitrtown";
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
        recenterPosition="bottom-[14rem]"
        recenterBehindOverlay={isSafetyCardExpanded}
      />

      {/* Header & Ads */}
      <div className="absolute top-0 inset-x-0 z-[1000] pt-safe-top pointer-events-none px-4">
        <header className="mt-10 relative z-[1001] pointer-events-auto">
          <LocationHeader
            locationName={headerLocationName}
            loading={isHeaderLoading}
          />
        </header>

        {/* Ads Banner */}
        {showAds && (
          <div className="w-full bg-slate-900/95 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 pointer-events-auto relative z-50 h-28 mt-2 animate-fade-in-up">
            {/* Badge */}
            <div className="absolute top-0 left-0 bg-green-gradient px-3 py-1 rounded-br-xl">
              <span className="text-[10px] font-semibold tracking-wide text-white uppercase">
                Partnered Safe Haven
              </span>
            </div>

            {/* Close */}
            <button
              onClick={() => setShowAds(false)}
              className="absolute top-2 right-2 z-30 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/50"
            >
              <X size={10} />
            </button>

            {/* Body */}
            <div className="flex h-full items-center px-4 pt-4 gap-4">
              <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                <img
                  src={showFirstAd ? ad1 : ad2}
                  alt="Brand"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">
                  Sponsored
                </p>
                <p className="text-white font-semibold text-sm">
                  {showFirstAd ? "7-Eleven Thailand" : "PTT Station"}
                </p>
                <p className="text-white text-xs mt-0.5">
                  AREA TO SHOW ADVERTISEMENT
                </p>
              </div>
            </div>
          </div>
        )}
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
            onExpandedChange={setIsSafetyCardExpanded}
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
