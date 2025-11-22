import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaPlus } from "react-icons/fa";

const Form = () => {
  const [subject, setSubject] = useState({
    name: "",
    code: "",
    capacity: "",
    eligibility: "",
  });

  const handleChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Subject "${subject.name}" added successfully!`);
    setSubject({ name: "", code: "", capacity: "", eligibility: "" });
  };

  return (
    <motion.div
      className="card shadow-sm border-0"
      style={{ borderRadius: "12px" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="card-body">
        <h5 className="fw-bold mb-3">
          <FaBookOpen className="text-primary me-2" />
          Add / Edit Elective Subjects
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Subject Name"
                value={subject.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                name="code"
                className="form-control"
                placeholder="Subject Code"
                value={subject.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                name="capacity"
                className="form-control"
                placeholder="Capacity"
                value={subject.capacity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="eligibility"
                className="form-control"
                placeholder="Eligibility (e.g. CGPA > 7.0)"
                value={subject.eligibility}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-primary fw-semibold" type="submit">
                <FaPlus className="me-1" /> Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Form;
