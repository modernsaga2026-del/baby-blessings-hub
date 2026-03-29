import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import mandalaImg from "@/assets/mandala-gold.png";
import eventDetailsImg from "@/assets/event-details.jpg";

const EVENT_DATE = new Date("2026-05-09T17:00:00");
const VENUE_ADDRESS = "Agincourt Community Recreation Centre, 31 Glen Watford Dr, Scarborough, ON";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_ADDRESS)}`;

function getTimeLeft() {
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor(diff / (1000 * 60 * 60) % 24),
    minutes: Math.floor(diff / (1000 * 60) % 60),
    seconds: Math.floor(diff / 1000 % 60)
  };
}

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Background image - takes remaining space */}
      <div className="relative flex-1 min-h-0">
        <img
          src={heroBg}
          alt="Gender reveal celebration"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/60" />

        {/* Rotating mandala */}
        <motion.img
          src={mandalaImg}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          style={{ width: "50vmin", height: "50vmin" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 text-center px-6 pb-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight drop-shadow-lg text-destructive"
            style={{ transformStyle: "preserve-3d" }}
          >
            Please Join Our Celebration
            <motion.span
              className="block text-gold-gradient md:text-3xl lg:text-4xl mt-1 font-medium italic text-5xl"
              initial={{ opacity: 0, y: 20, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Gender Reveal Party
            </motion.span>
          </motion.h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[hsl(var(--accent)/0.6)] rounded-full flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 bg-[hsl(var(--accent))] rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
