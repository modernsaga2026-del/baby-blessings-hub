import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface RSVP {
  id: string;
  name: string;
  guests: number;
  attending: string;
  message: string;
  created_at: string;
}

const ADMIN_CODE = "admin2026";

const GuestList = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleAuth = () => {
    if (adminCode === ADMIN_CODE) {
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    if (!authenticated) return;
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
    fetchRsvps();
  }, [authenticated]);

  const filtered = rsvps.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.attending.toLowerCase().includes(search.toLowerCase()) ||
      r.message?.toLowerCase().includes(search.toLowerCase())
  );

  const totalGuests = filtered.reduce((sum, r) => sum + r.guests, 0);
  const attending = filtered.filter((r) => r.attending === "yes").length;
  const maybe = filtered.filter((r) => r.attending === "maybe").length;
  const declined = filtered.filter((r) => r.attending === "no").length;

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 max-w-sm w-full space-y-4 glow-gold"
        >
          <h1 className="font-display text-2xl text-primary font-semibold text-center">
            Guest List
          </h1>
          <p className="font-body text-sm text-muted-foreground text-center">
            Enter admin passcode to view responses
          </p>
          <input
            type="password"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            placeholder="Admin passcode"
            className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <button
            onClick={handleAuth}
            className="w-full py-3 rounded-xl bg-emerald-gradient font-body text-sm uppercase tracking-widest text-primary-foreground"
          >
            Access
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-2">
            Guest List
          </h1>
          <div className="divider-ornament w-32 mt-2 mb-6" />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total RSVPs", value: filtered.length, color: "text-foreground" },
              { label: "Attending", value: attending, color: "text-emerald-500" },
              { label: "Maybe", value: maybe, color: "text-yellow-500" },
              { label: "Declined", value: declined, color: "text-red-400" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-4 text-center">
                <p className={`font-display text-2xl font-semibold ${s.color}`}>{s.value}</p>
                <p className="font-body text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <p className="font-body text-sm text-muted-foreground mb-4">
            Total guest count: <span className="font-semibold text-foreground">{totalGuests}</span>
          </p>

          {/* Search */}
          <Input
            placeholder="Search by name, status, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md rounded-xl"
          />
        </motion.div>

        {loading ? (
          <p className="font-body text-muted-foreground text-center py-12">Loading...</p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-body">Name</TableHead>
                  <TableHead className="font-body">Status</TableHead>
                  <TableHead className="font-body">Guests</TableHead>
                  <TableHead className="font-body hidden md:table-cell">Message</TableHead>
                  <TableHead className="font-body hidden md:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 font-body text-muted-foreground">
                        {search ? "No matching RSVPs" : "No RSVPs yet"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((r) => (
                      <motion.tr
                        key={r.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-border"
                      >
                        <TableCell className="font-body font-medium">{r.name}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-body ${
                              r.attending === "yes"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : r.attending === "maybe"
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-red-400/10 text-red-400"
                            }`}
                          >
                            {r.attending}
                          </span>
                        </TableCell>
                        <TableCell className="font-body">{r.guests}</TableCell>
                        <TableCell className="font-body text-muted-foreground hidden md:table-cell max-w-[200px] truncate">
                          {r.message || "—"}
                        </TableCell>
                        <TableCell className="font-body text-muted-foreground hidden md:table-cell">
                          {new Date(r.created_at).toLocaleDateString()}
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GuestList;
