const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "super_admin"], required: true },
});

userSchema.statics.loginAdmin = async function (email, password) {
  const user = await this.findOne({ email, role: "admin" });
  if (!user) throw new Error("Admin not found");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Incorrect Password");
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET, { expiresIn: "1h" });
  return { token, user };
};

userSchema.statics.loginSuperAdmin = async function (email, password) {
  const user = await this.findOne({ email, role: "super_admin" });
  if (!user) throw new Error("Super Admin not found");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Incorrect Password");
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET, { expiresIn: "1h" });
  return { token, user };
};

const User = mongoose.model("User", userSchema, "users");
module.exports = { User };
