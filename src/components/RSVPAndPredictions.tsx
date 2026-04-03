import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PREDICTION_CHOICES = [
  {
    id: "gender",
    question: "What do you think it is?",
    options: ["💙 Boy", "💗 Girl", "👶 Twins!"],
    emoji: "🎀",
  },
  {
    id: "looks",
    question: "Who will the baby look like more?",
    options: ["Mom", "Dad", "Perfect Mix"],
    emoji: "👀",
  },
  {
    id: "trait",
    question: "What trait will the baby inherit?",
    options: ["Mom's Smile", "Dad's Eyes", "Mom's Hair", "Dad's Humor"],
    emoji: "✨",
  },
];

const RSVPAndPredictions = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    attending: "yes" as "yes" | "maybe" | "no",
    guests: "1",
    message: "",
    gender: "",
    looks: "",
    trait: "",
    predictionName: "",
    predictionWish: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("rsvps").insert({
        name: form.name.trim(),
        attending: form.attending,
        guests: parseInt(form.guests),
        message: form.message.trim() || null,
        prediction_gender: form.gender || null,
        prediction_looks: form.looks || null,
        prediction_trait: form.trait || null,
        prediction_name: form.predictionName.trim() || null,
        prediction_wish: form.predictionWish.trim() || null,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast.error("Failed to submit. Please try again.");
      console.error("Submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const setField = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div
      id="rsvp"
      ref={ref}
      className="w-full flex flex-col justify-center py-16 pt-20 px-6 bg-background relative"
    >
      <div className="max-w-lg mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary">
            RSVP & Baby Predictions
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-3">
            Let us know if you're joining and have fun guessing all about Baby!
          </p>
          <div className="divider-ornament w-32 mx-auto mt-4" />
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center glass rounded-2xl p-10 glow-gold"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-display text-2xl text-primary font-semibold mb-2">
                Thank You for RSVPing!
              </h3>
              <p className="font-body text-muted-foreground">
                Scroll down to Cast Your Prediction and join the fun! 🎉
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, type: "spring" }}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 glow-gold space-y-5 depth-card"
            >
              {/* Name */}
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">
                  Your Name <span className="text-destructive">*</span>
                </label>
                <input
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="Enter your name"
                />
              </div>

              {/* Attending */}
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">
                  Will you be attending? <span className="text-destructive">*</span>
                </label>
                <div className="flex gap-3">
                  {(["yes", "maybe", "no"] as const).map((opt) => (
                    <motion.button
                      key={opt}
                      type="button"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setField("attending", opt)}
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

              {/* Guests */}
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">
                  Number of People <span className="text-destructive">*</span>
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setField("guests", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">
                  Message (optional)
                </label>
                <textarea
                  maxLength={500}
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                  placeholder="Send your love & blessings..."
                />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-border" />
                <span className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  Baby Predictions
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Choice predictions */}
              {PREDICTION_CHOICES.map((q) => (
                <div key={q.id}>
                  <label className="font-body text-sm text-muted-foreground block mb-1.5">
                    <span className="mr-1">{q.emoji}</span> {q.question}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt) => (
                      <motion.button
                        key={opt}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setField(q.id, opt)}
                        className={`px-4 py-2 rounded-xl font-body text-sm border transition-all ${
                          form[q.id as keyof typeof form] === opt
                            ? "bg-emerald-gradient text-primary-foreground border-transparent shadow-gold"
                            : "bg-background border-border text-foreground hover:border-accent/40"
                        }`}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Baby name */}
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">
                  📝 Suggest a baby name!
                </label>
                <input
                  value={form.predictionName}
                  onChange={(e) => setField("predictionName", e.target.value)}
                  maxLength={200}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="Type your suggestion..."
                />
              </div>

              {/* Wish */}
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">
                  🙏 Your blessing for the baby?
                </label>
                <input
                  value={form.predictionWish}
                  onChange={(e) => setField("predictionWish", e.target.value)}
                  maxLength={200}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="Type your blessing..."
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gold-gradient font-body text-sm tracking-widest uppercase text-accent-foreground shadow-gold disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Submit RSVP & Predictions ✨"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RSVPAndPredictions;
