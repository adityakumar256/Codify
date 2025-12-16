import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Navbar() {

  // ⚠️ VERY IMPORTANT: useNavigate MUST be inside the component
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const coursesRef = useRef(null);
  const triggerRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown/mobile on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        coursesRef.current &&
        !coursesRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsCoursesOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") {
        setIsCoursesOpen(false);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-500 rounded-full ${
        isScrolled ? "glass" : "bg-transparent"
      } ${isHovered ? "bg-[#636B2F]/20" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => navigate("/")}   // ✔ Home navigation
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4DE95] to-[#636B2F] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <span className="text-[#3D4127] font-bold text-xl">{"</>"}</span>
          </div>
          <span className="text-xl font-bold text-foreground">
            <span className="text-[#D4DE95]">C</span>odify
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">

          {/* Dropdown */}
          <div className="relative">
            <button
              ref={triggerRef}
              onClick={() => setIsCoursesOpen((v) => !v)}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md"
            >
              Courses <ChevronDown className="w-4 h-4" />
            </button>

            {isCoursesOpen && (
              <div
                ref={coursesRef}
                className="absolute left-0 mt-2 w-56 glass border border-[#636B2F]/30 rounded-lg shadow-lg z-50 animate-fade-in-up"
              >
                <ul className="py-2">
                  {["Web Development", "Data Science", "Mobile Apps", "Machine Learning"].map(
                    (item, i) => (
                      <li key={i}>
                        <a className="block px-4 py-2 hover:bg-[#636B2F]/20">{item}</a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>

          <a className="text-muted-foreground hover:text-foreground">Platform</a>
          <a className="text-muted-foreground hover:text-foreground">Community</a>
          <a className="text-muted-foreground hover:text-foreground">Pricing</a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">

          {/* LOGIN BUTTON → NAVIGATE TO /login */}
          <Button
            onClick={() => navigate("/login")}
            variant="ghost"
            className="text-white hover:bg-[#f04083] transition-all duration-300 rounded-full px-5 py-2"
            style={{ backgroundColor: "#080bc9" }}
          >
            Login
          </Button>

          {/* SIGNUP BUTTON → NAVIGATE TO /signup */}
          <Button
            onClick={() => navigate("/signup")}
            className="bg-[#f04083] hover:bg-[#080bc9] text-white transition-all duration-300 rounded-full px-5 py-2"
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass rounded-2xl mt-2 p-4 animate-fade-in-up">
          <div className="flex flex-col gap-4">

            <button
              onClick={() => setIsCoursesOpen((v) => !v)}
              className="flex items-center justify-between py-2"
            >
              Courses
              <ChevronDown
                className={`w-4 h-4 ${isCoursesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isCoursesOpen && (
              <div className="pl-4 flex flex-col gap-2">
                {["Web Development", "Data Science", "Mobile Apps"].map((course, i) => (
                  <a key={i} className="py-1">{course}</a>
                ))}
              </div>
            )}

            <a className="py-2">Resources</a>
            <a className="py-2">Community</a>
            <a className="py-2">Pricing</a>

            {/* Mobile Auth Buttons */}
            <div className="flex gap-3 pt-4 border-t border-[#CD1C18]">
              
              {/* LOGIN MOBILE */}
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/login");
                }}
                variant="ghost"
                className="flex-1 hover:bg-[#fc0828] hover:text-white"
              >
                Login
              </Button>

              {/* SIGNUP MOBILE */}
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/signup");
                }}
                className="flex-1 bg-[#99139e] text-white"
              >
                Sign Up
              </Button>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
