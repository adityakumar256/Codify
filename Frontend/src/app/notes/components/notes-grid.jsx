import { useState, useEffect, useRef } from "react";

const categories = [
  "All",
  "Programming",
  "Data Science",
  "Database",
  "Cloud",
  "DSA",
  "Backend Development",
];

export function NotesGrid({ notes = [], onNoteClick }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleNotes, setVisibleNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const sectionRef = useRef(null);

  /* 🔍 FILTER NOTES */
  const filteredNotes = notes.filter(
    (note) =>
      (selectedCategory === "All" || note.category === selectedCategory) &&
      (searchQuery === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  /* 🎬 REVEAL ANIMATION */
  useEffect(() => {
  let cancelled = false
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setVisibleNotes([])

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !cancelled) {
        filteredNotes.forEach((_, index) => {
          setTimeout(() => {
            if (!cancelled) {
              setVisibleNotes((prev) =>
                prev.includes(index) ? prev : [...prev, index]
              )
            }
          }, index * 120)
        })
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  if (sectionRef.current) {
    observer.observe(sectionRef.current)
  }

  return () => {
    cancelled = true
    observer.disconnect()
  }
}, [filteredNotes.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          filteredNotes.forEach((_, index) => {
            setTimeout(() => {
              setVisibleNotes((prev) =>
                prev.includes(index) ? prev : [...prev, index]
              );
            }, index * 120);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [filteredNotes]);

  return (
    <section ref={sectionRef} className="min-h-screen px-6 py-24">
      <div className="max-w-7xl mx-auto">
        {/* 🔎 SEARCH */}
        <div className="mb-12 flex justify-center">
          <div
            className={`transition-all duration-300 ${
              isSearchFocused ? "w-full max-w-2xl" : "w-full max-w-xl"
            }`}
          >
            <input
              type="text"
              placeholder="Search notes by title or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full px-6 py-4 bg-black/50 border rounded-full text-white transition-all ${
                isSearchFocused
                  ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                  : "border-gray-700"
              }`}
            />
          </div>
        </div>

        {/* 🏷️ CATEGORIES */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 📚 GRID */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">📚</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No notes found
            </h3>
            <p className="text-gray-400">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNotes.map((note, index) => (
              <div
                key={note._id}
                onClick={() => onNoteClick(note)}
                className={`relative p-6 rounded-xl cursor-pointer transition-all duration-500 group ${
                  visibleNotes.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* 🔥 TRENDING */}
                {note.trending && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full z-10">
                    🔥 Trending
                  </div>
                )}

                {/* 🖼️ A4 THUMBNAIL */}
                <div
                  className="relative w-full overflow-hidden rounded-lg bg-neutral-900 mb-4"
                  style={{ aspectRatio: "210 / 297" }} // ✅ A4
                >
                  <img
                    src={note.previewImage}
                    alt={note.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/210x297?text=No+Preview";
                    }}
                  />
                </div>

                {/* 📄 INFO */}
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-500">
                  {note.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{note.subject}</p>

                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>📄 {note.pages} pages</span>
                  <span>⬇️ {note.downloads}</span>
                </div>

                {/* 🔘 ACTIONS */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNoteClick(note);
                    }}
                    className="flex-1 px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-all text-sm"
                  >
                    👁️ Preview
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(note.pdfUrl, "_blank");
                    }}
                    className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm"
                  >
                    ⬇️ Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
