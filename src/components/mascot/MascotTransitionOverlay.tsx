"use client";

import { useMascot } from "@/context/MascotContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export function MascotTransitionOverlay() {
  const { isTransitioning, transitionData, character } = useMascot();

  if (!isTransitioning || !transitionData) return null;

  const startX = transitionData.startRect ? transitionData.startRect.left : 100;
  const startY = transitionData.startRect ? transitionData.startRect.top : 200;
  const startWidth = transitionData.startRect ? transitionData.startRect.width : 160;
  const startHeight = transitionData.startRect ? transitionData.startRect.height : 160;

  // Target coordinates for home page mascot top centerpiece
  const targetX = typeof window !== "undefined" ? window.innerWidth / 2 - 140 : 200;
  const targetY = 140;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {/* Soft background backdrop blur during transition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#184735]/30 backdrop-blur-xs"
        />

        {/* Flying Mascot Container */}
        <motion.div
          initial={{
            left: startX,
            top: startY,
            width: startWidth,
            height: startHeight,
            scale: 1,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            left: [startX, (startX + targetX) / 2 + 50, targetX],
            top: [startY, Math.min(startY, targetY) - 80, targetY],
            scale: [1, 1.25, 1],
            rotate: [0, -12, 12, 0],
            opacity: 1,
          }}
          transition={{
            duration: 1.1,
            ease: [0.34, 1.56, 0.64, 1], // Playful spring timing
          }}
          className="absolute flex items-center justify-center pointer-events-none"
        >
          {/* Outer Glowing Magical Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 via-emerald-400 to-purple-400 blur-2xl animate-pulse opacity-80" />

          {/* Flying Trail Particles */}
          <motion.div
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="absolute -bottom-4 w-3/4 h-8 bg-emerald-400/50 blur-md rounded-full"
          />

          {/* Mascot Center Card */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#fdecdb] via-white to-amber-100 border-4 border-emerald-500 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
            <span className="text-6xl sm:text-7xl animate-bounce">🦦</span>
            <div className="absolute bottom-1 px-3 py-0.5 rounded-full bg-[#184735] text-emerald-200 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{character} Flying!</span>
            </div>

            <div className="absolute top-2 right-2 text-pink-500 animate-ping">
              <Heart className="w-4 h-4 fill-current" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
