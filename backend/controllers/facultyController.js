const csv = require("csv-parser");
const fs = require("fs");
const User = require("../models/User");
const Subject = require("../models/Subject");
const Allotment = require("../models/Allotment");
const Preference = require("../models/Preference");
const ElectiveForm = require("../models/ElectiveForm"); // ✅ Add this

// 📥 Upload student list from CSV
const uploadStudentCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No CSV file uploaded" });
    }

    const students = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => students.push(row))
      .on("end", async () => {
        for (const row of students) {
          const { name, email, password, percentage } = row;

          // Skip if user already exists
          const exists = await User.findOne({ email });
          if (exists) continue;

          await User.create({
            name,
            email,
            password, // ⚠️ Optional: hash before saving in production
            role: "student",
          });
        }

        fs.unlinkSync(req.file.path); // Delete file after processing
        res.status(200).json({ message: "Students uploaded successfully" });
      });
  } catch (error) {
    console.error("CSV Upload Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ➕ Add a new subject
const addSubject = async (req, res) => {
  try {
    const { subjectName, capacity, eligibility } = req.body;

    if (!subjectName || !capacity) {
      return res.status(400).json({ message: "Subject name and capacity required" });
    }

    const subject = await Subject.create({
      subjectName,
      capacity,
      eligibility,
    });

    res.status(201).json({ message: "Subject added successfully", subject });
  } catch (error) {
    console.error("Add Subject Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📚 Get all subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    console.error("Get Subjects Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ⚙️ Run the elective allocation algorithm
const runAllocation = async (req, res) => {
  try {
    const preferences = await Preference.find().populate("studentId");
    const subjects = await Subject.find();

    for (const pref of preferences) {
      const sortedSubjects = pref.preferences;

      for (const subjName of sortedSubjects) {
        const subject = subjects.find((s) => s.subjectName === subjName && s.capacity > 0);

        if (subject) {
          await Allotment.create({
            studentId: pref.studentId._id,
            subjectId: subject._id,
          });

          subject.capacity -= 1;
          await subject.save();
          break;
        }
      }
    }

    res.status(200).json({ message: "Allocation completed successfully" });
  } catch (error) {
    console.error("Allocation Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};



// 🌟 CREATE Elective Form (Faculty)
const createElectiveForm = async (req, res) => {
  try {
    const { department, electives } = req.body;

    if (!department || !electives || electives.length === 0) {
      return res.status(400).json({ message: "Department and electives required" });
    }

    const newForm = await ElectiveForm.create({
      createdBy: req.user ? req.user._id : "manual_faculty", // handle missing auth
      department,
      electives,
    });

    res.status(201).json({
      message: "✅ Elective Form created successfully",
      form: newForm,
    });
  } catch (error) {
    console.error("Create Elective Form Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📄 GET All Elective Forms (for faculty & students)
const getElectiveForms = async (req, res) => {
  try {
    const forms = await ElectiveForm.find().populate("createdBy", "name email");
    res.status(200).json(forms);
  } catch (error) {
    console.error("Get Elective Forms Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// ✅ Export All Controllers
module.exports = {
  uploadStudentCSV,
  addSubject,
  getSubjects,
  runAllocation,
  createElectiveForm,  // ✅ newly added
  getElectiveForms,    // ✅ newly added
};
