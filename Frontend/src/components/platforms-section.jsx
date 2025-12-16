import { useEffect, useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

const platforms = [
  { name: "VS Code", logo: "💻" },
  { name: "GitHub", logo: "🐙" },
  { name: "LeetCode", logo: "🧩" },
  { name: "CodeChef", logo: "👨‍🍳" },
  { name: "HackerRank", logo: "💚" },
  { name: "CodePen", logo: "✏️" },
  { name: "Stack Overflow", logo: "📚" },
  { name: "GitLab", logo: "🦊" },
];

export function PlatformsSection() {
  const scrollRef = useRef(null);

  // 👇 Scroll Reveal
  const { ref, isVisible } = useScrollReveal(0.2);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section
      ref={ref}
      className={`py-20 relative overflow-hidden reveal ${
        isVisible ? "visible" : ""
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3D4127]/10 to-transparent" />

      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
          Trusted by developers using
        </h2>
        <p className="text-center text-muted-foreground">
          Industry-standard tools and platforms
        </p>
      </div>

      {/* Scrolling Container */}
      <div ref={scrollRef} className="flex gap-12 overflow-x-hidden py-8">
        {[...platforms, ...platforms].map((platform, index) => (
          <div
            key={`${platform.name}-${index}`}
            className={`flex-shrink-0 group cursor-pointer reveal ${
              index % 2 === 0 ? "reveal-left" : "reveal-right"
            } ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: `${index * 120}ms` }}
          >
            <div className="flex flex-col items-center gap-4 px-8 py-6 rounded-2xl glass border border-transparent hover:border-[#BAC095]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(186,192,149,0.3)]">
              <span className="text-5xl grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-125">
                {platform.logo}
              </span>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors font-medium">
                {platform.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
    </section>
  );
}
