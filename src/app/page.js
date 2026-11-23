import Experience from "@/components/Experience";
import HeroSection from "@/components/HeroSection";
import InvitationSection from "@/components/InvitationSection";
import CoupleSection from "@/components/CoupleSection";
import CountdownSection from "@/components/CountdownSection";
import CousinsSection from "@/components/CousinsSection";
import WeddingEventSection from "@/components/WeddingEventSection";
import ReceptionSection from "@/components/ReceptionSection";
import SaptapadiSection from "@/components/SaptapadiSection";
import FooterSection from "@/components/FooterSection";

/**
 * Story order (matches the guest journey in the brief):
 * Opening gate → Welcome → The Invitation → The Couple → Countdown
 * → Cousins' surprise → Wedding → Reception → Saptapadi → Blessings & close
 */
export default function Home() {
  return (
    <Experience>
      <main id="main">
        <HeroSection />
        <InvitationSection />
        <CoupleSection />
        <CountdownSection />
        <CousinsSection />
        <WeddingEventSection />
        <ReceptionSection />
        <SaptapadiSection />
        <FooterSection />
      </main>
    </Experience>
  );
}
