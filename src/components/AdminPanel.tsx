import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RSVPEntry {
  name: string;
  guests: number;
  attending: "yes" | "no" | "maybe";
  message: string;
  timestamp: string;
}

interface PollVote {
  questionId: string;
  answer: string;
  voterName: string;
  timestamp: string;
}

const ADMIN_CODE = "admin2026";

const AdminPanel = () => {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [votes, setVotes] = useState<PollVote[]>([]);
  const [tab, setTab] = useState<"rsvp" | "polls">("rsvp");

  useEffect(() => {
    if (authenticated) {
      setRsvps(JSON.parse(localStorage.getItem("bs_rsvp") || "[]"));
      setVotes(JSON.parse(localStorage.getItem("bs_polls") || "[]"));
    }
  }, [authenticated]);

  const handleAuth = () => {
    if (adminCode === ADMIN_CODE) {
      setAuthenticated(true);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/20 transition-colors z-50"
        title="Admin Panel"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl z-50 overflow-y-auto border-l border-border"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-primary font-semibold">Admin Panel</h2>
            <button onClick={() => { setOpen(false); setAuthenticated(false); }} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>

          {!authenticated ? (
            <div className="space-y-4">
              <input
                type="password"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="Admin passcode"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button onClick={handleAuth} className="w-full py-3 rounded-xl bg-emerald-gradient font-body text-sm uppercase tracking-widest text-primary-foreground">
                Access
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-6">
                {(["rsvp", "polls"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2 rounded-xl font-body text-sm uppercase tracking-wider transition-all ${
                      tab === t ? "bg-emerald-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {t === "rsvp" ? `RSVPs (${rsvps.length})` : `Polls (${votes.length})`}
                  </button>
                ))}
              </div>

              {tab === "rsvp" && (
                <div className="space-y-3">
                  {rsvps.length === 0 && <p className="text-muted-foreground font-body text-sm text-center py-8">No RSVPs yet</p>}
                  {rsvps.map((r, i) => (
                    <div key={i} className="bg-background rounded-xl p-4 border border-border">
                      <div className="flex justify-between items-start">
                        <p className="font-body font-medium text-foreground">{r.name}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-body ${
                          r.attending === "yes" ? "bg-emerald/10 text-emerald" :
                          r.attending === "maybe" ? "bg-marigold/10 text-marigold" :
                          "bg-destructive/10 text-destructive"
                        }`}>
                          {r.attending}
                        </span>
                      </div>
                      <p className="font-body text-xs text-muted-foreground mt-1">{r.guests} guest(s)</p>
                      {r.message && <p className="font-body text-sm text-foreground/80 mt-2 italic">"{r.message}"</p>}
                    </div>
                  ))}
                </div>
              )}

              {tab === "polls" && (
                <div className="space-y-3">
                  {votes.length === 0 && <p className="text-muted-foreground font-body text-sm text-center py-8">No votes yet</p>}
                  {votes.map((v, i) => (
                    <div key={i} className="bg-background rounded-xl p-4 border border-border">
                      <p className="font-body font-medium text-foreground">{v.voterName}</p>
                      <p className="font-body text-xs text-muted-foreground">{v.questionId}: {v.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;
