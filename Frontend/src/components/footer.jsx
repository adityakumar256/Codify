

import { ArrowRight, Github, Twitter, Linkedin, Youtube, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useScrollReveal from "@/hooks/useScrollReveal"

const footerLinks = {
  Product: ["Features", "Notes", "Courses", "Videos"],
  Company: ["About Us", "Careers", "Blog", "Press"],
  Resources: ["Documentation", "Tutorials", "Community", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
}

const platforms = ["💻", "🐙", "🧩", "👨‍🍳", "💚", "✏️"]

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  const { ref, isVisible } = useScrollReveal(0.2)

  return (
    <footer
      ref={ref}
      className={`relative pt-24 pb-8 overflow-hidden reveal ${isVisible ? "visible" : ""}`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#3D4127]/10 to-[#3D4127]/20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#636B2F]/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* CTA Section */}
        <div
          className={`text-center mb-16 p-12 rounded-3xl glass border border-[#636B2F]/30 reveal ${
            isVisible ? "visible" : ""
          }`}
          style={{ transitionDelay: "120ms" }}
        >
          <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Ready to Start Your Journey?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join our community of developers and start learning today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-background/50 border-[#636B2F]/50 focus:border-[#D4DE95] h-12"
            />
            <Button className="bg-gradient-to-r from-[#D4DE95] to-[#BAC095] text-[#3D4127] hover:shadow-[0_0_30px_rgba(212,222,149,0.5)] transition-all duration-300 h-12 px-8 whitespace-nowrap">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div
            className={`lg:col-span-2 reveal ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "180ms" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4DE95] to-[#636B2F] flex items-center justify-center">
                <span className="text-[#3D4127] font-bold text-xl">{"</>"}</span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-[#D4DE95]">C</span>odify
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Empowering developers worldwide with cutting-edge coding education and resources.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`w-10 h-10 rounded-lg glass border border-[#636B2F]/30 flex items-center justify-center hover:border-[#D4DE95]/50 hover:bg-[#636B2F]/20 transition-all duration-300 hover:scale-110 reveal ${
                    isVisible ? "visible" : ""
                  }`}
                  style={{ transitionDelay: `${220 + i * 100}ms` }}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div
              key={category}
              className={`reveal ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${250 + index * 100}ms` }}
            >
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-[#D4DE95] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Platform Logos */}
        <div
          className={`flex justify-center gap-6 mb-12 py-6 border-y border-[#636B2F]/30 reveal ${
            isVisible ? "visible" : ""
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {platforms.map((logo, index) => (
            <span
              key={index}
              className="text-2xl grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer hover:scale-125 reveal"
              style={{ transitionDelay: `${350 + index * 80}ms` }}
            >
              {logo}
            </span>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className={`flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground reveal ${
            isVisible ? "visible" : ""
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          <p>© 2025 Codify. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>hello@codify.dev</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
