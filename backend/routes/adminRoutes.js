const express = require("express");
const {
  createFaculty,
  getAllFaculty,
  getDashboardStats,
  getPendingFaculty,
  approveFaculty,
  assignCoordinator, // ✅ NEW
} = require("../controllers/adminController");

const { protect, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Create new Faculty account (Admin creates manually)
router.post("/create-faculty", protect, isAdmin, createFaculty);

// ✅ Get all Faculty accounts
router.get("/faculty", protect, isAdmin, getAllFaculty);

// ✅ Get all Pending Faculty (who registered but not approved yet)
router.get("/faculty/pending", protect, isAdmin, getPendingFaculty);

// ✅ Approve a specific Faculty registration (activate account)
router.put("/faculty/approve/:id", protect, isAdmin, approveFaculty);

// ✅ Assign Faculty as Coordinator for a specific year
router.put("/faculty/assign-coordinator", protect, isAdmin, assignCoordinator);

// ✅ Get system dashboard stats (optional analytics)
router.get("/dashboard", protect, isAdmin, getDashboardStats);

module.exports = router;
