const express = require("express");
const { users } = require("../models");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res) => {
  const { password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await users.create({
    ...req.body,
    password: hash,
  });

  res.json("Successfully created account for: " + req.body.name);
});

module.exports = router;
