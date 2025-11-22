const User = require("../models/User");
const Subject = require("../models/Subject");
const Allotment = require("../models/Allotment");
const Preference = require("../models/Preference");

/**
 * 🎯 Run automatic allocation of subjects to students (based on Preference collection)
 */
const runAllocation = async (req, res) => {
  try {
    // 1️⃣ Fetch all preferences and populate student data
    const preferences = await Preference.find().populate(
      "studentId",
      "name email regNo cgpa percentage department"
    );

    if (!preferences.length) {
      return res.status(400).json({ message: "No student preferences found." });
    }

    // 2️⃣ Fetch all subjects
    const subjects = await Subject.find();
    if (!subjects.length) {
      return res.status(400).json({ message: "No subjects available for allocation." });
    }

    // 3️⃣ Prepare seat tracker
    const seatMap = {};
    subjects.forEach((s) => (seatMap[s._id.toString()] = s.capacity));

    const allocations = [];

    // 4️⃣ Sort by CGPA/Percentage (high to low)
    preferences.sort(
      (a, b) =>
        (b.studentId?.cgpa || b.studentId?.percentage || 0) -
        (a.studentId?.cgpa || a.studentId?.percentage || 0)
    );

    // 5️⃣ Allocate based on preferences
    for (const prefDoc of preferences) {
      const student = prefDoc.studentId;
      if (!student) continue; // skip invalid users

      let allocated = false;

      // Go through each preferred subject
      for (let i = 0; i < prefDoc.preferences.length; i++) {
        const subjectName = prefDoc.preferences[i];
        const subject = subjects.find(
          (s) => s.subjectName.trim().toLowerCase() === subjectName.trim().toLowerCase()
        );

        if (subject && seatMap[subject._id.toString()] > 0) {
          allocations.push({
            studentId: student._id,
            regNo: student.regNo || "N/A",
            subjectId: subject._id,
            preferenceRank: i + 1,
            status: "allocated",
          });

          seatMap[subject._id.toString()]--;
          allocated = true;
          break;
        }
      }

      // 🕒 No seat available or no matching preference
      if (!allocated) {
        allocations.push({
          studentId: student._id,
          regNo: student.regNo || "N/A",
          subjectId: null,
          preferenceRank: null,
          status: "pending",
        });
      }
    }

    // 6️⃣ Replace old data with fresh results
    await Allotment.deleteMany();
    await Allotment.insertMany(allocations);

    // 7️⃣ Build summary
    const summary = {
      totalStudents: preferences.length,
      totalSubjects: subjects.length,
      allocatedCount: allocations.filter((a) => a.status === "allocated").length,
      pendingCount: allocations.filter((a) => a.status === "pending").length,
    };

    res.status(200).json({
      message: "✅ Allocation process completed successfully using Preference collection!",
      summary,
    });
  } catch (error) {
    console.error("Allocation Error:", error.message);
    res.status(500).json({ message: "Server error during allocation." });
  }
};

/**
 * 📋 View all allocation results — accessible to all logged-in users
 */
const getAllAllocations = async (req, res) => {
  try {
    // 🧩 Fetch all allocations and populate student and subject data
    let results = await Allotment.find()
      .populate("studentId", "name email regNo") // ✅ get email and regNo from User
      .populate("subjectId", "subjectName capacity");

    if (!results?.length) {
      return res.status(404).json({ message: "No allocation results found yet." });
    }

    // 🧩 Fetch all users once (for email → regNo mapping)
    const allUsers = await User.find({}, "email regNo");

    // 🧩 Match each allocation's student email to a user to get regNo
    const enrichedResults = results.map((allocation) => {
      const studentEmail = allocation.studentId?.email;
      const matchedUser = allUsers.find((u) => u.email === studentEmail);

      const verifiedRegNo = matchedUser?.regNo || allocation.studentId?.regNo || "N/A";

      return {
        ...allocation.toObject(),
        verifiedRegNo, // ✅ attach verified regNo
      };
    });

    res.status(200).json({
      message: "🎓 Allocation results fetched successfully!",
      count: enrichedResults.length,
      data: enrichedResults,
    });
  } catch (error) {
    console.error("Fetch Allocation Error:", error.message);
    res.status(500).json({ message: "Server error fetching allocation results." });
  }
};



module.exports = { runAllocation, getAllAllocations };
