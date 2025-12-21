import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { GradientSection } from "@/components/gradient-section";
import { WhyLearnSection } from "@/components/why-learn-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />

      <GradientSection />
      <WhyLearnSection />
      <Footer />
    </main>
  );
}
