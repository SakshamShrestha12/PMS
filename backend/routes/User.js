const { User } = require('../models/userModel');
const express = require("express");
const router = express.Router();
const { addAdmin, loginAdmin, loginSuperAdmin } = require("../controllers/userController");
const { authenticate, roleAuthorization } = require("../middleware/authMiddleware"); // Add your middleware

// Add Admin Route (accessible only by super admins)
router.post('/add-admin', authenticate, roleAuthorization(['super_admin']), addAdmin);
// In your routes file
router.get('/get-admins', authenticate, roleAuthorization(['super_admin']), async (req, res) => {
  try {
    console.log("Fetching admins for user:", req.user); // Add this line for debugging
    const admins = await User.find({ role: 'admin' });
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error); // Add this line to log errors
    res.status(500).json({ message: 'Failed to fetch admins.' });
  }
});

  

// Login Routes
router.post("/login/admin", loginAdmin);
router.post("/login/superadmin", loginSuperAdmin);

module.exports = router;
