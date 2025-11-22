import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import { Card, Alert } from "react-bootstrap";

const SubjectDetails = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const { data } = await API.get(`/subjects/${id}`);
        setSubject(data);
      } catch (err) {
        setError("Failed to load subject details");
      }
    };
    fetchSubject();
  }, [id]);

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!subject) return <p>Loading...</p>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Subject Details</h2>
      <Card className="p-4">
        <h3>{subject.subjectName}</h3>
        <p><strong>Capacity:</strong> {subject.capacity}</p>
        <p><strong>Eligibility:</strong> {subject.eligibility || "N/A"}</p>
      </Card>
    </div>
  );
};

export default SubjectDetails;
