const express = require("express");
const { claims } = require("../models");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    res.json(req.file.filename);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

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
