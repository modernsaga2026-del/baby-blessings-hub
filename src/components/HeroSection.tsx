import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import mandalaImg from "@/assets/mandala-gold.png";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Full hero image with all details overlaid */}
      <div className="relative w-full min-h-screen">
        <img
          src={heroBg}
          alt="Gender reveal celebration - He or She, what will baby be?"
          className="w-full h-full object-cover absolute inset-0"
          width={1920}
          height={1080}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60" />

        {/* Rotating mandala */}
        <motion.img
          src={mandalaImg}
          alt=""
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07] pointer-events-none"
          style={{ width: "50vmin", height: "50vmin" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />

        {/* All content overlaid on the image */}
        <div className="relative z-10 flex flex-col items-center justify-end min-h-screen px-6 pb-8 pt-20 text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight drop-shadow-lg"
          >
            Please Join Our Celebration
            <span className="block text-gold-gradient text-lg md:text-2xl lg:text-3xl mt-1 font-medium italic">
              Baby Gender Reveal
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="divider-ornament w-36 mx-auto my-4"
          />

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-display text-sm md:text-lg text-white/90 italic max-w-md mx-auto leading-relaxed"
          >
            A new adventure is about to begin.
            <br />
            We are so excited to share our joy with you!
          </motion.p>

          {/* Info card overlaid on image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-5 inline-block bg-black/30 backdrop-blur-md rounded-2xl px-6 py-5 md:px-10 md:py-7 border border-accent/20 max-w-lg w-full"
          >
            {/* Parents */}
            <p className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70">
              Celebrating the Journey of
            </p>
            <p className="font-display text-2xl md:text-3xl text-white font-bold mt-1">
              Riddhi & Vismay
            </p>

            <div className="w-16 h-px bg-accent/40 mx-auto my-3" />

            {/* Date & Time */}
            <p className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70">
              Save the Date
            </p>
            <p className="font-display text-lg md:text-2xl text-white font-semibold mt-1">
              Saturday, May 9, 2026
            </p>
            <p className="font-body text-white/80 mt-1 text-sm md:text-base">
              5:00 PM – 9:00 PM
            </p>

            <div className="w-16 h-px bg-accent/40 mx-auto my-3" />

            {/* Venue */}
            <p className="font-body text-white/90 text-xs md:text-sm font-medium">
              Agincourt Community Recreation Centre
            </p>
            <p className="font-body text-white/70 text-[11px] md:text-xs mt-1">
              Event Hall – Multipurpose Room, 2nd Floor
            </p>
            <p className="font-body text-white/60 text-[10px] md:text-xs mt-1">
              31 Glen Watford Dr, Scarborough, ON M1S 2B7
            </p>
          </motion.div>

          {/* RSVP Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-5 mb-2"
          >
            <a
              href="#rsvp"
              className="inline-block px-8 py-3 bg-gold-gradient rounded-full font-body text-sm tracking-widest uppercase text-accent-foreground hover:opacity-90 transition-opacity shadow-gold"
            >
              RSVP Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
