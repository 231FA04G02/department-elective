import React, { useState } from "react";
import API from "../../api/api";
import { Form, Button, Alert } from "react-bootstrap";

const CreateSubject = () => {
  const [formData, setFormData] = useState({
    subjectName: "",
    capacity: "",
    eligibility: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/subjects", formData);
      setMessage(data.message);
      setFormData({ subjectName: "", capacity: "", eligibility: "" });
    } catch (err) {
      setMessage("Error creating subject");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Create New Subject</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Subject Name</Form.Label>
          <Form.Control
            type="text"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
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
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Create Subject
        </Button>
      </Form>
      {message && <Alert className="mt-3">{message}</Alert>}
    </div>
  );
};

export default CreateSubject;
