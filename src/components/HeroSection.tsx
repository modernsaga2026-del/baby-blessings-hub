import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import mandalaImg from "@/assets/mandala-gold.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      {/* Rotating mandala */}
      <motion.img
        src={mandalaImg}
        alt=""
        className="absolute opacity-10 pointer-events-none"
        style={{ width: "60vmin", height: "60vmin" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-body text-xs tracking-[0.4em] uppercase text-primary-foreground/80 mb-4"
        >
          You are cordially invited to
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-primary-foreground mb-4 leading-tight"
        >
          Gender Reveal
          <span className="block text-gold-gradient text-3xl md:text-4xl lg:text-5xl mt-2 font-medium italic">
            & Baby Shower
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="divider-ornament w-48 mx-auto my-6"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="space-y-2"
        >
          <p className="font-display text-2xl md:text-3xl text-primary-foreground/90 italic">
            Celebrating the Journey of
          </p>
          <p className="font-display text-3xl md:text-4xl text-primary-foreground font-bold">
            Riddhi & Vismay
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-10 space-y-1"
        >
          <div className="inline-block bg-card/20 backdrop-blur-sm rounded-2xl px-8 py-6 border border-gold/20">
            <p className="font-body text-sm tracking-widest uppercase text-primary-foreground/80">
              Save the Date
            </p>
            <p className="font-display text-2xl md:text-3xl text-primary-foreground font-semibold mt-1">
              Saturday, May 9, 2026
            </p>
            <p className="font-body text-primary-foreground/80 mt-2">
              5:00 PM – 9:00 PM
            </p>
            <p className="font-body text-primary-foreground/70 text-sm mt-1">
              Agincourt Community Recreation Centre
            </p>
            <p className="font-body text-primary-foreground/60 text-xs mt-0.5">
              Event Hall – Multipurpose Room, 2nd Floor
            </p>
            <p className="font-body text-primary-foreground/60 text-xs mt-0.5">
              31 Glen Watford Dr, Scarborough, ON M1S 2B7
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-8"
        >
          <a
            href="#rsvp"
            className="inline-block px-8 py-3 bg-gold-gradient rounded-full font-body text-sm tracking-widest uppercase text-accent-foreground hover:opacity-90 transition-opacity shadow-gold"
          >
            RSVP Now
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
