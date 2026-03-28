import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import mandalaImg from "@/assets/mandala-gold.png";

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

      {/* Content section below image */}
      <div className="relative z-10 bg-gradient-to-b from-primary to-emerald-light text-center px-6 py-10 md:py-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="font-display text-lg md:text-2xl text-primary-foreground/90 italic max-w-xl mx-auto leading-relaxed"
        >
          A new adventure is about to begin.
          <br />
          We are so excited to share our joy with you!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="divider-ornament w-48 mx-auto my-6"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="space-y-1"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/70">
            Celebrating the Journey of
          </p>
          <p className="font-display text-3xl md:text-4xl text-primary-foreground font-bold">
            Riddhi & Vismay
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-8"
        >
          <div className="inline-block bg-card/15 backdrop-blur-sm rounded-2xl px-8 py-6 border border-accent/20 max-w-md">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/70">
              Save the Date
            </p>
            <p className="font-display text-2xl md:text-3xl text-primary-foreground font-semibold mt-2">
              Saturday, May 9, 2026
            </p>
            <p className="font-body text-primary-foreground/80 mt-2 text-lg">
              5:00 PM – 9:00 PM
            </p>

            <div className="w-16 h-px bg-accent/40 mx-auto my-4" />

            <p className="font-body text-primary-foreground/90 text-sm font-medium">
              Agincourt Community Recreation Centre
            </p>
            <p className="font-body text-primary-foreground/70 text-xs mt-1">
              Event Hall – Multipurpose Room, 2nd Floor
            </p>
            <p className="font-body text-primary-foreground/60 text-xs mt-1">
              31 Glen Watford Dr, Scarborough, ON M1S 2B7
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
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
    </section>
  );
};

export default HeroSection;
