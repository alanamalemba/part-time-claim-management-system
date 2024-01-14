const express = require("express");
const { claims } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const claim = req.body;
    await claims.create(claim);
    res.json("Claim Submitted Successfully!");
  } catch (error) {
    console.error(error.message);
    res.json("Internal Server Error");
  }
});

module.exports = router;
