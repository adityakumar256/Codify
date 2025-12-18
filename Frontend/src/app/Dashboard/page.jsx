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

const platforms = [
  { name: "LeetCode", key: "leetcode", fields: ["username", "totalSolved", "easy", "medium", "hard", "rating"] },
  { name: "GeeksforGeeks", key: "gfg", fields: ["username", "solved", "instituteRank", "score"] },
  { name: "CodeChef", key: "codechef", fields: ["username", "rating", "stars"] },
  { name: "Codeforces", key: "codeforces", fields: ["username", "rating", "maxRating", "rank"] },
  { name: "HackerRank", key: "hackerrank", fields: ["username", "badges", "stars"] },
  { name: "GitHub", key: "github", fields: ["username", "repos", "followers", "following"] },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "", college: "", course: "", branch: "", year: "", contact: "", description: "",
    linkedinUrl: "", facebookUrl: "", instagramUrl: "",
  });

  const [platformData, setPlatformData] = useState({
    leetcode: { isEditing: false },
    gfg: { isEditing: false },
    codechef: { isEditing: false },
    codeforces: { isEditing: false },
    hackerrank: { isEditing: false },
    github: { isEditing: false },
  });

  // Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://codify-pia9.onrender.com/app/profile/get", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (data) {
          setUserEmail(data.email || "");
          setProfileData(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err);
      }
    };
    fetchProfile();
  }, []);

  // Fetch Platforms
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const res = await fetch("https://codify-pia9.onrender.com/app/platform", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (data) {
          const formattedData = {};
          platforms.forEach(p => {
            formattedData[p.key] = { ...data[p.key], isEditing: false };
          });
          setPlatformData(formattedData);
        }
      } catch (err) {
        console.error("Platform Fetch Error:", err);
      }
    };
    fetchPlatforms();
  }, []);

  const handleProfileSave = async () => {
    try {
      const res = await fetch("https://codify-pia9.onrender.com/app/profile/save", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", // Changed to JSON for easier handling
            Authorization: `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify(profileData),
      });
      if (res.ok) {
        setIsEditMode(false);
        setPopup({ type: "success", message: "Profile saved ✅" });
      }
    } catch (err) {
      setPopup({ type: "error", message: "Failed to save profile" });
    }
  };

  const handlePlatformSave = async (platformKey) => {
    const res = await fetch("https://codify-pia9.onrender.com/app/platform/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ [platformKey]: platformData[platformKey] }),
    });

    if (res.ok) {
      setPlatformData(prev => ({
        ...prev,
        [platformKey]: { ...prev[platformKey], isEditing: false },
      }));
      setPopup({ type: "success", message: `${platformKey} saved ✅` });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      {popup && <Popup {...popup} onClose={() => setPopup(null)} />}

      {/* PROFILE SECTION */}
      <section className="px-6 py-10">
        <div className="container mx-auto max-w-4xl glass p-6 rounded-xl border border-white/20">
          <h2 className="text-2xl font-bold mb-4">My Profile</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input value={profileData.name} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p,name:e.target.value}))}/>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Email (Static)</label>
                <Input value={userEmail} disabled />
            </div>
            <Input placeholder="College" value={profileData.college} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p,college:e.target.value}))}/>
            <Input placeholder="Course" value={profileData.course} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p,course:e.target.value}))}/>
            <Input placeholder="Branch" value={profileData.branch} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p,branch:e.target.value}))}/>
            <Input placeholder="Year" value={profileData.year} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p,year:e.target.value}))}/>
          </div>
          <Textarea className="mt-4" placeholder="Bio/Description" value={profileData.description} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p,description:e.target.value}))}/>
          
          <div className="mt-4">
            {isEditMode ? (
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleProfileSave}>Save Profile</Button>
            ) : (
              <Button variant="outline" onClick={() => setIsEditMode(true)}>Edit Profile</Button>
            )}
          </div>
        </div>
      </section>

      {/* PLATFORMS SECTION */}
      <section className="px-6 mb-20">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((p) => {
            const d = platformData[p.key] || {};
            return (
              <div key={p.key} className="glass p-5 rounded-xl border border-white/10 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">{p.name}</h3>
                  {p.fields.map((field) => (
                    <div key={field} className="mb-3">
                      <label className="text-[10px] uppercase opacity-60 ml-1">{field}</label>
                      <Input
                        placeholder={`Enter ${field}`}
                        value={d[field] || ""}
                        disabled={!d.isEditing}
                        onChange={(e)=>setPlatformData(prev=>({
                          ...prev,
                          [p.key]:{...prev[p.key],[field]:e.target.value}
                        }))}
                        className="bg-white/5"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                    {d.isEditing ? (
                    <Button className="w-full" onClick={()=>handlePlatformSave(p.key)}>Save {p.name}</Button>
                    ) : (
                    <Button variant="outline" className="w-full" onClick={()=>setPlatformData(prev=>({...prev,[p.key]:{...prev[p.key],isEditing:true}}))}>
                        Edit Data
                    </Button>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 mb-20 text-center">
        <Button onClick={() => navigate("/platform")} className="bg-gradient-to-r from-[#CD1C18] to-[#9B1313] h-14 px-8 text-lg rounded-full">
          Go to Platform <ArrowRight className="ml-2" />
        </Button>
      </section>
      <DashboardFooter />
    </div>
  );
}