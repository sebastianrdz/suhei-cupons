"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface AdminNavProps {
  userEmail?: string;
}

export default function AdminNav({ userEmail }: AdminNavProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <nav
      className="px-6 py-3.5 flex items-center justify-between"
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "0 1px 8px rgba(236,72,153,0.06)",
      }}
    >
      <div className="flex items-center gap-6">
        <span className="font-display text-2xl" style={{ color: "var(--text-head)" }}>
          Admin 💕
        </span>
        <a
          href="/admin"
          className="font-serif text-sm transition-colors duration-150 hover:opacity-70"
          style={{ color: "var(--text-body)" }}
        >
          Cupones
        </a>
        <a
          href="/coupons"
          className="font-serif text-sm transition-colors duration-150 hover:opacity-70"
          style={{ color: "var(--text-body)" }}
        >
          Ver sitio
        </a>
      </div>

      <div className="flex items-center gap-4">
        {userEmail && (
          <span className="font-sans text-xs" style={{ color: "var(--text-muted)" }}>
            {userEmail}
          </span>
        )}
        <button
          onClick={handleSignOut}
          className="font-serif text-sm px-4 py-2 rounded-xl transition-all duration-150 cursor-pointer hover:opacity-80"
          style={{
            background: "var(--pink-pale)",
            color: "var(--pink-dark)",
            border: "1px solid var(--border)",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
