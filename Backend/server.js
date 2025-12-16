const express = require("express");
const app = express();
require("dotenv").config();
require("./db");

const cors = require("cors");

const noteRoutes = require("./router/noteRoutes");
const userRoutes = require("./router/user");
const platformRoutes = require("./router/platform");
const profileRoutes = require("./router/profile");
const dashboardRoutes = require("./router/dashboardRoutes");

const port = process.env.PORT || 7025;

app.use(
  cors({
    origin: ["https://codify-peach.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/app/user", userRoutes);
app.use("/app/platform", platformRoutes);
app.use("/app/notes", noteRoutes);
app.use("/app/profile", profileRoutes);
app.use("/app/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
