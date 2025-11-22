import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Modal, Form, Button } from "react-bootstrap";

const ElectiveForm = ({ show, handleClose, electiveFormId }) => {
  const [formData, setFormData] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [studentData, setStudentData] = useState({
    name: "",
    regNo: "",
    cgpa: "",
  });

  useEffect(() => {
    if (show && electiveFormId) {
      const fetchForm = async () => {
        try {
          const { data } = await API.get(`/student/electives/${electiveFormId}`);
          setFormData(data);
        } catch (err) {
          console.error("Error fetching form:", err);
        }
      };
      fetchForm();
    }
  }, [show, electiveFormId]);

  const handlePreferenceChange = (subject) => {
    setPreferences((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...studentData,
      preferences,
      department: formData.department,
    };

    try {
      await API.post(`/student/electives/${electiveFormId}/submit`, payload);
      alert("✅ Preferences Submitted Successfully!");

      // Save to localStorage for display in StudentLanding
      localStorage.setItem("electivePreferences", JSON.stringify({
        preference1: preferences[0] || "",
        preference2: preferences[1] || "",
        preference3: preferences[2] || "",
        preference4: preferences[3] || "",
      }));

      handleClose();
    } catch (err) {
      alert("❌ Failed to submit preferences");
    }
  };

  if (!formData) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-primary">
          {formData.department} Electives
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={studentData.name}
              onChange={(e) =>
                setStudentData({ ...studentData, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Register Number</Form.Label>
            <Form.Control
              type="text"
              required
              value={studentData.regNo}
              onChange={(e) =>
                setStudentData({ ...studentData, regNo: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CGPA</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              required
              value={studentData.cgpa}
              onChange={(e) =>
                setStudentData({ ...studentData, cgpa: e.target.value })
              }
            />
          </Form.Group>

          <h5 className="fw-bold mb-3">Select Preferences</h5>
          {formData.electives.map((elec, idx) => (
            <div key={idx} className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id={elec.subject}
                onChange={() => handlePreferenceChange(elec.subject)}
              />
              <label className="form-check-label" htmlFor={elec.subject}>
                {elec.subject} ({elec.capacity} seats)
              </label>
            </div>
          ))}

          <Button type="submit" variant="success" className="mt-3">
            Submit Preferences
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ElectiveForm;
