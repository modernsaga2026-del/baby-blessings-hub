import { motion } from "framer-motion";
import mandalaImg from "@/assets/mandala-gold.png";

const FooterSection = () => {
  return (
    <footer className="py-16 px-6 bg-primary relative overflow-hidden">
      <motion.img
        src={mandalaImg}
        alt=""
        className="absolute opacity-[0.06] pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: "50vmin", height: "50vmin" }}
        loading="lazy"
        width={512}
        height={512}
      />
      <div className="relative z-10 text-center max-w-lg mx-auto">
        <p className="font-display text-3xl md:text-4xl text-primary-foreground font-semibold mb-2">
          With Love & Blessings
        </p>
        <div className="divider-ornament w-24 mx-auto my-4 opacity-60" />
        <p className="font-body text-primary-foreground/70 text-sm">
          We can't wait to celebrate this beautiful moment with you 💛
        </p>
        <p className="font-body text-primary-foreground/40 text-xs mt-8">
          Made with love for our little one
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
