import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck } from "lucide-react";

import RedInput from "./RedInput";
import RedButton from "./RedButton";
import RedSocialButton from "./RedSocialButton";
import { PasswordRules, validatePassword } from "./PasswordRules";

export default function RedSignupCard() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setConfirmPasswordError("");
    setServerError("");

    if (!validatePassword(password)) {
      setPasswordError("Please create a password that meets all requirements");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:7025/app/user/signup",
        { name, email, password , confirmPassword}
      );

      console.log("Signup success:", res.data);

      // ✅ Redirect to homepage after signup
      navigate("/");

    } catch (err) {
      console.error(err);
      setServerError(
        err.response?.data?.message || "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group w-full">
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#FFA896] via-[#CD1C18] to-[#9B1313]
        rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

      {/* Card */}
      <div className="relative backdrop-blur-xl bg-[#38000A]/60 border border-[#FFA896]/20
        rounded-2xl p-8 md:p-10 shadow-2xl">
        <div className="relative z-10 space-y-8">

          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              SIGN UP
            </h2>
            <p className="text-[#FFA896]/80 text-sm">
              Create your new account to get started.
            </p>
          </div>

          {serverError && (
            <p className="text-red-500 text-sm text-center">{serverError}</p>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <RedInput
              type="text"
              placeholder="Full Name"
              icon={<User className="w-5 h-5" />}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <RedInput
              type="email"
              placeholder="Email Address"
              icon={<Mail className="w-5 h-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <div className="relative">
              <RedInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                icon={<Lock className="w-5 h-5" />}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setTimeout(() => setIsPasswordFocused(false), 200)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>

              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}

              <PasswordRules
                password={password}
                show={isPasswordFocused || password.length > 0}
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <RedInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                icon={<ShieldCheck className="w-5 h-5" />}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>

              {confirmPasswordError && (
                <p className="text-red-500 text-xs mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <RedButton type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </RedButton>
          </form>

          {/* Social */}
          <div className="flex gap-4">
            <RedSocialButton provider="google" />
            <RedSocialButton provider="facebook" />
          </div>

          <p className="text-center text-sm text-[#FFA896]/70">
            Already have an account?{" "}
            <a href="/login" className="text-[#FFA896] font-semibold">
              Sign In
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
