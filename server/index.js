const express = require("express");
const db = require("./models");
const cors = require("cors");
const path = require("path");

const authRoute = require("./routes/auth.route");
const unitsRoute = require("./routes/units.route");
const usersRoute = require("./routes/users.route");
const claimsRoute = require("./routes/claims.route");

const app = express();

app.use(express.json());
app.use(cors());

// Routers
app.use("/auth", authRoute);
app.use("/units", unitsRoute);
app.use("/users", usersRoute);
app.use("/claims", claimsRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//...

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("--- Server running at port 8000 ---");
  });
});
