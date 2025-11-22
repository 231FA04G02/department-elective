import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
      role: role,
    };

    try {
      // 🔗 Backend login API
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.post(`${apiUrl}/auth/login`, payload);

      alert(res.data.message || "Login successful!");

      // ✅ Store user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("isCoordinator", res.data.user.isCoordinator);

      // ✅ Extract user info
      const { role, isCoordinator } = res.data.user;

      // 🔄 Smart redirect logic
      if (role === "admin") {
        window.location.href = "/admin/dashboard";
      } else if (role === "faculty" && isCoordinator) {
        window.location.href = "/coordinator/dashboard";
      } else if (role === "faculty" && !isCoordinator) {
        window.location.href = "/coordinator/dashboard";
      } else {
        window.location.href = "/student/dashboard";
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <section
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #caf0f8, #90e0ef, #48cae4)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-5"
        style={{ width: "420px", animation: "fadeIn 0.8s ease-in-out" }}
      >
        <h2 className="fw-bold mb-4 text-center text-primary">Login</h2>

        {/* Role Selection */}
        <div className="mb-4">
          <label className="fw-semibold mb-2">Select Role:</label>
          <div className="d-flex justify-content-center gap-3">
            <button
              type="button"
              className={`btn ${role === "student" ? "btn-info text-white" : "btn-outline-info"}`}
              onClick={() => setRole("student")}
            >
              🧑‍🎓 Student
            </button>
            <button
              type="button"
              className={`btn ${role === "faculty" ? "btn-success text-white" : "btn-outline-success"}`}
              onClick={() => setRole("faculty")}
            >
              👨‍🏫 Faculty
            </button>
            <button
              type="button"
              className={`btn ${role === "admin" ? "btn-warning text-white" : "btn-outline-warning"}`}
              onClick={() => setRole("admin")}
            >
              👨‍💼 Admin
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold mt-3">
            Login
          </button>

          <div className="text-center mt-3">
            <small>
              Don’t have an account?{" "}
              <a href="/register" className="text-primary fw-semibold text-decoration-none">
                Register
              </a>
            </small>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
