const mongoose = require("mongoose");

const electiveFormSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    electives: [
      {
        subject: {
          type: String,
          required: true,
        },
        capacity: {
          type: Number,
          required: true,
        },
      },
    ],
    submissions: [
      {
        studentName: { type: String, required: true },
        regNo: { type: String, required: true },
        cgpa: { type: Number, required: true },
        preferences: [{ type: String, required: true }],
        submittedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ElectiveForm", electiveFormSchema);
