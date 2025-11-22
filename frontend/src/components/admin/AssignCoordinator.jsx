import React, { useState } from "react";
import API from "../../api/api";
import { Form, Button, Alert } from "react-bootstrap";

const AssignCoordinator = () => {
  const [formData, setFormData] = useState({
    facultyId: "",
    assignedYear: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put("/admin/faculty/assign-coordinator", formData);
      setMessage(data.message);
      setFormData({ facultyId: "", assignedYear: "" });
    } catch (err) {
      setMessage("Error assigning coordinator");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Assign Coordinator</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Faculty ID</Form.Label>
          <Form.Control
            type="text"
            name="facultyId"
            value={formData.facultyId}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Assigned Year</Form.Label>
          <Form.Control
            type="text"
            name="assignedYear"
            value={formData.assignedYear}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Assign
        </Button>
      </Form>
      {message && <Alert className="mt-3">{message}</Alert>}
    </div>
  );
};

export default AssignCoordinator;
