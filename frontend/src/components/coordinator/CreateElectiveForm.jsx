import React, { useState } from "react";
import API from "../../api/api";
import { Button, Form } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

const CreateElectiveForm = () => {
  const [department, setDepartment] = useState("");
  const [electives, setElectives] = useState([{ subject: "", capacity: "" }]);

  const addElective = () => {
    setElectives([...electives, { subject: "", capacity: "" }]);
  };

  const removeElective = (index) => {
    setElectives(electives.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...electives];
    updated[index][field] = value;
    setElectives(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      createdBy: "faculty123", // replace with real user ID
      department,
      electives,
    };

    try {
      await API.post("/faculty/electives", payload);
      alert("✅ Elective Form Created Successfully!");
      setDepartment("");
      setElectives([{ subject: "", capacity: "" }]);
    } catch (err) {
      alert("❌ Failed to create form");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4">Create Elective Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="e.g., CSE"
            required
          />
        </Form.Group>

        <h5 className="fw-bold mb-3">Electives</h5>
        {electives.map((elec, index) => (
          <div key={index} className="d-flex mb-3 gap-2">
            <Form.Control
              type="text"
              placeholder="Subject Name"
              value={elec.subject}
              onChange={(e) => handleChange(index, "subject", e.target.value)}
              required
            />
            <Form.Control
              type="number"
              placeholder="Capacity"
              value={elec.capacity}
              onChange={(e) => handleChange(index, "capacity", e.target.value)}
            />
            {index > 0 && (
              <Button variant="danger" onClick={() => removeElective(index)}>
                <FaTrash />
              </Button>
            )}
          </div>
        ))}

        <Button variant="outline-primary" onClick={addElective} className="mb-4">
          <FaPlus /> Add Elective
        </Button>
        <br />
        <Button type="submit" variant="success" className="fw-semibold">
          Submit Form
        </Button>
      </Form>
    </div>
  );
};

export default CreateElectiveForm;
