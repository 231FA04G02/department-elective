const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔑 Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// 🧩 Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    // ✅ Check if user already exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    // ✅ Generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // ✅ Prevent self-admin registration
    if (role === "admin") {
      return res
        .status(403)
        .json({ message: "Admin accounts cannot be self-registered" });
    }

    // ✅ Faculty accounts are created as "pending" approval
    const isApproved = role === "faculty" ? false : true;

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "student",
      isApproved, // 👈 add this field in your User model
      regNo: req.body.regNo || null,
    });

    // ✅ Token generation only for approved users
    if (role === "faculty" && !isApproved) {
      return res.status(201).json({
        message:
          "Faculty registration submitted successfully. Awaiting admin approval.",
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 🔐 Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        regNo: user.regNo,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };
