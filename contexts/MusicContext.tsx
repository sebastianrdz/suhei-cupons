"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface MusicContextType {
  isPlaying: boolean;
  toggleMusic: () => void;
  startMusic: () => void;
  stopMusic: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTriedAutoplay = useRef(false);

  useEffect(() => {
    // Create audio element only on client side
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio("/music/lofi-christmas.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.7; // Set volume to 70%
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Try to auto-start music on first user interaction
  useEffect(() => {
    const tryAutoplay = () => {
      if (!hasTriedAutoplay.current && audioRef.current && !isPlaying) {
        hasTriedAutoplay.current = true;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay blocked:", error);
          });
      }
    };

    // Listen for first user interaction
    document.addEventListener("click", tryAutoplay, { once: true });
    document.addEventListener("keydown", tryAutoplay, { once: true });

    return () => {
      document.removeEventListener("click", tryAutoplay);
      document.removeEventListener("keydown", tryAutoplay);
    };
  }, [isPlaying]);

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
      setIsPlaying(true);
    }
  };

  const stopMusic = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  return (
    <MusicContext.Provider
      value={{ isPlaying, toggleMusic, startMusic, stopMusic }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
