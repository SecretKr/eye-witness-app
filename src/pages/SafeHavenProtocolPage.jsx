import React, { useState } from "react";
import { 
  ChevronLeft, ChevronRight, BookOpen, ShieldAlert, HeartHandshake, PhoneCall, 
  Scale, ShieldCheck, ArrowRight, Users, Lock, Eye, CheckCircle, AlertCircle,
  Smartphone, FileText, Briefcase
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LocationHeader from "../components/LocationHeader";
import useUserLocation from "../hooks/useUserLocation";
import BusinessNavbar from "../components/BusinessNavbar";

const chapters = [
  {
    title: "บทที่ 1: แยกตัวและปกป้อง (The First 60 Seconds)",
    subtitle: "เป้าหมาย: ดึงเหยื่อออกจากภาวะอันตรายทันที",
    icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
    content: (
      <div className="space-y-3">
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-red-300 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-white block mb-1">พาเข้า Safe Zone ทันที</strong>
              <p className="text-white/80 text-xs leading-relaxed">เชิญผู้เสียหายเข้ามาในพื้นที่ปลอดภัย เช่น หลังเคาน์เตอร์ ห้องพักพนักงาน หรือบริเวณที่มีพนักงานอยู่รวมกันหลายคน</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-orange-300 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-white block mb-1">กันผู้ก่อเหตุออกไป</strong>
              <p className="text-white/80 text-xs leading-relaxed">หากผู้ก่อเหตุตามมา ให้แจ้งอย่างสุภาพแต่หนักแน่นว่า "พื้นที่นี้สงวนไว้สำหรับพนักงานและผู้ที่ต้องการความช่วยเหลือเท่านั้น หากมีปัญหาทางเราจะประสานงานตำรวจให้"</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-white block mb-1">ปิดบังการมองเห็น</strong>
              <p className="text-white/80 text-xs leading-relaxed">ให้ผู้เสียหายอยู่ในมุมที่ผู้ก่อเหตุไม่สามารถมองเห็นได้จากภายนอกร้าน เพื่อลดความหวาดกลัว</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "บทที่ 2: บทพูดเยียวยาจิตใจ (Psychological Scripts)",
    subtitle: "เป้าหมาย: ลดความตื่นตระหนกด้วยบทพูดสำเร็จรูป",
    icon: <HeartHandshake className="w-6 h-6 text-white" />,
    content: (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
            <strong className="text-white text-sm">สิ่งที่ควรพูด</strong>
          </div>
          <div className="space-y-2 pl-7">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <p className="text-white/90 text-xs leading-relaxed">"ตอนนี้คุณปลอดภัยแล้วครับ/ค่ะ คุณอยู่ในพื้นที่ของ EYE-WITNESS พาร์ทเนอร์"</p>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <p className="text-white/90 text-xs leading-relaxed">"เดี๋ยวทางเราจะช่วยประสานงานเจ้าหน้าที่ให้ ไม่ต้องกังวลนะครับ/คะ"</p>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <p className="text-white/90 text-xs leading-relaxed">"คุณต้องการดื่มน้ำ หรือให้เราช่วยติดต่อใครให้ก่อนไหมครับ/คะ?"</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-white flex-shrink-0" />
            <strong className="text-white text-sm">สิ่งที่ห้ามพูดเด็ดขาด</strong>
          </div>
          <div className="space-y-2 pl-7">
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-white/90 text-xs leading-relaxed">"เกิดอะไรขึ้น เล่ามาให้หมดเลย" <span className="text-red-300 italic">(เหยื่ออาจยังอยู่ในภาวะช็อก)</span></p>
            </div>
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-white/90 text-xs leading-relaxed">"ทำไมไปเดินตรงนั้น/ทำไมแต่งตัวแบบนี้"</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "บทที่ 3: การประสานงาน (Action & Report)",
    subtitle: "เป้าหมาย: นำหน่วยงานรัฐเข้ามาจัดการพื้นที่",
    icon: <PhoneCall className="w-6 h-6 text-blue-400" />,
    content: (
      <div className="space-y-3">
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-white block mb-1">กดปุ่มแจ้งเหตุในแอปฯ</strong>
              <p className="text-white/80 text-xs leading-relaxed">ใช้ฟีเจอร์ในแอปเพื่อส่งสัญญาณหรือพิกัดไปยังเจ้าหน้าที่ตำรวจ</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <PhoneCall className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-white block mb-1">บทพูดเมื่อคุยกับตำรวจ</strong>
              <p className="text-white/80 text-xs leading-relaxed italic">"มีผู้เสียหายหนีการคุกคามมาขอความช่วยเหลือที่ร้าน [ชื่อร้าน] ตอนนี้ผู้เสียหายปลอดภัยแล้ว แต่ต้องการให้สายตรวจเข้ามาตรวจสอบพื้นที่ด่วน"</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-white block mb-1">CCTV Backup</strong>
              <p className="text-white/80 text-xs leading-relaxed">มอบหมายให้พนักงานอีกคนทำการเซฟหรือล็อกไฟล์ภาพจากกล้องวงจรปิด (CCTV) ในช่วงเวลาดังกล่าวไว้เป็นหลักฐาน</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "บทที่ 4: การรักษาหลักฐานทางกฎหมาย",
    subtitle: "เป้าหมาย: สร้างความมั่นใจเรื่องรูปคดี",
    icon: <Scale className="w-6 h-6 text-yellow-400" />,
    content: (
      <div className="space-y-3">
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-white block mb-2">ไม่ต้องบังคับให้เหยื่อเล่า</strong>
              <p className="text-white/80 text-xs leading-relaxed italic">"ไม่ต้องกังวลเรื่องการหาหลักฐานนะครับ/คะ ระบบ Stealth Mode ของแอปฯ ได้บันทึกภาพ เสียง และพิกัดไว้หมดแล้ว"</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-white block mb-2">อธิบายเรื่องความปลอดภัยของข้อมูล</strong>
              <p className="text-white/80 text-xs leading-relaxed italic">ไฟล์วิดีโอถูกเข้ารหัสด้วยเทคโนโลยี Blockchain Hashing เรียบร้อยแล้ว หลักฐานนี้จะมีความน่าเชื่อถือสูงสุดในชั้นศาล</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "บทที่ 5: การส่งต่อความช่วยเหลือ",
    subtitle: "เป้าหมาย: ส่งมอบเคสอย่างสมบูรณ์",
    icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
    content: (
      <div className="space-y-3">
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-white block mb-1">เมื่อตำรวจมาถึง</strong>
              <p className="text-white/80 text-xs leading-relaxed">ให้ข้อมูลเท่าที่เห็นเหตุการณ์หน้าร้าน (เช่น ลักษณะผู้ก่อเหตุที่ตามมา) และปล่อยให้ตำรวจสอบถามผู้เสียหายเมื่อผู้เสียหายพร้อม</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-purple-300 mt-1 flex-shrink-0" />
            <div>
              <strong className="text-white block mb-2">แนะนำการดำเนินคดี</strong>
              <p className="text-white/80 text-xs leading-relaxed italic">แจ้งผู้เสียหายว่าแอป EYE-WITNESS มีระบบ Legal Chatbot ที่จะช่วยสร้างสำนวนดิจิทัล (Digital Evidence Brief) เบื้องต้นให้ และสามารถกดหาทนายความในเครือข่าย (Partnered Lawyers) เพื่อรับช่วงต่อดูแลคดีได้ทันที</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const SafeHavenProtocolPage = () => {
  const navigate = useNavigate();
  const { locationName, loading } = useUserLocation();
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < chapters.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentChapter = chapters[currentPage];

  return (
    <div className="fixed inset-0 flex flex-col w-full max-w-md mx-auto bg-black text-white overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-safe-top pb-6 flex flex-col">

      {/* Header */}
      <div className="mt-10 mb-8 relative z-10 animate-fade-in-up">
        <LocationHeader
          locationName={locationName}
          loading={loading}
          hideProfile={true}
          helpTo="/safe-haven-help"
          pillClassName="bg-orange-gradient"
        />
      </div>

      <h1 className="text-center text-xl font-sans text-white tracking-wider mb-6 drop-shadow-md animate-fade-in-up">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-white" />
          Crisis Action Booklet
        </div>
        <div className="text-sm font-light text-white/70 mt-1">
          คู่มือรับมือเหตุฉุกเฉิน
        </div>
      </h1>

      <div className="flex-1 flex flex-col justify-between animate-fade-in-up [animation-delay:100ms] relative z-10 w-full max-w-md mx-auto">
        <div className="bg-orange-gradient rounded-3xl p-6 shadow-2xl relative overflow-hidden flex-1 flex flex-col">
          {/* Chapter Header */}
          <div className="border-b border-white/20 pb-4 mb-5">
            <h2 className="text-base font-bold mb-2 text-white drop-shadow-md flex items-start gap-3 leading-snug">
              <span className="shrink-0 mt-0.5">{currentChapter.icon}</span>
              <span>{currentChapter.title}</span>
            </h2>
            <p className="text-xs text-white/70 italic pl-8 font-medium">
              {currentChapter.subtitle}
            </p>
          </div>

          {/* Chapter Content */}
          <div className="text-white/90 flex-1 overflow-y-auto no-scrollbar">
            {currentChapter.content}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between pt-6 mt-auto">
          <button
            onClick={currentPage === 0 ? () => navigate(-1) : handlePrev}
            className="p-3 px-5 rounded-full bg-white/10 text-white hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/10 backdrop-blur-md"
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">{currentPage === 0 ? "Back" : "Prev"}</span>
          </button>
          
          <div className="text-white/50 text-sm font-medium">
            {currentPage + 1} / {chapters.length}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === chapters.length - 1}
            className={`p-3 px-5 rounded-full transition-all flex items-center justify-center gap-2 border backdrop-blur-md ${
              currentPage === chapters.length - 1
                ? "bg-white/5 text-white/30 border-transparent"
                : "bg-white/10 text-white hover:bg-white/20 active:scale-95 border-white/10"
            }`}
          >
            <span className="text-sm font-medium">Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      </div>
      {/* Gradient fade above navbar */}
      <div className="shrink-0 relative mt-auto">
        <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        <BusinessNavbar />
      </div>
    </div>
  );
};

export default SafeHavenProtocolPage;
