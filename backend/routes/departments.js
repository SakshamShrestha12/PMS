const express = require("express");
const router = express.Router();
const Department = require("../models/DepartmentsModel");
const Doctor = require("../models/Doctor");

// 📌 Create a new department
router.post("/", async (req, res) => {
  try {
    const existingDepartment = await Department.findOne({ name: req.body.name });
    if (existingDepartment) {
      return res.status(400).json({ error: "Department already exists!" });
    }

    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Create a new doctor under a department
router.post("/doctors", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 📌 Get all doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("department_id", "name");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get all departments with their doctors
router.get("/with-doctors", async (req, res) => {  // ✅ FIXED
  try {
    const departments = await Department.aggregate([
      {
        $lookup: {
          from: "doctors",
          localField: "_id",
          foreignField: "department_id",
          as: "doctors",
        },
      },
    ]);
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get doctors by department
router.get("/doctors/by-department/:departmentId", async (req, res) => {  // ✅ FIXED
  try {
    const { departmentId } = req.params;
    const doctors = await Doctor.find({ department_id: departmentId });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
