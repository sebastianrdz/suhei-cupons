"use client";

import { motion } from "framer-motion";
import { useMusic } from "@/contexts/MusicContext";

function SpeakerOn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function SpeakerOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export default function MusicToggle() {
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <motion.button
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
      onClick={toggleMusic}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border shadow-md transition-all duration-200 cursor-pointer hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2"
      style={{
        borderColor: "var(--border)",
        color: "var(--pink)",
        boxShadow: "0 2px 12px rgba(236,72,153,0.12)",
      }}
      aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
    >
      {isPlaying ? <SpeakerOn /> : <SpeakerOff />}
      <span className="font-serif text-sm font-medium">{isPlaying ? "Música" : "Silencio"}</span>
    </motion.button>
  );
}
