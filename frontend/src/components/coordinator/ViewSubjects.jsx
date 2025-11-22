import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Card, ListGroup } from "react-bootstrap";

const ViewSubjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await API.get("/faculty/subjects");
        setSubjects(data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">All Subjects</h2>
      {subjects.length === 0 ? (
        <p>No subjects found.</p>
      ) : (
        <div className="row">
          {subjects.map((subject) => (
            <div key={subject._id} className="col-md-4 mb-4">
              <Card>
                <Card.Header className="bg-info text-white">
                  <h5>{subject.subjectName}</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Capacity: {subject.capacity}</ListGroup.Item>
                    <ListGroup.Item>Eligibility: {subject.eligibility || "N/A"}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewSubjects;
