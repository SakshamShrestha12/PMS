const express = require("express");
const OPDPatient = require("../models/OPDPatient");
const router = express.Router();

router.post("/", async (req, res) => {  // <-- Just use "/"
  try {
    console.log("Received data:", req.body);  // Debug log

    const newPatient = new OPDPatient(req.body);
    await newPatient.save();

    console.log("Patient saved successfully!");
    res.status(201).json({ message: "OPD patient registered successfully" });
  } catch (error) {
    console.error("Error saving patient:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
