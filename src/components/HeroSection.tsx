import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import mandalaImg from "@/assets/mandala-gold.png";
import eventDetailsImg from "@/assets/event-details.jpg";

const HeroSection = () => {
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

      {/* RSVP button */}
      <div className="bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-center py-8">
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
