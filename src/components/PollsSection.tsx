import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PollQuestion {
  id: string;
  question: string;
  type: "choice" | "text";
  options?: string[];
  emoji?: string;
}

const POLL_QUESTIONS: PollQuestion[] = [
  { id: "gender", question: "What do you think it is?", type: "choice", options: ["💙 Boy", "💗 Girl", "👶 Twins!"], emoji: "🎀" },
  { id: "looks", question: "Who will the baby look like more?", type: "choice", options: ["Mom", "Dad", "Perfect Mix"], emoji: "👀" },
  { id: "trait", question: "What trait will the baby inherit?", type: "choice", options: ["Mom's Smile", "Dad's Eyes", "Mom's Hair", "Dad's Humor"], emoji: "✨" },
  { id: "name", question: "Suggest a baby name!", type: "text", emoji: "📝" },
  { id: "wish", question: "Your blessing for the baby?", type: "text", emoji: "🙏" },
];

const PollsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [voterName, setVoterName] = useState("");
  const [nameEntered, setNameEntered] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const predictionData = {
        prediction_gender: answers.gender?.trim() || null,
        prediction_looks: answers.looks?.trim() || null,
        prediction_trait: answers.trait?.trim() || null,
        prediction_name: answers.name?.trim() || null,
        prediction_wish: answers.wish?.trim() || null,
      };

      // Try to update an existing RSVP row matching this name
      const { data: updated, error: updateError } = await supabase
        .from("rsvps" as any)
        .update(predictionData as any)
        .eq("name", voterName.trim())
        .select() as any;

      if (updateError) throw updateError;

      // If no matching RSVP row, insert a minimal one with predictions
      if (!updated || updated.length === 0) {
        const { error: insertError } = await supabase
          .from("rsvps" as any)
          .insert({
            name: voterName.trim(),
            attending: "yes",
            guests: 1,
            ...predictionData,
          } as any);
        if (insertError) throw insertError;
      }

      setSubmitted(true);
      toast.success("Predictions submitted!");
    } catch (err: any) {
      toast.error("Failed to submit predictions. Please try again.");
      console.error("Poll submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={ref} className="h-full w-full flex flex-col justify-start py-8 pt-12 px-6 bg-secondary/50 relative overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-2">
            Fun & Games
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary">
            Cast Your Predictions
          </h2>
          <div className="divider-ornament w-32 mx-auto mt-4" />
        </motion.div>

        {/* Name entry */}
        {!nameEntered && !submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: 5 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
            className="glass rounded-2xl p-8 glow-gold text-center mb-8 depth-card"
          >
            <p className="font-display text-xl text-primary mb-4">First, tell us who you are!</p>
            <input
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
              placeholder="Your name"
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-center focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all mb-4"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => voterName.trim() && setNameEntered(true)}
              disabled={!voterName.trim()}
              className="px-8 py-3 rounded-xl bg-emerald-gradient font-body text-sm tracking-widest uppercase text-primary-foreground shadow-gold disabled:opacity-40"
            >
              Let's Play!
            </motion.button>
          </motion.div>
        )}

        {/* Questions */}
        <AnimatePresence mode="wait">
          {(nameEntered || submitted) && (
            <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 pb-8">
              {POLL_QUESTIONS.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 20, rotateX: 5 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="glass rounded-2xl p-5 glow-gold depth-card"
                >
                  <h3 className="font-display text-lg text-primary mb-3">
                    <span className="mr-2">{q.emoji}</span>{q.question}
                  </h3>

                  {q.type === "choice" && q.options && (
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt) => (
                        <motion.button
                          key={opt}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => !submitted && handleAnswer(q.id, opt)}
                          disabled={submitted}
                          className={`px-4 py-2 rounded-xl font-body text-sm border transition-all ${
                            answers[q.id] === opt
                              ? "bg-emerald-gradient text-primary-foreground border-transparent shadow-gold"
                              : "bg-background border-border text-foreground hover:border-accent/40"
                          } ${submitted ? "opacity-70 cursor-default" : ""}`}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {q.type === "text" && (
                    <input
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswer(q.id, e.target.value)}
                      placeholder="Type your answer..."
                      maxLength={200}
                      disabled={submitted}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all disabled:opacity-70"
                    />
                  )}
                </motion.div>
              ))}

              {!submitted && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length === 0 || submitting}
                  className="w-full py-4 rounded-xl bg-gold-gradient font-body text-sm tracking-widest uppercase text-accent-foreground shadow-gold disabled:opacity-40"
                >
                  {submitting ? "Submitting..." : "Submit My Predictions ✨"}
                </motion.button>
              )}

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center glass rounded-2xl p-8 glow-gold"
                >
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="font-display text-xl text-primary font-semibold mb-2">Predictions Submitted!</h3>
                  <p className="font-body text-muted-foreground text-sm">Thanks for playing, {voterName}!</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PollsSection;
