import React, { useState, useEffect } from "react";
import API from "../../api/api";
import { Card, Row, Col, Alert } from "react-bootstrap";

const AdminDashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/admin/dashboard");
        setStats(data);
      } catch (err) {
        setError("Failed to load dashboard stats");
      }
    };
    fetchStats();
  }, []);

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!stats) return <p>Loading...</p>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Admin Dashboard Statistics</h2>
      <Row>
        <Col md={3}>
          <Card className="text-center p-3">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3">
            <h3>{stats.totalFaculty}</h3>
            <p>Total Faculty</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3">
            <h3>{stats.pendingFaculty}</h3>
            <p>Pending Faculty</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3">
            <h3>{stats.totalCoordinators}</h3>
            <p>Total Coordinators</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3">
            <h3>{stats.totalSubjects}</h3>
            <p>Total Subjects</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center p-3">
            <h3>{stats.totalAllotments}</h3>
            <p>Total Allotments</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboardStats;
