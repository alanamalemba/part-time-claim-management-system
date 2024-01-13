const express = require("express");
const db = require("./models");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const createAccountRouter = require("./routes/CreateAccount");

// Routers
app.use("/create-account", createAccountRouter);
//...

db.sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("--- Server running at port 8000 ---");
  });
});
