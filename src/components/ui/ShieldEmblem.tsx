"use client";

import { motion } from "framer-motion";

export const ShieldEmblem = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={className}
    >
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_30px_rgba(197,160,89,0.3)]"
      >
        {/* Main Shield Body */}
        <path
          d="M50 5L90 20V50C90 75 70 95 50 115C30 95 10 75 10 50V20L50 5Z"
          fill="#0A1428"
          stroke="#C5A059"
          strokeWidth="1.5"
        />
        
        {/* Inner Border */}
        <path
          d="M50 12L82 24V50C82 70 66 88 50 105C34 88 18 70 18 50V24L50 12Z"
          stroke="#C5A059"
          strokeWidth="0.5"
          strokeOpacity="0.5"
        />

        {/* Heraldic Cross / Division */}
        <path
          d="M50 5V115M10 50H90"
          stroke="#C5A059"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />

        {/* Center Symbol (Simplified RBA/Shield concept) */}
        <circle cx="50" cy="50" r="15" stroke="#C5A059" strokeWidth="1" strokeDasharray="2 2" />
        <path
          d="M45 45L55 55M55 45L45 55"
          stroke="#C5A059"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Glow effect */}
        <defs>
          <radialGradient id="shieldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#shieldGlow)" />
      </svg>
    </motion.div>
  );
};
