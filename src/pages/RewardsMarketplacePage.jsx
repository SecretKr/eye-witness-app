import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Zap, Gift, MapPin, CheckCircle, Lock,
  ChevronRight, Tag, Users, Clock, ShoppingBag
} from "lucide-react";
import usePoints from "../hooks/usePoints";
import LocationHeader from "../components/LocationHeader";
import useUserLocation from "../hooks/useUserLocation";

// ─── Mockup Data ──────────────────────────────────────────────────────────────
const STORES = [
  {
    id: 1,
    name: "FamilyMart Samyan",
    category: "Convenience Store",
    distance: "80m",
    gradient: "bg-green-gradient",
    emoji: "🏪",
    coupons: [
      {
        id: "fm-1",
        title: "10% Off Any Purchase",
        points: 35,
        quotaUsed: 12,
        quotaTotal: 50,
        expiry: "Today",
        tag: "Popular",
        tagGradient: "bg-orange-gradient",
      },
      {
        id: "fm-2",
        title: "Free Iced Coffee (S)",
        points: 60,
        quotaUsed: 4,
        quotaTotal: 20,
        expiry: "Today",
        tag: null,
      },
    ],
  },
  {
    id: 2,
    name: "Samyan Co-op",
    category: "Café & Co-Working",
    distance: "120m",
    gradient: "bg-primary-gradient",
    emoji: "☕",
    coupons: [
      {
        id: "co-1",
        title: "Buy 1 Get 1 Drink",
        points: 80,
        quotaUsed: 18,
        quotaTotal: 30,
        expiry: "Today",
        tag: "Limited",
        tagGradient: "bg-red-gradient",
      },
      {
        id: "co-2",
        title: "15% Off Food Menu",
        points: 50,
        quotaUsed: 8,
        quotaTotal: 40,
        expiry: "Today",
        tag: null,
      },
    ],
  },
  {
    id: 3,
    name: "Tops Daily Samyan",
    category: "Supermarket",
    distance: "200m",
    gradient: "bg-yellow-gradient",
    emoji: "🛒",
    coupons: [
      {
        id: "td-1",
        title: "5% Off Groceries",
        points: 25,
        quotaUsed: 41,
        quotaTotal: 50,
        expiry: "Today",
        tag: "Almost Full",
        tagGradient: "bg-orange-gradient",
      },
    ],
  },
];

// ─── localStorage helpers for history ─────────────────────────────────────────
const HISTORY_KEY = "eyewitness_redeemed_history";
const getHistory = () => {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
};
const saveHistory = (arr) => localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));

// ─── Coupon Card ──────────────────────────────────────────────────────────────
const CouponCard = ({ coupon, store, userPoints, onRedeemed }) => {
  const [redeemed, setRedeemed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { addPoints } = usePoints();

  const quotaPct = Math.round((coupon.quotaUsed / coupon.quotaTotal) * 100);
  const quotaLeft = coupon.quotaTotal - coupon.quotaUsed;
  const canRedeem = userPoints >= coupon.points && !redeemed && quotaLeft > 0;

  const quotaGradient =
    quotaPct >= 90 ? "bg-red-gradient" :
    quotaPct >= 60 ? "bg-orange-gradient" :
    quotaPct >= 30 ? "bg-yellow-gradient" :
                     "bg-green-gradient";

  const handleRedeem = () => {
    if (!canRedeem) return;
    setShowConfirm(false);
    addPoints(-coupon.points);
    setRedeemed(true);
    // Save to history
    const prev = getHistory();
    const entry = {
      id: coupon.id,
      title: coupon.title,
      storeName: store.name,
      storeEmoji: store.emoji,
      storeGradient: store.gradient,
      points: coupon.points,
      redeemedAt: new Date().toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" }),
    };
    saveHistory([entry, ...prev]);
    onRedeemed?.();
  };

  return (
    <div className="bg-white/10 border border-white/15 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-white font-bold text-sm leading-tight">{coupon.title}</p>
            {coupon.tag && (
              <span className={`${coupon.tagGradient} text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full`}>
                {coupon.tag}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Zap size={11} className="text-white/60 fill-white/60" />
            <p className="text-white/60 text-[11px] font-semibold">{coupon.points} pts · Expires {coupon.expiry}</p>
          </div>
        </div>

        {redeemed ? (
          <div className="flex items-center gap-1 bg-green-gradient rounded-xl px-3 py-2 shrink-0">
            <CheckCircle size={13} className="text-white" />
            <span className="text-white text-[10px] font-black uppercase tracking-wider">Done</span>
          </div>
        ) : !canRedeem ? (
          <div className="flex items-center gap-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 shrink-0 opacity-50">
            <Lock size={12} className="text-white/60" />
            <span className="text-white/60 text-[10px] font-black uppercase tracking-wider">
              {quotaLeft <= 0 ? "Sold Out" : `${coupon.points} pts`}
            </span>
          </div>
        ) : showConfirm ? (
          <button
            onClick={handleRedeem}
            className={`${store.gradient} rounded-xl px-3 py-2 shrink-0 text-white text-[10px] font-black uppercase tracking-wider shadow-lg active:scale-95 transition-transform`}
          >
            Confirm!
          </button>
        ) : (
          <button
            onClick={() => setShowConfirm(true)}
            className={`${store.gradient} rounded-xl px-3 py-2 shrink-0 text-white text-[10px] font-black uppercase tracking-wider shadow-lg active:scale-95 transition-transform`}
          >
            Redeem
          </button>
        )}
      </div>

      {/* Quota bar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <Users size={10} className="text-white/50" />
            <span className="text-[9px] text-white/50 font-semibold uppercase tracking-wider">Daily Quota</span>
          </div>
          <span className="text-[9px] text-white/70 font-bold">{coupon.quotaUsed}/{coupon.quotaTotal} claimed</span>
        </div>
        <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
          <div className={`h-full ${quotaGradient} rounded-full transition-all duration-500`} style={{ width: `${quotaPct}%` }} />
        </div>
        <p className="text-[9px] text-white/40 font-semibold mt-0.5">{quotaLeft} coupons remaining today</p>
      </div>
    </div>
  );
};

// ─── Store Card ───────────────────────────────────────────────────────────────
const StoreCard = ({ store, userPoints, onRedeemed }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10">
      <button
        onClick={() => setExpanded(v => !v)}
        className={`w-full ${store.gradient} px-5 py-4 flex items-center gap-4 text-left active:opacity-90 transition-opacity`}
      >
        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shrink-0 shadow-md">
          {store.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-tight">{store.name}</p>
          <p className="text-white/70 text-[10px] uppercase tracking-wider font-semibold">{store.category}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={10} className="text-white/60" />
            <span className="text-white/60 text-[10px] font-semibold">{store.distance} away</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <div className="bg-white/20 rounded-full px-2 py-0.5">
            <span className="text-white text-[10px] font-black">{store.coupons.length} offers</span>
          </div>
          <ChevronRight size={16} className={`text-white/60 transition-transform duration-300 ${expanded ? "rotate-90" : ""}`} />
        </div>
      </button>
      {expanded && (
        <div className="bg-white/5 border-t border-white/10 p-3 flex flex-col gap-3">
          {store.coupons.map(coupon => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              store={store}
              userPoints={userPoints}
              onRedeemed={onRedeemed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ─── History Tab ─────────────────────────────────────────────────────────────
const HistoryTab = () => {
  const [history, setHistory] = useState(getHistory);

  // Refresh on focus
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
          <ShoppingBag size={26} className="text-white/30" />
        </div>
        <p className="text-white/30 text-sm font-semibold uppercase tracking-widest">No redeemed coupons yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {history.map((item, i) => (
        <div key={i} className="bg-white/10 border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${item.storeGradient} flex items-center justify-center text-xl shrink-0`}>
            {item.storeEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">{item.title}</p>
            <p className="text-white/50 text-[10px] font-semibold">{item.storeName}</p>
          </div>
          <div className="flex flex-col items-end gap-0.5 shrink-0">
            <div className="flex items-center gap-1 bg-green-gradient rounded-full px-2 py-0.5">
              <CheckCircle size={10} className="text-white" />
              <span className="text-white text-[9px] font-black">-{item.points} pts</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={9} className="text-white/30" />
              <span className="text-[9px] text-white/30 font-semibold">{item.redeemedAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const RewardsMarketplacePage = () => {
  const navigate = useNavigate();
  const { points } = usePoints();
  const { locationName, loading } = useUserLocation();
  const [tab, setTab] = useState("offers"); // "offers" | "history"
  const [historyKey, setHistoryKey] = useState(0); // force history re-render on redeem

  // Scroll to top on mount
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <div className="min-h-screen pb-28 relative overflow-hidden bg-black">
      <div className="absolute top-0 left-0 w-full h-72 bg-primary/15 blur-[80px] pointer-events-none rounded-full -translate-y-1/2" />

      {/* Header */}
      <div className="relative z-10 mt-10 px-4">
        <LocationHeader locationName={locationName} loading={loading} />
      </div>

      {/* Back + Title */}
      <div className="relative z-10 px-4 mt-2 flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/10 border border-white/20 p-2 rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </button>
        <div>
          <h1 className="text-white text-xl font-black uppercase tracking-widest leading-tight">Rewards</h1>
          <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">SafeHaven Marketplace</p>
        </div>
      </div>

      {/* Points Balance strip */}
      <div className="px-4 mb-4 relative z-10">
        <div className="bg-primary-gradient rounded-2xl px-5 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Zap size={18} className="text-white fill-white" />
            </div>
            <div>
              <p className="text-white/70 text-[9px] uppercase tracking-[0.2em] font-bold">Available Balance</p>
              <p className="text-white text-2xl font-black leading-tight">{points} <span className="text-sm font-bold opacity-70">pts</span></p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag size={13} className="text-white/60" />
            <p className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">
              {STORES.reduce((a, s) => a + s.coupons.length, 0)} offers nearby
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4 relative z-10">
        <div className="flex bg-white/10 rounded-2xl p-1 gap-1">
          {[
            { key: "offers", label: "Offers" },
            { key: "history", label: "Redeemed" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                tab === key ? "bg-white text-primary shadow" : "text-white/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 flex flex-col gap-4 relative z-10">
        {tab === "offers" ? (
          <>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold px-1">
              Partnered SafeHaven Stores
            </p>
            {STORES.map(store => (
              <StoreCard
                key={store.id}
                store={store}
                userPoints={points}
                onRedeemed={() => setHistoryKey(k => k + 1)}
              />
            ))}
          </>
        ) : (
          <HistoryTab key={historyKey} />
        )}
      </div>
    </div>
  );
};

export default RewardsMarketplacePage;
