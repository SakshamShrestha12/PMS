const express = require("express");
const OPDPatient = require("../models/OPDPatient");
const router = express.Router();

// Route to register a new OPD patient
router.post("/", async (req, res) => {  
  try {
    console.log("Received data:", req.body); 

    const newPatient = new OPDPatient(req.body);
    await newPatient.save();

    console.log("Patient saved successfully!");
    res.status(201).json({ message: "OPD patient registered successfully" });
  } catch (error) {
    console.error("Error saving patient:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get all OPD patients
router.get("/", async (req, res) => {  
  try {
    const opdPatients = await OPDPatient.find();
    res.json(opdPatients);
  } catch (error) {
    console.error("Error fetching OPD patients:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
