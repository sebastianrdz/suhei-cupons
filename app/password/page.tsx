"use client";

import PasswordGate from "@/components/PasswordGate";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const router = useRouter();

  const handlePasswordSuccess = () => {
    router.push("/landing");
  };

  return <PasswordGate onSuccess={handlePasswordSuccess} />;
}

