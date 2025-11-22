const express = require("express");
const {
  getStudentProfile,
  submitPreferences,
  getAllotmentResult,
  getElectiveForms,
  getElectiveFormById,
  submitElectivePreferences,
} = require("../controllers/studentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getStudentProfile);
router.post("/preferences", protect, submitPreferences);
router.get("/allotment", protect, getAllotmentResult);

// 🌟 Elective forms routes
router.get("/electives", getElectiveForms);
router.get("/electives/:id", getElectiveFormById);
router.post("/electives/:id/submit", protect, submitElectivePreferences);

module.exports = router;
