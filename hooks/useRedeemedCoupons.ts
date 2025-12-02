"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "redeemedCoupons";

export function useRedeemedCoupons() {
  const [redeemedIds, setRedeemedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRedeemedIds(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse redeemed coupons", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever redeemedIds changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(redeemedIds));
    }
  }, [redeemedIds, isLoaded]);

  const toggleRedeemed = (couponId: string) => {
    setRedeemedIds((prev) =>
      prev.includes(couponId)
        ? prev.filter((id) => id !== couponId)
        : [...prev, couponId]
    );
  };

  const isRedeemed = (couponId: string) => redeemedIds.includes(couponId);

  return {
    redeemedIds,
    toggleRedeemed,
    isRedeemed,
    isLoaded,
  };
}

