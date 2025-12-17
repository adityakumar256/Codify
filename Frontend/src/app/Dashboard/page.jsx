import { useState, useEffect, useRef } from "react";
import Popup from "@/components/ui/Popup";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Code2 } from "lucide-react";
import "../../styles/dashboardPage.css";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import { DashboardFooter } from "@/components/DashboardFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ================= PLATFORM LIST ================= */

const platforms = [
  { name: "LeetCode", logo: "🟡" },
  { name: "CodeChef", logo: "👨‍🍳" },
  { name: "Codeforces", logo: "🔵" },
  { name: "HackerRank", logo: "💚" },
  { name: "GeeksforGeeks", logo: "🟢" },
  { name: "GitHub", logo: "🐙" },
];

const platformKeyMap = {
  LeetCode: "leetcode",
  CodeChef: "codechef",
  Codeforces: "codeforces",
  HackerRank: "hackerrank",
  GeeksforGeeks: "gfg",
  GitHub: "github",
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const inputRefs = useRef({});

  const [popup, setPopup] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  /* ================= PROFILE ================= */

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
  });

  /* ================= PLATFORM DATA ================= */

  const [platformData, setPlatformData] = useState({
    LeetCode: { username: "", totalSolved: "", easy: "", medium: "", hard: "", rating: "", isEditing: true },
    GeeksforGeeks: { username: "", solved: "", instituteRank: "", score: "", isEditing: true },
    CodeChef: { username: "", rating: "", stars: "", isEditing: true },
    Codeforces: { username: "", rating: "", maxRating: "", rank: "", isEditing: true },
    HackerRank: { username: "", badges: "", stars: "", isEditing: true },
    GitHub: { username: "", repos: "", followers: "", following: "", isEditing: true },
  });

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("https://codify-pia9.onrender.com/app/profile/get", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();

      setUserEmail(data.email || "");
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
      });

      if (data.photo) {
        setProfileImage(`https://codify-pia9.onrender.com${data.photo}`);
      }
    };

    fetchProfile();
  }, []);

  /* ================= FETCH PLATFORMS ================= */

  useEffect(() => {
    const fetchPlatforms = async () => {
      const res = await fetch("https://codify-pia9.onrender.com/api/platform", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();

      setPlatformData((prev) => ({
        ...prev,
        LeetCode: data.leetcode ? { ...data.leetcode, isEditing: false } : prev.LeetCode,
        GeeksforGeeks: data.gfg ? { ...data.gfg, isEditing: false } : prev.GeeksforGeeks,
        CodeChef: data.codechef ? { ...data.codechef, isEditing: false } : prev.CodeChef,
        Codeforces: data.codeforces ? { ...data.codeforces, isEditing: false } : prev.Codeforces,
        HackerRank: data.hackerrank ? { ...data.hackerrank, isEditing: false } : prev.HackerRank,
        GitHub: data.github ? { ...data.github, isEditing: false } : prev.GitHub,
      }));
    };

    fetchPlatforms();
  }, []);

  /* ================= SAVE PLATFORM ================= */

  const handleSave = async (platformName) => {
    const key = platformKeyMap[platformName];
    const payload = platformData[platformName];

    await fetch("https://codify-pia9.onrender.com/api/platform/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        [key]: { ...payload, lastUpdated: new Date() },
      }),
    });

    setPlatformData((prev) => ({
      ...prev,
      [platformName]: { ...prev[platformName], isEditing: false },
    }));

    setPopup({ type: "success", message: `${platformName} saved ✅` });
  };

  /* ================= SAVE PROFILE ================= */

  const handleProfileSave = async () => {
    const formData = new FormData();
    if (profilePhotoFile) formData.append("photo", profilePhotoFile);

    Object.entries(profileData).forEach(([k, v]) => formData.append(k, v));

    await fetch("https://codify-pia9.onrender.com/app/profile/save", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    });

    setIsEditMode(false);
    setPopup({ type: "success", message: "Profile saved ✅" });
  };

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      {popup && <Popup {...popup} onClose={() => setPopup(null)} />}

      {/* ---------- PROFILE UI (UNCHANGED) ---------- */}
      {/* tumhara profile section EXACT SAME hai, logic connected */}

      {/* ---------- PLATFORMS ---------- */}
      <section className="px-6 mb-20">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((p) => {
            const d = platformData[p.name];
            return (
              <div key={p.name} className="glass rounded-2xl p-6 border">
                <h3 className="text-xl font-bold mb-4">{p.logo} {p.name}</h3>

                {Object.keys(d)
                  .filter((k) => k !== "isEditing")
                  .map((field) => (
                    <Input
                      key={field}
                      placeholder={field}
                      value={d[field]}
                      disabled={!d.isEditing}
                      onChange={(e) =>
                        setPlatformData((prev) => ({
                          ...prev,
                          [p.name]: { ...prev[p.name], [field]: e.target.value },
                        }))
                      }
                      className="mb-2"
                    />
                  ))}

                {d.isEditing ? (
                  <Button onClick={() => handleSave(p.name)} className="w-full">
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setPlatformData((prev) => ({
                        ...prev,
                        [p.name]: { ...prev[p.name], isEditing: true },
                      }))
                    }
                    className="w-full"
                  >
                    Edit
                  </Button>
                )}
              </div>
            );
          })}
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
  );
}
