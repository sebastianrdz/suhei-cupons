"use client";

import { motion } from "framer-motion";
import { useMusic } from "@/contexts/MusicContext";

export default function MusicToggle() {
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      onClick={toggleMusic}
      className="fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 hover:bg-white/30 transition-all shadow-lg"
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <span className="text-2xl">🔊</span>
      ) : (
        <span className="text-2xl">🔇</span>
      )}
    </motion.button>
  );
}

