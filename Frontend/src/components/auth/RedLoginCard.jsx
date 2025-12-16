import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RedInput from "./RedInput";
import RedButton from "./RedButton";
import RedSocialButton from "./RedSocialButton";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RedLoginCard() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!email || !password) {
      setServerError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:7025/app/user/login",
        { email, password }
      );

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Redirect
      navigate("/dashboard");

    } catch (err) {
      setServerError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">

      {/* Glowing animated border */}
      <div
        className="absolute -inset-1 bg-gradient-to-r from-[#FFA896] via-[#CD1C18] to-[#9B1313]
        rounded-2xl blur-md opacity-50 group-hover:opacity-75
        transition-opacity duration-500 animate-card-glow"
      />

      {/* Main Card */}
      <div
        className="relative backdrop-blur-xl bg-[#38000A]/60 border border-[#FFA896]/20
        rounded-2xl p-8 md:p-10 shadow-2xl magnetic-hover"
      >
        {/* Glass overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#FFA896]/10 via-transparent to-transparent
          rounded-2xl pointer-events-none"
        />

        <div className="relative z-10 space-y-8">

          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white hover:text-[#FFA896] transition">
              LOGIN
            </h2>
            <p className="text-[#FFA896]/80 text-sm">
              Welcome back! Please enter your credentials.
            </p>
          </div>

          {/* Server Error */}
          {serverError && (
            <p className="text-red-500 text-sm text-center">
              {serverError}
            </p>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>

            <RedInput
              type="email"
              placeholder="Email Address"
              icon={<Mail className="w-5 h-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              isFocused={focusedField === "email"}
            />

            <div className="relative">
              <RedInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                icon={<Lock className="w-5 h-5" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                isFocused={focusedField === "password"}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2
                text-[#FFA896]/60 hover:text-[#FFA896]
                transition-all duration-300 hover:scale-110"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-[#FFA896] hover:text-[#CD1C18] transition"
              >
                Forgot Password?
              </a>
            </div>

            <RedButton type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </RedButton>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#FFA896]/30" />
            <span className="text-[#FFA896]/60 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-[#FFA896]/30" />
          </div>

          {/* Social */}
          <div className="flex gap-4">
            <RedSocialButton provider="google" />
            <RedSocialButton provider="facebook" />
          </div>

          <p className="text-center text-[#FFA896]/70 text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#FFA896] hover:text-[#CD1C18] font-semibold transition"
            >
              Sign Up
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
