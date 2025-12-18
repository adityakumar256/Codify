import { useState, useEffect, useRef } from "react"
import Popup from "@/components/ui/Popup"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Check } from "lucide-react"
import "../../styles/dashboardPage.css"
import { DashboardNavbar } from "@/components/DashboardNavbar"
import { DashboardFooter } from "@/components/DashboardFooter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

/* ================= PLATFORMS CONFIG ================= */
const platforms = [
  { name: "LeetCode", key: "leetcode", fields: ["username", "totalSolved", "easy", "medium", "hard", "rating"] },
  { name: "GeeksforGeeks", key: "gfg", fields: ["username", "solved", "instituteRank", "score"] },
  { name: "CodeChef", key: "codechef", fields: ["username", "rating", "stars"] },
  { name: "Codeforces", key: "codeforces", fields: ["username", "rating", "maxRating", "rank"] },
  { name: "HackerRank", key: "hackerrank", fields: ["username", "badges", "stars"] },
  { name: "GitHub", key: "github", fields: ["username", "repos", "followers", "following"] },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const inputRefs = useRef({})

  /* ================= STATES ================= */
  const [popup, setPopup] = useState(null)
  const [isVisible, setIsVisible] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)

  const [profileImage, setProfileImage] = useState(null)
  const [profilePhotoFile, setProfilePhotoFile] = useState(null)
  const [userEmail, setUserEmail] = useState("")

  const [profileData, setProfileData] = useState({
    fullName: "",
    college: "",
    course: "",
    branch: "",
    year: "",
    contact: "",
    description: "",
    linkedinUrl: "",
    facebookUrl: "",
    instagramUrl: "",
  })

  const [platformData, setPlatformData] = useState({
    leetcode: { isEditing: false },
    gfg: { isEditing: false },
    codechef: { isEditing: false },
    codeforces: { isEditing: false },
    hackerrank: { isEditing: false },
    github: { isEditing: false },
  })

  /* ================= ANIMATION OBSERVER ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(p => ({ ...p, [entry.target.id]: true }))
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("https://codify-pia9.onrender.com/app/profile/get", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      const data = await res.json()

      setUserEmail(data.email || "")
      setProfileData({
        fullName: data.name || "",
        college: data.college || "",
        course: data.course || "",
        branch: data.branch || "",
        year: data.year || "",
        contact: data.contact || "",
        description: data.description || "",
        linkedinUrl: data.linkedinUrl || "",
        facebookUrl: data.facebookUrl || "",
        instagramUrl: data.instagramUrl || "",
      })

      if (data.photo) {
        setProfileImage(
          data.photo.startsWith("http")
            ? data.photo
            : `https://codify-pia9.onrender.com${data.photo}`
        )
      }
    }
    fetchProfile()
  }, [])

  /* ================= FETCH PLATFORM DATA ================= */
  useEffect(() => {
    const fetchPlatforms = async () => {
      const res = await fetch("https://codify-pia9.onrender.com/app/platform", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      const data = await res.json()

      const formatted = {}
      platforms.forEach(p => {
        formatted[p.key] = { ...data[p.key], isEditing: false }
      })
      setPlatformData(formatted)
    }
    fetchPlatforms()
  }, [])

  /* ================= PROFILE HANDLERS ================= */
  const handleImageUpload = e => {
    const file = e.target.files?.[0]
    if (!file) return
    setProfilePhotoFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setProfileImage(reader.result)
    reader.readAsDataURL(file)
  }

  const handleProfileSave = async () => {
    const formData = new FormData()
    if (profilePhotoFile) formData.append("photo", profilePhotoFile)
    formData.append("name", profileData.fullName)

    Object.entries(profileData).forEach(([k, v]) => {
      if (k !== "fullName") formData.append(k, v)
    })

    await fetch("https://codify-pia9.onrender.com/app/profile/save", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    })

    setIsEditMode(false)
    setPopup({ type: "success", message: "Profile saved ✅" })
  }

  /* ================= PLATFORM SAVE ================= */
  const handlePlatformSave = async key => {
    await fetch("https://codify-pia9.onrender.com/app/platform/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ [key]: platformData[key] }),
    })

    setPlatformData(p => ({
      ...p,
      [key]: { ...p[key], isEditing: false },
    }))

    setPopup({ type: "success", message: "Platform data saved ✅" })
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      {popup && <Popup {...popup} onClose={() => setPopup(null)} />}

      {/* ================= PROFILE SECTION (DESIGN 1) ================= */}
      <section id="profile-section" data-animate className="pt-32 px-6 mb-20">
        <div className={`container mx-auto max-w-4xl transition-all duration-700 ${isVisible["profile-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="glass rounded-3xl p-8 border border-[#CD1C18]/40">
            <div className="flex justify-between mb-6">
              <h2 className="text-3xl font-bold gradient-text">My Profile</h2>
              {!isEditMode && (
                <Button variant="outline" onClick={() => setIsEditMode(true)}>
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="flex justify-center mb-6">
              <input type="file" id="profile-img" hidden onChange={handleImageUpload} disabled={!isEditMode} />
              <label htmlFor="profile-img" className="w-32 h-32 rounded-full border cursor-pointer overflow-hidden">
                {profileImage ? <img src={profileImage} className="w-full h-full object-cover" /> : "Upload"}
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input value={profileData.fullName} disabled={!isEditMode} onChange={e => setProfileData(p => ({ ...p, fullName: e.target.value }))} placeholder="Full Name" />
              <Input value={userEmail} disabled placeholder="Email" />
              <Input value={profileData.college} disabled={!isEditMode} onChange={e => setProfileData(p => ({ ...p, college: e.target.value }))} placeholder="College" />
              <Input value={profileData.course} disabled={!isEditMode} onChange={e => setProfileData(p => ({ ...p, course: e.target.value }))} placeholder="Course" />
              <Input value={profileData.branch} disabled={!isEditMode} onChange={e => setProfileData(p => ({ ...p, branch: e.target.value }))} placeholder="Branch" />
              <Input value={profileData.year} disabled={!isEditMode} onChange={e => setProfileData(p => ({ ...p, year: e.target.value }))} placeholder="Year" />
            </div>

            <Textarea className="mt-4" value={profileData.description} disabled={!isEditMode} onChange={e => setProfileData(p => ({ ...p, description: e.target.value }))} placeholder="About you" />

            {isEditMode && (
              <Button className="w-full mt-6 bg-red-600" onClick={handleProfileSave}>
                Save Profile
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ================= PLATFORM SECTION (DESIGN 2 LOGIC) ================= */}
      <section className="px-6 mb-20">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map(p => {
            const d = platformData[p.key] || {}
            return (
              <div key={p.key} className="glass p-5 rounded-xl border">
                <h3 className="text-xl font-bold mb-4">{p.name}</h3>

                {p.fields.map(f => (
                  <Input
                    key={f}
                    placeholder={f}
                    value={d[f] || ""}
                    disabled={!d.isEditing}
                    onChange={e =>
                      setPlatformData(prev => ({
                        ...prev,
                        [p.key]: { ...prev[p.key], [f]: e.target.value },
                      }))
                    }
                    className="mb-2"
                  />
                ))}

                {d.isEditing ? (
                  <Button className="w-full mt-3" onClick={() => handlePlatformSave(p.key)}>
                    Save
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full mt-3" onClick={() =>
                    setPlatformData(prev => ({ ...prev, [p.key]: { ...prev[p.key], isEditing: true } }))
                  }>
                    Edit
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className="text-center mb-20">
        <Button onClick={() => navigate("/platform")} className="h-14 px-8 rounded-full bg-red-600">
          Go to Platform <ArrowRight className="ml-2" />
        </Button>
      </section>

      <DashboardFooter />
    </div>
  )
}
