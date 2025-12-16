import { useState, useEffect, useRef } from "react";
import Popup from "@/components/ui/Popup";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "../../styles/dashboardPage.css";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import { DashboardFooter } from "@/components/DashboardFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Loader2, Code2 } from "lucide-react";

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
];

// Map friendly platform names used in the UI to backend keys
const platformKeyMap = {
  LeetCode: "leetcode",
  CodeChef: "codechef",
  Codeforces: "codeforces",
  HackerRank: "hackerrank",
  GeeksforGeeks: "gfg",
  GitHub: "github",
};

export default function DashboardPage() {
  const [profileImage, setProfileImage] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [editingStates, setEditingStates] = useState({});

  const [isVisible, setIsVisible] = useState({});
  const [verifyingStates, setVerifyingStates] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [verifiedStates, setVerifiedStates] = useState({});
 const [profileData, setProfileData] = useState({
  fullName: "",
  college: "",
  course: "",
  branch: "",
  year: "",
  contact: "",
  description: "",

  // 🔹 SOCIAL LINKS
  linkedinUrl: "",
  facebookUrl: "",
  instagramUrl: "",
});


  const [popup, setPopup] = useState(null);
  const [platformUsernames, setPlatformUsernames] = useState({});
  const [monkeyPosition, setMonkeyPosition] = useState({
    side: "left",
    section: 0,
  });
  const [isJumping, setIsJumping] = useState(false);

  const inputRefs = useRef({});
  // const sectionsRef = useRef([]) // Not used currently

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = ["profile-section", "platforms-section", "cta-section"];
    let currentSectionIndex = 0;

    const handleScroll = () => {
      sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const isInView =
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2;

          if (isInView && currentSectionIndex !== index) {
            currentSectionIndex = index;
            setIsJumping(true);

            setTimeout(() => {
              setMonkeyPosition({
                side: index % 2 === 0 ? "right" : "left",
                section: index,
              });
              setIsJumping(false);
            }, 500);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://codify-pia9.onrender.com/app/profile/get", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        // 🔹 email
        setUserEmail(data.email || "");

        // 🔹 text data
       setProfileData({
  fullName: data.name || "",
  college: data.college || "",
  course: data.course || "",
  branch: data.branch || "",
  year: data.year || "",
  contact: data.contact || "",
  description: data.description || "",

  // 🔹 SOCIAL LINKS
  linkedinUrl: data.linkedinUrl || "",
  facebookUrl: data.facebookUrl || "",
  instagramUrl: data.instagramUrl || "",
});


        // 🔥 MOST IMPORTANT: image reload
        if (data.photo) {
          setProfileImage(`https://codify-pia9.onrender.com${data.photo}`);
        }
      } catch (err) {
        console.error("Profile fetch error", err);
      }
    };

    fetchProfile();
  }, []);

  const getMonkeyStyle = () => {
    const section = document.getElementById(
      ["profile-section", "platforms-section", "cta-section"][
        monkeyPosition.section
      ]
    );
    if (!section) return { left: "20px", top: "200px" };

    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;

    return {
      [monkeyPosition.side]: "20px",
      top: `${sectionTop + 50}px`,
    };
  };

  const handlePlatformClick = (platformName) => {
    const inputRef = inputRefs.current[platformName];
    if (inputRef && !verifiedStates[platformName]) {
      inputRef.focus();
    }
  };

  const handleVerify = async (platformName) => {
    const username = platformUsernames[platformName];
    if (!username) return;

    const platformKey = platformKeyMap[platformName];
    if (!platformKey) {
      setPopup({
        type: "fail",
        message: `${platformName} is not supported ❌`,
      });
      return;
    }

    try {
      setVerifyingStates((prev) => ({ ...prev, [platformName]: true }));

      const res = await fetch("https://codify-pia9.onrender.com/app/platform/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ platform: platformKey, username }),
      });

      const data = await res.json();

      // 🔥 REAL CHECK
      if (!data.valid) {
        setPopup({
          type: "fail",
          message: data.message || "Invalid username ❌",
        });
        return;
      }

      // ✅ VERIFIED

      // ✅ VERIFIED
      setVerifiedStates((prev) => ({
        ...prev,
        [platformName]: true,
      }));

      setEditingStates((prev) => ({
        ...prev,
        [platformName]: false,
      }));

      setPopup({
        type: "success",
        message: `${platformName} username verified ✅`,
      });

      setPopup({
        type: "success",
        message: `${platformName} username verified ✅`,
      });
    } catch (error) {
      console.error("Verification error:", error);
      setPopup({
        type: "fail",
        message: "Server error during verification ❌",
      });
    } finally {
      setVerifyingStates((prev) => ({ ...prev, [platformName]: false }));
    }
  };
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const res = await fetch("https://codify-pia9.onrender.com/app/platform/platdata", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        // 🧠 username fill
        const usernames = {};
        const verified = {};

        if (data.leetcode?.username || typeof data.leetcode === "string") {
          usernames.LeetCode = data.leetcode.username || data.leetcode;
          verified.LeetCode = true;
        }

        if (data.gfg) {
          usernames.GeeksforGeeks = data.gfg;
          verified.GeeksforGeeks = true;
        }

        if (data.codechef) {
          usernames.CodeChef = data.codechef;
          verified.CodeChef = true;
        }

        if (data.codeforces) {
          usernames.Codeforces = data.codeforces;
          verified.Codeforces = true;
        }

        if (data.hackerrank) {
          usernames.HackerRank = data.hackerrank;
          verified.HackerRank = true;
        }

        if (data.github) {
          usernames.GitHub = data.github;
          verified.GitHub = true;
        }

        setPlatformUsernames(usernames);
        setVerifiedStates(verified);
      } catch (err) {
        console.error("Platform fetch error", err);
      }
    };

    fetchPlatforms();
  }, []);

 const handleSave = async (platformName) => {
  console.log("🔥 HANDLE SAVE CALLED:", platformName);
  console.log("🧠 verifiedStates:", verifiedStates);

  if (!verifiedStates[platformName]) {
    console.log("❌ NOT VERIFIED – SAVE BLOCKED");
    setPopup({
      type: "fail",
      message: `Please verify ${platformName} username first ❌`,
    });
    return;
  }

  const username = platformUsernames[platformName];
  const platformKey = platformKeyMap[platformName];

  console.log("📤 SENDING TO BACKEND:", {
    platformKey,
    username,
  });

  try {
    const res = await fetch("https://codify-pia9.onrender.com/app/platform/platlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        [platformKey]: username,
      }),
    });

    const data = await res.json();

    console.log("✅ BACKEND RESPONSE:", data);
  } catch (err) {
    console.error("❌ SAVE ERROR:", err);
  }
};

  const handleProfileSave = async () => {
    try {
      const formData = new FormData();

      if (profilePhotoFile) {
        formData.append("photo", profilePhotoFile);
      }

      formData.append("college", profileData.college);
formData.append("course", profileData.course);
formData.append("branch", profileData.branch);
formData.append("year", profileData.year);
formData.append("contact", profileData.contact);
formData.append("description", profileData.description);

// 🔹 SOCIAL
formData.append("linkedinUrl", profileData.linkedinUrl);
formData.append("facebookUrl", profileData.facebookUrl);
formData.append("instagramUrl", profileData.instagramUrl);


      const res = await fetch("https://codify-pia9.onrender.com/app/profile/save", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setPopup({ type: "fail", message: data.message || "Save failed ❌" });
        return;
      }

      setPopup({ type: "success", message: "Profile saved successfully ✅" });
      setIsEditMode(false); // ✅ yahin hona chahiye
      setProfilePhotoFile(null);

      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setPopup({ type: "fail", message: "Server error ❌" });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfilePhotoFile(file); // 👈 upload ke liye

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result); // 👈 preview ke liye
    };
    reader.readAsDataURL(file);
  };
  const navigate = useNavigate();

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

      <div
        className={`monkey-mascot ${isJumping ? "jumping" : ""}`}
        style={getMonkeyStyle()}
        onClick={() => {
          setIsJumping(true);
          setTimeout(() => setIsJumping(false), 1000);
        }}
      >
        🐵
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h1
            id="hero-title"
            data-animate
            className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-700 ${
              isVisible["hero-title"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Welcome to Your <span className="gradient-text">Dashboard</span>
          </h1>
          <p
            id="hero-subtitle"
            data-animate
            className={`text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-150 ${
              isVisible["hero-subtitle"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Complete your profile and connect your coding platforms to unlock
            the full Codify experience
          </p>
        </div>
      </section>

      {/* Profile Creation Section */}
      <section id="profile-section" data-animate className="px-6 mb-20">
        <div
          className={`container mx-auto max-w-4xl transition-all duration-700 ${
            isVisible["profile-section"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="animated-border glass rounded-3xl p-8 md:p-12 border border-[#CD1C18]/40 profile-shadow-effect grid-background relative overflow-hidden shadow-lg hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#CD1C18]/10 via-transparent to-[#9B1313]/10 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 gradient-text">
                Create Your Profile
              </h2>

              <div className="space-y-6">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      disabled={!isEditMode}
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <label
                      htmlFor="profile-image"
                      className="cursor-pointer block w-32 h-32 rounded-full border-3 border-dashed border-[#CD1C18]/50 hover:border-[#CD1C18] transition-all duration-300 overflow-hidden image-upload-preview bg-background/50"
                    >
                      {profileImage ? (
                        <img
                          src={profileImage || "/placeholder.svg"}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                          <svg
                            className="w-10 h-10 text-[#CD1C18] mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <span className="text-xs text-muted-foreground">
                            Upload Photo
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      placeholder=" "
                      value={profileData.fullName}
                      disabled={!isEditMode}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                      className="peer bg-background/50 border-[#CD1C18]/30 focus:border-[#CD1C18] h-12 pt-6"
                    />

                    <label className="absolute left-3 top-2 text-xs text-muted-foreground peer-focus:text-[#CD1C18] transition-colors">
                      Full Name
                    </label>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder=" "
                      value={userEmail}
                      disabled
                      className="peer bg-background/30 border-[#CD1C18]/20 h-12 pt-6 cursor-not-allowed text-muted-foreground"
                    />
                    <label className="absolute left-3 top-2 text-xs text-muted-foreground transition-colors">
                      Email (from account)
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      placeholder=" "
                      value={profileData.college}
                      disabled={!isEditMode}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          college: e.target.value,
                        }))
                      }
                      className="peer bg-background/50 border-[#CD1C18]/30 focus:border-[#CD1C18] h-12 pt-6"
                    />

                    <label className="absolute left-3 top-2 text-xs text-muted-foreground peer-focus:text-[#CD1C18] transition-colors">
                      College Name
                    </label>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder=" "
                      value={profileData.course}
                      disabled={!isEditMode}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          course: e.target.value,
                        }))
                      }
                      className="peer bg-background/50 border-[#CD1C18]/30 focus:border-[#CD1C18] h-12 pt-6"
                    />

                    <label className="absolute left-3 top-2 text-xs text-muted-foreground peer-focus:text-[#CD1C18] transition-colors">
                      Course (e.g., B.Tech, MCA)
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      placeholder=" "
                      value={profileData.branch}
                      disabled={!isEditMode}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          branch: e.target.value,
                        }))
                      }
                      className="peer bg-background/50 border-[#CD1C18]/30 focus:border-[#CD1C18] h-12 pt-6"
                    />

                    <label className="absolute left-3 top-2 text-xs text-muted-foreground peer-focus:text-[#CD1C18] transition-colors">
                      Branch (e.g., CSE, ECE)
                    </label>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder=" "
                      value={profileData.year}
                      disabled={!isEditMode}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          year: e.target.value,
                        }))
                      }
                      className="peer bg-background/50 border-[#CD1C18]/30 focus:border-[#CD1C18] h-12 pt-6"
                    />

                    <label className="absolute left-3 top-2 text-xs text-muted-foreground peer-focus:text-[#CD1C18] transition-colors">
                      Academic Year
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Input
                      type="tel"
                      placeholder=" "
                      value={profileData.contact}
                      disabled={!isEditMode}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          contact: e.target.value,
                        }))
                      }
                      className="peer bg-background/50 border-[#CD1C18]/30 focus:border-[#CD1C18] h-12 pt-6"
                    />

                    <label className="absolute left-3 top-2 text-xs text-muted-foreground peer-focus:text-[#CD1C18] transition-colors">
                      Contact Number
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <Textarea
                    placeholder=" "
                    value={profileData.description}
                    disabled={!isEditMode}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="peer bg-background/50 border-[#CD1C18]/30 focus:border-[#CD1C18] min-h-[100px] pt-6 resize-none"
                  />

                  <label className="absolute left-3 top-2 text-xs text-muted-foreground peer-focus:text-[#CD1C18] transition-colors">
                    Short Description
                  </label>
                </div>
                <div className="relative">
  <Input
    placeholder=" "
    value={profileData.linkedinUrl}
    disabled={!isEditMode}
    onChange={(e) =>
      setProfileData((prev) => ({
        ...prev,
        linkedinUrl: e.target.value,
      }))
    }
    className="peer bg-background/50 border-[#CD1C18]/30 focus:border-[#CD1C18] h-12 pt-6"
  />

  <label className="absolute left-3 top-2 text-xs text-muted-foreground peer-focus:text-[#CD1C18] transition-colors">
    LinkedIn Profile URL
  </label>
</div>
<div className="relative">
  <Input
    placeholder=" "
    value={profileData.facebookUrl}
    disabled={!isEditMode}
    onChange={(e) =>
      setProfileData((prev) => ({
        ...prev,
        facebookUrl: e.target.value,
      }))
    }
    className="peer bg-background/50 border-[#CD1C18]/30 focus:border-[#CD1C18] h-12 pt-6"
  />

  <label className="absolute left-3 top-2 text-xs text-muted-foreground peer-focus:text-[#CD1C18] transition-colors">
    Facebook Profile URL
  </label>
</div>
<div className="relative">
  <Input
    placeholder=" "
    value={profileData.instagramUrl}
    disabled={!isEditMode}
    onChange={(e) =>
      setProfileData((prev) => ({
        ...prev,
        instagramUrl: e.target.value,
      }))
    }
    className="peer bg-background/50 border-[#CD1C18]/30 focus:border-[#CD1C18] h-12 pt-6"
  />

  <label className="absolute left-3 top-2 text-xs text-muted-foreground peer-focus:text-[#CD1C18] transition-colors">
    Instagram Profile URL
  </label>
</div>


                <Button
                  onClick={handleProfileSave}
                  className="w-full bg-gradient-to-r from-[#CD1C18] to-[#9B1313] text-white hover:shadow-[0_0_40px_rgba(205,28,24,0.6)] transition-all duration-300 h-12 text-lg font-semibold mt-6"
                >
                  Save Profile
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditMode(true)}
                  className="mb-4"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform IDs Section */}
      <section id="platforms-section" data-animate className="px-6 mb-20">
        <div
          className={`container mx-auto max-w-6xl transition-all duration-700 delay-200 ${
            isVisible["platforms-section"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Connect Your Coding Platforms
            </h2>
            <p className="text-muted-foreground text-lg">
              Link your accounts to track your progress across all platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                id={`platform-${index}`}
                data-animate
                onClick={() => handlePlatformClick(platform.name)}
                className={`card-3d glass rounded-2xl p-6 border border-[#CD1C18]/30 ${
                  platform.bgColor
                } hover:border-[#CD1C18]/60 hover:shadow-[0_0_40px_rgba(205,28,24,0.4)] transition-all duration-500 cursor-pointer ${
                  isVisible[`platform-${index}`] ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center text-3xl shadow-lg`}
                  >
                    {platform.logo}
                  </div>
                  <h3 className="text-xl font-bold">{platform.name}</h3>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      ref={(el) => (inputRefs.current[platform.name] = el)}
                      placeholder="Enter username"
                      value={platformUsernames[platform.name] || ""}
                      onChange={(e) =>
                        setPlatformUsernames((prev) => ({
                          ...prev,
                          [platform.name]: e.target.value,
                        }))
                      }
                    disabled={false}   
                      className="bg-background/50 border-[#CD1C18]/30 focus:border-[#CD1C18] h-11"
                      onClick={(e) => e.stopPropagation()}
                    />
                    {verifiedStates[platform.name] && (
                      <Check className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button" // ✅ YAHIN ADD
                      onClick={(e) => {
                        e.stopPropagation(); // ✅ YAHIN ADD
                        handleVerify(platform.name);
                      }}
                      disabled={
                        !platformUsernames[platform.name] ||
                        verifyingStates[platform.name] ||
                        verifiedStates[platform.name]
                      }
                      className="flex-1 bg-gradient-to-r from-[#CD1C18] to-[#9B1313] text-white h-10"
                    >
                      Verify
                    </Button>
                 <Button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    console.log("🔥 SAVE BUTTON CLICKED");   // 👈 ADD THIS
    handleSave(platform.name);
  }}
  variant="outline"
  className="flex-1 border-[#CD1C18]/50 hover:bg-[#CD1C18]/10 h-10"
>
  Save
</Button>


                    {verifiedStates[platform.name] &&
                      !editingStates[platform.name] && (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full mt-2"
                          onClick={(e) => {
                            e.stopPropagation();

                            setEditingStates((prev) => ({
                              ...prev,
                              [platform.name]: true,
                            }));

                            setVerifiedStates((prev) => ({
                              ...prev,
                              [platform.name]: false,
                            }));
                          }}
                        >
                          Edit
                        </Button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Navigation Button */}
      <section id="cta-section" data-animate className="px-6 mb-20">
        <div
          className={`container mx-auto max-w-4xl transition-all duration-700 delay-300 ${
            isVisible["cta-section"]
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="glass rounded-3xl p-12 border border-[#CD1C18]/30 text-center relative overflow-hidden group hover:shadow-[0_0_60px_rgba(205,28,24,0.4)] transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#CD1C18]/20 via-[#9B1313]/10 to-[#38000A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#CD1C18] to-[#9B1313] flex items-center justify-center animate-pulse-glow">
                <Code2 className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-4xl font-bold mb-4 gradient-text">
                Ready to Code?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Your profile is set up! Head to the platform to start solving
                problems, track your progress, and compete with others.
              </p>

              <Button
                onClick={() => navigate("/platform")}
                className="bg-gradient-to-r from-[#CD1C18] via-[#FFA896] to-[#9B1313] text-white hover:shadow-[0_0_50px_rgba(205,28,24,0.7)] transition-all duration-300 h-14 px-8 text-lg font-semibold group-hover:scale-105"
              >
                Go to Platform
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <DashboardFooter />
    </div>
  );
}
