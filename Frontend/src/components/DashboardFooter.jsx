import { ArrowRight, Github, Twitter, Linkedin, Youtube, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  Product: ["Features", "Notes", "Courses", "Videos"],
  Company: ["About Us", "Careers", "Blog", "Press"],
  Resources: ["Documentation", "Tutorials", "Community", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
}

const platforms = ["💻", "🐙", "🧩", "👨‍🍳", "💚", "✏"]

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function DashboardFooter() {
  return (
    <footer className="relative pt-24 pb-8 overflow-hidden mt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#38000A]/10 to-[#38000A]/20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CD1C18]/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* CTA Section */}
        <div className="text-center mb-16 p-12 rounded-3xl glass border border-[#CD1C18]/30 animate-fade-in-up">
          <h3 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Ready to Start Your Journey?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join our community of developers and start learning today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-background/50 border-[#CD1C18]/50 focus:border-[#CD1C18] h-12"
            />
            <Button className="bg-gradient-to-r from-[#CD1C18] to-[#9B1313] text-white hover:shadow-[0_0_30px_rgba(205,28,24,0.5)] transition-all duration-300 h-12 px-8 whitespace-nowrap">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#CD1C18] to-[#9B1313] flex items-center justify-center">
                <span className="text-white font-bold text-xl">{"</>"}</span>
              </div>
              <span className="text-xl font-bold">
                <span className="text-[#CD1C18]">C</span>odify
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Empowering developers worldwide with cutting-edge coding education and resources.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg glass border border-[#CD1C18]/30 flex items-center justify-center hover:border-[#CD1C18]/50 hover:bg-[#CD1C18]/20 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-[#CD1C18] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Platform Logos */}
        <div className="flex justify-center gap-6 mb-12 py-6 border-y border-[#CD1C18]/30">
          {platforms.map((logo, index) => (
            <span
              key={index}
              className="text-2xl grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer hover:scale-125"
            >
              {logo}
            </span>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
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