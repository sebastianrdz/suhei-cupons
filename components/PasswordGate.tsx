"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MusicToggle from "./MusicToggle";

const CORRECT_PASSWORD = "081125";

interface PasswordGateProps {
  onSuccess: () => void;
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem("hasAccess", "true");
      onSuccess();
    } else {
      setError("Creo que esa no es nuestra fecha… intenta de nuevo 💕");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Music toggle button */}
      <MusicToggle />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Para ti 💝
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-purple-200"
          >
            Este es un pequeño mundo de momentos que quiero vivir contigo.
            <br />
            Para entrar, necesitas nuestra fecha especial.
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <label htmlFor="password" className="block text-white mb-2 text-sm">
            Ingresa la fecha (6 dígitos)
          </label>
          <input
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
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white text-center text-2xl tracking-widest placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            placeholder="••••••"
            autoFocus
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-pink-300 text-sm mt-3 text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full mt-6 px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Entrar ✨
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-purple-300 text-sm mt-6"
        >
          Pista: El día que nos hicimos novios 💕
        </motion.p>
      </motion.div>
    </div>
  );
}
