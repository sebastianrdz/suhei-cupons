"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasValidAccess } from "@/lib/access";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (hasValidAccess()) {
      router.push("/landing");
    } else {
      router.push("/password");
    }
  }, [router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-white text-xl">Cargando...</div>
    </div>
  );
}
