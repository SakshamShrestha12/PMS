const mongoose = require("mongoose");

const OPDPatientSchema = new mongoose.Schema({
  name: String,
  date: String,
  age: Number,
  gender: String,
  bloodGroup: String,
  address: String,
  phone: String,
  dob: String,
  department: String,
});

module.exports = mongoose.model("OPDPatient", OPDPatientSchema);
