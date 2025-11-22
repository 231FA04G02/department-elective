import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/api";
import { Card, ListGroup, Button, Row, Col } from "react-bootstrap";

const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await API.get("/subjects");
        setSubjects(data);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Subjects Management</h2>
      <div className="mb-4">
        <Link to="/subjects/create">
          <Button variant="success">Create New Subject</Button>
        </Link>
      </div>
      {subjects.length === 0 ? (
        <p>No subjects found.</p>
      ) : (
        <Row>
          {subjects.map((subject) => (
            <Col key={subject._id} md={4} className="mb-4">
              <Card>
                <Card.Header className="bg-info text-white">
                  <h5>{subject.subjectName}</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Capacity: {subject.capacity}</ListGroup.Item>
                    <ListGroup.Item>Eligibility: {subject.eligibility || "N/A"}</ListGroup.Item>
                  </ListGroup>
                  <div className="d-flex gap-2 mt-3">
                    <Link to={`/subjects/${subject._id}`}>
                      <Button variant="info" size="sm">View</Button>
                    </Link>
                    <Link to={`/subjects/${subject._id}/update`}>
                      <Button variant="warning" size="sm">Update</Button>
                    </Link>
                    <Link to={`/subjects/${subject._id}/delete`}>
                      <Button variant="danger" size="sm">Delete</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default SubjectsList;
