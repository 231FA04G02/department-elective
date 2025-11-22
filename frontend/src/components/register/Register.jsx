import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [userType, setUserType] = useState(""); // "student" or "coordinator"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    assignedYear: "",
    regNo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct payload based on userType
    const payload =
      userType === "student"
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "student",
            regNo: formData.regNo,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "faculty",
            isCoordinator: true,
            assignedYear: formData.assignedYear,
          };

    try {
      // ⚙️ Change the backend URL according to your setup
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        payload
      );

      alert(response.data.message || "Registration successful!");
      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        assignedYear: "",
        regNo: "",
      });
      setUserType("");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <section
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0fbfc, #98c1d9)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-5"
        style={{ width: "420px", animation: "fadeIn 0.8s ease-in-out" }}
      >
        {/* STEP 1: Type Selection */}
        {!userType && (
          <>
            <h2 className="fw-bold mb-4 text-primary">Register As</h2>
            <button
              className="btn btn-info w-100 mb-3 text-white fw-bold py-2"
              onClick={() => setUserType("student")}
            >
              🧑‍🎓 Student
            </button>
            <button
              className="btn btn-success w-100 text-white fw-bold py-2"
              onClick={() => setUserType("coordinator")}
            >
              👨‍🏫 Coordinator
            </button>

            <div className="text-center mt-4">
              <small>
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-primary fw-semibold text-decoration-none"
                >
                  Login
                </a>
              </small>
            </div>
          </>
        )}

        {/* STEP 2: Student Form */}
        {userType === "student" && (
          <form onSubmit={handleSubmit}>
            <h3 className="fw-bold text-info mb-3">Student Registration</h3>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Registration Number</label>
              <input
                type="text"
                name="regNo"
                className="form-control"
                placeholder="Enter your registration number"
                value={formData.regNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-info text-white w-100 fw-bold mt-2"
            >
              Register
            </button>

            <button
              type="button"
              onClick={() => setUserType("")}
              className="btn btn-outline-secondary w-100 mt-3"
            >
              ← Back
            </button>
          </form>
        )}

        {/* STEP 3: Coordinator Form */}
        {userType === "coordinator" && (
          <form onSubmit={handleSubmit}>
            <h3 className="fw-bold text-success mb-3">
              Coordinator Registration
            </h3>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Assigned Year</label>
              <input
                type="text"
                name="assignedYear"
                className="form-control"
                placeholder="e.g., 3rd Year"
                value={formData.assignedYear}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success text-white w-100 fw-bold mt-2"
            >
              Register
            </button>

            <button
              type="button"
              onClick={() => setUserType("")}
              className="btn btn-outline-secondary w-100 mt-3"
            >
              ← Back
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Register;