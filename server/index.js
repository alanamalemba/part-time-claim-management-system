const express = require("express");
const db = require("./models");
const cors = require("cors");
const createAccountRouter = require("./routes/CreateAccount");
const loginRouter = require("./routes/Login");

const app = express();

app.use(express.json());
app.use(cors());

// Routers
app.use("/create-account", createAccountRouter);
app.use("/login", loginRouter);
//...

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("--- Server running at port 8000 ---");
  });
});
