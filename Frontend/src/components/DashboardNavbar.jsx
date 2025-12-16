import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
export function DashboardNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
const navigate = useNavigate()
  const handleLogout = () => {
  console.log("Logging out...")

  // 1️⃣ Token clear karo
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  // 2️⃣ Home page par navigate
  navigate("/")
}

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 rounded-full ${
        isScrolled ? "glass" : "bg-transparent"
      } ${isHovered ? "bg-[#CD1C18]/20" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#CD1C18] to-[#9B1313] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <span className="text-white font-bold text-xl">{"</>"}</span>
          </div>
          <span className="text-xl font-bold text-foreground">
            <span className="text-[#CD1C18]">C</span>odify
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
         
          <a href="/platform" className="text-muted-foreground hover:text-[#CD1C18] transition-colors relative group">
            Platform
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CD1C18] transition-all group-hover:w-full"></span>
          </a>
          <a href="/contact" className="text-muted-foreground hover:text-[#CD1C18] transition-colors relative group">
            Contact Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CD1C18] transition-all group-hover:w-full"></span>
          </a>
          <a href="/about" className="text-muted-foreground hover:text-[#CD1C18] transition-colors relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CD1C18] transition-all group-hover:w-full"></span>
          </a>
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#CD1C18] to-[#9B1313] text-white hover:shadow-[0_0_30px_rgba(205,28,24,0.5)] transition-all duration-300 hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground p-2" onClick={() => setIsMobileMenuOpen((v) => !v)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass rounded-2xl mt-2 p-4 animate-fade-in-up">
          <div className="flex flex-col gap-4">
          
            <a href="/platform" className="py-2 hover:text-[#CD1C18] transition-colors">
              Platform
            </a>
            <a href="/contact" className="py-2 hover:text-[#CD1C18] transition-colors">
              Contact Us
            </a>
            <a href="/about" className="py-2 hover:text-[#CD1C18] transition-colors">
              About
            </a>
            <button
              onClick={handleLogout}
              className="py-2 px-4 rounded-full bg-gradient-to-r from-[#CD1C18] to-[#9B1313] text-white hover:shadow-[0_0_30px_rgba(205,28,24,0.5)] transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}