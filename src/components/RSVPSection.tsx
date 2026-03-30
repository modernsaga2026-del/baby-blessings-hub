import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const RSVPSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<{name: string; guests: string; attending: "yes" | "no" | "maybe"; message: string;}>({ name: "", guests: "1", attending: "yes", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("rsvps" as any).insert({
        name: form.name.trim(),
        guests: parseInt(form.guests),
        attending: form.attending,
        message: form.message.trim(),
      } as any);
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast.error("Failed to submit RSVP. Please try again.");
      console.error("RSVP error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="rsvp" ref={ref} className="h-full w-full flex flex-col justify-center py-8 pt-12 px-6 bg-background relative" style={{ perspective: "800px" }}>
      <div className="max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-2">
            Let Us Know
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary">
            RSVP
          </h2>
          <div className="divider-ornament w-32 mx-auto mt-4" />
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              className="text-center glass rounded-2xl p-10 glow-gold"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-display text-2xl text-primary font-semibold mb-2">
                Thank You!
              </h3>
              <p className="font-body text-muted-foreground">
                We can't wait to celebrate with you!
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20, rotateX: 5 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.3, type: "spring" }}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 glow-gold space-y-4 depth-card"
            >
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Your Name</label>
                <input
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Will you be attending?</label>
                <div className="flex gap-3">
                  {(["yes", "maybe", "no"] as const).map((opt) => (
                    <motion.button
                      key={opt}
                      type="button"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setForm({ ...form, attending: opt })}
                      className={`flex-1 py-3 rounded-xl font-body text-sm capitalize border transition-all ${
                        form.attending === opt
                          ? "bg-emerald-gradient text-primary-foreground border-transparent shadow-gold"
                          : "bg-background border-border text-muted-foreground hover:border-accent/40"
                      }`}
                    >
                      {opt === "yes" ? "🎉 Yes!" : opt === "maybe" ? "🤔 Maybe" : "😢 No"}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Number of People</label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Message (optional)</label>
                <textarea
                  maxLength={500}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                  placeholder="Send your love & blessings..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gold-gradient font-body text-sm tracking-widest uppercase text-accent-foreground shadow-gold disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send RSVP"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RSVPSection;
