import { useState, useEffect } from "react";
import Popup from "@/components/ui/Popup";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "../../styles/dashboardPage.css";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import { DashboardFooter } from "@/components/DashboardFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ================= PLATFORM LIST ================= */

const platforms = [
  { name: "LeetCode", key: "leetcode" },
  { name: "GeeksforGeeks", key: "gfg" },
  { name: "CodeChef", key: "codechef" },
  { name: "Codeforces", key: "codeforces" },
  { name: "HackerRank", key: "hackerrank" },
  { name: "GitHub", key: "github" },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  const [popup, setPopup] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  /* ================= PROFILE STATE ================= */

  const [profileData, setProfileData] = useState({
    name: "",
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

  /* ================= PLATFORM STATE ================= */

  const [platformData, setPlatformData] = useState({
    leetcode: {
      username: "",
      totalSolved: "",
      easy: "",
      medium: "",
      hard: "",
      rating: "",
      isEditing: true,
    },
    gfg: {
      username: "",
      solved: "",
      instituteRank: "",
      score: "",
      isEditing: true,
    },
    codechef: {
      username: "",
      rating: "",
      stars: "",
      isEditing: true,
    },
    codeforces: {
      username: "",
      rating: "",
      maxRating: "",
      rank: "",
      isEditing: true,
    },
    hackerrank: {
      username: "",
      badges: "",
      stars: "",
      isEditing: true,
    },
    github: {
      username: "",
      repos: "",
      followers: "",
      following: "",
      isEditing: true,
    },
  });

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://codify-pia9.onrender.com/app/profile/get",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        setUserEmail(data.email || "");
        setProfileData({
          name: data.name || "",
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
      } catch (err) {
        console.error("Profile fetch error", err);
      }
    };

    fetchProfile();
  }, []);

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
      );
      const data = await res.json();

      setPlatformData((prev) => ({
        ...prev,
        ...Object.fromEntries(
          Object.entries(data || {}).map(([k, v]) => [
            k,
            { ...v, isEditing: false },
          ])
        ),
      }));
    };

    fetchPlatforms();
  }, []);

  /* ================= SAVE PROFILE ================= */

  const handleProfileSave = async () => {
    const formData = new FormData();
    Object.entries(profileData).forEach(([k, v]) =>
      formData.append(k, v)
    );

    await fetch("https://codify-pia9.onrender.com/app/profile/save", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    setIsEditMode(false);
    setPopup({ type: "success", message: "Profile saved ✅" });
  };

  /* ================= SAVE PLATFORM ================= */

  const handlePlatformSave = async (platformKey) => {
    await fetch("https://codify-pia9.onrender.com/app/platform/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        [platformKey]: {
          ...platformData[platformKey],
          lastUpdated: new Date(),
        },
      }),
    });

    setPlatformData((prev) => ({
      ...prev,
      [platformKey]: { ...prev[platformKey], isEditing: false },
    }));

    setPopup({ type: "success", message: "Platform saved ✅" });
  };

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      {popup && <Popup {...popup} onClose={() => setPopup(null)} />}

      {/* ================= PROFILE ================= */}
      <section className="px-6 mb-16">
        <div className="container mx-auto max-w-4xl glass p-6 rounded-xl border">
          <h2 className="text-2xl font-bold mb-4">My Profile</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Name"
              value={profileData.name}
              disabled={!isEditMode}
              onChange={(e) =>
                setProfileData((p) => ({ ...p, name: e.target.value }))
              }
            />
            <Input placeholder="Email" value={userEmail} disabled />
            <Input
              placeholder="College"
              value={profileData.college}
              disabled={!isEditMode}
              onChange={(e) =>
                setProfileData((p) => ({ ...p, college: e.target.value }))
              }
            />
            <Input
              placeholder="Course"
              value={profileData.course}
              disabled={!isEditMode}
              onChange={(e) =>
                setProfileData((p) => ({ ...p, course: e.target.value }))
              }
            />
            <Input
              placeholder="Branch"
              value={profileData.branch}
              disabled={!isEditMode}
              onChange={(e) =>
                setProfileData((p) => ({ ...p, branch: e.target.value }))
              }
            />
            <Input
              placeholder="Year"
              value={profileData.year}
              disabled={!isEditMode}
              onChange={(e) =>
                setProfileData((p) => ({ ...p, year: e.target.value }))
              }
            />
          </div>

          <Textarea
            className="mt-4"
            placeholder="Description"
            value={profileData.description}
            disabled={!isEditMode}
            onChange={(e) =>
              setProfileData((p) => ({
                ...p,
                description: e.target.value,
              }))
            }
          />

          <div className="mt-4 flex gap-3">
            {isEditMode ? (
              <Button onClick={handleProfileSave}>Save Profile</Button>
            ) : (
              <Button variant="outline" onClick={() => setIsEditMode(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ================= PLATFORMS ================= */}
      <section className="px-6 mb-20">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((p) => {
            const d = platformData[p.key];
            return (
              <div key={p.key} className="glass p-5 rounded-xl border">
                <h3 className="text-xl font-bold mb-3">{p.name}</h3>

                {Object.keys(d)
                  .filter((k) => k !== "isEditing")
                  .map((field) => (
                    <Input
                      key={field}
                      placeholder={field}
                      value={d[field] || ""}
                      disabled={!d.isEditing}
                      onChange={(e) =>
                        setPlatformData((prev) => ({
                          ...prev,
                          [p.key]: {
                            ...prev[p.key],
                            [field]: e.target.value,
                          },
                        }))
                      }
                      className="mb-2"
                    />
                  ))}

                {d.isEditing ? (
                  <Button
                    className="w-full"
                    onClick={() => handlePlatformSave(p.key)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      setPlatformData((prev) => ({
                        ...prev,
                        [p.key]: { ...prev[p.key], isEditing: true },
                      }))
                    }
                  >
                    Edit
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CTA ================= */}
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
