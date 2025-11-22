import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import { Form, Button, Alert } from "react-bootstrap";

const UpdateSubject = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    subjectName: "",
    capacity: "",
    eligibility: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const { data } = await API.get(`/subjects/${id}`);
        setFormData({
          subjectName: data.subjectName,
          capacity: data.capacity,
          eligibility: data.eligibility || "",
        });
      } catch (err) {
        setMessage("Error fetching subject");
      }
    };
    fetchSubject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put(`/subjects/${id}`, formData);
      setMessage(data.message);
    } catch (err) {
      setMessage("Error updating subject");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Update Subject</h2>
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
        <Button type="submit" variant="primary">
          Update Subject
        </Button>
      </Form>
      {message && <Alert className="mt-3">{message}</Alert>}
    </div>
  );
};

export default UpdateSubject;
