import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Card, Button, ListGroup, Alert } from "react-bootstrap";

const ViewElectiveForms = () => {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const { data } = await API.get("/faculty/electives");
        setForms(data);
      } catch (err) {
        console.error("Error fetching forms:", err);
        setError("Failed to load elective forms");
      }
    };
    fetchForms();
  }, []);

  // ✅ Function to convert data to CSV
  const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((obj) =>
      Object.values(obj)
        .map((value) =>
          typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value
        )
        .join(",")
    );
    return [headers, ...rows].join("\n");
  };

  // ✅ Function to export a specific form's submissions
  const exportToCSV = (form) => {
    if (!form.submissions || form.submissions.length === 0) {
      alert("No student submissions available for export.");
      return;
    }

    const formattedData = form.submissions.map((submission) => ({
      Student_Name: submission.studentName,
      Register_Number: submission.regNo,
      CGPA: submission.cgpa,
      Preferences: submission.preferences.join(" | "),
      Submitted_At: new Date(submission.submittedAt).toLocaleString(),
      Department: form.department,
    }));

    const csvData = convertToCSV(formattedData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${form.department}_Elective_Submissions.csv`;
    link.click();
  };

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary text-center">
        Elective Forms & Submissions
      </h2>

      {forms.length === 0 ? (
        <p className="text-center">No elective forms created yet.</p>
      ) : (
        <div className="row">
          {forms.map((form) => (
            <div key={form._id} className="col-md-6 mb-4">
              <Card className="shadow-sm border-0">
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{form.department} Electives</h5>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => exportToCSV(form)}
                  >
                    📥 Export CSV
                  </Button>
                </Card.Header>

                <Card.Body>
                  <h6>Available Subjects:</h6>
                  <ListGroup variant="flush" className="mb-3">
                    {form.electives.map((elec, idx) => (
                      <ListGroup.Item key={idx}>
                        {elec.subject} - {elec.capacity} seats
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  {/* Display submitted preferences if any */}
                  {form.submissions && form.submissions.length > 0 ? (
                    <>
                      <h6 className="mt-3">
                        Student Submissions ({form.submissions.length}):
                      </h6>
                      <ListGroup variant="flush">
                        {form.submissions.map((submission, idx) => (
                          <ListGroup.Item key={idx} className="bg-light">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <strong>{submission.studentName}</strong>
                                <br />
                                <small className="text-muted">
                                  Reg: {submission.regNo} | CGPA: {submission.cgpa}
                                </small>
                                <br />
                                <small className="text-primary">
                                  Preferences: {submission.preferences.join(", ")}
                                </small>
                              </div>
                              <small className="text-muted">
                                {new Date(submission.submittedAt).toLocaleDateString()}
                              </small>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </>
                  ) : (
                    <p className="text-muted mt-3">
                      No student submissions yet.
                    </p>
                  )}
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Created: {new Date(form.createdAt).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewElectiveForms;
