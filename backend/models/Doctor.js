const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  specialization: { type: String },
  availability: [
    {
      day: { type: String, required: true },
      start_time: { type: String, required: true },
      end_time: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doctor", doctorSchema);
