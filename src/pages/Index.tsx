import { useState } from "react";
import PasscodeGate from "@/components/PasscodeGate";
import HeroSection from "@/components/HeroSection";
import EventDetailsSection from "@/components/EventDetailsSection";
import PhotoVideoGallery from "@/components/PhotoVideoGallery";
import RSVPAndPredictions from "@/components/RSVPAndPredictions";
import FooterSection from "@/components/FooterSection";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("bs_unlocked") === "true");

  if (!unlocked) {
    return <PasscodeGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="snap-container">
      {/* Fixed top banner */}
      <div className="bg-[hsl(var(--accent))] text-center py-2 px-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
        <p className="font-display text-sm md:text-base font-semibold tracking-wide text-accent-foreground animate-pulse">
          🎁 No Boxed Gift Please 🎁
        </p>
      </div>

      <section className="snap-section">
        <HeroSection />
      </section>

      <section className="snap-section">
        <EventDetailsSection />
      </section>

      <section className="snap-section">
        <PhotoVideoGallery />
      </section>

      <section>
        <RSVPAndPredictions />
      </section>

      <section>
        <FooterSection />
      </section>

      <AdminPanel />
    </div>
  );
};

export default Index;
