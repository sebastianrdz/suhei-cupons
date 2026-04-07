"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CouponRow } from "@/lib/supabase/types";
import { createClient } from "@/lib/supabase/client";
import confetti from "canvas-confetti";

interface CouponModalProps {
  coupon: CouponRow | null;
  isRedeemed: boolean;
  onClose: () => void;
  onToggleRedeemed: () => void;
  onImagesUpdated?: (couponId: string, urls: string[]) => void;
}

const categoryStyle = {
  Actividades: { bar: "linear-gradient(90deg,#BAE6FD,#93C5FD)", badge: { background: "#EFF6FF", color: "#1D4ED8" }, dot: "#93C5FD" },
  Comida:      { bar: "linear-gradient(90deg,#FED7AA,#FDBA74)", badge: { background: "#FFF7ED", color: "#C2410C" }, dot: "#FDBA74" },
  Extras:      { bar: "linear-gradient(90deg,#FBCFE8,#F9A8D4)", badge: { background: "var(--pink-pale)", color: "var(--pink-dark)" }, dot: "var(--pink-light)" },
};

export default function CouponModal({ coupon, isRedeemed, onClose, onToggleRedeemed, onImagesUpdated }: CouponModalProps) {
  const [localImageUrls, setLocalImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync local image state when coupon changes
  useEffect(() => {
    setLocalImageUrls(coupon?.image_urls ?? []);
    setUploadError(null);
  }, [coupon?.id]);

  if (!coupon) return null;

  const cat = categoryStyle[coupon.category];

  const handleToggle = () => {
    if (!isRedeemed) {
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.5 },
        colors: ["#EC4899", "#F9A8D4", "#FBCFE8", "#8B5CF6", "#DDD6FE", "#FDE68A"],
        shapes: ["circle"],
      });
    }
    onToggleRedeemed();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const slots = 2 - localImageUrls.length;
    const toUpload = files.slice(0, slots);

    setUploading(true);
    setUploadError(null);

    try {
      const supabase = createClient();
      const newUrls: string[] = [];

      for (const file of toUpload) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `coupons/${coupon.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("coupon-images")
          .upload(path, file, { upsert: false });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("coupon-images").getPublicUrl(path);
        newUrls.push(data.publicUrl);
      }

      const updatedUrls = [...localImageUrls, ...newUrls];

      const { error: dbError } = await supabase
        .from("coupons")
        .update({ image_urls: updatedUrls })
        .eq("id", coupon.id);
      if (dbError) throw dbError;

      setLocalImageUrls(updatedUrls);
      onImagesUpdated?.(coupon.id, updatedUrls);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = async (idx: number) => {
    const updatedUrls = localImageUrls.filter((_, i) => i !== idx);
    const supabase = createClient();
    await supabase.from("coupons").update({ image_urls: updatedUrls }).eq("id", coupon.id);
    setLocalImageUrls(updatedUrls);
    onImagesUpdated?.(coupon.id, updatedUrls);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 backdrop-blur-sm"
          style={{ background: "rgba(131,24,67,0.25)" }}
        />

        {/* Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden flex flex-col"
          style={{
            boxShadow: "0 30px 80px rgba(190,24,93,0.14), 0 4px 16px rgba(190,24,93,0.08)",
            maxHeight: "92dvh",
          }}
        >
          {/* Accent bar */}
          <div className="h-1.5 w-full flex-shrink-0" style={{ background: cat.bar }} />

          {/* Special shimmer band */}
          {coupon.special && !isRedeemed && (
            <div className="shimmer h-9 flex items-center justify-center gap-2 flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--pink)" }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-sans text-xs uppercase tracking-[0.15em]" style={{ color: "var(--pink-dark)" }}>
                Cupón Especial
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--pink)" }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          )}

          {/* Scrollable body */}
          <div className="overflow-y-auto p-7 sm:p-8">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer focus-visible:outline-none"
              style={{ background: "var(--bg)", color: "var(--text-muted)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--pink-pale)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--bg)")}
              aria-label="Cerrar"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Category badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-sans mb-5" style={cat.badge}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.dot }} />
              {coupon.category}
            </span>

            {/* Title */}
            <h2
              className="font-display leading-tight mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", color: "var(--text-head)" }}
            >
              {coupon.title}
            </h2>

            {/* Subtitle */}
            <p className="font-serif text-lg leading-relaxed mb-4" style={{ color: "var(--pink)" }}>
              {coupon.subtitle}
            </p>

            {/* Divider */}
            <div className="h-px mb-5" style={{ background: "var(--border)" }} />

            {/* Description */}
            <p className="font-serif text-base leading-[1.85] mb-6" style={{ color: "var(--text-body)" }}>
              {coupon.description}
            </p>

            {/* Photos section */}
            <div className="mb-7">
              {/* Existing images */}
              {localImageUrls.length > 0 && (
                <div className={`grid gap-2.5 mb-3 ${localImageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                  {localImageUrls.map((url, i) => (
                    <div key={i} className="relative group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt=""
                        className="w-full rounded-2xl object-cover"
                        style={{ height: localImageUrls.length === 1 ? "240px" : "180px" }}
                      />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
                        style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
                        aria-label="Eliminar foto"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload button */}
              {localImageUrls.length < 2 && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleUpload}
                    className="hidden"
                    id="modal-image-upload"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="modal-image-upload"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-serif text-sm transition-all duration-150"
                    style={{
                      background: "var(--bg)",
                      border: "1.5px dashed var(--border)",
                      color: "var(--text-muted)",
                      cursor: uploading ? "wait" : "pointer",
                    }}
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                        Subiendo foto…
                      </>
                    ) : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        {localImageUrls.length === 0 ? "Añadir foto al recuerdo" : "Añadir otra foto"} ({localImageUrls.length}/2)
                      </>
                    )}
                  </label>
                </>
              )}

              {uploadError && (
                <p className="font-sans text-xs mt-2" style={{ color: "#DC2626" }}>{uploadError}</p>
              )}
            </div>

            {/* Redeem button */}
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={handleToggle}
              className="w-full py-4 rounded-2xl font-serif text-lg font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              style={
                isRedeemed
                  ? { background: "var(--bg)", color: "var(--text-muted)", border: "1.5px solid var(--border)" }
                  : { background: "linear-gradient(135deg, var(--pink) 0%, var(--pink-dark) 100%)", color: "#fff", boxShadow: "0 6px 24px rgba(236,72,153,0.28)" }
              }
            >
              {isRedeemed ? "Marcar como pendiente" : coupon.special ? "💕 Canjear cupón especial" : "Marcar como canjeado"}
            </motion.button>

            {/* Redeemed note */}
            <AnimatePresence>
              {isRedeemed && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-4 flex items-center justify-center gap-2"
                  style={{ color: "#059669" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="font-serif text-sm font-medium">¡Este cupón ya fue canjeado! 🎉</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
