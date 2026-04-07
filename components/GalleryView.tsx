"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CouponRow } from "@/lib/supabase/types";

interface GalleryImage {
  url: string;
  couponTitle: string;
  couponId: string;
}

interface GalleryViewProps {
  coupons: CouponRow[];
}

export default function GalleryView({ coupons }: GalleryViewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images: GalleryImage[] = coupons.flatMap((c) =>
    c.image_urls.map((url) => ({ url, couponTitle: c.title, couponId: c.id }))
  );

  if (images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-24"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "var(--pink-pale)", border: "1.5px solid var(--border)" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--pink-light)" }}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <p className="font-display" style={{ fontSize: "2.4rem", color: "var(--pink-light)" }}>
          Sin fotos aún
        </p>
        <p className="font-serif mt-2" style={{ color: "var(--text-muted)" }}>
          Las fotos que subas a los cupones aparecerán aquí
        </p>
      </motion.div>
    );
  }

  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") setLightboxIndex(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="columns-2 sm:columns-3 lg:columns-4 gap-3"
      >
        {images.map((img, i) => (
          <motion.div
            key={`${img.couponId}-${i}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.06, 0.35), duration: 0.3 }}
            className="break-inside-avoid mb-3 cursor-pointer group relative overflow-hidden"
            style={{ borderRadius: "1.25rem" }}
            onClick={() => setLightboxIndex(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.couponTitle}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{
                borderRadius: "1.25rem",
                border: "1.5px solid var(--border)",
                display: "block",
              }}
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
              style={{
                background: "linear-gradient(to top, rgba(131,24,67,0.65) 0%, transparent 55%)",
                borderRadius: "1.25rem",
              }}
            >
              <p className="font-serif text-white text-sm leading-snug line-clamp-2">
                {img.couponTitle}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 backdrop-blur-md"
              style={{ background: "rgba(131,24,67,0.72)" }}
            />

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="relative z-10 flex flex-col items-center w-full max-w-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].couponTitle}
                className="w-full object-contain rounded-3xl"
                style={{
                  maxHeight: "75dvh",
                  boxShadow: "0 30px 80px rgba(131,24,67,0.4)",
                  border: "2px solid rgba(255,255,255,0.15)",
                }}
              />
              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="font-serif text-white text-lg leading-snug">
                  {images[lightboxIndex].couponTitle}
                </p>
                <p
                  className="font-sans text-xs mt-1 uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {lightboxIndex + 1} / {images.length}
                </p>
              </div>
            </motion.div>

            {/* Prev */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer focus-visible:outline-none"
                style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                aria-label="Anterior"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer focus-visible:outline-none"
                style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                aria-label="Siguiente"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}

            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer focus-visible:outline-none"
              style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
              aria-label="Cerrar"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
