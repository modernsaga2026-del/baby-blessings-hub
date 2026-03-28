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
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Background image - full visible */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        <img
          src={heroBg}
          alt="Gender reveal celebration"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/60" />

        {/* Rotating mandala on the image */}
        <motion.img
          src={mandalaImg}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
          style={{ width: "50vmin", height: "50vmin" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />

        {/* Title overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 text-center px-6 pb-8">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-tight drop-shadow-lg"
          >
            Please Join Our Celebration
            <span className="block text-gold-gradient text-xl md:text-3xl lg:text-4xl mt-1 font-medium italic">
              Gender Reveal Party
            </span>
          </motion.h1>
        </div>
      </div>

      {/* Event details image section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative w-full"
      >
        <img
          src={eventDetailsImg}
          alt="Gender Reveal Party - Celebrating the Journey of Riddhi & Vismay - Saturday, May 9, 2026 - 5:00 PM to 9:00 PM - Agincourt Community Recreation Centre"
          className="w-full h-auto block"
          style={{ imageRendering: "auto", maxWidth: "100%" }}
          width={1920}
          height={1920}
        />
      </motion.div>

      {/* Countdown + Date blink + Map link */}
      <div className="bg-[hsl(var(--primary))] text-center py-8 px-4 space-y-6">
        {/* Blinking date & time */}
        <motion.p
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="font-display text-xl md:text-2xl text-[hsl(var(--accent))] font-semibold tracking-wide"
        >
          ✨ Saturday, May 9, 2026 &bull; 5:00 PM – 9:00 PM ✨
        </motion.p>

        {/* Countdown timer */}
        <div className="flex justify-center gap-3 md:gap-6">
          {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
            <motion.div
              key={unit}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col items-center bg-[hsl(var(--primary-foreground)/0.1)] backdrop-blur rounded-xl px-3 py-3 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] border border-[hsl(var(--accent)/0.3)]"
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

        {/* Google Maps link */}
        <motion.a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[hsl(var(--accent)/0.15)] border border-[hsl(var(--accent)/0.4)] rounded-full text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.25)] transition-colors font-body text-sm md:text-base"
        >
          <MapPin className="w-4 h-4" />
          Open in Google Maps
        </motion.a>

        {/* RSVP button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <a
            href="#rsvp"
            className="inline-block px-8 py-3 bg-gold-gradient rounded-full font-body text-sm tracking-widest uppercase text-accent-foreground hover:opacity-90 transition-opacity shadow-gold"
          >
            RSVP Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
