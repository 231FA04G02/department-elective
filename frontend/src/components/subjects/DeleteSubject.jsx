import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import { Button, Alert } from "react-bootstrap";

const DeleteSubject = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;
    try {
      const { data } = await API.delete(`/subjects/${id}`);
      setMessage(data.message);
    } catch (err) {
      setMessage("Error deleting subject");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Delete Subject</h2>
      <Button variant="danger" onClick={handleDelete}>
        Delete Subject
      </Button>
      {message && <Alert className="mt-3">{message}</Alert>}
    </div>
  );
};

export default DeleteSubject;
