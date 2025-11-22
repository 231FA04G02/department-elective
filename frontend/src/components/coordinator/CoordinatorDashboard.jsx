import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FaPlusCircle, FaBook, FaClipboardList, FaUpload, FaEye, FaPlay } from "react-icons/fa";

const CoordinatorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-primary">Faculty Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <FaPlusCircle size={40} className="text-success mb-3" />
            <h5>Create Elective Form</h5>
            <Button
              variant="success"
              className="mt-3"
              onClick={() => navigate("/faculty/create-elective-form")}
            >
              ➕ Create New Form
            </Button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <FaEye size={40} className="text-info mb-3" />
            <h5>View Elective Forms</h5>
            <Button
              variant="info"
              className="mt-3"
              onClick={() => navigate("/faculty/electives")}
            >
              👁 View Forms
            </Button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <FaUpload size={40} className="text-warning mb-3" />
            <h5>Upload Students</h5>
            <Button
              variant="warning"
              className="mt-3"
              onClick={() => navigate("/faculty/upload-students")}
            >
              📤 Upload CSV
            </Button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <FaBook size={40} className="text-primary mb-3" />
            <h5>Add Subject</h5>
            <Button
              variant="primary"
              className="mt-3"
              onClick={() => navigate("/faculty/add-subject")}
            >
              ➕ Add Subject
            </Button>
          </div>
        </div>


        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <FaPlay size={40} className="text-danger mb-3" />
            <h5>Run Allocation</h5>
            <Button
              variant="danger"
              className="mt-3"
              onClick={() => navigate("/faculty/allocate")}
            >
              ▶ Run
            </Button>
          </div>
        </div>
                <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <FaPlay size={40} className="text-danger mb-3" />
            <h5>Aoolcated Results</h5>
              <Button
                variant="outline-primary"
                className="mt-3 fw-semibold"
                onClick={() => (window.location.href = "/allocation/results")}
              >
                View Detailed Results
              </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoordinatorDashboard;
