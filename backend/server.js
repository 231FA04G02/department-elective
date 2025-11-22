// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes.js");
const facultyRoutes = require("./routes/facultyRoutes.js");
const adminRoutes = require("./routes/adminRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
// const { errorHandler } = require("./middlewares/errorHandler");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/allocation", allocationRoutes);

// Error Handler (optional)
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
