const express = require("express");
const app = express();

require("dotenv").config();
require("./db");

const cors = require("cors");

const port = process.env.PORT || 7025;

const userroute = require("./router/user");
const platformroute = require("./router/platform");
const profileroute = require("./router/profile");
const dashboard = require("./router/dashboardRoutes");



app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/app/user", userroute);
app.use("/app/platform", platformroute);


app.use("/app/profile", profileroute);
app.use("/app/dashboard", dashboard);

console.log("GITHUB TOKEN:", process.env.GITHUB_TOKEN);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
