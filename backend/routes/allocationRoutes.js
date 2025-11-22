const express = require("express");
const { runAllocation, getAllAllocations } = require("../controllers/allocationController");
const { protect, isFacultyOrCoordinator } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Allow both faculty and coordinator to run allocation
router.post("/run", protect, isFacultyOrCoordinator, runAllocation);

// 🌍 View results — open to all logged-in users (students, faculty, coordinator, admin)
router.get("/results", protect, getAllAllocations);

module.exports = router;
