"use client";

import React from "react";
import { motion } from "motion/react";

export function GlowBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
      {/* Animated Glow Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-indigo-500/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 120, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-purple-500/10 blur-[130px]"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[10%] left-[20%] h-[40%] w-[40%] rounded-full bg-blue-500/5 blur-[100px]"
      />

      {/* Subtle Dot Grid */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      
      {/* Radial Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, #0a0a0a 100%)" />
    </div>
  );
}
