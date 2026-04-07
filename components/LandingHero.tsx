"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MusicToggle from "./MusicToggle";

interface LandingHeroProps {
  onEnter: () => void;
}

const photos = [
  { id: 1, src: "/images/img1.jpg", x: "7%",  y: "8%",  rotation: -8,  delay: 0.2, caption: "nosotros"  },
  { id: 2, src: "/images/img2.jpg", x: "76%", y: "12%", rotation: 5,   delay: 0.3, caption: "juntos"    },
  { id: 3, src: "/images/img3.jpg", x: "10%", y: "72%", rotation: 10,  delay: 0.4, caption: "siempre"   },
  { id: 4, src: "/images/img4.jpg", x: "70%", y: "68%", rotation: -6,  delay: 0.5, caption: "contigo"   },
  { id: 5, src: "/images/img5.jpg", x: "3%",  y: "42%", rotation: -12, delay: 0.6, caption: "recuerdos" },
  { id: 6, src: "/images/img6.JPG", x: "84%", y: "42%", rotation: 8,   delay: 0.7, caption: "momentos"  },
  { id: 7, src: "/images/img7.jpg", x: "38%", y: "5%",  rotation: -3,  delay: 0.8, caption: "amor"      },
  { id: 8, src: "/images/img8.jpg", x: "43%", y: "83%", rotation: 5,   delay: 0.9, caption: "felicidad" },
];

function Polaroid({ photo, mobile }: { photo: typeof photos[0]; mobile?: boolean }) {
  const w    = mobile ? "w-24"  : "w-44";
  const imgH = mobile ? "h-[70px]" : "h-[130px]";
  const pad  = mobile ? "p-2"   : "p-3 pb-5";
  const txt  = mobile ? "text-[9px]" : "text-[11px]";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, rotate: photo.rotation }}
      animate={{ opacity: 1, scale: 1, rotate: photo.rotation, y: [0, mobile ? -10 : -16, 0] }}
      transition={{
        opacity: { delay: photo.delay, duration: 0.6 },
        scale:   { delay: photo.delay, duration: 0.6, type: "spring", stiffness: 120 },
        y:       { delay: photo.delay + 0.7, duration: 3.5 + photo.id * 0.25, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={{ scale: 1.07, zIndex: 20 }}
      style={{ position: "absolute", left: photo.x, top: photo.y }}
      className={mobile ? "md:hidden" : "hidden md:block"}
    >
      <div
        className={`${w} ${pad} bg-white rounded-sm cursor-default`}
        style={{ boxShadow: "0 6px 24px rgba(190,24,93,0.14), 0 2px 6px rgba(0,0,0,0.08)" }}
      >
        <div className={`w-full ${imgH} overflow-hidden relative`} style={{ background: "var(--bg)" }}>
          <Image src={photo.src} alt={photo.caption} fill className="object-cover" sizes={mobile ? "96px" : "176px"} />
        </div>
        <p className={`text-center ${txt} mt-1.5 italic tracking-wide font-serif`}
          style={{ color: "var(--text-muted)" }}>
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function LandingHero({ onEnter }: LandingHeroProps) {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #FFF0F7 0%, #FCE7F3 30%, #F5F0FF 70%, #EDE9FE 100%)" }}
    >
      <MusicToggle />

      {/* Soft pastel glow blobs */}
      <div className="absolute -top-20 left-1/3 w-[500px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "rgba(249,168,212,0.22)" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[350px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: "rgba(196,181,253,0.18)" }} />
      <div className="absolute top-1/2 left-0 w-[250px] h-[300px] rounded-full blur-[70px] pointer-events-none"
        style={{ background: "rgba(251,207,232,0.25)" }} />

      {/* Polaroids */}
      {photos.map((p) => (
        <>
          <Polaroid key={`d-${p.id}`} photo={p} />
          <Polaroid key={`m-${p.id}`} photo={p} mobile />
        </>
      ))}

      {/* Hero content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-xl text-center"
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "var(--pink-pale)", border: "1px solid var(--border)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--pink)" }} />
            <span className="font-sans text-xs uppercase tracking-[0.2em]" style={{ color: "var(--pink-dark)" }}>
              Christmas 2025
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="font-display leading-none mb-5"
            style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", color: "var(--text-head)" }}
          >
            Para mi amor
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="font-serif leading-relaxed mb-10"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", color: "var(--text-muted)" }}
          >
            Este año no te regalo cosas, te regalo tiempo contigo.
            <br />
            Cada cupón es un momento que quiero vivir a tu lado.
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-serif text-lg font-semibold cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            style={{
              background: "linear-gradient(135deg, var(--pink) 0%, var(--pink-dark) 100%)",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(236,72,153,0.30)",
            }}
          >
            <span>Ver nuestros cupones</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="mt-7 font-sans tracking-widest"
            style={{ color: "var(--pink-light)", fontSize: "0.75rem" }}
          >
            ✦ ✦ ✦
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
