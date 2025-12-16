const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();

/* =======================
   🔥 CORS CONFIG (FINAL)
   ======================= */
const allowedOrigins = [
  "http://localhost:5173",            // local frontend
  "https://codify-peach.vercel.app",   // production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔥 Preflight (OPTIONS) fix
app.options("*", cors());

/* =======================
   MIDDLEWARES
   ======================= */
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* =======================
   ROUTES
   ======================= */
app.use("/app/user", require("./router/user"));
app.use("/app/platform", require("./router/platform"));
app.use("/app/notes", require("./router/noteRoutes"));
app.use("/app/profile", require("./router/profile"));
app.use("/app/dashboard", require("./router/dashboardRoutes"));

/* =======================
   SERVER START
   ======================= */
const port = process.env.PORT || 7025;
app.listen(port, () => {
  console.log("🚀 Server running on port", port);
});
