import React, { useState, useEffect } from "react";
import API from "../../api/api";
import { Form, Button, Alert } from "react-bootstrap";

const SubmitPreferences = () => {
  const [subjects, setSubjects] = useState([]);
  const [preference, setPreference] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  const handlePreferenceChange = (subjectName) => {
    setPreference(subjectName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // ✅ Get user from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setError("User not found.");
        return;
      }

      // ✅ Send regNo + preferences to backend
      const { data } = await API.post("/student/preferences", {
        regNo: user.regNo || "",
        preferences: [preference], // always wrap in array
      });

      setMessage(data.message);
      setPreference("");
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Error submitting preferences";
      setError(errMsg);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Submit Elective Preferences</h2>

      <Form onSubmit={handleSubmit}>
        <h5 className="mb-3">Select your preferred subject:</h5>

        {subjects.map((subject) => (
          <div key={subject._id} className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="subjectPreference"
              id={subject._id}
              checked={preference === subject.subjectName}
              onChange={() => handlePreferenceChange(subject.subjectName)}
            />
            <label className="form-check-label" htmlFor={subject._id}>
              {subject.subjectName} (Capacity: {subject.capacity})
            </label>
          </div>
        ))}

        <Button
          type="submit"
          variant="success"
          className="mt-3 fw-semibold px-4"
          disabled={!preference}
        >
          Submit Preference
        </Button>
      </Form>

      {message && (
        <Alert variant="success" className="mt-3 text-center fw-semibold">
          {message}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="mt-3 text-center fw-semibold">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default SubmitPreferences;
