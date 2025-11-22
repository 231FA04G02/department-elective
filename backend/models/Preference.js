const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    preferences: {
      type: [String], // e.g. ["AI", "ML", "IoT"]
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Preference", preferenceSchema);
