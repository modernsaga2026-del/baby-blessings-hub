import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import mandalaImg from "@/assets/mandala-gold.png";

const PASSCODE = "baby2026";

interface PasscodeGateProps {
  onUnlock: () => void;
}

const PasscodeGate = ({ onUnlock }: PasscodeGateProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.toLowerCase() === PASSCODE) {
      sessionStorage.setItem("bs_unlocked", "true");
      onUnlock();
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
            className="w-full py-4 rounded-xl bg-emerald-gradient font-body text-sm tracking-widest uppercase text-primary-foreground hover:opacity-90 transition-opacity shadow-gold"
          >
            Unlock Invitation
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
