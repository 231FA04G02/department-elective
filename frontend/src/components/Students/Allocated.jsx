import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";
import API from "../../api/api";
import { Spinner, Alert } from "react-bootstrap";

const Allocated = () => {
  const [allotment, setAllotment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllotment = async () => {
      try {
        const { data } = await API.get("/student/allotment");
        setAllotment(data.allotment);
      } catch (err) {
        console.error("Allotment Fetch Error:", err);
        setError("Allotment not yet generated or error fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllotment();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error || !allotment) {
    return (
      <div className="container py-5">
        <Alert variant="info" className="text-center fw-semibold">
          {error || "No allotment found yet."}
        </Alert>
      </div>
    );
  }

  return (
    <motion.div
      className="card border-0 shadow-sm mb-4 text-white"
      style={{
        background: "linear-gradient(135deg, #43a047, #66bb6a)",
        borderRadius: "12px",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="card-body p-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
        >
          <FaCheckCircle
            size={48}
            className="text-light mb-3"
            style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))" }}
          />
        </motion.div>

        <h4 className="fw-bold mb-2">Your Elective Has Been Allocated!</h4>
        <p className="text-light opacity-90 mb-3">
          🎉 Congratulations! Your preferred elective has been successfully allotted.
        </p>

        <div
          className="p-3 rounded-3 bg-light text-dark mx-auto"
          style={{
            width: "fit-content",
            minWidth: "260px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h6 className="fw-bold mb-1">
            <FaAward className="me-2 text-success" />
            {allotment.subjectId?.subjectName || "Not Allocated"}
          </h6>
          <small className="text-muted">Reg. No: {allotment.regNo || "N/A"}</small>
        </div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            className="btn btn-outline-light px-4 fw-semibold"
            style={{ borderRadius: "8px" }}
          >
            Download Confirmation Slip
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Allocated;
