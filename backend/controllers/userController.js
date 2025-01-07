const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

// Add Admin or Super Admin
const addAdmin = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Validate input fields
    if (!email || !password || !role) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    // Ensure the role is either "admin" or "super_admin"
    const validRoles = ["admin", "super_admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: `${role === "admin" ? "Admin" : "Super Admin"} added successfully`,
      user: { id: newUser._id, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Login Functions
const loginSuperAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    const user = await User.findOne({ email, role: "super_admin" });
    if (!user) {
      return res.status(404).json({ error: "Super Admin not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }

    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { loginAdmin, loginSuperAdmin, addAdmin };
