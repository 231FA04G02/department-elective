import React, { useState, useEffect } from "react";
import API from "../../api/api";
import { Form, Button, Alert, Table, Spinner, Card } from "react-bootstrap";

const AddSubject = () => {
  const [formData, setFormData] = useState({
    subjectName: "",
    capacity: "",
    eligibility: "",
  });
  const [message, setMessage] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔁 Fetch all subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  // 📦 Fetch all subjects from DB
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/subjects");
      setSubjects(data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      setMessage("Failed to load subjects from the database.");
    } finally {
      setLoading(false);
    }
  };

  // 📝 Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/faculty/subjects", formData);
      setMessage(data.message || "✅ Subject added successfully!");
      setFormData({ subjectName: "", capacity: "", eligibility: "" });
      fetchSubjects(); // Refresh subjects list after adding
    } catch (err) {
      console.error("Error adding subject:", err);
      setMessage("❌ Error adding subject. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      {/* Title */}
      <h2 className="fw-bold mb-4 text-primary text-center">📚 Manage Subjects</h2>

      {/* Subject Form */}
      <Card className="shadow-sm border-0 mb-5 mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <h5 className="fw-bold text-secondary mb-4">➕ Add New Subject</h5>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                name="subjectName"
                value={formData.subjectName}
                onChange={handleChange}
                placeholder="Enter subject name (e.g. Machine Learning)"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="Enter available seats"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Eligibility</Form.Label>
              <Form.Control
                type="text"
                name="eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                placeholder="Optional (e.g. CSE, ECE only)"
              />
            </Form.Group>

            <Button type="submit" variant="success" className="fw-semibold px-4">
              Add Subject
            </Button>
          </Form>

          {message && (
            <Alert
              variant={message.includes("Error") ? "danger" : "success"}
              className="mt-3 text-center fw-semibold"
            >
              {message}
            </Alert>
          )}
        </Card.Body>
      </Card>

      {/* Subject List */}
      <h4 className="fw-bold text-primary mb-3">📋 All Saved Subjects</h4>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : subjects.length === 0 ? (
        <Alert variant="info" className="text-center">
          No subjects found in the database.
        </Alert>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <Table bordered hover>
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Subject Name</th>
                <th>Capacity</th>
                <th>Eligibility</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={subject._id}>
                  <td>{index + 1}</td>
                  <td>{subject.subjectName}</td>
                  <td>{subject.capacity}</td>
                  <td>{subject.eligibility || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AddSubject;
