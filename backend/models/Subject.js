const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subjectName: { type: String, required: true },
    capacity: { type: Number, required: true },
    eligibility: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
