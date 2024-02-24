const express = require("express");
const { units, assigned_units } = require("../models");

const router = express.Router();

//create a unit
router.post("/", async (req, res) => {
  try {
    const unit = req.body;
    const result = await units.create(unit);

    res.json({
      success: { message: `Successfully created unit: ${result.unit_code}` },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

//get all units that are not assigned
router.get("/not-assigned", async (req, res) => {
  try {
    const unitsList = await units.findAll({ where: { assigned: false } });

    res.json({
      success: { data: unitsList },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

//assign unit
router.post("/assign", async (req, res) => {
  try {
    const unitInfo = req.body;
    await assigned_units.create(unitInfo);
    await units.update(
      { assigned: true },
      {
        where: {
          id: unitInfo.unit_id,
        },
      }
    );

    res.json({
      success: { message: "Unit Assigned successfully!" },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ error: { message: "Internal Server Error!" } });
  }
});

module.exports = router;
