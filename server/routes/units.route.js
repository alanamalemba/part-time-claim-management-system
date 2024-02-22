const express = require("express");
const router = express.Router();
const { units } = require("../models");

router.post("/", async (req, res) => {
  try {
    const unit = req.body;
    await units.create(unit);
    res.json("Unit Created Successfully!");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
