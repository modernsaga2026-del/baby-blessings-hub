import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import babyItemsImg from "@/assets/baby-items.jpg";
import decorImg from "@/assets/decor-setup.jpg";
import mandalaImg from "@/assets/mandala-gold.png";

const PhotoVideoGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const photos = [
    { src: babyItemsImg, alt: "Baby items with Indian touches", span: "col-span-2 row-span-2" },
    { src: decorImg, alt: "Beautiful celebration setup", span: "col-span-1 row-span-1" },
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
              className={`${photo.span} rounded-2xl overflow-hidden shadow-gold`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                width={640}
                height={640}
              />
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
              src="/videos/special-video.mov"
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhotoVideoGallery;
