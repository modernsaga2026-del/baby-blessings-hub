import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import babyItemsImg from "@/assets/baby-items.jpg";
import decorImg from "@/assets/celebration-decor.jpg";
import mandalaImg from "@/assets/mandala-gold.png";

function createHeartbeat(audioCtx: AudioContext) {
  const now = audioCtx.currentTime;
  const bpm = 140; // baby heartbeat ~140 bpm
  const beatInterval = 60 / bpm;
  const totalBeats = Math.ceil(8 / beatInterval); // 8 seconds of heartbeat

  for (let i = 0; i < totalBeats; i++) {
    const t = now + i * beatInterval;
    // "lub"
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.frequency.value = 60;
    osc1.type = "sine";
    gain1.gain.setValueAtTime(0, t);
    gain1.gain.linearRampToValueAtTime(0.5, t + 0.03);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc1.connect(gain1).connect(audioCtx.destination);
    osc1.start(t);
    osc1.stop(t + 0.15);

    // "dub" (slightly delayed, higher)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.frequency.value = 80;
    osc2.type = "sine";
    gain2.gain.setValueAtTime(0, t + 0.12);
    gain2.gain.linearRampToValueAtTime(0.35, t + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    osc2.connect(gain2).connect(audioCtx.destination);
    osc2.start(t + 0.12);
    osc2.stop(t + 0.28);
  }
}

const PhotoVideoGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const toggleHeartbeat = useCallback(() => {
    if (isPlaying) {
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
      setIsPlaying(false);
      return;
    }
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    createHeartbeat(ctx);
    setIsPlaying(true);
    // Auto-stop after 8s
    setTimeout(() => {
      ctx.close().catch(() => {});
      setIsPlaying(false);
    }, 8000);
  }, [isPlaying]);

  const photos = [
    { src: babyItemsImg, alt: "Baby shoes and items", span: "col-span-2 row-span-2", hasHeartbeat: false },
    { src: decorImg, alt: "Baby ultrasound", span: "col-span-1 row-span-1", hasHeartbeat: true },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-secondary/50 relative overflow-hidden">
      {/* Background mandala */}
      <img
        src={mandalaImg}
        alt=""
        className="absolute -right-32 top-0 w-64 h-64 opacity-[0.04] pointer-events-none"
        loading="lazy"
        width={256}
        height={256}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-2">
            Moments to Cherish
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary">
            Our Little Journey
          </h2>
          <div className="divider-ornament w-32 mx-auto mt-4" />
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`${photo.span} rounded-2xl overflow-hidden shadow-gold relative group`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width={640}
                height={640}
              />
              {photo.hasHeartbeat && (
                <button
                  onClick={toggleHeartbeat}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--primary)/0.85)] backdrop-blur text-primary-foreground text-sm font-body shadow-lg hover:bg-[hsl(var(--primary))] transition-colors"
                  aria-label={isPlaying ? "Stop heartbeat" : "Play heartbeat"}
                >
                  <motion.span
                    animate={isPlaying ? { scale: [1, 1.3, 1] } : {}}
                    transition={isPlaying ? { duration: 0.43, repeat: Infinity } : {}}
                  >
                    <Heart className={`w-5 h-5 ${isPlaying ? "fill-[hsl(var(--destructive))] text-[hsl(var(--destructive))]" : "text-[hsl(var(--accent))]"}`} />
                  </motion.span>
                  {isPlaying ? "Heartbeat Playing…" : "Hear Baby's Heartbeat 💓"}
                </button>
              )}
            </motion.div>
          ))}

          {/* Video placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-2 md:col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-gold"
          >
            <video
              src="/videos/special-video.mov#t=0.1"
              controls
              playsInline
              preload="metadata"
              poster=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhotoVideoGallery;
