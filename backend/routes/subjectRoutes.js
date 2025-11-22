const express = require("express");
const {
  createSubject,
  updateSubject,
  deleteSubject,
  getAllSubjects,
  getSubjectById,
} = require("../controllers/subjectController");
const { protect, isAdmin, isFaculty } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Create new subject (Faculty or Admin)
router.post("/", protect, isFaculty, createSubject);

// ✅ Update subject (Faculty or Admin)
router.put("/:id", protect, isFaculty, updateSubject);

// ✅ Delete subject (Admin only)
router.delete("/:id", protect, isAdmin, deleteSubject);

// ✅ Get all subjects (Any logged-in user)
router.get("/", protect, getAllSubjects);

// ✅ Get single subject by ID (Any logged-in user)
router.get("/:id", protect, getSubjectById);

module.exports = router;
