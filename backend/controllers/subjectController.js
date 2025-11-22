const Subject = require("../models/Subject");

// ➕ Create a new subject
const createSubject = async (req, res) => {
  try {
    const { subjectName, capacity, eligibility } = req.body;

    if (!subjectName || !capacity) {
      return res
        .status(400)
        .json({ message: "Subject name and capacity are required" });
    }

    const existing = await Subject.findOne({ subjectName });
    if (existing)
      return res.status(400).json({ message: "Subject already exists" });

    const subject = await Subject.create({
      subjectName,
      capacity,
      eligibility,
    });

    res.status(201).json({
      message: "Subject created successfully",
      subject,
    });
  } catch (error) {
    console.error("Create Subject Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✏️ Update subject details
const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject)
      return res.status(404).json({ message: "Subject not found" });

    const { subjectName, capacity, eligibility } = req.body;

    if (subjectName) subject.subjectName = subjectName;
    if (capacity) subject.capacity = capacity;
    if (eligibility) subject.eligibility = eligibility;

    await subject.save();

    res.status(200).json({
      message: "Subject updated successfully",
      subject,
    });
  } catch (error) {
    console.error("Update Subject Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ❌ Delete subject
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject)
      return res.status(404).json({ message: "Subject not found" });

    await subject.deleteOne();
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Delete Subject Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📚 Get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    console.error("Get All Subjects Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔍 Get subject by ID
const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject)
      return res.status(404).json({ message: "Subject not found" });

    res.status(200).json(subject);
  } catch (error) {
    console.error("Get Subject By ID Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createSubject,
  updateSubject,
  deleteSubject,
  getAllSubjects,
  getSubjectById,
};
