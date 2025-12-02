"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { coupons, CouponCategory, Coupon } from "@/data/coupons";
import { useRedeemedCoupons } from "@/hooks/useRedeemedCoupons";
import CouponCard from "./CouponCard";
import CouponModal from "./CouponModal";
import MusicToggle from "./MusicToggle";

type FilterOption = "Todos" | CouponCategory;

interface CouponsSectionProps {
  showBackButton?: boolean;
}

export default function CouponsSection({
  showBackButton = false,
}: CouponsSectionProps) {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("Todos");
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const { isRedeemed, toggleRedeemed, isLoaded } = useRedeemedCoupons();

  const filters: FilterOption[] = ["Todos", "Actividades", "Comida", "Extras"];

  const filteredCoupons =
    selectedFilter === "Todos"
      ? coupons
      : coupons.filter((c) => c.category === selectedFilter);

  // Don't render until localStorage is loaded to avoid hydration mismatch
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4">
      {/* Music toggle button */}
      <MusicToggle />

      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        {showBackButton && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.push("/landing")}
            className="mb-8 flex items-center gap-2 text-purple-200 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-2xl">←</span>
            <span>Volver</span>
          </motion.button>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Nuestros cupones de tiempo juntos
          </h1>
          <p className="text-xl text-purple-200">
            Elige el momento que quieras vivir conmigo 💕
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full font-semibold transition-all cursor-pointer ${
                selectedFilter === filter
                  ? "bg-white text-purple-900 shadow-lg scale-105"
                  : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Coupons grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCoupons.map((coupon, index) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <CouponCard
                coupon={coupon}
                isRedeemed={isRedeemed(coupon.id)}
                onClick={() => setSelectedCoupon(coupon)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredCoupons.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-purple-200 text-xl mt-12"
          >
            No hay cupones en esta categoría
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {selectedCoupon && (
        <CouponModal
          coupon={selectedCoupon}
          isRedeemed={isRedeemed(selectedCoupon.id)}
          onClose={() => setSelectedCoupon(null)}
          onToggleRedeemed={() => toggleRedeemed(selectedCoupon.id)}
        />
      )}
    </div>
  );
}
