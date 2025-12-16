"use client"

import {
  Mail,
  Building2,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react"


/* ---------- HELPERS ---------- */
const hasValue = (v) => v !== null && v !== undefined && v !== 0

export function ProfileSidebar({ user, platforms = [], isLoaded, isDarkBg }) {
  if (!user) return null

  return (
    <aside
      className={`fixed left-0 top-0 w-80 h-screen backdrop-blur-xl border-r p-6 overflow-y-auto transition-all duration-700
        ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}
        ${
          isDarkBg
            ? "bg-neutral-900/60 border-neutral-800 text-white"
            : "bg-white/60 border-neutral-200 text-neutral-900"
        }
      `}
    >
      {/* ================= PROFILE ================= */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-red-600 blur-md animate-pulse" />
          <img
            src={
              user.photo
                ? `https://codify-pia9.onrender.com${user.photo}`
                : "/placeholder.svg"
            }
            alt={user.name || "profile"}
            className="relative w-32 h-32 rounded-full border-2 border-red-500/30 object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold mb-1">
          {user.name}
        </h2>

        {user.description && (
          <p className="text-sm mb-4 text-neutral-400">
            {user.description}
          </p>
        )}

        <button className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-sm font-medium hover:scale-105 transition">
          Get your Codify Card
        </button>
      </div>

      {/* ================= SOCIAL ================= */}
     {/* ================= SOCIAL ================= */}
<div className="flex justify-center gap-4 mb-8">
  {/* EMAIL */}
  {user.email && (
    <a
      href={`mailto:${user.email}`}
      className="social-btn"
      title="Email"
    >
      <Mail className="w-5 h-5" />
    </a>
  )}

  {/* LINKEDIN */}
  {user.linkedinUrl && (
    <a
      href={user.linkedinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn"
      title="LinkedIn"
    >
      <Linkedin className="w-5 h-5" />
    </a>
  )}

  {/* INSTAGRAM */}
  {user.instagramUrl && (
    <a
      href={user.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn"
      title="Instagram"
    >
      <Instagram className="w-5 h-5" />
    </a>
  )}

  {/* FACEBOOK */}
  {user.facebookUrl && (
    <a
      href={user.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn"
      title="Facebook"
    >
      <Facebook className="w-5 h-5" />
    </a>
  )}
</div>


      {/* ================= DETAILS ================= */}
      <div className="space-y-3 mb-8 text-sm text-neutral-400">
        {user.college && (
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            {user.college}
          </div>
        )}

        {(user.course || user.branch) && (
          <div>
            🎓 {user.course} {user.branch && `- ${user.branch}`}
          </div>
        )}

        {user.year && <div>📅 {user.year}</div>}
        {user.contact && <div>📞 {user.contact}</div>}
      </div>

      <hr
        className={`mb-6 ${
          isDarkBg ? "border-neutral-800" : "border-neutral-200"
        }`}
      />

      {/* ================= PROBLEM SOLVING STATS ================= */}
      <h3
        className={`text-sm font-semibold mb-4 uppercase tracking-wide ${
          isDarkBg ? "text-neutral-400" : "text-neutral-600"
        }`}
      >
        Problem Solving Stats
      </h3>

      <div className="space-y-3">
        {Array.isArray(platforms) &&
          platforms.map((p) => {
            const value =
              p.platform === "github"
                ? p.extra?.repositories
                : p.stats?.totalSolved

            if (!hasValue(value)) return null

            return (
              <div
                key={p.platform}
                className={`flex items-center justify-between p-3 rounded-lg transition
                  ${
                    isDarkBg
                      ? "bg-neutral-800/30 hover:bg-neutral-800/50"
                      : "bg-neutral-100 hover:bg-neutral-200"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-xs font-bold text-white">
                    {p.platform[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium capitalize">
                    {p.platform}
                  </span>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    isDarkBg
                      ? "bg-neutral-800 text-neutral-300"
                      : "bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {value}
                </span>
              </div>
            )
          })}
      </div>
    </aside>
  )
}
