const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },
    regNo: { type: String, default: null }, // Add regNo field
     isApproved: { type: Boolean, default: false }, // ✅  only admin approved which can access
     isCoordinator: { type: Boolean, default: false },
      assignedYear: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
