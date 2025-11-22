import React, { useState } from "react";
import API from "../../api/api";
import { Form, Button, Alert } from "react-bootstrap";

const CreateFaculty = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/admin/create-faculty", formData);
      setMessage(data.message);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage("Error creating faculty");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Create Faculty Account</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Create Faculty
        </Button>
      </Form>
      {message && <Alert className="mt-3">{message}</Alert>}
    </div>
  );
};

export default CreateFaculty;
