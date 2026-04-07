"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }
    router.push("/admin");
  }

  const inputClass = "w-full rounded-xl px-4 py-3 font-serif text-base transition-all duration-150 focus:outline-none";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(150deg, #FFF0F7 0%, #FCE7F3 45%, #EDE9FE 100%)" }}
    >
      {/* Soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[80px] pointer-events-none"
        style={{ background: "rgba(249,168,212,0.22)" }} />

      <div
        className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl"
        style={{ border: "1.5px solid var(--border)", boxShadow: "0 20px 60px rgba(236,72,153,0.10)" }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl mb-1" style={{ color: "var(--text-head)" }}>
            Panel Admin
          </h1>
          <p className="font-serif text-sm" style={{ color: "var(--text-muted)" }}>
            Cupones de Amor 💕
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-serif text-sm mb-1.5" style={{ color: "var(--text-body)" }}>
              Correo
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={inputClass}
              style={{ background: "var(--bg)", border: "1.5px solid var(--border)", color: "var(--text-head)" }}
              onFocus={e => (e.target.style.borderColor = "var(--pink)")}
              onBlur={e => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          <div>
            <label className="block font-serif text-sm mb-1.5" style={{ color: "var(--text-body)" }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className={inputClass}
              style={{ background: "var(--bg)", border: "1.5px solid var(--border)", color: "var(--text-head)" }}
              onFocus={e => (e.target.style.borderColor = "var(--pink)")}
              onBlur={e => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {error && (
            <p className="font-serif text-sm" style={{ color: "var(--pink)" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl font-serif text-base font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            style={{
              background: "linear-gradient(135deg, var(--pink) 0%, var(--pink-dark) 100%)",
              color: "#fff",
              boxShadow: "0 6px 20px rgba(236,72,153,0.28)",
            }}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
