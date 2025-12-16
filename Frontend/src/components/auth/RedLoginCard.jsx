import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RedInput from "./RedInput";
import RedButton from "./RedButton";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RedLoginCard() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        "https://codify-pia9.onrender.com/app/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ SAVE BOTH
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-red-500">{error}</p>}

      <RedInput
        type="email"
        placeholder="Email"
        icon={<Mail />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative">
        <RedInput
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          icon={<Lock />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <RedButton type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </RedButton>
    </form>
  );
}
