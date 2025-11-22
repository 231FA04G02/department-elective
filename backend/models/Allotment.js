// backend/models/Allotment.js
const mongoose = require("mongoose");

const allotmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    regNo: {
      type: String,
      required: false, // ✅ add this field
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: false, // allow null when pending
    },
    preferenceRank: { type: Number },
    status: {
      type: String,
      enum: ["allocated", "pending"],
      default: "allocated",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Allotment", allotmentSchema);
