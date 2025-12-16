const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER 👉", authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // MUST start with "Bearer "
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN 👉", token);
    console.log("PRIVATE_KEY 👉", process.env.PRIVATE_KEY);

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    console.log("DECODED 👉", decoded);

    req.user = decoded; // { userId, iat, exp }
    next();

  } catch (err) {
    console.error("JWT VERIFY ERROR 👉", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
