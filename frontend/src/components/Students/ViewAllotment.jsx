import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Table, Spinner, Alert } from "react-bootstrap";
import { CSVLink } from "react-csv";

const ViewAllAllocations = () => {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllocations = async () => {
      try {
        const { data } = await API.get("/allocation/results");
        console.log("✅ Fetched Allocations:", data.data); // 👀 Log to inspect data
        setAllocations(data.data || []);
      } catch (err) {
        console.error("❌ Allocation Fetch Error:", err);
        setError("Failed to fetch allocation results.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllocations();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error)
    return (
      <div className="container py-5">
        <Alert variant="danger" className="text-center fw-semibold">
          {error}
        </Alert>
      </div>
    );

  if (allocations.length === 0)
    return (
      <div className="container py-5">
        <Alert variant="info" className="text-center fw-semibold">
          No allocation records found yet.
        </Alert>
      </div>
    );

  // ✅ Format CSV data safely
  const csvData = allocations.map((a) => {
    const regNo =
      a.studentId?.regNo ||
      a.regNo ||
      a.studentId?.registerNumber ||
      "Not Available";

    return {
      "Student Name": a.studentId?.name || "Not Available",
      "Register Number": regNo,
      Email: a.studentId?.email || "Not Available",
      Subject: a.subjectId?.subjectName || "Not Allocated",
      Capacity: a.subjectId?.capacity || "-",
      "Preference Rank": a.preferenceRank || "-",
      Status: a.status ? a.status.toUpperCase() : "PENDING",
    };
  });

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary text-center">
        🎓 Elective Allocation Results
      </h2>

      {/* ✅ CSV Export Button */}
      <div className="text-center mb-4">
        <CSVLink
          data={csvData}
          filename="Allocation_Results.csv"
          className="btn btn-success fw-semibold"
        >
          📥 Export to CSV
        </CSVLink>
      </div>

      {/* ✅ Results Table */}
      <div className="table-responsive shadow-sm rounded">
        <Table bordered hover>
          <thead className="bg-primary text-white text-center">
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Registration No</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Preference Rank</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((a, index) => {
              const regNo =
                a.studentId?.regNo ||
                a.regNo ||
                a.studentId?.registerNumber ||
                "Not Available";

              return (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>{a.studentId?.name || "Not Available"}</td>
                  <td>{regNo}</td>
                  <td>{a.studentId?.email || "Not Available"}</td>
                  <td>{a.subjectId?.subjectName || "Not Allocated"}</td>
                  <td className="text-center">
                    {a.preferenceRank || "-"}
                  </td>
                  <td
                    className={`fw-bold text-center ${
                      a.status === "allocated"
                        ? "text-success"
                        : "text-warning"
                    }`}
                  >
                    {a.status ? a.status.toUpperCase() : "PENDING"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewAllAllocations;
