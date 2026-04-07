"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicToggle from "./MusicToggle";
import { grantAccess } from "@/lib/access";
import { createClient } from "@/lib/supabase/client";
import confetti from "canvas-confetti";

const CORRECT_PASSWORD = "081125";

// April 8 2026 at 7 PM CST = UTC-6 → April 9 2026 00:00 UTC... wait CST is UTC-6
// 7 PM CST = 19:00 - (-6*60) = 7PM + 6h = 1AM UTC next day
// April 8 19:00 CST = April 9 01:00 UTC
const UNLOCK_TIME = new Date("2026-04-09T01:00:00.000Z").getTime();
const CELEBRATION_KEY = "surpriseCelebrated";

type Phase = "locked" | "celebration" | "password";

interface PasswordGateProps {
  onSuccess: () => void;
}

const petals = [
  { left: "8%", animDelay: "0s", animDuration: "9s" },
  { left: "22%", animDelay: "1.4s", animDuration: "11s" },
  { left: "38%", animDelay: "0.6s", animDuration: "8s" },
  { left: "55%", animDelay: "2.1s", animDuration: "10s" },
  { left: "70%", animDelay: "0.3s", animDuration: "12s" },
  { left: "85%", animDelay: "1.7s", animDuration: "9s" },
];

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center font-sans text-2xl font-bold tabular-nums"
        style={{
          background: "rgba(255,255,255,0.7)",
          border: "1.5px solid var(--border)",
          color: "var(--text-head)",
          backdropFilter: "blur(8px)",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span
        className="font-sans text-[10px] uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [phase, setPhase] = useState<Phase | null>(null);
  // eslint-disable-next-line react-hooks/purity
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, UNLOCK_TIME - Date.now()),
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const confettiFired = useRef(false);

  // Resolve phase on mount (localStorage only available client-side)
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Admin is logged in — bypass lock screen entirely
        grantAccess();
        onSuccess();
        return;
      }
      if (Date.now() < UNLOCK_TIME) {
        setPhase("locked");
      } else if (localStorage.getItem(CELEBRATION_KEY) !== "true") {
        setPhase("celebration");
      } else {
        setPhase("password");
      }
    });
  }, [onSuccess]);

  // Countdown tick
  useEffect(() => {
    if (phase !== "locked") return;
    const id = setInterval(() => {
      const remaining = Math.max(0, UNLOCK_TIME - Date.now());
      setTimeLeft(remaining);
      if (remaining === 0) setPhase("celebration");
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Celebration confetti + show continue button
  useEffect(() => {
    if (phase !== "celebration" || confettiFired.current) return;
    confettiFired.current = true;

    const burst = (opts: confetti.Options) =>
      confetti({
        colors: [
          "#EC4899",
          "#F9A8D4",
          "#FBCFE8",
          "#8B5CF6",
          "#DDD6FE",
          "#FDE68A",
        ],
        ...opts,
      });

    setTimeout(
      () => burst({ particleCount: 220, spread: 110, origin: { y: 0.45 } }),
      400,
    );
    setTimeout(
      () =>
        burst({
          particleCount: 120,
          spread: 70,
          angle: 60,
          origin: { x: 0, y: 0.6 },
        }),
      900,
    );
    setTimeout(
      () =>
        burst({
          particleCount: 120,
          spread: 70,
          angle: 120,
          origin: { x: 1, y: 0.6 },
        }),
      1100,
    );
    setTimeout(
      () => burst({ particleCount: 80, spread: 50, origin: { y: 0.3 } }),
      1800,
    );

    setTimeout(() => setShowContinue(true), 2800);
  }, [phase]);

  const handleCelebrationDone = () => {
    localStorage.setItem(CELEBRATION_KEY, "true");
    setPhase("password");
    setShowContinue(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      grantAccess();
      onSuccess();
    } else {
      setShaking(true);
      setError("Esa no es nuestra fecha… intenta de nuevo 💕");
      setPassword("");
      setTimeout(() => setShaking(false), 600);
    }
  };

  const days = Math.floor(timeLeft / 86_400_000);
  const hours = Math.floor((timeLeft % 86_400_000) / 3_600_000);
  const minutes = Math.floor((timeLeft % 3_600_000) / 60_000);
  const seconds = Math.floor((timeLeft % 60_000) / 1_000);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden p-4"
      style={{
        background:
          "linear-gradient(150deg, #FFF0F7 0%, #FCE7F3 45%, #EDE9FE 100%)",
      }}
    >
      <MusicToggle />

      {/* Drifting petals */}
      {petals.map((p, i) => (
        <div
          key={i}
          className="absolute bottom-0 pointer-events-none select-none text-pink-300/50"
          style={{
            left: p.left,
            fontSize: "1.4rem",
            animation: `petalDrift ${p.animDuration} ${p.animDelay} ease-in-out infinite`,
          }}
        >
          ✿
        </div>
      ))}

      {/* Glow blobs */}
      <div
        className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none blur-[80px]"
        style={{ background: "rgba(249,168,212,0.25)" }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full pointer-events-none blur-[60px]"
        style={{ background: "rgba(196,181,253,0.2)" }}
      />

      <AnimatePresence mode="wait">
        {/* ── LOCKED: countdown ── */}
        {phase === "locked" && (
          <motion.div
            key="locked"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 w-full max-w-sm text-center"
          >
            {/* Lock icon */}
            <motion.div
              animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.6 }}
              className="text-5xl mb-6 select-none"
            >
              🔒
            </motion.div>

            <p
              className="font-sans text-xs uppercase tracking-[0.25em] mb-3"
              style={{ color: "var(--pink-light)" }}
            >
              Solo para ti
            </p>
            <h1
              className="font-display leading-none mb-5"
              style={{
                fontSize: "clamp(3rem,9vw,4.5rem)",
                color: "var(--text-head)",
              }}
            >
              Para ti 💝
            </h1>
            <p
              className="font-serif text-xl leading-relaxed mb-8"
              style={{ color: "var(--text-body)" }}
            >
              Esperame tantito,
              <br />
              <span style={{ color: "var(--pink)" }}>
                tu sorpresa aún no está lista
              </span>{" "}
              🌸
            </p>

            {/* Countdown */}
            <div
              className="rounded-3xl p-6 mb-6"
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "1.5px solid var(--border)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(236,72,153,0.10)",
              }}
            >
              <p
                className="font-sans text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Disponible en
              </p>
              <div className="flex items-end justify-center gap-3">
                {days > 0 && <TimeUnit value={days} label="días" />}
                <TimeUnit value={hours} label="horas" />
                <TimeUnit value={minutes} label="min" />
                <TimeUnit value={seconds} label="seg" />
              </div>
            </div>

            <p
              className="font-serif text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Vuelve el 8 de Abril a las 7 PM 💕
            </p>
          </motion.div>
        )}

        {/* ── CELEBRATION ── */}
        {phase === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-6xl mb-6 select-none"
            >
              🎉
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-display leading-tight mb-4"
              style={{
                fontSize: "clamp(2.8rem, 8vw, 4.2rem)",
                color: "var(--text-head)",
              }}
            >
              Felices 5 meses
              <br />
              juntos baby 💕
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="font-serif text-xl leading-relaxed mb-10"
              style={{ color: "var(--text-body)" }}
            >
              Disfruta esta nueva actualización
              <br />
              <span style={{ color: "var(--pink)" }}>
                hecha con todo mi amor para ti.
              </span>
            </motion.p>

            <AnimatePresence>
              {showContinue && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCelebrationDone}
                  className="px-10 py-4 rounded-2xl font-serif text-lg font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--pink) 0%, var(--pink-dark) 100%)",
                    color: "#fff",
                    boxShadow: "0 8px 28px rgba(236,72,153,0.35)",
                  }}
                >
                  Ver mi sorpresa 🎁
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── PASSWORD FORM ── */}
        {phase === "password" && (
          <motion.div
            key="password"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-sm"
          >
            <div className="text-center mb-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-sans text-xs uppercase tracking-[0.25em] mb-3"
                style={{ color: "var(--pink-light)" }}
              >
                Solo para ti
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display leading-none mb-4"
                style={{
                  fontSize: "clamp(3.5rem,10vw,5rem)",
                  color: "var(--text-head)",
                }}
              >
                Para ti 💝
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="font-serif text-lg leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Un pequeño mundo de momentos
                <br />
                que quiero vivir contigo.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-3xl p-8"
              style={{
                border: "1.5px solid var(--border)",
                boxShadow:
                  "0 20px 60px rgba(236,72,153,0.10), 0 4px 16px rgba(236,72,153,0.07)",
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="password"
                    className="block font-serif text-base text-center mb-3"
                    style={{ color: "var(--text-body)" }}
                  >
                    Ingresa nuestra fecha especial
                  </label>
                  <motion.input
                    id="password"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value.replace(/\D/g, ""));
                      setError("");
                    }}
                    animate={shaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                    transition={{ duration: 0.45 }}
                    className="w-full px-5 py-4 rounded-2xl text-center text-3xl tracking-[0.5em] font-sans transition-all duration-200 focus:outline-none"
                    style={{
                      background: "var(--bg)",
                      border: "1.5px solid var(--border)",
                      color: "var(--text-head)",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--pink)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                    placeholder="••••••"
                    autoFocus
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-serif text-sm text-center"
                      style={{ color: "var(--pink)" }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-serif text-lg font-semibold transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--pink) 0%, var(--pink-dark) 100%)",
                    color: "#fff",
                    boxShadow: "0 6px 24px rgba(236,72,153,0.30)",
                  }}
                >
                  Entrar
                </button>
              </form>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center font-serif text-sm mt-5"
              style={{ color: "var(--text-muted)" }}
            >
              Pista: el día que nos hicimos novios 💕
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
