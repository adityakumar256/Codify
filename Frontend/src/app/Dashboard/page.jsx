import { useState, useEffect, useRef } from "react";
import Popup from "@/components/ui/Popup";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Code2 } from "lucide-react";
import "../../styles/dashboardPage.css";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import { DashboardFooter } from "@/components/DashboardFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const platforms = [
  { name: "LeetCode", logo: "🟡", gradient: "from-[#FFA896] via-[#CD1C18] to-[#FFA116]", bgColor: "bg-gradient-to-br from-[#FFA116]/20 via-[#CD1C18]/20 to-[#38000A]" },
  { name: "CodeChef", logo: "👨‍🍳", gradient: "from-[#CD1C18] via-[#9B1313] to-[#5B4638]", bgColor: "bg-gradient-to-br from-[#5B4638]/20 via-[#CD1C18]/20 to-[#38000A]" },
  { name: "Codeforces", logo: "🔵", gradient: "from-[#CD1C18] via-[#1E88E5] to-[#9B1313]", bgColor: "bg-gradient-to-br from-[#1E88E5]/20 via-[#CD1C18]/20 to-[#38000A]" },
  { name: "HackerRank", logo: "💚", gradient: "from-[#FFA896] via-[#CD1C18] to-[#00EA64]", bgColor: "bg-gradient-to-br from-[#00EA64]/20 via-[#CD1C18]/20 to-[#38000A]" },
  { name: "GeeksforGeeks", logo: "🟢", gradient: "from-[#CD1C18] via-[#2F8D46] to-[#9B1313]", bgColor: "bg-gradient-to-br from-[#2F8D46]/20 via-[#CD1C18]/20 to-[#38000A]" },
  { name: "GitHub", logo: "🐙", gradient: "from-[#FFA896] via-[#CD1C18] to-[#6e5494]", bgColor: "bg-gradient-to-br from-[#6e5494]/20 via-[#CD1C18]/20 to-[#38000A]" },
];

const platformKeyMap = {
  LeetCode: "leetcode", CodeChef: "codechef", Codeforces: "codeforces", HackerRank: "hackerrank", GeeksforGeeks: "gfg", GitHub: "github",
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const inputRefs = useRef({});
  
  // States
  const [profileImage, setProfileImage] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [popup, setPopup] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [verifyingStates, setVerifyingStates] = useState({});
  const [verifiedStates, setVerifiedStates] = useState({});
  const [platformUsernames, setPlatformUsernames] = useState({});
  const [editingStates, setEditingStates] = useState({});

  const [profileData, setProfileData] = useState({
    fullName: "", college: "", course: "", branch: "", year: "", contact: "", description: "",
    linkedinUrl: "", facebookUrl: "", instagramUrl: "",
  });

  // Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        // Fetch Profile
        const profRes = await fetch("https://codify-pia9.onrender.com/app/profile/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profData = await profRes.json();
        setUserEmail(profData.email || "");
        setProfileData({
          fullName: profData.name || "",
          college: profData.college || "",
          course: profData.course || "",
          branch: profData.branch || "",
          year: profData.year || "",
          contact: profData.contact || "",
          description: profData.description || "",
          linkedinUrl: profData.linkedinUrl || "",
          facebookUrl: profData.facebookUrl || "",
          instagramUrl: profData.instagramUrl || "",
        });

        if (profData.photo) {
           // Base URL check taaki duplicate na ho
           const imageUrl = profData.photo.startsWith('http') ? profData.photo : `https://codify-pia9.onrender.com${profData.photo}`;
           setProfileImage(imageUrl);
        }

        // Fetch Platform Data
        const platRes = await fetch("https://codify-pia9.onrender.com/app/platform/platdata", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pData = await platRes.json();
        const usernames = {};
        const verified = {};

        Object.keys(platformKeyMap).forEach(uiKey => {
          const backKey = platformKeyMap[uiKey];
          const val = pData[backKey];
          if (val) {
            usernames[uiKey] = typeof val === "object" ? val.username : val;
            verified[uiKey] = true;
          }
        });
        setPlatformUsernames(usernames);
        setVerifiedStates(verified);

      } catch (err) { console.error("Fetch Error:", err); }
    };
    fetchData();
  }, []);

  // Handlers
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfilePhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async () => {
    try {
      const formData = new FormData();
      if (profilePhotoFile) formData.append("photo", profilePhotoFile);
      formData.append("name", profileData.fullName); // Key should match backend "name"
      Object.entries(profileData).forEach(([k, v]) => {
        if(k !== "fullName") formData.append(k, v);
      });

      const res = await fetch("https://codify-pia9.onrender.com/app/profile/save", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });

      if (res.ok) {
        setPopup({ type: "success", message: "Profile saved ✅" });
        setIsEditMode(false);
      }
    } catch (err) { setPopup({ type: "fail", message: "Server error ❌" }); }
  };

  const handleVerify = async (platformName) => {
    const username = platformUsernames[platformName];
    const platformKey = platformKeyMap[platformName];
    setVerifyingStates(p => ({ ...p, [platformName]: true }));
    try {
      const res = await fetch("https://codify-pia9.onrender.com/app/platform/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ platform: platformKey, username }),
      });
      const data = await res.json();
      if (data.valid) {
        setVerifiedStates(p => ({ ...p, [platformName]: true }));
        setPopup({ type: "success", message: "Verified ✅" });
      } else {
        setPopup({ type: "fail", message: data.message || "Invalid Username" });
      }
    } finally { setVerifyingStates(p => ({ ...p, [platformName]: false })); }
  };

  const handleSavePlatform = async (platformName) => {
    if (!verifiedStates[platformName]) {
        setPopup({ type: "fail", message: "Please verify first!" });
        return;
    }
    const platformKey = platformKeyMap[platformName];
    try {
        await fetch("https://codify-pia9.onrender.com/app/platform/platlogin", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ [platformKey]: platformUsernames[platformName] }),
        });
        setPopup({ type: "success", message: "Saved Successfully ✅" });
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      {popup && <Popup {...popup} onClose={() => setPopup(null)} />}

      {/* Profile Section - YOUR DESIGN */}
      <section id="profile-section" data-animate className="pt-32 px-6 mb-20">
        <div className={`container mx-auto max-w-4xl transition-all duration-700 ${isVisible["profile-section"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="animated-border glass rounded-3xl p-8 md:p-12 border border-[#CD1C18]/40 profile-shadow-effect relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-[#CD1C18]/10 via-transparent to-[#9B1313]/10 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold gradient-text">My Profile</h2>
                {!isEditMode && <Button variant="outline" onClick={() => setIsEditMode(true)}>Edit Profile</Button>}
              </div>

              <div className="flex justify-center mb-8">
                <div className="relative">
                  <input type="file" id="profile-image" accept="image/*" disabled={!isEditMode} onChange={handleImageUpload} className="hidden" />
                  <label htmlFor="profile-image" className="cursor-pointer block w-32 h-32 rounded-full border-2 border-[#CD1C18] overflow-hidden bg-background/50">
                    {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full">Upload</div>}
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input placeholder="Full Name" value={profileData.fullName} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p, fullName: e.target.value}))} className="bg-white/5 border-[#CD1C18]/30 h-12" />
                <Input placeholder="Email" value={userEmail} disabled className="bg-white/5 opacity-50 h-12" />
                <Input placeholder="College" value={profileData.college} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p, college: e.target.value}))} className="bg-white/5 border-[#CD1C18]/30 h-12" />
                <Input placeholder="Course" value={profileData.course} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p, course: e.target.value}))} className="bg-white/5 border-[#CD1C18]/30 h-12" />
                <Input placeholder="Branch" value={profileData.branch} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p, branch: e.target.value}))} className="bg-white/5 border-[#CD1C18]/30 h-12" />
                <Input placeholder="Year" value={profileData.year} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p, year: e.target.value}))} className="bg-white/5 border-[#CD1C18]/30 h-12" />
              </div>
              
              <Textarea placeholder="Description" value={profileData.description} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p, description: e.target.value}))} className="mt-6 bg-white/5 border-[#CD1C18]/30" />
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <Input placeholder="LinkedIn URL" value={profileData.linkedinUrl} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p, linkedinUrl: e.target.value}))} className="bg-white/5 border-[#CD1C18]/30" />
                <Input placeholder="Facebook URL" value={profileData.facebookUrl} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p, facebookUrl: e.target.value}))} className="bg-white/5 border-[#CD1C18]/30" />
                <Input placeholder="Instagram URL" value={profileData.instagramUrl} disabled={!isEditMode} onChange={(e)=>setProfileData(p=>({...p, instagramUrl: e.target.value}))} className="bg-white/5 border-[#CD1C18]/30" />
              </div>

              {isEditMode && <Button onClick={handleProfileSave} className="w-full mt-8 bg-red-600">Save All Changes</Button>}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platforms-section" className="px-6 mb-20">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((plat, idx) => (
            <div key={plat.name} className={`glass rounded-2xl p-6 border border-[#CD1C18]/30 ${plat.bgColor} transition-all duration-300`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plat.gradient} flex items-center justify-center text-2xl`}>{plat.logo}</div>
                <h3 className="font-bold">{plat.name}</h3>
              </div>
              
              <div className="relative mb-4">
                <Input 
                  placeholder="Username" 
                  value={platformUsernames[plat.name] || ""} 
                  onChange={(e) => setPlatformUsernames(p => ({...p, [plat.name]: e.target.value}))}
                  className="bg-background/50 border-[#CD1C18]/30 pr-10"
                />
                {verifiedStates[plat.name] && <Check className="absolute right-3 top-3 w-5 h-5 text-green-500" />}
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => handleVerify(plat.name)} 
                  disabled={verifiedStates[plat.name] || verifyingStates[plat.name]}
                  className="flex-1 bg-red-700 h-9 text-xs"
                >
                  {verifyingStates[plat.name] ? "..." : "Verify"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleSavePlatform(plat.name)}
                  className="flex-1 border-red-700 h-9 text-xs"
                >
                  Save
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DashboardFooter />
    </div>
  );
}