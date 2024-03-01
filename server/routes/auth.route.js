const express = require("express");
const { users, accounts } = require("../models");
const bcrypt = require("bcrypt");

const router = express.Router();

// Create a user Account if it does not exist
router.post("/create-account", async (req, res) => {
  try {
    const user = req.body;

    const userExists = await users.findOne({ where: { email: user.email } });

    if (userExists) {
      res.json({
        error: {
          message: `User by email '${userExists.email}' already exists!'`,
        },
      });
      return;
    }

    const hash = await bcrypt.hash(user.password, 10);

    user.password = hash;

    console.log(user.password);

    const result = await users.create(user);
    await accounts.create({ user_id: result.id });

    res.json({
      success: { message: `Account for ${result.name} Created successfully!` },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal server error!" } });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = req.body;

    const userExists = await users.findOne({ where: { email: user.email } });

    if (!userExists) {
      res.json({
        error: {
          message: `User by email '${user.email}' does not exists!'`,
        },
      });
      return;
    }

    const passwordsMatch = await bcrypt.compare(
      user.password,
      userExists.password
    );

    if (!passwordsMatch) {
      res.json({ error: { message: "Wrong username or password" } });
      return;
    }

    res.json({
      success: {
        message: `Logged in successfully as ${userExists.email}`,
        data: userExists,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal server error!" } });
  }
});

module.exports = router;
