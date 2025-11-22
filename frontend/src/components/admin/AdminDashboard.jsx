import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Fetch stats if needed
    // const fetchStats = async () => {
    //   const { data } = await API.get("/admin/dashboard");
    //   setStats(data);
    // };
    // fetchStats();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Admin Dashboard</h2>
      <Row>
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Create Faculty</Card.Title>
              <Link to="/admin/create-faculty">
                <Button variant="primary">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>View Faculty</Card.Title>
              <Link to="/admin/faculty">
                <Button variant="primary">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pending Faculty</Card.Title>
              <Link to="/admin/faculty/pending">
                <Button variant="primary">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Assign Coordinator</Card.Title>
              <Link to="/admin/assign-coordinator">
                <Button variant="primary">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Dashboard Stats</Card.Title>
              <Link to="/admin/stats">
                <Button variant="primary">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Manage Subjects</Card.Title>
              <Link to="/subjects">
                <Button variant="primary">Go</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
