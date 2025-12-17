import { useState, useEffect, useRef } from "react"
import Popup from "@/components/ui/Popup"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Code2 } from "lucide-react"
import "../../styles/dashboardPage.css"
import { DashboardNavbar } from "@/components/DashboardNavbar"
import { DashboardFooter } from "@/components/DashboardFooter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

/* ================= PLATFORM CONFIG ================= */

const platforms = [
  {
    name: "LeetCode",
    logo: "🟡",
    gradient: "from-[#FFA896] via-[#CD1C18] to-[#FFA116]",
    bgColor:
      "bg-gradient-to-br from-[#FFA116]/20 via-[#CD1C18]/20 to-[#38000A]",
  },
  {
    name: "CodeChef",
    logo: "👨‍🍳",
    gradient: "from-[#CD1C18] via-[#9B1313] to-[#5B4638]",
    bgColor:
      "bg-gradient-to-br from-[#5B4638]/20 via-[#CD1C18]/20 to-[#38000A]",
  },
  {
    name: "Codeforces",
    logo: "🔵",
    gradient: "from-[#CD1C18] via-[#1E88E5] to-[#9B1313]",
    bgColor:
      "bg-gradient-to-br from-[#1E88E5]/20 via-[#CD1C18]/20 to-[#38000A]",
  },
  {
    name: "HackerRank",
    logo: "💚",
    gradient: "from-[#FFA896] via-[#CD1C18] to-[#00EA64]",
    bgColor:
      "bg-gradient-to-br from-[#00EA64]/20 via-[#CD1C18]/20 to-[#38000A]",
  },
  {
    name: "GeeksforGeeks",
    logo: "🟢",
    gradient: "from-[#CD1C18] via-[#2F8D46] to-[#9B1313]",
    bgColor:
      "bg-gradient-to-br from-[#2F8D46]/20 via-[#CD1C18]/20 to-[#38000A]",
  },
  {
    name: "GitHub",
    logo: "🐙",
    gradient: "from-[#FFA896] via-[#CD1C18] to-[#6e5494]",
    bgColor:
      "bg-gradient-to-br from-[#6e5494]/20 via-[#CD1C18]/20 to-[#38000A]",
  },
]

const platformKeyMap = {
  LeetCode: "leetcode",
  CodeChef: "codechef",
  Codeforces: "codeforces",
  HackerRank: "hackerrank",
  GeeksforGeeks: "gfg",
  GitHub: "github",
}

const getProfileUrl = (key, username) => {
  if (!username) return ""
  const map = {
    leetcode: `https://leetcode.com/${username}`,
    codechef: `https://www.codechef.com/users/${username}`,
    codeforces: `https://codeforces.com/profile/${username}`,
    hackerrank: `https://www.hackerrank.com/${username}`,
    gfg: `https://www.geeksforgeeks.org/user/${username}`,
    github: `https://github.com/${username}`,
  }
  return map[key]
}

/* ================= COMPONENT ================= */

export default function DashboardPage() {
  const navigate = useNavigate()
  const inputRefs = useRef({})

  const [popup, setPopup] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [profilePhotoFile, setProfilePhotoFile] = useState(null)
  const [userEmail, setUserEmail] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)

  /* ---------- PROFILE DATA ---------- */
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

  /* ---------- PLATFORM DATA ---------- */
  const [platformData, setPlatformData] = useState({
    LeetCode: { username: "", totalSolved: "", easy: "", medium: "", hard: "", rating: "", isEditing: true },
    CodeChef: { username: "", rating: "", stars: "", isEditing: true },
    Codeforces: { username: "", rating: "", maxRating: "", rank: "", isEditing: true },
    HackerRank: { username: "", badges: "", stars: "", isEditing: true },
    GeeksforGeeks: { username: "", solved: "", instituteRank: "", score: "", isEditing: true },
    GitHub: { username: "", repos: "", followers: "", following: "", isEditing: true },
  })

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(
        "https://codify-pia9.onrender.com/app/profile/get",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
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
        setProfileImage(`https://codify-pia9.onrender.com${data.photo}`)
      }
    }

    fetchProfile()
  }, [])

  /* ================= FETCH PLATFORMS ================= */
  useEffect(() => {
    const fetchPlatforms = async () => {
      const res = await fetch(
        "https://codify-pia9.onrender.com/app/platform",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      const data = await res.json()

      setPlatformData((prev) => ({
        ...prev,
        LeetCode: data.leetcode ? { ...data.leetcode, isEditing: false } : prev.LeetCode,
        CodeChef: data.codechef ? { ...data.codechef, isEditing: false } : prev.CodeChef,
        Codeforces: data.codeforces ? { ...data.codeforces, isEditing: false } : prev.Codeforces,
        HackerRank: data.hackerrank ? { ...data.hackerrank, isEditing: false } : prev.HackerRank,
        GeeksforGeeks: data.gfg ? { ...data.gfg, isEditing: false } : prev.GeeksforGeeks,
        GitHub: data.github ? { ...data.github, isEditing: false } : prev.GitHub,
      }))
    }

    fetchPlatforms()
  }, [])

  /* ================= SAVE PLATFORM ================= */
  const handleSave = async (platformName) => {
    const key = platformKeyMap[platformName]
    const data = platformData[platformName]

    await fetch("https://codify-pia9.onrender.com/app/platform/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        [key]: {
          ...data,
          profileUrl: getProfileUrl(key, data.username),
          lastUpdated: new Date(),
        },
      }),
    })

    setPlatformData((prev) => ({
      ...prev,
      [platformName]: { ...prev[platformName], isEditing: false },
    }))

    setPopup({ type: "success", message: `${platformName} saved ✅` })
  }

  /* ================= SAVE PROFILE ================= */
  const handleProfileSave = async () => {
    const formData = new FormData()
    if (profilePhotoFile) formData.append("photo", profilePhotoFile)

    Object.entries(profileData).forEach(([k, v]) =>
      formData.append(k, v)
    )

    await fetch("https://codify-pia9.onrender.com/app/profile/save", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })

    setIsEditMode(false)
    setPopup({ type: "success", message: "Profile saved ✅" })
  }

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      {popup && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup(null)}
        />
      )}

      {/* ---------- HERO ---------- */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl font-bold gradient-text">
          Welcome to Your Dashboard
        </h1>
      </section>

      {/* ---------- PROFILE (UNCHANGED UI) ---------- */}
      {/* 👇 tumhara existing profile section yahin hai – unchanged */}
      {/* (code same as tumne diya tha, logic already connected) */}

      {/* ---------- PLATFORMS ---------- */}
      <section id="platforms-section" className="px-6 mb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => {
              const p = platformData[platform.name]

              return (
                <div
                  key={platform.name}
                  className={`card-3d glass rounded-2xl p-6 border border-[#CD1C18]/30 ${platform.bgColor}`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center text-3xl`}
                    >
                      {platform.logo}
                    </div>
                    <h3 className="text-xl font-bold">{platform.name}</h3>
                  </div>

                  {Object.keys(p)
                    .filter((k) => k !== "isEditing")
                    .map((field) => (
                      <Input
                        key={field}
                        placeholder={field}
                        value={p[field]}
                        disabled={!p.isEditing}
                        onChange={(e) =>
                          setPlatformData((prev) => ({
                            ...prev,
                            [platform.name]: {
                              ...prev[platform.name],
                              [field]: e.target.value,
                            },
                          }))
                        }
                        className="mb-3 bg-background/50 border-[#CD1C18]/30"
                      />
                    ))}

                  {p.isEditing ? (
                    <Button
                      onClick={() => handleSave(platform.name)}
                      className="w-full bg-gradient-to-r from-[#CD1C18] to-[#9B1313]"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() =>
                        setPlatformData((prev) => ({
                          ...prev,
                          [platform.name]: { ...prev[platform.name], isEditing: true },
                        }))
                      }
                      className="w-full"
                    >
                      Edit
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="px-6 mb-20 text-center">
        <Button
          onClick={() => navigate("/platform")}
          className="bg-gradient-to-r from-[#CD1C18] to-[#9B1313] h-14 px-8 text-lg"
        >
          Go to Platform <ArrowRight className="ml-2" />
        </Button>
      </section>

      <DashboardFooter />
    </div>
  )
}
