import { useState } from "react";
import PasscodeGate from "@/components/PasscodeGate";
import HeroSection from "@/components/HeroSection";
import PhotoVideoGallery from "@/components/PhotoVideoGallery";
import RSVPSection from "@/components/RSVPSection";
import PollsSection from "@/components/PollsSection";
import FooterSection from "@/components/FooterSection";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("bs_unlocked") === "true");

  if (!unlocked) {
    return <PasscodeGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen">
      <div className="bg-[hsl(var(--accent))] text-center py-2 px-4">
        <p className="font-display text-sm md:text-base font-semibold tracking-wide text-accent-foreground animate-pulse">
          🎁 No Boxed Gift Please 🎁
        </p>
      </div>
      <HeroSection />
      <PhotoVideoGallery />
      <RSVPSection />
      <PollsSection />
      <FooterSection />
      <AdminPanel />
    </div>
  );
};

export default Index;
