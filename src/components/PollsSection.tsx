import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface PollQuestion {
  id: string;
  question: string;
  type: "choice" | "text";
  options?: string[];
  emoji?: string;
}

interface PollVote {
  questionId: string;
  answer: string;
  voterName: string;
  timestamp: string;
}

const POLL_QUESTIONS: PollQuestion[] = [
{
  id: "gender",
  question: "What do you think it is?",
  type: "choice",
  options: ["💙 Boy", "💗 Girl", "👶 Twins!"],
  emoji: "🎀"
},
{
  id: "looks",
  question: "Who will the baby look like more?",
  type: "choice",
  options: ["Mom", "Dad", "Perfect Mix"],
  emoji: "👀"
},
{
  id: "trait",
  question: "What trait will the baby inherit?",
  type: "choice",
  options: ["Mom's Smile", "Dad's Eyes", "Mom's Hair", "Dad's Humor"],
  emoji: "✨"
},
{
  id: "name",
  question: "Suggest a baby name!",
  type: "text",
  emoji: "📝"
},
{
  id: "wish",
  question: "Your blessing for the baby?",
  type: "text",
  emoji: "🙏"
}];


const PollsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [voterName, setVoterName] = useState("");
  const [nameEntered, setNameEntered] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [allVotes, setAllVotes] = useState<PollVote[]>([]);

  useEffect(() => {
    const votes: PollVote[] = JSON.parse(localStorage.getItem("bs_polls") || "[]");
    setAllVotes(votes);
  }, [submitted]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const votes: PollVote[] = JSON.parse(localStorage.getItem("bs_polls") || "[]");
    Object.entries(answers).forEach(([questionId, answer]) => {
      votes.push({
        questionId,
        answer: answer.trim(),
        voterName: voterName.trim(),
        timestamp: new Date().toISOString()
      });
    });
    localStorage.setItem("bs_polls", JSON.stringify(votes));
    setSubmitted(true);
    setAllVotes(votes);
  };

  const getVoteCounts = (questionId: string) => {
    const qVotes = allVotes.filter((v) => v.questionId === questionId);
    const counts: Record<string, number> = {};
    qVotes.forEach((v) => {
      counts[v.answer] = (counts[v.answer] || 0) + 1;
    });
    return { counts, total: qVotes.length };
  };

  const getTextAnswers = (questionId: string) => {
    return allVotes.filter((v) => v.questionId === questionId).map((v) => v.answer);
  };

  return (
    <section ref={ref} className="py-20 px-6 bg-secondary/50 relative">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10">
          
          <p className="font-body tracking-[0.4em] uppercase mb-2 rounded-xl text-6xl font-extrabold shadow-2xl bg-gold-light text-destructive">
            Fun & Games
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary">
            Cast Your Predictions
          </h2>
          <div className="divider-ornament w-32 mx-auto mt-4" />
        </motion.div>

        {/* Name entry */}
        {!nameEntered && !submitted &&
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-8 shadow-gold border border-gold/20 text-center mb-8">
          
            <p className="font-display text-xl text-primary mb-4">First, tell us who you are!</p>
            <input
            value={voterName}
            onChange={(e) => setVoterName(e.target.value)}
            placeholder="Your name"
            maxLength={100}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-center focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all mb-4" />
          
            <button
            onClick={() => voterName.trim() && setNameEntered(true)}
            disabled={!voterName.trim()}
            className="px-8 py-3 rounded-xl bg-emerald-gradient font-body text-sm tracking-widest uppercase text-primary-foreground hover:opacity-90 transition-opacity shadow-gold disabled:opacity-40">
            
              Let's Play!
            </button>
          </motion.div>
        }

        {/* Questions */}
        <AnimatePresence mode="wait">
          {(nameEntered || submitted) &&
          <motion.div
            key="questions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6">
            
              {POLL_QUESTIONS.map((q, i) =>
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-gold border border-gold/20">
              
                  <h3 className="font-display text-xl text-primary mb-4">
                    <span className="mr-2">{q.emoji}</span>
                    {q.question}
                  </h3>

                  {q.type === "choice" && q.options &&
              <>
                      {!submitted ?
                <div className="flex flex-wrap gap-2">
                          {q.options.map((opt) =>
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleAnswer(q.id, opt)}
                    className={`px-5 py-2.5 rounded-xl font-body text-sm border transition-all ${
                    answers[q.id] === opt ?
                    "bg-emerald-gradient text-primary-foreground border-transparent shadow-gold" :
                    "bg-background border-border text-foreground hover:border-accent/40"}`
                    }>
                    
                              {opt}
                            </button>
                  )}
                        </div> :

                <div className="space-y-2">
                          {(() => {
                    const { counts, total } = getVoteCounts(q.id);
                    return q.options!.map((opt) => {
                      const count = counts[opt] || 0;
                      const pct = total > 0 ? Math.round(count / total * 100) : 0;
                      return (
                        <div key={opt} className="relative">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-body text-sm text-foreground">{opt}</span>
                                    <span className="font-body text-xs text-muted-foreground">{pct}% ({count})</span>
                                  </div>
                                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full bg-gold-gradient rounded-full" />
                            
                                  </div>
                                </div>);

                    });
                  })()}
                        </div>
                }
                    </>
              }

                  {q.type === "text" &&
              <>
                      {!submitted ?
                <input
                  value={answers[q.id] || ""}
                  onChange={(e) => handleAnswer(q.id, e.target.value)}
                  placeholder="Type your answer..."
                  maxLength={200}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" /> :


                <div className="flex flex-wrap gap-2">
                          {getTextAnswers(q.id).map((ans, j) =>
                  <span key={j} className="px-3 py-1.5 bg-blush rounded-full font-body text-sm text-foreground">
                              {ans}
                            </span>
                  )}
                        </div>
                }
                    </>
              }
                </motion.div>
            )}

              {!submitted &&
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              className="w-full py-4 rounded-xl bg-gold-gradient font-body text-sm tracking-widest uppercase text-accent-foreground hover:opacity-90 transition-opacity shadow-gold disabled:opacity-40">
              
                  Submit My Predictions ✨
                </motion.button>
            }
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </section>);

};

export default PollsSection;