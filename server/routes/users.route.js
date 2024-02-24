const express = require("express");
const { users } = require("../models");

const router = express.Router();

//get all users who are lecturers
router.get("/lecturers", async (req, res) => {
  try {
    const lecturers = await users.findAll({
      where: {
        role: "Lecturer",
      },
    });

    res.json({ success: { data: lecturers } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
