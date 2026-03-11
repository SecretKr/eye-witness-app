import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  Video,
  ShieldCheck,
  Sun,
  HandHeart,
  UserCircle,
  StarHalf,
} from "lucide-react";
import LocationHeader from "../components/LocationHeader";

const LocationReviewPage = () => {
  // Decode URI component to get the original location string with spaces
  const { locationName: encodedLocation } = useParams();
  const locationName = decodeURIComponent(encodedLocation);
  const navigate = useNavigate();

  const { rating, reviews, pageReviews } = useMemo(() => {
      let hash = 0;
      const str = locationName || "Samyan Mitrtown";
      for (let i = 0; i < str.length; i++) {
          hash = (hash << 5) - hash + str.charCodeAt(i);
          hash |= 0;
      }
      hash = Math.abs(hash);
      
      const possibleComments = [
          "Felt very safe walking here at night. There were plenty of security guards around and the alleyways were well lit. Would definitely recommend for solo travelers.",
          "Overall decent, but some side streets could use more street lamps. The main area is heavily monitored by CCTV though. Still, not bad.",
          "Really bustling area, lots of people around which made me feel secure. Police patrol was visible during the evening hours.",
          "Not the best lighting on the back streets, but the main road is very bright and has late-night convenience stores.",
          "Felt completely comfortable here. Cameras everywhere and the locals are very helpful. Definitely a safe zone.",
          "Average safety. It gets pretty quiet after 10 PM so I wouldn't recommend walking alone, but during the day it's perfectly fine."
      ];
      
      const possibleUsers = ["Sarah Jenkins", "Michael C.", "Alex Wong", "Emma Davis", "David K.", "Lisa M.", "James P."];

      const generatedReviews = [
          {
              id: 1,
              user: possibleUsers[hash % possibleUsers.length],
              rating: ((hash % 16) / 10 + 3.5).toFixed(1),
              comment: possibleComments[(hash + 1) % possibleComments.length],
          },
          {
              id: 2,
              user: possibleUsers[(hash + 3) % possibleUsers.length],
              rating: (((hash + 5) % 21) / 10 + 3.0).toFixed(1),
              comment: possibleComments[(hash + 4) % possibleComments.length],
          }
      ];

      return {
          rating: ((hash % 26) / 10 + 2.5).toFixed(1),
          reviews: (hash % 400) + 12,
          pageReviews: generatedReviews
      };
  }, [locationName]);

  const imgSrc = import.meta.env.BASE_URL + "samyan.jpg";

  return (
    <div className="w-full h-full bg-background text-white flex flex-col overflow-y-auto no-scrollbar pt-4 pb-2 relative">
      {/* Minimal Header (like Home/Map) */}
      <div className="shrink-0 mt-5 z-50">
        <LocationHeader locationName={locationName} />
      </div>

      <div className="w-full px-4 pt-2">
        {/* Main Header Card - MATCHING SafetyRatingCard */}
        <div className="w-full bg-green-gradient rounded-[24px] overflow-hidden shadow-lg relative flex flex-col">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 z-20 text-black bg-[#e2e8f0]/90 hover:bg-white p-1.5 rounded-full backdrop-blur-md transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Header Image - Full width no padding */}
          <div className="h-40 w-full bg-gray-800 shrink-0">
            <img
              src={imgSrc}
              alt={locationName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="px-5 text-white text-center flex flex-col items-center pt-4 pb-2">
            {/* Title */}
            <h1 className="text-2xl font-sans tracking-wide mb-1 uppercase text-white drop-shadow-md">
              {locationName}
            </h1>

            {/* Rating */}
            <div className="flex flex-col items-center justify-center mb-4 w-full">
              <div className="flex items-center justify-between w-full px-2 mb-1">
                <span className="text-sm font-bold">Safety Rating</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const val = Number(rating);
                      if (val >= star)
                        return (
                          <Star
                            key={star}
                            size={22}
                            className="fill-white text-white"
                            strokeWidth={0}
                          />
                        );
                      if (val >= star - 0.5)
                        return (
                          <StarHalf
                            key={star}
                            size={22}
                            className="fill-white text-white"
                            strokeWidth={0}
                          />
                        );
                      return (
                        <Star
                          key={star}
                          size={22}
                          className="text-white/30"
                          strokeWidth={0}
                        />
                      );
                    })}
                  </div>
                  <span className="text-sm opacity-90">({reviews})</span>
                </div>
              </div>
            </div>

            {/* Icons Grid */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-4 mb-3 w-full px-1">
              <div className="flex items-start gap-3 text-left">
                <Video size={20} className="stroke-2 mt-0.5 shrink-0" />
                <div className="leading-tight">
                  <p className="text-[10px] uppercase opacity-90">Several</p>
                  <p className="text-xs font-bold">CCTV</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left">
                <ShieldCheck size={20} className="stroke-2 mt-0.5 shrink-0" />
                <div className="leading-tight">
                  <p className="text-[10px] uppercase opacity-90">Security</p>
                  <p className="text-xs font-bold">Nearby</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left">
                <Sun size={20} className="stroke-2 mt-0.5 shrink-0" />
                <div className="leading-tight">
                  <p className="text-[10px] uppercase opacity-90">Well lit</p>
                  <p className="text-xs font-bold">Area</p>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center gap-2 mt-1">
                <HandHeart size={18} className="stroke-2" />
                <p className="text-xs font-bold">4 Safe Havens Nearby</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS Section */}
      <div className="w-full px-4 mt-8 mb-20">
        <h2 className="text-center text-2xl tracking-[0.1em] uppercase mb-4 font-sans font-medium text-white">
          Reviews
        </h2>

        <div className="flex flex-col gap-4">
          {pageReviews.map((review) => (
            <div
              key={review.id}
              className="w-full bg-green-gradient rounded-[24px] p-5 text-white shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="bg-white rounded-full flex items-center justify-center mr-3 shrink-0 h-8 w-8 overflow-hidden text-[#5ea682]">
                  <UserCircle
                    size={32}
                    strokeWidth={1}
                    className="text-[#5ea682]"
                  />
                </div>
                <span className="text-[13px] font-medium opacity-90">
                  {review.user}
                </span>

                {review.rating && (
                  <div className="ml-auto flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const val = Number(review.rating);
                      if (val >= star)
                        return (
                          <Star
                            key={star}
                            size={18}
                            className="fill-white text-white"
                            strokeWidth={0}
                          />
                        );
                      if (val >= star - 0.5)
                        return (
                          <StarHalf
                            key={star}
                            size={18}
                            className="fill-white text-white"
                            strokeWidth={0}
                          />
                        );
                      return (
                        <Star
                          key={star}
                          size={18}
                          className="text-white/30"
                          strokeWidth={0}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Features row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="flex items-start gap-2">
                  <Video size={18} className="shrink-0 mt-0.5 stroke-[2.5]" />
                  <div className="leading-none flex flex-col gap-0.5 mt-0.5">
                    <span className="text-[9px] uppercase">Several</span>
                    <span className="text-[11px] font-bold">CCTV</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck
                    size={18}
                    className="shrink-0 mt-0.5 stroke-[2.5]"
                  />
                  <div className="leading-none flex flex-col gap-0.5 mt-0.5">
                    <span className="text-[9px] uppercase">Security</span>
                    <span className="text-[11px] font-bold">Nearby</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Sun size={18} className="shrink-0 mt-0.5 stroke-[2.5]" />
                  <div className="leading-none flex flex-col gap-0.5 mt-0.5">
                    <span className="text-[9px] uppercase">Well lit</span>
                    <span className="text-[11px] font-bold">Area</span>
                  </div>
                </div>
              </div>

              {/* Comments box */}
              <div>
                <p className="text-[13px] mb-2 font-medium">Comments</p>
                <div className="w-full bg-[#e2e8f0] rounded-xl p-3 text-[#4A5568] text-xs font-medium min-h-[50px] shadow-inner">
                  {review.comment}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationReviewPage;
