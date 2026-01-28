import React, { useState } from "react";
import Map from "../components/Map";
import { ArrowLeft, Phone, ShieldCheck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const SafeHavenTrackingPage = () => {
    // Defines locations for routing (User -> Safe Haven)
    // In a real app, these would come from props or context
    const safeHavenLocation = [13.7344, 100.5282]; // Samyan Mitrtown
    
  // Mock incoming user data
  const incomingUser = {
    name: "Anonymous User", // Changed to generic
    age: "24-26", // Approximate age for anonymous
    gender: "Female",
    location: [13.7351, 100.5293], // Position from PanicMapMode userLocation
    eta: "1 min",
    distance: "150m"
  };

  const anonymousAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">
      {/* Header / Back Button */}
      <div className="absolute top-0 left-0 right-0 z-[50] p-4 pt-12 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <Link 
          to="/safe-haven-business" 
          className="pointer-events-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-black/60 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
      </div>

      {/* Map Background */}
      <div className="flex-1 relative z-0">
        <Map 
          userLocation={incomingUser.location}
          zoomLevel={16}
          enablePopup={false}
          route={[incomingUser.location, safeHavenLocation]} // Draw route line
        />
      </div>

      {/* Bottom User Card Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-[50] p-4 pb-8 bg-gradient-to-t from-black via-black/90 to-transparent">
        {/* Changed background to orange-gradient */}
        <div className="bg-orange-gradient border border-white/10 rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-500">
          
          {/* Status Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-ping absolute top-0 left-0 opacity-75"></div>
              <div className="w-3 h-3 bg-white rounded-full relative"></div>
            </div>
            <span className="text-white font-bold tracking-wide text-sm uppercase drop-shadow-md">Incoming Alert • {incomingUser.eta} away</span>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            {/* Photo - Anonymous */}
            <div className="relative">
               <img 
                 src={anonymousAvatar} 
                 alt="Anonymous" 
                 className="w-20 h-20 rounded-2xl object-cover border-2 border-white/40 shadow-lg bg-gray-300"
               />
               <div className="absolute -bottom-2 -right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 uppercase tracking-wider">
                 Victim
               </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-sm">{incomingUser.name}</h2>
              <div className="flex items-center gap-3 text-white/90 text-sm mt-1 font-medium">
                <span className="flex items-center gap-1">
                    {incomingUser.gender}, ~{incomingUser.age}
                </span>
                <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {incomingUser.distance}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="flex items-center justify-center gap-2 bg-black/20 hover:bg-black/30 text-white font-medium py-3 rounded-xl border border-white/10 transition-all active:scale-95 backdrop-blur-sm">
              <Phone size={18} />
              Call User
            </button>
             <button className="flex items-center justify-center gap-2 bg-white text-orange-600 font-bold py-3 rounded-xl shadow-lg hover:bg-gray-100 transition-all active:scale-95">
              <ShieldCheck size={18} />
              Prepare
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SafeHavenTrackingPage;
