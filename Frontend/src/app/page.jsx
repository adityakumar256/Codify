import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { PlatformsSection } from "@/components/platforms-section"
import { GradientSection } from "@/components/gradient-section"
import { WhyLearnSection } from "@/components/why-learn-section"
import { Footer } from "@/components/footer"
import PlatformDashboard from "../platform/platform-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PlatformsSection />
      <GradientSection />
      <WhyLearnSection />
      <Footer />
    </main>
  )
}


