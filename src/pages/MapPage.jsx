import React, { useState } from "react";
import { Plus } from "lucide-react";
import Map from "../components/Map";
import SafetyRatingCard from "../components/SafetyRatingCard";
import ReviewFormModal from "../components/ReviewFormModal";
import LocationHeader from "../components/LocationHeader";

const MapPage = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <div className="w-full h-full overflow-hidden bg-background relative">
      <Map />

      {/* Header */}
      <div className="absolute top-0 inset-x-0 z-[1000] pt-safe pointer-events-none mt-10">
         <div className="pointer-events-auto">
            <LocationHeader locationName="Samyan Mitrtown" />
         </div>
      </div>

      <div
        className="absolute inset-x-4 mx-auto z-[1000] max-w-md pointer-events-none"
        style={{ bottom: "max(5.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="relative pointer-events-auto">
            {/* Plus Button */}
            <div className="absolute -top-16 right-0 z-50">
                <button 
                    onClick={() => setShowReviewForm(true)}
                    className="w-14 h-14 rounded-full bg-primary-gradient shadow-lg flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform"
                >
                    <Plus size={32} strokeWidth={2.5} />
                </button>
            </div>

            <SafetyRatingCard location="Samyan Mitrtown" showLocationName={true} />
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
