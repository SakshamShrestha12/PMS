const express = require("express");
const router = express.Router();
const { addAdmin, loginAdmin, loginSuperAdmin } = require("../controllers/userController");
const { authenticate, roleAuthorization } = require("../middleware/authMiddleware"); // Add your middleware

// Add Admin Route (accessible only by super admins)
router.post(
  "/add-admin",
  authenticate, // Middleware to validate token
  roleAuthorization(["super_admin"]), // Only super admins can add admins
  addAdmin
);

// Login Routes
router.post("/login/admin", loginAdmin);
router.post("/login/superadmin", loginSuperAdmin);

module.exports = router;
