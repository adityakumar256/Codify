const Platform = require("../models/platform")

/* SAVE / UPDATE */
exports.savePlatform = async (req, res) => {
  try {
    const userId = req.user.userId
    const data = req.body

    const platform = await Platform.findOneAndUpdate(
      { userId },
      { $set: data },
      { new: true, upsert: true }
    )

    res.json({ success: true, platform })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

/* FETCH FOR DASHBOARD */
exports.getPlatform = async (req, res) => {
  try {
    const userId = req.user.userId
    const platform = await Platform.findOne({ userId })

    res.json(platform || {})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
