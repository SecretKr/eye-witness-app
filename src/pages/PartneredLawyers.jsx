import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Phone, Mail } from "lucide-react";
import LocationHeader from "../components/LocationHeader";

const PartneredLawyers = () => {
  const navigate = useNavigate();

  // Mock Data for Lawyers
  const lawyers = [
    {
      id: 1,
      name: "Lawyer James Smith",
      tel: "081-111-2222",
      contact: "james.smith@lawfirm.com",
      image: null,
    },
    {
      id: 2,
      name: "Lawyer Sarah Johnson",
      tel: "089-333-4444",
      contact: "sarah.j@legalhelp.co",
      image: null,
    },
    {
      id: 3,
      name: "Lawyer David Williams",
      tel: "02-555-6666",
      contact: "david.w@justice.org",
      image: null,
    },
    {
      id: 4,
      name: "Lawyer Emily Brown",
      tel: "086-777-8888",
      contact: "emily.brown@counsel.net",
      image: null,
    },
  ];

  return (
    <div className="absolute inset-0 bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="z-20 pt-4 px-4 pb-2 shrink-0 mt-5">
        <LocationHeader locationName="SAMYAN MITRTOWN" />
        <div className="text-center mt-4 mb-2">
          <h1 className="text-2xl font-sans font-bold text-white tracking-wide uppercase">
            PARTNERED LAWYER
            <br />
            AND LAWFIRMS
          </h1>
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 px-4 overflow-y-auto w-full">
        <div className="space-y-4 mt-2">
          {lawyers.map((lawyer) => (
            <div
            key={lawyer.id}
            className="w-full bg-primary-gradient rounded-2xl p-5 flex items-center gap-5 shadow-xl border border-white/10 animate-fade-in-up transition-transform active:scale-[0.98]"
          >
            {/* Avatar Placeholder */}
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-b from-purple-500/50 via-teal-500/50 to-transparent shrink-0">
              <div className="w-full h-full rounded-full bg-gray-300 border-2 border-slate-700 overflow-hidden flex items-center justify-center shadow-lg">
                {lawyer.image ? (
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lawyer.name.replace(/\s+/g, "")}`}
                    alt={lawyer.name}
                    className="w-full h-full object-cover bg-slate-100"
                  />
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-sans font-medium text-white mb-1 truncate">
                {lawyer.name}
              </h3>
              <div className="flex items-center gap-2 text-white/90 text-sm mb-0.5">
                <span className="font-bold">Tel</span>
                <span>{lawyer.tel}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm truncate">
                <span>{lawyer.contact}</span>
              </div>
            </div>
          </div>
        ))}
        </div>

        {/* Back Button positioned below the list */}
        <div className="pt-8 pb-16 flex justify-center w-full">
          <button
            onClick={() => navigate(-1)}
            className="p-4 rounded-full bg-white/10 text-white/90 hover:bg-white/20 active:scale-95 transition-all border border-white/20 cursor-pointer shadow-lg flex items-center justify-center"
          >
            <ChevronLeft size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartneredLawyers;
