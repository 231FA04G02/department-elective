import React, { useState } from "react";
import API from "../../api/api";
import { Button, Alert, Spinner, Card } from "react-bootstrap";
import { motion } from "framer-motion";

const RunAllocation = () => {
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAllocation = async () => {
    setLoading(true);
    setMessage("");
    setSummary(null);

    try {
      // ✅ Call backend API to trigger allocation
      const { data } = await API.post("/allocation/run");
      setMessage(data.message || "✅ Allocation process completed!");
      setSummary(data.summary || null);
    } catch (err) {
      console.error("Allocation Error:", err);
      const errMsg =
        err.response?.data?.message ||
        "❌ Error running allocation. Please check your permissions.";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="fw-bold mb-3 text-primary">
          🎯 Run Elective Allocation
        </h2>
        <p className="text-muted">
          Automatically assign electives to students based on their preferences and seat availability.
        </p>

        {/* 🚀 Run Allocation Button */}
        <Button
          onClick={handleAllocation}
          variant="warning"
          size="lg"
          className="fw-semibold px-5"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                className="me-2"
              />
              Running Allocation...
            </>
          ) : (
            "🚀 Run Allocation"
          )}
        </Button>

        {/* 🟢 Success or Error Message */}
        {message && (
          <Alert
            variant={message.includes("Error") || message.includes("denied") ? "danger" : "success"}
            className="mt-4 text-center fw-semibold shadow-sm"
          >
            {message}
          </Alert>
        )}

        {/* 📊 Allocation Summary */}
        {summary && (
          <Card
            className="mt-4 mx-auto shadow-sm border-0"
            style={{ maxWidth: "450px" }}
          >
            <Card.Body>
              <h5 className="fw-bold text-success mb-3">
                📈 Allocation Summary
              </h5>
              <p>
                <strong>Total Students:</strong> {summary.totalStudents}
              </p>
              <p>
                <strong>Total Subjects:</strong> {summary.totalSubjects}
              </p>
              <p className="text-success fw-bold">
                ✅ Allocated: {summary.allocatedCount}
              </p>
              <p className="text-danger fw-bold">
                ⏳ Pending: {summary.pendingCount}
              </p>

              {/* 👀 Optional: View detailed results button */}
              <Button
                variant="outline-primary"
                className="mt-3 fw-semibold"
                onClick={() => (window.location.href = "/allocation/results")}
              >
                View Detailed Results
              </Button>
            </Card.Body>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default RunAllocation;
