const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();

/* 🔥 CORS MUST BE FIRST */
app.use(
  cors({
    origin: "https://codify-peach.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* 🔥 OPTIONS preflight fix */
app.options("*", cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* routes */
app.use("/app/user", require("./router/user"));
app.use("/app/platform", require("./router/platform"));
app.use("/app/notes", require("./router/noteRoutes"));
app.use("/app/profile", require("./router/profile"));
app.use("/app/dashboard", require("./router/dashboardRoutes"));

const port = process.env.PORT || 7025;
app.listen(port, () => console.log("Server running on", port));
