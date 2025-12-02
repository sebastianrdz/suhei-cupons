"use client";

import PasswordGate from "@/components/PasswordGate";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const router = useRouter();

  const handlePasswordSuccess = () => {
    // Store access in localStorage
    localStorage.setItem("hasAccess", "true");
    // Navigate to landing page
    router.push("/landing");
  };

  return <PasswordGate onSuccess={handlePasswordSuccess} />;
}

