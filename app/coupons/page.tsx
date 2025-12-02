"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CouponsSection from "@/components/CouponsSection";

export default function CouponsPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has access
    const hasAccess = localStorage.getItem("hasAccess");
    if (hasAccess !== "true") {
      router.push("/password");
    }
  }, [router]);

  return <CouponsSection showBackButton={true} />;
}
