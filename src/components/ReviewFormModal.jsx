import React, { useState, useEffect } from "react";
import { X, Star, Zap, CheckCircle, ImagePlus } from "lucide-react";
import usePoints from "../hooks/usePoints";

// ─── Reward Popup ─────────────────────────────────────────────────────────────
const RewardPopup = ({ earnedPoints, totalPoints, onDismiss }) => {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-72 bg-green-gradient rounded-[32px] p-8 flex flex-col items-center text-white shadow-2xl animate-scale-in overflow-hidden">
        {/* Glow ring */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 shadow-lg">
          <Zap size={40} className="text-white fill-white" />
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-75 mb-1">
          Points Earned
        </p>
        <p className="text-6xl font-black tracking-tight mb-2">
          +{earnedPoints}
        </p>
        <p className="text-sm font-semibold opacity-80 mb-6">
          Total: <span className="font-black">{totalPoints} pts</span>
        </p>

        <button
          onClick={onDismiss}
          className="w-full bg-white/20 hover:bg-white/30 border border-white/40 text-white font-bold py-3 rounded-2xl uppercase tracking-widest text-sm transition-colors active:scale-95"
        >
          Awesome! 🎉
        </button>
      </div>
    </div>
  );
};

// ─── Main Modal ────────────────────────────────────────────────────────────────
const MAX_POINTS = 35;

const ReviewFormModal = ({
  isOpen,
  onClose,
  locationName = "Current Location",
}) => {
  const { points, addPoints } = usePoints();

  // Form state
  const [rating, setRating] = useState(0);
  const [cctvCount, setCctvCount] = useState("Several");
  const [hasSecurity, setHasSecurity] = useState(false);
  const [lighting, setLighting] = useState("Good");
  const [reviewText, setReviewText] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);

  // Guards
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  // Reward popup
  const [showReward, setShowReward] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // ── On open ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    // Reset form
    setRating(0);
    setCctvCount("Several");
    setHasSecurity(false);
    setLighting("Good");
    setReviewText("");
    setHasPhoto(false);
    setShowReward(false);

    // One-review guard
    const key = `eyewitness_reviewed_${locationName.toLowerCase().replace(/\s+/g, "_")}`;
    setAlreadyReviewed(localStorage.getItem(key) === "true");

    return () => {};
  }, [isOpen, locationName]);

  if (!isOpen) return null;

  // ── Points calculation ─────────────────────────────────────────────────────
  const hasBaseTags = rating > 0;
  const wordCount = reviewText.trim().split(/\s+/).filter(Boolean).length;
  const hasEnoughText = wordCount >= 10;
  const wordsNeeded = Math.max(0, 10 - wordCount);

  const basePoints = hasBaseTags ? 10 : 0;
  const textPoints = hasEnoughText ? 10 : 0;
  const photoPoints = hasPhoto ? 15 : 0;
  const estimatedPoints = basePoints + textPoints + photoPoints;
  const progressPct = Math.round((estimatedPoints / MAX_POINTS) * 100);

  // ── Gradient helpers ───────────────────────────────────────────────────────
  // Maps star rating → gradient + label
  const ratingMeta = [
    null,
    { gradient: 'bg-red-gradient',    label: 'Dangerous' },
    { gradient: 'bg-orange-gradient', label: 'Unsafe' },
    { gradient: 'bg-yellow-gradient', label: 'Average' },
    { gradient: 'bg-yellow-gradient', label: 'Fairly Safe' },
    { gradient: 'bg-green-gradient',  label: 'Excellent' },
  ];
  const activeMeta = rating > 0 ? ratingMeta[rating] : null;

  // Maps estimated points → gradient for the points card
  const pointsGradient =
    estimatedPoints >= 35 ? 'bg-green-gradient' :
    estimatedPoints >= 20 ? 'bg-yellow-gradient' :
    estimatedPoints >= 10 ? 'bg-orange-gradient' :
                            'bg-red-gradient';

  // ── Guards ─────────────────────────────────────────────────────────────────
  const canSubmit = !alreadyReviewed;

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const earned = estimatedPoints > 0 ? estimatedPoints : 10; // min 10 pts for any submission
    addPoints(earned);
    setEarnedPoints(earned);

    // Mark location as reviewed
    const key = `eyewitness_reviewed_${locationName.toLowerCase().replace(/\s+/g, "_")}`;
    localStorage.setItem(key, "true");

    setShowReward(true);
  };

  const handleDismissReward = () => {
    setShowReward(false);
    onClose();
  };

  return (
    <>
      {/* Reward Popup */}
      {showReward && (
        <RewardPopup
          earnedPoints={earnedPoints}
          totalPoints={points + earnedPoints}
          onDismiss={handleDismissReward}
        />
      )}

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 pt-16 pb-24 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div
          className="w-full max-w-sm bg-primary-gradient rounded-[28px] shadow-2xl relative flex flex-col animate-scale-in"
          style={{ maxHeight: "72dvh" }}
        >
          {/* ── Header ─────────────────────────────────────────────── */}
          <div className="px-6 pt-5 pb-3 text-center relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-5 right-6 text-white/80 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold text-white mb-0.5 uppercase tracking-wider">
              Write a Review
            </h2>
            <p className="text-white/70 text-xs uppercase tracking-widest">
              {locationName}
            </p>
          </div>

          {/* ── Already Reviewed Banner ─────────────────────────────── */}
          {alreadyReviewed && (
            <div className="mx-6 mb-2 flex items-center gap-2 bg-white/10 border border-white/30 rounded-2xl px-4 py-3 shrink-0">
              <CheckCircle size={16} className="text-white shrink-0" />
              <p className="text-white text-xs font-semibold">
                You've already reviewed this location ✓
              </p>
            </div>
          )}

          {/* ── Scrollable Form ─────────────────────────────────────── */}
          <div
            className="overflow-y-auto flex-1 px-5 pb-4"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* 1. Star Rating */}
              <div className="flex flex-col items-center gap-1.5">
                <label className="text-white text-sm font-bold uppercase tracking-wide">
                  Rate Safety
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform active:scale-90"
                    >
                      <Star
                        size={34}
                        className={`${rating >= star ? "fill-white text-white" : "text-white/30"} transition-all duration-150`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
                {rating === 0 && (
                  <p className="text-white/50 text-[10px] tracking-wide">
                    Tap a star to start (+10 pts)
                  </p>
                )}
                {/* Safety level badge - animates in when a star is selected */}
                {activeMeta && (
                  <span className={`${activeMeta.gradient} text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-md`}>
                    {activeMeta.label}
                  </span>
                )}
              </div>

              {/* 2. Photo Upload */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-white text-xs font-bold uppercase tracking-wide">
                    Add Photo
                  </label>
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
                    +15 pts
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasPhoto(true)}
                  className={`h-16 w-full rounded-xl border-2 border-dashed flex items-center justify-center gap-3 transition-all ${
                    hasPhoto
                      ? "border-white/60 bg-white/15"
                      : "border-white/30 hover:bg-white/10"
                  }`}
                >
                  {hasPhoto ? (
                    <>
                      <CheckCircle size={18} className="text-white" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Photo Added ✓
                      </span>
                    </>
                  ) : (
                    <>
                      <ImagePlus size={18} className="text-white" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                        Tap to upload
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* 3. Text Review */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-white text-xs font-bold uppercase tracking-wide">
                    Review
                  </label>
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
                    +10 pts
                  </span>
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience regarding safety..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 min-h-[60px] resize-none"
                />
                {!hasEnoughText && reviewText.length > 0 && (
                  <p className="text-white/60 text-[10px] font-semibold tracking-wide">
                    ✏️ Write {wordsNeeded} more word
                    {wordsNeeded !== 1 ? "s" : ""} for +10 pts
                  </p>
                )}
                {hasEnoughText && (
                  <p className="text-white/80 text-[10px] font-semibold tracking-wide">
                    ✓ +10 pts unlocked
                  </p>
                )}
              </div>

              {/* 4 & 5. CCTV + Security */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-white text-xs font-bold uppercase tracking-wide">
                    CCTVs Nearby
                  </label>
                  <select
                    value={cctvCount}
                    onChange={(e) => setCctvCount(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white text-xs focus:outline-none appearance-none"
                  >
                    <option className="bg-gray-800" value="Few">
                      Few
                    </option>
                    <option className="bg-gray-800" value="Several">
                      Several
                    </option>
                    <option className="bg-gray-800" value="Many">
                      Many
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white text-xs font-bold uppercase tracking-wide">
                    Security Guard
                  </label>
                  <div className="flex bg-white/10 rounded-xl p-1 border border-white/20 h-[42px]">
                    <button
                      type="button"
                      onClick={() => setHasSecurity(true)}
                      className={`flex-1 rounded-lg text-xs font-bold transition-all ${hasSecurity ? "bg-white text-primary" : "text-white/60"}`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasSecurity(false)}
                      className={`flex-1 rounded-lg text-xs font-bold transition-all ${!hasSecurity ? "bg-white text-primary" : "text-white/60"}`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              {/* 6. Lighting */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white text-xs font-bold uppercase tracking-wide">
                  Lighting Quality
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Poor", "Good", "Well Lit"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setLighting(opt)}
                      className={`py-2 rounded-xl border border-white/20 text-xs font-bold transition-all ${
                        lighting === opt
                          ? "bg-white text-primary"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Points Progress Bar ──────────────────────────── */}
              <div className={`${pointsGradient} rounded-2xl p-4 flex flex-col gap-2`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Zap size={14} className="text-white fill-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Estimated Points
                    </span>
                  </div>
                  <span className="text-sm font-black text-white">
                    {estimatedPoints} / {MAX_POINTS} pts
                  </span>
                </div>
                {/* Bar */}
                <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${progressPct > 0 ? progressPct : 3}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-white/70 font-bold uppercase tracking-wider">
                  <span>Base: {basePoints}pts</span>
                  <span>Text: {textPoints}pts</span>
                  <span>Photo: {photoPoints}pts</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full font-bold py-3 rounded-2xl uppercase tracking-widest text-sm shadow-lg transition-all active:scale-[0.98] ${
                  canSubmit
                    ? `${estimatedPoints > 0 ? pointsGradient : 'bg-green-gradient'} text-white hover:opacity-95`
                    : 'bg-white/20 text-white/40 cursor-not-allowed'
                }`}
              >
                {alreadyReviewed
                  ? "Already Reviewed ✓"
                  : `Submit & Earn ${estimatedPoints > 0 ? estimatedPoints : 10} pts`}
              </button>

              <div className="h-2" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewFormModal;
