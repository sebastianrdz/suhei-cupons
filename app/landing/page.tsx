"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LandingHero from "@/components/LandingHero";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has access
    const hasAccess = localStorage.getItem("hasAccess");
    if (hasAccess !== "true") {
      router.push("/password");
    }
  }, [router]);

  const handleEnter = () => {
    router.push("/coupons");
  };

  return <LandingHero onEnter={handleEnter} />;
}

