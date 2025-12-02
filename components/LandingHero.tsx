"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import MusicToggle from "./MusicToggle";

interface LandingHeroProps {
  onEnter: () => void;
}

export default function LandingHero({ onEnter }: LandingHeroProps) {
  const handleEnter = () => {
    onEnter();
  };

  // Floating photo positions with image paths
  const photos = [
    {
      id: 1,
      src: "/images/img1.jpg",
      x: "8%",
      y: "10%",
      rotation: -8,
      delay: 0.2,
      caption: "💕",
    },
    {
      id: 2,
      src: "/images/img2.jpg",
      x: "78%",
      y: "15%",
      rotation: 5,
      delay: 0.3,
      caption: "💪",
    },
    {
      id: 3,
      src: "/images/img3.jpg",
      x: "12%",
      y: "75%",
      rotation: 12,
      delay: 0.4,
      caption: "👫",
    },
    {
      id: 4,
      src: "/images/img4.jpg",
      x: "72%",
      y: "70%",
      rotation: -5,
      delay: 0.5,
      caption: "☕️",
    },
    {
      id: 5,
      src: "/images/img5.jpg",
      x: "5%",
      y: "45%",
      rotation: -12,
      delay: 0.6,
      caption: "🎄",
    },
    {
      id: 6,
      src: "/images/img6.JPG",
      x: "85%",
      y: "45%",
      rotation: 8,
      delay: 0.7,
      caption: "🏃",
    },
    {
      id: 7,
      src: "/images/img7.jpg",
      x: "40%",
      y: "8%",
      rotation: -3,
      delay: 0.8,
      caption: "💖",
    },
    {
      id: 8,
      src: "/images/img8.jpg",
      x: "45%",
      y: "85%",
      rotation: 6,
      delay: 0.9,
      caption: "🫶",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-indigo-900 via-purple-800 to-pink-700">
      {/* Music toggle button */}
      <MusicToggle />

      {/* Floating polaroid photos - Desktop (all 8) */}
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{
            opacity: { delay: photo.delay, duration: 0.8 },
            scale: { delay: photo.delay, duration: 0.8 },
            y: {
              delay: photo.delay + 0.8,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            position: "absolute",
            left: photo.x,
            top: photo.y,
            rotate: `${photo.rotation}deg`,
          }}
          className="hidden md:block"
        >
          <div className="bg-white p-3 shadow-2xl rounded-sm w-40 h-48 hover:scale-105 transition-transform duration-300">
            <div className="w-full h-36 bg-gray-100 rounded-sm overflow-hidden relative">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <p className="text-center text-xs mt-2 text-gray-700 font-medium">
              {photo.caption}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Floating polaroid photos - Mobile (4 photos, smaller) */}
      {photos.slice(0, 4).map((photo) => (
        <motion.div
          key={`mobile-float-${photo.id}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { delay: photo.delay, duration: 0.8 },
            scale: { delay: photo.delay, duration: 0.8 },
            y: {
              delay: photo.delay + 0.8,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          style={{
            position: "absolute",
            left: photo.x,
            top: photo.y,
            rotate: `${photo.rotation}deg`,
          }}
          className="md:hidden"
        >
          <div className="bg-white p-2 shadow-xl rounded-sm w-24 h-28">
            <div className="w-full h-20 bg-gray-100 rounded-sm overflow-hidden relative">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <p className="text-center text-[10px] mt-1 text-gray-700 font-medium">
              {photo.caption}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl text-center"
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
          >
            <p className="text-white text-sm font-medium">Christmas 2025 🎄</p>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Para mi amor. Meri Chrysler 🎄
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-purple-100 mb-12 leading-relaxed"
          >
            Este año no te regalo cosas, te regalo tiempo contigo.
            <br />
            Aquí tienes un pequeño mundo de momentos que quiero vivir contigo.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnter}
            className="px-8 py-4 cursor-pointer bg-white text-purple-900 rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            Ver nuestros cupones de tiempo juntos 💌
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
