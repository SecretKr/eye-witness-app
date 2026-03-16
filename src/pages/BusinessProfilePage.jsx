import React, { useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  HandHeart,
  ShieldCheck,
  Video,
  Sun,
  Users,
  ChevronRight,
} from "lucide-react";
import LocationHeader from "../components/LocationHeader";
import BusinessNavbar from "../components/BusinessNavbar";

const BusinessProfilePage = () => {
  const [acceptingAlerts, setAcceptingAlerts] = useState(true);

  return (
    <div className="fixed inset-0 flex flex-col max-w-md mx-auto bg-black shadow-2xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-orange-500/25 blur-[100px] pointer-events-none rounded-full -translate-y-1/2" />

      <main className="relative z-10 flex-grow overflow-y-auto no-scrollbar overflow-x-hidden px-6 pt-safe-top pb-6">
        <header className="mt-10 relative z-10 animate-fade-in-up [animation-delay:0ms] opacity-0 [animation-fill-mode:forwards]">
          <LocationHeader
            locationName="SAFE HAVEN · ABC RESTAURANT"
            hideProfile={true}
            helpTo="/safe-haven-help"
            pillClassName="bg-orange-gradient"
          />
        </header>

        <h1 className="text-center text-3xl font-medium text-white tracking-widest mb-20 drop-shadow-md animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
          BUSINESS PROFILE
        </h1>

        {/* Main Business Card */}
        <div className="relative mb-6 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
        {/* Logo / Avatar */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-20">
          <div className="w-36 h-36 rounded-full p-1 bg-orange-gradient backdrop-blur-sm">
            <div className="w-full h-full rounded-full bg-surface border-4 border-background overflow-hidden relative shadow-2xl flex items-center justify-center">
              <Building2 size={56} className="text-white/90" />
            </div>
          </div>
        </div>

        <div className="bg-orange-gradient backdrop-blur-md rounded-2xl pt-20 pb-6 px-6 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HandHeart size={18} className="text-white" />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white/90">
                Certified Safe Haven
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-5 text-white w-full mt-2">
              <div className="col-span-2 flex items-center gap-3 justify-center">
                <Building2 size={18} className="text-white/90" />
                <span className="font-bold text-[15px] text-white tracking-wide uppercase">
                  ABC Restaurant
                </span>
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <MapPin size={18} className="text-white/80 shrink-0" />
                <span className="font-medium text-[13px] text-white/90">
                  Samyan Mitrtown, Bangkok
                </span>
              </div>

              <div className="col-span-1 flex items-center gap-3">
                <Phone size={18} className="text-white/80" />
                <span className="font-medium text-[13px] text-white/90">
                  02-123-4567
                </span>
              </div>

              <div className="col-span-1 flex items-center gap-3 min-w-0">
                <Mail size={18} className="text-white/80 shrink-0" />
                <span className="font-medium text-[13px] text-white/90 underline truncate">
                  safehaven@abcrestaurant.com
                </span>
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <Clock size={18} className="text-white/80" />
                <span className="font-medium text-[13px] text-white/90">
                  Open 24/7 (Safe Haven support always available)
                </span>
              </div>
            </div>

            {/* Quick capability row */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/15">
              <div className="flex flex-col items-center">
                <Video size={22} className="mb-2 stroke-[2.5]" />
                <span className="text-[10px] font-bold uppercase opacity-90 leading-tight">
                  CCTV
                </span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck size={22} className="mb-2 stroke-[2.5]" />
                <span className="text-[10px] font-bold uppercase opacity-90 leading-tight">
                  Staff Ready
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Sun size={22} className="mb-2 stroke-[2.5]" />
                <span className="text-[10px] font-bold uppercase opacity-90 leading-tight">
                  Well Lit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Operations / Readiness */}
      <div className="relative mb-8 animate-fade-in-up [animation-delay:260ms] opacity-0 [animation-fill-mode:forwards]">
        <div className="bg-orange-gradient rounded-2xl p-5 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="flex items-center justify-between text-white mb-4 w-full">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-white/90" />
              <span className="font-medium text-sm text-white/90">
                Safe Haven Operations
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-white/80 font-medium">
                Accept Alerts
              </span>
              <button
                onClick={() => setAcceptingAlerts((v) => !v)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                  acceptingAlerts ? "bg-emerald-500" : "bg-white/20"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm ${
                    acceptingAlerts ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/20 border border-white/10 rounded-xl p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/70 font-bold">
                Assisted
              </p>
              <p className="text-2xl font-black text-white mt-1">13</p>
              <p className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">
                People helped
              </p>
            </div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/70 font-bold">
                Readiness
              </p>
              <p className="text-2xl font-black text-white mt-1">Trained</p>
              <p className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">
                Protocol active
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => navigate("/safe-haven-help")}
              className="px-4 py-2 rounded-full bg-black/25 hover:bg-black/35 text-white text-sm font-semibold border border-white/10 active:scale-95 transition-all"
            >
              View help
            </button>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-0.5 animate-fade-in-up [animation-delay:320ms] opacity-0 [animation-fill-mode:forwards]">
        <MenuOption label="Business Details" />
        <MenuOption label="Staff & Training" />
        <MenuOption label="Verification Status" />
        <MenuOption label="Emergency Protocol" />
      </div>

        <div className="pb-6" />
      </main>

      {/* Gradient fade above navbar (same as user layout) */}
      <div className="shrink-0 relative">
        <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        <BusinessNavbar />
      </div>
    </div>
  );
};

const MenuOption = ({ label }) => (
  <div className="group flex items-center justify-between py-4 border-b border-white/10 cursor-pointer active:bg-white/5 transition-colors">
    <span className="text-sm font-medium text-white">{label}</span>
    <ChevronRight
      size={18}
      className="text-gray-500 group-hover:text-white transition-colors"
    />
  </div>
);

export default BusinessProfilePage;

