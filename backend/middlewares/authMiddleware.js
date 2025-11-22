const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware: Verify JWT and attach user info
const protect = async (req, res, next) => {
  let token;

  // 🔍 Check if Authorization header exists
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Attach user to request (without password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found. Invalid token." });
      }

      return next();
    } catch (error) {
      console.error("❌ JWT verification failed:", error.message);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

// ✅ Allow only Faculty
const isFaculty = (req, res, next) => {
  if (req.user && req.user.role === "faculty") {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied: Faculty only" });
  }
};

// ✅ Allow only Coordinator (faculty with coordinator flag)
const isCoordinator = (req, res, next) => {
  if (req.user && req.user.role === "faculty" && req.user.isCoordinator) {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied: Coordinators only" });
  }
};

// ✅ Allow only Admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
};

// ✅ Allow both Faculty and Coordinator
const isFacultyOrCoordinator = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "faculty" || (req.user.role === "faculty" && req.user.isCoordinator))
  ) {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied: Faculty or Coordinator only" });
  }
};

module.exports = { protect, isFaculty, isCoordinator, isAdmin, isFacultyOrCoordinator };
