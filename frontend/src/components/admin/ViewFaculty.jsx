import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Card, ListGroup } from "react-bootstrap";

const ViewFaculty = () => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const { data } = await API.get("/admin/faculty");
        setFaculty(data.faculty);
      } catch (err) {
        console.error("Error fetching faculty:", err);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">All Faculty</h2>
      {faculty.length === 0 ? (
        <p>No faculty found.</p>
      ) : (
        <div className="row">
          {faculty.map((fac) => (
            <div key={fac._id} className="col-md-4 mb-4">
              <Card>
                <Card.Header className="bg-success text-white">
                  <h5>{fac.name}</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Email: {fac.email}</ListGroup.Item>
                    <ListGroup.Item>Approved: {fac.isApproved ? "Yes" : "No"}</ListGroup.Item>
                    <ListGroup.Item>Coordinator: {fac.isCoordinator ? "Yes" : "No"}</ListGroup.Item>
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

export default ViewFaculty;
