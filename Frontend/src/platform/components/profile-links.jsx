export function ProfileLinks({ platforms, isDarkBg }) {
  if (!platforms) return null

  // 🔥 OBJECT → ARRAY
  const list = Object.values(platforms)

  return (
    <div className="mt-6">
      <h4
        className={`text-sm font-semibold mb-3 ${
          isDarkBg ? "text-neutral-400" : "text-neutral-600"
        }`}
      >
        Profiles
      </h4>

      <div className="space-y-2">
        {list.map((p) => {
          if (!p.profile?.url) return null

          return (
            <a
              key={p.platform}
              href={p.profile.url}
              target="_blank"
              rel="noreferrer"
              className={`block px-3 py-2 rounded-lg text-sm transition
                ${
                  isDarkBg
                    ? "bg-neutral-800 hover:bg-neutral-700 text-white"
                    : "bg-neutral-100 hover:bg-neutral-200 text-black"
                }`}
            >
              🔗 {p.platform.toUpperCase()}
            </a>
          )
        })}
      </div>
    </div>
  )
}
