import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
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

const EventDetailsSection = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Event details image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotateY: -5 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative flex-shrink-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={eventDetailsImg}
          alt="Gender Reveal Party - Celebrating the Journey of Riddhi & Vismay - Saturday, May 9, 2026"
          className="w-full h-auto block"
          style={{ imageRendering: "auto", maxWidth: "100%" }}
          width={1920}
          height={1920}
        />
      </motion.div>

      {/* Countdown + Date + Map link */}
      <div className="bg-[hsl(var(--primary))] text-center py-6 px-4 space-y-4 flex-1 flex flex-col justify-center">
        {/* Blinking date & time */}
        <motion.p
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="font-display text-lg md:text-2xl text-[hsl(var(--accent))] font-semibold tracking-wide"
        >
          ✨ Saturday, May 9, 2026 &bull; 5 PM – 9 PM ✨
        </motion.p>

        {/* 3D Countdown timer */}
        <div className="flex justify-center gap-3 md:gap-6" style={{ perspective: "600px" }}>
          {(["days", "hours", "minutes", "seconds"] as const).map((unit, i) => (
            <motion.div
              key={unit}
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, type: "spring" }}
              className="depth-card flex flex-col items-center glass rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] glow-gold"
            >
              <span className="font-display text-2xl md:text-4xl font-bold text-[hsl(var(--accent))]">
                {timeLeft[unit].toString().padStart(2, "0")}
              </span>
              <span className="font-body text-[10px] md:text-xs uppercase tracking-widest text-primary-foreground/70 mt-1">
                {unit}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Buttons row */}
        <div className="flex flex-col items-center gap-3">
          <motion.a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, rotateZ: 1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 glass rounded-full text-[hsl(var(--accent))] font-body text-sm md:text-base glow-gold"
          >
            <MapPin className="w-4 h-4" />
            Open in Google Maps
          </motion.a>

          <motion.a
            href="#rsvp"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-3 bg-gold-gradient rounded-full font-body text-sm tracking-widest uppercase text-accent-foreground shadow-gold"
          >
            RSVP Now
          </motion.a>
        </div>

        {/* No boxed gift notice */}
        <p className="font-display text-lg md:text-xl text-[hsl(var(--accent))] font-semibold tracking-wide animate-pulse">
          🎁 No Boxed Gift Please 🎁
        </p>
      </div>
    </div>
  );
};

export default EventDetailsSection;
