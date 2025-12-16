const express = require("express");
const app = express();
const noteRoutes = require("./router/noteRoutes")
require("dotenv").config();
require("./db");

const cors = require("cors");

const port = process.env.PORT || 7025;

const userrote = require("./router/user");
const platformroute = require("./router/platform");
const profileroute = require("./router/profile");
const dashboard = require("./router/dashboardRoutes");



app.use(
  cors({
    origin: [
      "https://codify-peach.vercel.app",
    ],
    credentials: true,
  })
)


app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/app/user", userroute);
app.use("/app/platform", platformroute);


app.use("/app/notes", noteRoutes)


app.use("/app/profile", profileroute);
app.use("/app/dashboard", dashboard);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
