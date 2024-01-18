const express = require("express");
const { claims } = require("../models");
const Sequelize = require("sequelize");

const router = express.Router();

router.get("/", async (req, res) => {
  const listOfClaims = await claims.findAll();
  res.json(listOfClaims);
});

router.get("/pending", async (req, res) => {
  const listOfClaims = await claims.findAll({ where: { status: "pending" } });
  res.json(listOfClaims);
});

router.get("/reviewed", async (req, res) => {
  const listOfClaims = await claims.findAll({
    where: {
      status: {
        [Sequelize.Op.not]: "pending",
      },
    },
  });
  res.json(listOfClaims);
});

router.patch("/:id", async (req, res) => {
  try {
    await claims.update(
      { status: req.body.status },
      { where: { id: req.params.id } }
    );
    res.json("Status updated successfully");
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

module.exports = router;
