"use client";

import { motion } from "framer-motion";
import { CouponRow } from "@/lib/supabase/types";

interface CouponCardProps {
  coupon: CouponRow;
  isRedeemed: boolean;
  onClick: () => void;
}

const categoryStyle = {
  Actividades: {
    bar:   "linear-gradient(90deg, #BAE6FD, #93C5FD)",
    badge: { background: "#EFF6FF", color: "#1D4ED8" },
    dot:   "#93C5FD",
  },
  Comida: {
    bar:   "linear-gradient(90deg, #FED7AA, #FDBA74)",
    badge: { background: "#FFF7ED", color: "#C2410C" },
    dot:   "#FDBA74",
  },
  Extras: {
    bar:   "linear-gradient(90deg, #FBCFE8, #F9A8D4)",
    badge: { background: "var(--pink-pale)", color: "var(--pink-dark)" },
    dot:   "var(--pink-light)",
  },
};

export default function CouponCard({ coupon, isRedeemed, onClick }: CouponCardProps) {
  const cat = categoryStyle[coupon.category];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      {/* Special outer glow */}
      {coupon.special && !isRedeemed && (
        <div
          className="absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
          style={{ background: "linear-gradient(135deg, var(--pink-light), var(--lavender-light), var(--pink-light))" }}
        />
      )}

      <div
        className="relative bg-white rounded-3xl overflow-hidden transition-shadow duration-300"
        style={{
          border: `1.5px solid ${coupon.special && !isRedeemed ? "var(--border-hover)" : "var(--border)"}`,
          boxShadow: isRedeemed
            ? "0 2px 8px rgba(236,72,153,0.05)"
            : "0 4px 20px rgba(236,72,153,0.08), 0 1px 4px rgba(236,72,153,0.06)",
        }}
      >
        {/* Pastel accent bar */}
        <div className="h-1 w-full" style={{ background: cat.bar }} />

        <div className={`p-6 ${isRedeemed ? "opacity-65" : ""}`}>
          {/* Badges row */}
          <div className="flex items-start justify-between gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-sans"
              style={cat.badge}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.dot }} />
              {coupon.category}
            </span>

            {coupon.special && !isRedeemed && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold font-sans"
                style={{ background: "var(--lavender-light)", color: "var(--lavender)" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Especial
              </span>
            )}

            {isRedeemed && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold font-sans border border-emerald-100">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Canjeado
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="font-serif text-xl font-semibold leading-snug mb-2 transition-colors duration-200 group-hover:opacity-80"
            style={{ color: "var(--text-head)" }}
          >
            {coupon.title}
          </h3>

          {/* Subtitle */}
          <p className="font-serif text-sm leading-relaxed line-clamp-2" style={{ color: "var(--text-muted)" }}>
            {coupon.subtitle}
          </p>

          {/* Arrow */}
          <div
            className="mt-4 flex items-center gap-1 transition-all duration-200 group-hover:gap-2"
            style={{ color: "var(--pink-light)" }}
          >
            <span className="font-sans text-xs uppercase tracking-widest">Ver más</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Redeemed stamp */}
        {isRedeemed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full border-[3px] flex items-center justify-center rotate-[-15deg]"
              style={{ borderColor: "rgba(236,72,153,0.15)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(236,72,153,0.15)" }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
