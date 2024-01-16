const express = require("express");
const { claims } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  const listOfClaims = await claims.findAll();
  res.json(listOfClaims);
});

module.exports = router;
