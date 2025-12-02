"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Coupon } from "@/data/coupons";
import confetti from "canvas-confetti";

interface CouponModalProps {
  coupon: Coupon | null;
  isRedeemed: boolean;
  onClose: () => void;
  onToggleRedeemed: () => void;
}

const categoryColors = {
  Actividades: "bg-linear-to-r from-blue-500 to-cyan-500",
  Comida: "bg-linear-to-r from-orange-500 to-red-500",
  Extras: "bg-linear-to-r from-purple-500 to-pink-500",
};

export default function CouponModal({
  coupon,
  isRedeemed,
  onClose,
  onToggleRedeemed,
}: CouponModalProps) {
  if (!coupon) return null;

  const handleToggleRedeemed = () => {
    if (!isRedeemed) {
      // Trigger confetti when marking as redeemed
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#9333ea", "#ec4899", "#f472b6", "#a855f7"],
      });
    }
    onToggleRedeemed();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Special sparkle effects */}
        {coupon.special && !isRedeemed && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-20 left-20 text-4xl opacity-60"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-32 right-24 text-3xl opacity-60"
            >
              💖
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute bottom-24 left-32 text-3xl opacity-60"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute bottom-32 right-20 text-4xl opacity-60"
            >
              💕
            </motion.div>
          </>
        )}

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          className={`relative rounded-3xl p-8 max-w-lg w-full shadow-2xl border ${
            coupon.special && !isRedeemed
              ? "bg-linear-to-br from-pink-900 via-purple-900 to-pink-900 border-pink-400/60 shadow-pink-500/50"
              : "bg-linear-to-br from-slate-900 to-purple-900 border-white/20"
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all cursor-pointer"
          >
            ✕
          </button>

          {/* Category pill */}
          <div className="mb-4">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white ${
                categoryColors[coupon.category]
              }`}
            >
              {coupon.category}
            </span>
          </div>

          {/* Special badge in modal */}
          {coupon.special && !isRedeemed && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="inline-block bg-linear-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg mb-4"
            >
              ✨ CUPÓN ESPECIAL ✨
            </motion.div>
          )}

          {/* Title */}
          <h2 className={`text-4xl font-bold mb-4 text-white`}>
            {coupon.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-purple-200 mb-6">{coupon.subtitle}</p>

          {/* Description */}
          <p className="text-lg text-purple-100 leading-relaxed mb-8">
            {coupon.description}
          </p>

          {/* Redeem button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleRedeemed}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg cursor-pointer ${
              isRedeemed
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : coupon.special
                ? "bg-linear-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-pink-500/50 animate-pulse"
                : "bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            }`}
          >
            {isRedeemed
              ? "Marcar como pendiente"
              : coupon.special
              ? "💕 Canjear cupón especial 💕"
              : "Marcar como canjeado ✨"}
          </motion.button>

          {isRedeemed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <p className="text-green-400 text-sm font-semibold">
                ¡Este cupón ya fue canjeado! 🎉
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
