import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Card, Button, ListGroup } from "react-bootstrap";

const PendingFaculty = () => {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const { data } = await API.get("/admin/faculty/pending");
        setPending(data.pending);
      } catch (err) {
        console.error("Error fetching pending faculty:", err);
      }
    };
    fetchPending();
  }, []);

  const approveFaculty = async (id) => {
    try {
      await API.put(`/admin/faculty/approve/${id}`);
      setPending(pending.filter((fac) => fac._id !== id));
    } catch (err) {
      console.error("Error approving faculty:", err);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Pending Faculty Approvals</h2>
      {pending.length === 0 ? (
        <p>No pending faculty.</p>
      ) : (
        <div className="row">
          {pending.map((fac) => (
            <div key={fac._id} className="col-md-4 mb-4">
              <Card>
                <Card.Header className="bg-warning text-white">
                  <h5>{fac.name}</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Email: {fac.email}</ListGroup.Item>
                  </ListGroup>
                  <Button
                    variant="success"
                    onClick={() => approveFaculty(fac._id)}
                    className="mt-2"
                  >
                    Approve
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingFaculty;
