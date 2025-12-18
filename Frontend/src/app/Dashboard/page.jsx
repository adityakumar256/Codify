import { useState, useEffect } from "react"
import Popup from "@/components/ui/Popup"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
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
  const [popup, setPopup] = useState(null)
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
    description: "",
    linkedinUrl: "",
    facebookUrl: "",
    instagramUrl: "",
  })

  const [platformData, setPlatformData] = useState({})

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

  /* ================= FETCH PLATFORMS ================= */
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

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = e => {
    const file = e.target.files?.[0]
    if (!file) return
    setProfilePhotoFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setProfileImage(reader.result)
    reader.readAsDataURL(file)
  }

  /* ================= SAVE PROFILE ================= */
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

  /* ================= SAVE PLATFORM ================= */
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
    <div className="min-h-screen bg-black">
      <DashboardNavbar />
      {popup && <Popup {...popup} onClose={() => setPopup(null)} />}

      {/* ================= PROFILE ================= */}
      <section className="pt-32 px-6 mb-20">
        <div className="max-w-4xl mx-auto profile-card p-8 rounded-3xl">
          <div className="flex justify-between mb-6">
            <h2 className="text-3xl font-bold text-red-300">My Profile</h2>
            {!isEditMode && (
              <Button variant="outline" onClick={() => setIsEditMode(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          <div className="flex justify-center mb-6">
            <input type="file" hidden id="profile-img" onChange={handleImageUpload} disabled={!isEditMode} />
            <label htmlFor="profile-img" className="profile-avatar cursor-pointer">
              <img src={profileImage} alt="profile" />
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input className="profile-input" disabled={!isEditMode} value={profileData.fullName}
              onChange={e => setProfileData(p => ({ ...p, fullName: e.target.value }))} />
            <Input className="profile-input opacity-60" disabled value={userEmail} />
            <Input className="profile-input" disabled={!isEditMode} value={profileData.college}
              onChange={e => setProfileData(p => ({ ...p, college: e.target.value }))} />
            <Input className="profile-input" disabled={!isEditMode} value={profileData.course}
              onChange={e => setProfileData(p => ({ ...p, course: e.target.value }))} />
            <Input className="profile-input" disabled={!isEditMode} value={profileData.branch}
              onChange={e => setProfileData(p => ({ ...p, branch: e.target.value }))} />
            <Input className="profile-input" disabled={!isEditMode} value={profileData.year}
              onChange={e => setProfileData(p => ({ ...p, year: e.target.value }))} />
          </div>

          <Textarea className="profile-input mt-4" disabled={!isEditMode}
            value={profileData.description}
            onChange={e => setProfileData(p => ({ ...p, description: e.target.value }))} />

          <div className="grid md:grid-cols-3 gap-3 mt-4">
            <Input className="profile-input" disabled={!isEditMode} value={profileData.linkedinUrl} />
            <Input className="profile-input" disabled={!isEditMode} value={profileData.facebookUrl} />
            <Input className="profile-input" disabled={!isEditMode} value={profileData.instagramUrl} />
          </div>

          {isEditMode && (
            <Button className="w-full mt-6 bg-red-600" onClick={handleProfileSave}>
              Save Profile
            </Button>
          )}
        </div>
      </section>

      {/* ================= PLATFORMS ================= */}
      <section className="px-6 mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {platforms.map(p => {
            const d = platformData[p.key] || {}
            return (
              <div key={p.key} className="profile-card p-5 rounded-xl">
                <h3 className="text-xl text-red-300 mb-3">{p.name}</h3>

                {p.fields.map(f => (
                  <Input key={f} className="profile-input mb-2"
                    disabled={!d.isEditing}
                    value={d[f] || ""}
                    onChange={e =>
                      setPlatformData(prev => ({
                        ...prev,
                        [p.key]: { ...prev[p.key], [f]: e.target.value },
                      }))
                    }
                  />
                ))}

                {d.isEditing ? (
                  <Button className="w-full mt-2" onClick={() => handlePlatformSave(p.key)}>Save</Button>
                ) : (
                  <Button variant="outline" className="w-full mt-2"
                    onClick={() => setPlatformData(prev => ({
                      ...prev,
                      [p.key]: { ...prev[p.key], isEditing: true },
                    }))}>
                    Edit
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className="text-center mb-20">
        <Button onClick={() => navigate("/platform")} className="bg-red-600 px-8 h-14 rounded-full">
          Go to Platform <ArrowRight className="ml-2" />
        </Button>
      </section>

      <DashboardFooter />
    </div>
  )
}
