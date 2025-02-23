const express = require("express");
const IPDPatient = require("../models/IPDPatient");
const router = express.Router();

// Route to register a new IPD patient
router.post("/", async (req, res) => {  
  try {
    console.log("Received data:", req.body); 

    const newPatient = new IPDPatient(req.body);
    await newPatient.save();

    console.log("Patient saved successfully!");
    res.status(201).json({ message: "IPD patient registered successfully" });
  } catch (error) {
    console.error("Error saving patient:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get all IPD patients
router.get("/", async (req, res) => {  
  try {
    const ipdPatients = await IPDPatient.find();
    res.json(ipdPatients);
  } catch (error) {
    console.error("Error fetching IPD patients:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
