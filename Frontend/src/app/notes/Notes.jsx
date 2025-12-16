import { useState, useEffect } from "react"
import { HeroSection } from "./components/hero-section"
import { NotesGrid } from "./components/notes-grid"
import { PreviewModal } from "./components/preview-modal"
import { BackToTop } from "./components/back-to-top"

export default function NotesPage() {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /* 🔄 SCROLL PROGRESS BAR */
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* 📡 FETCH NOTES */
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          "https://codify-pia9.onrender.com/app/notes/getnotes",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )

        if (!res.ok) throw new Error("Failed to fetch notes")

        const data = await res.json()
        setNotes(data.notes || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* 🔴 TOP SCROLL BAR */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-red-600 to-red-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* HERO */}
      <HeroSection />

      {/* 🔹 CENTERED CONTENT */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {loading && (
          <div className="text-center py-24 text-neutral-400 animate-pulse">
            Loading notes...
          </div>
        )}

        {error && (
          <div className="text-center py-24 text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && notes.length === 0 && (
          <div className="text-center py-24 text-neutral-500">
            No notes available
          </div>
        )}

        {!loading && !error && notes.length > 0 && (
          <NotesGrid
            notes={notes}
            onNoteClick={setSelectedNote}
          />
        )}
      </div>

      {/* PREVIEW MODAL */}
      {selectedNote && (
        <PreviewModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}

      {/* BACK TO TOP */}
      <BackToTop />
    </div>
  )
}
