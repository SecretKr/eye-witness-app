import React from "react";
import Map from "../components/Map";
import SafetyRatingCard from "../components/SafetyRatingCard";

const MapPage = () => {
  return (
    <div className="w-full h-full overflow-hidden bg-background">
      <Map />

      <div
        className="absolute inset-x-4 mx-auto z-[1000] max-w-md"
        style={{ bottom: "max(5.5rem, env(safe-area-inset-bottom))" }}
      >
        <SafetyRatingCard location="Samyan Mitrtown" showLocationName={true} />
      </div>
    </div>
  );
};

export default MapPage;
