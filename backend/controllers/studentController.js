const Preference = require("../models/Preference");
const Allotment = require("../models/Allotment");
const User = require("../models/User");
const ElectiveForm = require("../models/ElectiveForm");

// 🎓 Get logged-in student's profile
const getStudentProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user._id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      student,
    });
  } catch (error) {
    console.error("Profile Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🧾 Submit or update global preferences (for allocation)
const submitPreferences = async (req, res) => {
  try {
    const { preferences, regNo } = req.body;

    console.log("📩 Received preferences from frontend:", preferences);
    console.log("👤 Authenticated student:", req.user?._id);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized or invalid token" });
    }

    if (!preferences || preferences.length === 0) {
      return res.status(400).json({ message: "No preferences provided" });
    }

    // ✅ Update user's regNo if provided and not empty
    if (regNo && regNo.trim() !== "") {
      await User.findByIdAndUpdate(req.user._id, { regNo: regNo.trim() });
    }

    // ✅ Check if record exists already
    const existing = await Preference.findOne({ studentId: req.user._id });

    if (existing) {
      existing.preferences = preferences;
      await existing.save();
      console.log("✅ Preferences updated for:", req.user._id);
      return res
        .status(200)
        .json({ message: "Preferences updated successfully" });
    }

    // ✅ Create new preference record
    const newPref = await Preference.create({
      studentId: req.user._id,
      preferences,
    });

    console.log("✅ Preferences created:", newPref);
    res.status(201).json({ message: "Preferences submitted successfully" });
  } catch (error) {
    console.error("❌ Preference Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📊 Get student's final subject allotment
const getAllotmentResult = async (req, res) => {
  try {
    const allotment = await Allotment.findOne({ studentId: req.user._id }).populate(
      "subjectId",
      "subjectName capacity"
    );

    if (!allotment) {
      return res.status(404).json({ message: "Allotment not yet generated" });
    }

    res.status(200).json({
      message: "Allotment fetched successfully",
      allotment,
    });
  } catch (error) {
    console.error("Allotment Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🌟 Get all elective forms (faculty-created)
const getElectiveForms = async (req, res) => {
  try {
    const forms = await ElectiveForm.find().populate("createdBy", "name email");
    res.status(200).json(forms);
  } catch (error) {
    console.error("Get Elective Forms Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🌟 Get a specific elective form by ID
const getElectiveFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await ElectiveForm.findById(id).populate(
      "createdBy",
      "name email"
    );

    if (!form) {
      return res.status(404).json({ message: "Elective form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    console.error("Get Elective Form By ID Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🌟 Submit preferences for a specific elective form
const submitElectivePreferences = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, regNo, cgpa, preferences, department } = req.body;

    console.log("📩 Elective form submission:", {
      name,
      regNo,
      cgpa,
      preferences,
    });

    if (!name || !regNo || !cgpa || !preferences || preferences.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Find the elective form
    const form = await ElectiveForm.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Elective form not found" });
    }

    // ✅ Prevent duplicate submission by regNo
    const alreadySubmitted = form.submissions.some(
      (sub) => sub.regNo === regNo
    );
    if (alreadySubmitted) {
      return res
        .status(400)
        .json({ message: "Preferences already submitted for this student." });
    }

    // ✅ Add new submission
    form.submissions.push({
      studentName: name,
      regNo,
      cgpa,
      department,
      preferences,
      submittedAt: new Date(),
    });
    await form.save();

    // ✅ Sync with Preference model (for allocation)
    const existingPref = await Preference.findOne({ studentId: req.user._id });
    if (existingPref) {
      existingPref.preferences = preferences;
      await existingPref.save();
    } else {
      await Preference.create({
        studentId: req.user._id,
        preferences,
      });
    }

    console.log("✅ Preferences successfully saved for:", regNo);
    res.status(201).json({ message: "Preferences submitted successfully" });
  } catch (error) {
    console.error("❌ Submit Elective Preferences Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getStudentProfile,
  submitPreferences,
  getAllotmentResult,
  getElectiveForms,
  getElectiveFormById,
  submitElectivePreferences,
};
