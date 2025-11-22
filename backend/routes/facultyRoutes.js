const express = require("express");
const {  uploadStudentCSV,  addSubject,  getSubjects, runAllocation, createElectiveForm, getElectiveForms,} = require("../controllers/facultyController.js");
const { protect, isFaculty } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// ✅ Upload student data from CSV
router.post("/upload-students", protect, isFaculty, upload.single("file"), uploadStudentCSV);

// ✅ Add new subject
router.post("/subjects", protect, isFaculty, addSubject);

// ✅ Get all subjects (faculty view)
router.get("/subjects", protect, isFaculty, getSubjects);

// ✅ Run allocation algorithm
router.post("/allocate", runAllocation);

// 🌟 Elective forms routes
router.post("/electives", protect, isFaculty, createElectiveForm);
router.get("/electives", protect, isFaculty, getElectiveForms);

module.exports = router;
