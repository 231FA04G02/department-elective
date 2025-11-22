const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Subject = require("../models/Subject");
const Allotment = require("../models/Allotment");


// 🧑‍🏫 Create a new Faculty account (manual admin creation)
const createFaculty = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Prevent duplicates
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Faculty already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Directly approved since admin is creating this faculty
    const newFaculty = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "faculty",
      isApproved: true,
    });

    res.status(201).json({
      message: "Faculty account created successfully",
      faculty: {
        id: newFaculty._id,
        name: newFaculty.name,
        email: newFaculty.email,
        role: newFaculty.role,
        isApproved: newFaculty.isApproved,
      },
    });
  } catch (error) {
    console.error("Create Faculty Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// 👩‍🏫 Get list of all faculty users (approved + pending)
const getAllFaculty = async (req, res) => {
  try {
    const facultyList = await User.find({ role: "faculty" }).select("-password");
    res.status(200).json({ count: facultyList.length, faculty: facultyList });
  } catch (error) {
    console.error("Get Faculty Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// 🕓 Get all pending faculty registrations (not approved yet)
const getPendingFaculty = async (req, res) => {
  try {
    const pending = await User.find({ role: "faculty", isApproved: false }).select(
      "-password"
    );

    res.status(200).json({
      count: pending.length,
      pending,
    });
  } catch (error) {
    console.error("Get Pending Faculty Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// ✅ Approve a faculty registration
const approveFaculty = async (req, res) => {
  try {
    const faculty = await User.findById(req.params.id);

    if (!faculty)
      return res.status(404).json({ message: "Faculty not found" });

    if (faculty.role !== "faculty")
      return res.status(400).json({ message: "Not a faculty account" });

    faculty.isApproved = true;
    await faculty.save();

    res.status(200).json({ message: "Faculty approved successfully" });
  } catch (error) {
    console.error("Approve Faculty Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// 🧑‍💼 Assign faculty as Coordinator for a specific year
const assignCoordinator = async (req, res) => {
  try {
    const { facultyId, assignedYear } = req.body;

    const faculty = await User.findById(facultyId);
    if (!faculty)
      return res.status(404).json({ message: "Faculty not found" });

    if (faculty.role !== "faculty" || !faculty.isApproved)
      return res.status(400).json({ message: "Faculty not eligible for coordinator role" });

    // Optional: Prevent duplicate coordinators for the same year
    const existing = await User.findOne({
      isCoordinator: true,
      assignedYear,
    });
    if (existing)
      return res
        .status(400)
        .json({ message: `A coordinator already exists for ${assignedYear}` });

    faculty.isCoordinator = true;
    faculty.assignedYear = assignedYear;
    await faculty.save();

    res.status(200).json({
      message: "Faculty assigned as Coordinator successfully",
      coordinator: {
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        assignedYear: faculty.assignedYear,
      },
    });
  } catch (error) {
    console.error("Assign Coordinator Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// 📊 Dashboard stats (optional analytics)
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalFaculty = await User.countDocuments({ role: "faculty" });
    const totalSubjects = await Subject.countDocuments();
    const totalAllotments = await Allotment.countDocuments();
    const pendingFaculty = await User.countDocuments({
      role: "faculty",
      isApproved: false,
    });
    const totalCoordinators = await User.countDocuments({ isCoordinator: true });

    res.status(200).json({
      totalStudents,
      totalFaculty,
      pendingFaculty,
      totalCoordinators,
      totalSubjects,
      totalAllotments,
    });
  } catch (error) {
    console.error("Dashboard Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  createFaculty,
  getAllFaculty,
  getPendingFaculty,
  approveFaculty,
  assignCoordinator, // ✅ NEW
  getDashboardStats,
};
