import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import Allocated from "./Allocated";
import ElectiveForm from "./ElectiveForm"; // 🌟 Importing the new form component
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Modal, Button } from "react-bootstrap";
import API from "../../api/api";

const StudentLanding = () => {
  const navigate = useNavigate();
  const [showCGPAModal, setShowCGPAModal] = useState(false);
  const [showElectiveForm, setShowElectiveForm] = useState(false);
  const [savedPreferences, setSavedPreferences] = useState(null);
  const [electiveForms, setElectiveForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);

  // Example semester data
  const semesterData = [
    { sem: "1", gpa: 8.2 },
    { sem: "2", gpa: 8.4 },
    { sem: "3", gpa: 8.6 },
    { sem: "4", gpa: 8.8 },
    { sem: "5", gpa: 8.7 },
    { sem: "6", gpa: 8.9 },
  ];

  // 🔁 Load elective forms and saved preferences on mount
  useEffect(() => {
    const fetchElectiveForms = async () => {
      try {
        const { data } = await API.get("/student/electives");
        setElectiveForms(data);
      } catch (err) {
        console.error("Error fetching elective forms:", err);
      }
    };

    fetchElectiveForms();

    const saved = localStorage.getItem("electivePreferences");
    if (saved) {
      setSavedPreferences(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Header />

      <div style={{ marginLeft: "260px", padding: "20px" }}>
        {/* 🎓 Dashboard Cards */}
        <div className="row g-3 mb-4">
          {/* Profile Card */}
          <div className="col-md-4">
            <motion.div
              className="card text-center p-3 border-0 shadow-sm text-white"
              style={{
                background: "linear-gradient(135deg, #3f51b5, #5c6bc0)",
                cursor: "pointer",
                borderRadius: "12px",
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/student/profile")}
            >
              <h6 className="fw-semibold mb-1">Profile</h6>
              <h2 className="fw-bold">👤</h2>
              <small className="text-light opacity-75">
                View your profile
              </small>
            </motion.div>
          </div>

          {/* Submit Preferences */}
          <div className="col-md-4">
            <motion.div
              className="card text-center p-3 border-0 shadow-sm text-white"
              style={{
                background: "linear-gradient(135deg, #00bcd4, #26c6da)",
                cursor: "pointer",
                borderRadius: "12px",
                height:"120px"
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/student/preferences")}
            >
              <h6 className="fw-semibold mb-1">Submit Preferences</h6>
              <h2 className="fw-bold">📝</h2>
            </motion.div>
          </div>

          {/* View Allotment */}
          <div className="col-md-4">
            <motion.div
              className="card text-center p-3 border-0 shadow-sm text-white"
              style={{
                background: "linear-gradient(135deg, #43a047, #66bb6a)",
                cursor: "pointer",
                borderRadius: "12px",
                height:"120px"
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/student/allotment")}
            >
              <h6 className="fw-semibold mb-1">View Allotment</h6>
              <h2 className="fw-bold">📋</h2>
            </motion.div>
          </div>
        </div>

        {/* Allocated Subject */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Allocated />
        </motion.div>

        {/* 🌐 Available Electives Section */}
        <motion.div
          className="card border-0 shadow-sm mb-4 text-dark text-center"
          style={{
            background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
            borderRadius: "16px",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-body p-4">
            <h5 className="fw-bold text-primary mb-4">Available Electives</h5>

            <div className="row">
              {electiveForms.map((form, idx) => (
                <div key={idx} className="col-md-6 mb-3">
                  <motion.div
                    className="d-flex justify-content-between align-items-center p-3 rounded-3 shadow-sm"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderLeft: "5px solid #3f51b5",
                      minHeight: "80px",
                    }}
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "#f5f7ff",
                    }}
                  >
                    <div>
                      <strong>{form.department} Electives</strong>
                      <br />
                      <small className="text-muted">
                        {form.electives.length} subjects available
                      </small>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-outline-primary btn-sm fw-semibold"
                      style={{ borderRadius: "6px" }}
                      onClick={() => {
                        setSelectedFormId(form._id);
                        setShowElectiveForm(true);
                      }}
                    >
                      Choose
                    </motion.button>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* 🌟 CENTERED BUTTON */}
            <div className="d-flex justify-content-center mt-5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary fw-semibold px-4 py-3"
                style={{
                  borderRadius: "10px",
                  fontSize: "1.1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
                onClick={() => setShowElectiveForm(true)}
              >
                🎯 Choose Your Elective Option
              </motion.button>
            </div>

            {/* 🌟 Show saved preferences below */}
            {savedPreferences && (
              <div className="mt-4 text-start">
                <h6 className="fw-bold text-primary mb-3">
                  🧾 Your Saved Preferences:
                </h6>
                <ul className="list-group">
                  {Object.entries(savedPreferences).map(([key, value], i) => (
                    <li
                      key={i}
                      className="list-group-item border-0 mb-2 rounded-3 shadow-sm"
                      style={{
                        background: "rgba(255,255,255,0.85)",
                        fontWeight: "500",
                      }}
                    >
                      {["1️⃣", "2️⃣", "3️⃣", "4️⃣"][i]} {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* 🎓 CGPA Modal */}
      <Modal
        show={showCGPAModal}
        onHide={() => setShowCGPAModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-primary">
            🎓 Semester-wise GPA Trend
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={semesterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sem" />
              <YAxis domain={[8.0, 9.2]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="gpa"
                stroke="#3f51b5"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCGPAModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 🌟 Reusable Elective Form Modal */}
      <ElectiveForm
        show={showElectiveForm}
        handleClose={() => setShowElectiveForm(false)}
        electiveFormId={selectedFormId}
      />
    </div>
  );
};

export default StudentLanding;
