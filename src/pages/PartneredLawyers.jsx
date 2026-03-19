import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Phone,
  MessageCircle,
  SlidersHorizontal,
  MapPin,
  Clock,
} from "lucide-react";
import LocationHeader from "../components/LocationHeader";
import Drive from "../assets/team/Drive.png";
import Pook from "../assets/team/Pook.png";
import Fifa from "../assets/team/Fifa.png";
import Gow from "../assets/team/Gow.png";
import Volk from "../assets/team/Volk.png";
import JanJao from "../assets/team/Janjao.png";

const PartneredLawyers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("firms");
  const [activeFilter, setActiveFilter] = useState("closest");

  const filterOptions = [
    { key: "closest", label: "Closest", icon: <MapPin size={14} /> },
    { key: "available", label: "Available Now", icon: <Clock size={14} /> },
  ];

  const firms = [
    {
      id: 1,
      name: "ทนาย เก้า",
      location: "Bangkok",
      tel: "000-000-0000",
      distance: "0.8 km",
      experience: 14,
      consultations: 832,
      bio: "Criminal law and human rights specialist with over 14 years of active caseload experience.",
      image: Gow,
    },
    {
      id: 2,
      name: "ทนาย จันทร์เจ้า",
      location: "Nonthaburi",
      tel: "011-111-1111",
      distance: "1.2 km",
      experience: 9,
      consultations: 540,
      bio: "Specialises in family law and inheritance cases with a focus on amicable resolution.",
      image: JanJao,
    },
    {
      id: 3,
      name: "ทนาย ไดรฟ์",
      location: "Pathum Thani",
      tel: "03-333-3333",
      distance: "2.1 km",
      experience: 21,
      consultations: 1240,
      bio: "Senior labour law expert, handled over 1,000 employment dispute cases across Thailand.",
      image: Drive,
    },
  ];

  const volunteers = [
    {
      id: 1,
      name: "ทนาย พุก",
      location: "Bangkok",
      tel: "044-444-4444",
      distance: "1.0 km",
      experience: 6,
      consultations: 218,
      bio: "Volunteer attorney offering free legal counsel to vulnerable individuals in need.",
      image: Pook,
    },
    {
      id: 2,
      name: "ทนาย ฟีฟ่า",
      location: "Chiang Mai",
      tel: "055-555-5555",
      distance: "1.5 km",
      experience: 10,
      consultations: 430,
      bio: "Pro bono criminal defence lawyer helping low-income defendants navigate the legal system.",
      image: Fifa,
    },
    {
      id: 3,
      name: "ทนาย โฟค",
      location: "Khon Kaen",
      tel: "066-666-6666",
      distance: "2.8 km",
      experience: 12,
      consultations: 575,
      bio: "Volunteer labour rights attorney assisting workers in court and out-of-court settlements.",
      image: Volk,
    },
  ];

  const currentList = activeTab === "firms" ? firms : volunteers;

  const sortedList = [...currentList].sort((a, b) => {
    if (activeFilter === "closest")
      return parseFloat(a.distance) - parseFloat(b.distance);
    return 0;
  });

  const handleCall = (tel) => {
    window.location.href = `tel:${tel.replace(/-/g, "")}`;
  };

  const handleLine = (name) => {
    alert(`Opening LINE for ${name}`);
  };

  return (
    <div className="absolute inset-0 bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="z-20 pt-4 px-4 pb-2 shrink-0 mt-5">
        <LocationHeader locationName="SAMYAN MITRTOWN" />
        <div className="text-center mt-4 mb-3">
          <h1 className="text-2xl font-sans font-bold text-white tracking-wide uppercase">
            LEGAL ASSISTANCE
          </h1>
          <p className="text-white/50 text-xs mt-1 tracking-widest uppercase">
            Find help near you
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 rounded-xl p-1 mx-1 mb-3 border border-white/10">
          <button
            onClick={() => setActiveTab("firms")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "firms"
                ? "bg-primary-gradient text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Partnered Firms
          </button>
          <button
            onClick={() => setActiveTab("volunteer")}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === "volunteer"
                ? "bg-primary-gradient text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Volunteer · Pro Bono
          </button>
        </div>

        {/* Filter Row */}
        <div className="flex items-center gap-2 mb-1 px-1">
          <SlidersHorizontal size={14} className="text-white/50 shrink-0" />
          <span className="text-white/50 text-xs uppercase tracking-widest shrink-0">
            Sort by
          </span>
          <div className="flex gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setActiveFilter(opt.key)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer ${
                  activeFilter === opt.key
                    ? "bg-primary-gradient border-transparent text-white"
                    : "bg-white/5 border-white/20 text-white/60 hover:text-white/90 hover:bg-white/10"
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="flex-1 px-4 overflow-y-auto w-full">
        <div className="space-y-3 mt-2">
          {sortedList.map((lawyer) => (
            <div
              key={lawyer.id}
              className="w-full bg-primary-gradient rounded-2xl overflow-hidden animate-fade-in-up"
            >
              {/* Main content row */}
              <div className="flex gap-3 p-4">
                {/* Square avatar */}
                <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 bg-slate-700">
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Name */}
                  <h3 className="text-sm font-bold text-white leading-tight mb-1">
                    {lawyer.name}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-white/50 text-xs mb-1">
                    <MapPin size={10} />
                    <span>{lawyer.location}</span>
                    <span className="mx-1 text-white/20">·</span>
                    <span>{lawyer.distance}</span>
                  </div>

                  {/* Tel */}
                  <div className="flex items-center gap-1 text-white/40 text-xs mb-2">
                    <Phone size={10} />
                    <span>{lawyer.tel}</span>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-white/10 rounded-md px-2 py-1 text-xs text-white/60 flex flex-col leading-tight">
                      Experience
                      <span className="text-white font-bold">
                        {lawyer.experience} yrs
                      </span>
                    </span>
                    <span className="bg-white/10 rounded-md px-2 py-1 text-xs text-white/60 flex flex-col leading-tight">
                      Consultations
                      <span className="text-white font-bold">
                        {lawyer.consultations}
                      </span>
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-white/40 text-xs leading-relaxed line-clamp-2">
                    {lawyer.bio}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="" />

              {/* Action Buttons */}
              <div className="flex">
                <button
                  onClick={() => handleCall(lawyer.tel)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-gradient text-white text-sm font-semibold active:scale-95 transition-all cursor-pointer border-r border-white/10"
                >
                  <Phone size={15} />
                  Tel
                </button>
                <button
                  onClick={() => handleLine(lawyer.name)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-gradient text-white text-sm font-semibold active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle size={15} />
                  Add LINE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pb-4" />

        {/* Back Button */}
        <div className="pt-2 pb-6 flex justify-center w-full">
          <button
            onClick={() => navigate(-1)}
            className="p-4 rounded-full bg-white/10 text-white/90 hover:bg-white/20 active:scale-95 transition-all border border-white/20 cursor-pointer flex items-center justify-center"
          >
            <ChevronLeft size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartneredLawyers;
