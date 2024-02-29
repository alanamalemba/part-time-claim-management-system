const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();

const { claims } = require("../models");

// get all claims in this chairperson's department which are pending
router.get("/department/:dn", async (req, res) => {
  try {
    const dn = req.params.dn;
    console.log(dn);
    const claimsList = await claims.findAll({
      where: { department: dn, department_status: "pending" },
    });

    res.json({ success: { data: claimsList } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

//update claim status
router.patch("/update-status", async (req, res) => {
  try {
    const request = req.body;
    if (request.stage === "department") {
      await claims.update(
        { department_status: request.status },
        { where: { id: request.cid } }
      );
      res.json({ success: { message: "Claim status updated successfully!" } });
    } else {
    }
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

// submit/create a claim
router.post("/", async (req, res) => {
  try {
    const claim = req.body;
    await claims.create(claim);
    res.json({ success: { message: "Claim submitted successfully!" } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

// upload file and return the url
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    res.json({ success: { data: filePath } });
  } catch (error) {
    console.log(error.message);
    res.json({ error: { message: "Internal Server Error" } });
  }
});

module.exports = router;
