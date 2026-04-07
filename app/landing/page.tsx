"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LandingHero from "@/components/LandingHero";
import { hasValidAccess } from "@/lib/access";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    if (!hasValidAccess()) router.push("/password");
  }, [router]);

  const handleEnter = () => {
    router.push("/coupons");
  };

  return <LandingHero onEnter={handleEnter} />;
}

