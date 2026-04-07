"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CouponRow, CouponCategory } from "@/lib/supabase/types";
import { toggleCouponRedeemed } from "@/app/actions";
import { hasValidAccess } from "@/lib/access";
import CouponCard from "./CouponCard";
import CouponModal from "./CouponModal";
import GalleryView from "./GalleryView";
import MusicToggle from "./MusicToggle";

type FilterOption = "Todos" | CouponCategory;

interface CouponsSectionProps {
  coupons: CouponRow[];
  showBackButton?: boolean;
}

const filters: FilterOption[] = ["Todos", "Actividades", "Comida", "Extras"];

export default function CouponsSection({ coupons, showBackButton = false }: CouponsSectionProps) {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("Todos");
  const [selectedCoupon, setSelectedCoupon] = useState<CouponRow | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "gallery">("grid");
  const [redeemedSet, setRedeemedSet] = useState<Set<string>>(
    () => new Set(coupons.filter((c) => c.redeemed).map((c) => c.id))
  );

  useEffect(() => {
    if (!hasValidAccess()) router.push("/password");
  }, [router]);

  // Sync local state when server re-renders with fresh data
  useEffect(() => {
    setRedeemedSet(new Set(coupons.filter((c) => c.redeemed).map((c) => c.id)));
  }, [coupons]);

  const isRedeemed = (id: string) => redeemedSet.has(id);

  const handleImagesUpdated = (couponId: string, urls: string[]) => {
    setSelectedCoupon((prev) => (prev?.id === couponId ? { ...prev, image_urls: urls } : prev));
  };

  const handleToggleRedeemed = async (couponId: string) => {
    const newRedeemed = !redeemedSet.has(couponId);
    setRedeemedSet((prev) => {
      const next = new Set(prev);
      if (newRedeemed) next.add(couponId);
      else next.delete(couponId);
      return next;
    });
    await toggleCouponRedeemed(couponId, newRedeemed);
    router.refresh();
  };

  const filtered = (selectedFilter === "Todos"
    ? coupons
    : coupons.filter((c) => c.category === selectedFilter)
  ).slice().sort((a, b) => {
    const aRedeemed = isRedeemed(a.id);
    const bRedeemed = isRedeemed(b.id);
    if (aRedeemed !== bRedeemed) return aRedeemed ? 1 : -1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const redeemedCount = coupons.filter((c) => isRedeemed(c.id)).length;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <MusicToggle />

      {/* Sticky top bar */}
      <div
        className="sticky top-0 z-40 backdrop-blur-md px-5 py-3.5"
        style={{ background: "rgba(253,242,248,0.85)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {showBackButton ? (
            <button
              onClick={() => router.push("/landing")}
              className="flex items-center gap-1.5 font-serif text-sm transition-colors duration-150 cursor-pointer focus-visible:outline-none"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--pink)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Volver
            </button>
          ) : <div />}

          {/* Progress */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full font-sans text-sm"
            style={{ background: "var(--pink-pale)", border: "1px solid var(--border)" }}
          >
            <span style={{ color: "var(--pink-dark)", fontFamily: "var(--font-cormorant)", fontSize: "1rem" }}>
              {redeemedCount} / {coupons.length}
            </span>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>canjeados</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-sans text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "var(--pink-light)" }}>
            Para ti, con amor
          </p>
          <h1
            className="font-display leading-none mb-4"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "var(--text-head)" }}
          >
            Nuestros cupones
          </h1>
          <p className="font-serif text-lg max-w-md mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Elige el momento que quieras vivir conmigo 💕
          </p>
        </motion.div>

        {/* Filter tabs + gallery toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center gap-2 mb-10 flex-wrap"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setSelectedFilter(f); setViewMode("grid"); }}
              className="px-6 py-2.5 rounded-full font-serif text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              style={
                selectedFilter === f && viewMode === "grid"
                  ? { background: "linear-gradient(135deg, var(--pink), var(--pink-dark))", color: "#fff", boxShadow: "0 4px 14px rgba(236,72,153,0.28)" }
                  : { background: "var(--surface)", color: "var(--text-muted)", border: "1.5px solid var(--border)" }
              }
            >
              {f}
            </button>
          ))}

          {/* Separator */}
          <div className="w-px h-6 mx-1 hidden sm:block" style={{ background: "var(--border)" }} />

          {/* Gallery toggle */}
          <button
            onClick={() => setViewMode((v) => (v === "grid" ? "gallery" : "grid"))}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full font-serif text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            style={
              viewMode === "gallery"
                ? { background: "linear-gradient(135deg, var(--pink), var(--pink-dark))", color: "#fff", boxShadow: "0 4px 14px rgba(236,72,153,0.28)" }
                : { background: "var(--surface)", color: "var(--text-muted)", border: "1.5px solid var(--border)" }
            }
            aria-label="Ver galería de fotos"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Galería
          </button>
        </motion.div>

        {/* Gallery or Grid */}
        <AnimatePresence mode="wait">
          {viewMode === "gallery" ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <GalleryView coupons={coupons} />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {filtered.map((coupon, i) => (
                    <motion.div
                      key={coupon.id}
                      layout
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: Math.min(i * 0.04, 0.25), duration: 0.28 }}
                    >
                      <CouponCard
                        coupon={coupon}
                        isRedeemed={isRedeemed(coupon.id)}
                        onClick={() => setSelectedCoupon(coupon)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filtered.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <p className="font-display" style={{ fontSize: "2.8rem", color: "var(--pink-light)" }}>Sin cupones aquí</p>
                  <p className="font-serif mt-2" style={{ color: "var(--text-muted)" }}>No hay cupones en esta categoría</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCoupon && (
          <CouponModal
            coupon={selectedCoupon}
            isRedeemed={isRedeemed(selectedCoupon.id)}
            onClose={() => setSelectedCoupon(null)}
            onToggleRedeemed={() => handleToggleRedeemed(selectedCoupon.id)}
            onImagesUpdated={handleImagesUpdated}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
