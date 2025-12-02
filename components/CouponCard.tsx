"use client";

import { motion } from "framer-motion";
import { Coupon } from "@/data/coupons";

interface CouponCardProps {
  coupon: Coupon;
  isRedeemed: boolean;
  onClick: () => void;
}

const categoryColors = {
  Actividades: "bg-linear-to-r from-blue-500 to-cyan-500",
  Comida: "bg-linear-to-r from-orange-500 to-red-500",
  Extras: "bg-linear-to-r from-purple-500 to-pink-500",
};

export default function CouponCard({
  coupon,
  isRedeemed,
  onClick,
}: CouponCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer relative"
    >
      {/* Special glow effect */}
      {coupon.special && !isRedeemed && (
        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-pink-500 opacity-75 blur-xl animate-pulse" />
      )}

      <div
        className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border transition-all ${
          coupon.special && !isRedeemed
            ? "border-pink-400/60 shadow-2xl shadow-pink-500/50"
            : "border-white/20 shadow-xl hover:shadow-2xl"
        } ${isRedeemed ? "opacity-75" : ""}`}
      >
        {/* Special badge */}
        {coupon.special && !isRedeemed && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="absolute -top-3 -right-3 bg-linear-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10"
          >
            ✨ ESPECIAL ✨
          </motion.div>
        )}

        {/* Category pill */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
              categoryColors[coupon.category]
            }`}
          >
            {coupon.category}
          </span>
          {isRedeemed && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold"
            >
              ✓ Canjeado
            </motion.div>
          )}
        </div>

        {/* Title */}
        <h3 className={`text-2xl font-bold mb-2 text-white`}>{coupon.title}</h3>

        {/* Subtitle */}
        <p className="text-purple-200 text-sm">{coupon.subtitle}</p>

        {/* Redeemed stamp overlay */}
        {isRedeemed && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="text-6xl opacity-20 rotate-12">✓</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
