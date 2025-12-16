const Profile = require("../models/profile");
const User = require("../models/user");

// 🔹 SAVE / UPDATE PROFILE
const saveProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // 🔥 name + email from User
    const user = await User.findById(userId).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 ADD MISSING FIELDS HERE
    const {
      college,
      course,
      branch,
      year,
      contact,
      description,
    } = req.body;

    let profile = await Profile.findOne({ userId });
    if (!profile) {
      profile = new Profile({ userId });
    }

    // 🔥 auto fields
    profile.name = user.name;
    profile.email = user.email;

    // 🔥 manual fields (IMPORTANT FIX)
    profile.college = college ?? profile.college;
    profile.course = course ?? profile.course;
    profile.branch = branch ?? profile.branch;
    profile.year = year ?? profile.year;
    profile.contact = contact ?? profile.contact; // ✅ THIS WAS MISSING
    profile.description = description ?? profile.description;

    // 🔥 photo (multer)
    if (req.file) {
      profile.photo = `/uploads/profile/${req.file.filename}`;
    }

    await profile.save();

    res.json({
      message: "Profile saved successfully",
      profile,
    });
  } catch (err) {
    console.error("Save profile error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔹 GET PROFILE
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { saveProfile, getProfile };
