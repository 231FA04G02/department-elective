import React, { useState } from "react";
import API from "../../api/api";
import { Form, Button, Alert } from "react-bootstrap";

const UploadStudents = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await API.post("/faculty/upload-students", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(data.message);
    } catch (err) {
      setMessage("Error uploading file");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Upload Student List</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>CSV File</Form.Label>
          <Form.Control
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Upload
        </Button>
      </Form>
      {message && <Alert className="mt-3">{message}</Alert>}
    </div>
  );
};

export default UploadStudents;
