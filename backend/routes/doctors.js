const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Department = require("../models/DepartmentsModel");

// 📌 Create a new doctor
router.post("/", async (req, res) => {
  try {
    const { name, specialization, department_id, availableTimes } = req.body;

    // Validate department_id
    const departmentExists = await Department.findById(department_id);
    if (!departmentExists) {
      return res.status(400).json({ error: "Invalid department ID!" });
    }

    const doctor = new Doctor({
      name,
      specialization,
      department_id,
      availableTimes,
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("department_id", "name");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get doctors by department ID
router.get("/by-department/:departmentId", async (req, res) => {
  try {
    const { departmentId } = req.params;

    // Check if the department exists
    const departmentExists = await Department.findById(departmentId);
    if (!departmentExists) {
      return res.status(404).json({ error: "Department not found!" });
    }

    const doctors = await Doctor.find({ department_id: departmentId });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Update a doctor's details
router.put("/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { name, specialization, department_id, availableTimes } = req.body;

    // Validate department_id if provided
    if (department_id) {
      const departmentExists = await Department.findById(department_id);
      if (!departmentExists) {
        return res.status(400).json({ error: "Invalid department ID!" });
      }
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { name, specialization, department_id, availableTimes },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found!" });
    }

    res.json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Delete a doctor
router.delete("/:doctorId", async (req, res) => {
  try {
    const { doctorId } = req.params;

    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor not found!" });
    }

    res.json({ message: "Doctor deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
