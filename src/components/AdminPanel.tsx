import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface RSVPRow {
  id: string;
  name: string;
  guests: number;
  attending: string;
  message: string | null;
  created_at: string;
  prediction_gender: string | null;
  prediction_looks: string | null;
  prediction_trait: string | null;
  prediction_name: string | null;
  prediction_wish: string | null;
}

const ADMIN_CODE = "admin2026";

const AdminPanel = () => {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [rsvps, setRsvps] = useState<RSVPRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRsvps = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("get-rsvps", {
        body: { adminCode: ADMIN_CODE },
      });
      if (error) throw error;
      setRsvps(data || []);
    } catch (err) {
      console.error("Failed to fetch RSVPs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) fetchRsvps();
  }, [authenticated]);

  const handleAuth = () => {
    if (adminCode === ADMIN_CODE) setAuthenticated(true);
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
        className="fixed right-0 top-0 h-full w-full max-w-lg bg-card shadow-2xl z-50 overflow-y-auto border-l border-border"
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
                onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                placeholder="Admin passcode"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button onClick={handleAuth} className="w-full py-3 rounded-xl bg-emerald-gradient font-body text-sm uppercase tracking-widest text-primary-foreground">
                Access
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="font-body text-sm text-muted-foreground">
                  {loading ? "Loading..." : `${rsvps.length} total responses`}
                </p>
                <button onClick={fetchRsvps} className="text-xs font-body text-accent hover:underline">Refresh</button>
              </div>

              <div className="space-y-3">
                {rsvps.length === 0 && !loading && (
                  <p className="text-muted-foreground font-body text-sm text-center py-8">No RSVPs yet</p>
                )}
                {rsvps.map((r) => (
                  <div key={r.id} className="bg-background rounded-xl p-4 border border-border space-y-2">
                    {/* RSVP Info */}
                    <div className="flex justify-between items-start">
                      <p className="font-body font-medium text-foreground">{r.name}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-body ${
                        r.attending === "yes" ? "bg-emerald-100 text-emerald-700" :
                        r.attending === "maybe" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {r.attending}
                      </span>
                    </div>
                    <p className="font-body text-xs text-muted-foreground">
                      {r.guests} guest(s) · {new Date(r.created_at).toLocaleDateString()}
                    </p>
                    {r.message && <p className="font-body text-sm text-foreground/80 italic">"{r.message}"</p>}

                    {/* Predictions */}
                    {(r.prediction_gender || r.prediction_looks || r.prediction_trait || r.prediction_name || r.prediction_wish) && (
                      <div className="border-t border-border pt-2 mt-2">
                        <p className="font-body text-xs font-semibold text-primary mb-1">Predictions</p>
                        <div className="grid grid-cols-2 gap-1 text-xs font-body text-muted-foreground">
                          {r.prediction_gender && <span>🎀 Gender: <span className="text-foreground">{r.prediction_gender}</span></span>}
                          {r.prediction_looks && <span>👀 Looks: <span className="text-foreground">{r.prediction_looks}</span></span>}
                          {r.prediction_trait && <span>✨ Trait: <span className="text-foreground">{r.prediction_trait}</span></span>}
                          {r.prediction_name && <span>📝 Name: <span className="text-foreground">{r.prediction_name}</span></span>}
                          {r.prediction_wish && <span className="col-span-2">🙏 Wish: <span className="text-foreground">{r.prediction_wish}</span></span>}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;
