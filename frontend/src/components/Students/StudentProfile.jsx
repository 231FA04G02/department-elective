import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Card, Alert } from "react-bootstrap";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/student/profile");
        setProfile(data.student);
      } catch (err) {
        setError("Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">My Profile</h2>
      <Card>
        <Card.Body>
          <h5>Name: {profile.name}</h5>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentProfile;
