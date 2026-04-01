import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import mandalaImg from "@/assets/mandala-gold.png";
import peacockImg from "@/assets/peacock-fly.png";
import parrotImg from "@/assets/parrot-fly.png";

const PASSCODE = "rv2026";

interface PasscodeGateProps {
  onUnlock: () => void;
}

const PasscodeGate = ({ onUnlock }: PasscodeGateProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const fireConfetti = useCallback(() => {
    const duration = 1500;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#d4af37", "#2d6a4f", "#e07b39", "#e85d75", "#4ecdc4"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#d4af37", "#2d6a4f", "#e07b39", "#e85d75", "#4ecdc4"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toLowerCase() === PASSCODE) {
      sessionStorage.setItem("bs_unlocked", "true");
      setCelebrating(true);
      fireConfetti();
      setTimeout(() => {
        onUnlock();
      }, 2200);
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Mandala background */}
      <motion.img
        src={mandalaImg}
        alt=""
        className="absolute opacity-[0.06] pointer-events-none select-none"
        style={{ width: "80vmin", height: "80vmin" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      {/* Flying birds animation */}
      <AnimatePresence>
        {celebrating && (
          <>
            <motion.img
              src={peacockImg}
              alt="Peacock"
              className="absolute z-30 w-32 h-32 md:w-48 md:h-48 pointer-events-none"
              initial={{ x: "-30vw", y: "10vh", opacity: 0, scale: 0.6 }}
              animate={{
                x: ["−30vw", "0vw", "50vw"],
                y: ["10vh", "-10vh", "-20vh"],
                opacity: [0, 1, 1, 0],
                scale: [0.6, 1.1, 0.9],
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              width={192}
              height={192}
            />
            <motion.img
              src={parrotImg}
              alt="Parrot"
              className="absolute z-30 w-28 h-28 md:w-40 md:h-40 pointer-events-none"
              initial={{ x: "30vw", y: "20vh", opacity: 0, scale: 0.6 }}
              animate={{
                x: ["30vw", "0vw", "-50vw"],
                y: ["20vh", "-5vh", "-15vh"],
                opacity: [0, 1, 1, 0],
                scale: [0.6, 1.1, 0.9],
              }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
              width={160}
              height={160}
            />
          </>
        )}
      </AnimatePresence>

      {/* Fade-out overlay when celebrating */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={celebrating ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1, delay: celebrating ? 1.2 : 0 }}
        className="relative z-10 text-center px-6 max-w-md w-full"
      >
        <motion.img
          src={mandalaImg}
          alt="Mandala ornament"
          className="w-28 h-28 mx-auto mb-6 opacity-70"
          width={112}
          height={112}
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        <h1 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-2">
          You're Invited
        </h1>
        <p className="font-body text-muted-foreground text-sm tracking-widest uppercase mb-8">
          Enter the secret code to view
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            animate={shaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter passcode..."
              className="w-full px-6 py-4 rounded-xl bg-card border border-gold/30 text-center font-body text-lg tracking-[0.3em] uppercase placeholder:tracking-widest placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-destructive text-sm font-body"
              >
                Hmm, that's not right. Try again!
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={celebrating}
            className="w-full py-4 rounded-xl bg-emerald-gradient font-body text-sm tracking-widest uppercase text-primary-foreground hover:opacity-90 transition-opacity shadow-gold disabled:opacity-60"
          >
            {celebrating ? "Welcome! ✨" : "Unlock Invitation"}
          </button>
        </form>

        <p className="mt-6 text-muted-foreground/60 text-xs font-body">
          Hint: Check the message from the parents-to-be ✨
        </p>
      </motion.div>
    </div>
  );
};

export default PasscodeGate;
