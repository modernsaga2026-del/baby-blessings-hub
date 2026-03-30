import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import mandalaImg from "@/assets/mandala-gold.png";

const PARTICLE_COUNT = 35;

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

function generateParticles(): Particle[] {
  const colors = [
    "hsl(var(--accent))",
    "hsl(var(--gold-light))",
    "hsl(var(--blush))",
    "hsl(350 60% 75%)",
    "hsl(200 60% 75%)",
    "hsl(43 80% 70%)",
  ];
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
}

const HeroSection = () => {
  const particles = useMemo(generateParticles, []);

  return (
    <div className="relative flex flex-col h-[100dvh] w-full overflow-hidden">
      {/* Background image - fills entire section */}
      <img
        src={heroBg}
        alt="Gender reveal celebration"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary)/0.3)] via-transparent to-[hsl(var(--primary)/0.7)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

      {/* Floating particles / confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: 0,
            }}
            animate={{
              y: [0, -60, -120, -60, 0],
              x: [0, 15, -10, 20, 0],
              opacity: [0, 0.8, 1, 0.6, 0],
              scale: [0.5, 1.2, 1, 1.3, 0.5],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Star sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-[hsl(var(--accent))]"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              fontSize: `${8 + Math.random() * 14}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 4,
              repeat: Infinity,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* Rotating mandala */}
      <motion.img
        src={mandalaImg}
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
        style={{ width: "60vmin", height: "60vmin" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* Title content - centered vertically */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight drop-shadow-lg text-white"
          style={{
            transformStyle: "preserve-3d",
            textShadow: "0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)",
          }}
        >
          Please Join Our Celebration
          <motion.span
            className="block mt-2 md:mt-3 font-bold italic text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              background: "linear-gradient(135deg, hsl(43 90% 65%), hsl(43 80% 80%), hsl(35 90% 60%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))",
            }}
          >
            Gender Reveal Party
          </motion.span>
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-4 h-[2px] w-32 md:w-48 bg-gradient-to-r from-transparent via-[hsl(var(--accent))] to-transparent"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-3 font-body text-base md:text-lg lg:text-xl text-white/80 tracking-widest uppercase"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
        >
          ✨ He or She, What Will Baby Be? ✨
        </motion.p>
      </div>

      {/* Scroll indicator at bottom */}
      <motion.div
        className="relative z-10 flex justify-center pb-6"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 bg-white/80 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
