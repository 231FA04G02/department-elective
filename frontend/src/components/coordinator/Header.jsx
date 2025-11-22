import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ title }) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm bg-white"
      style={{ borderBottom: "3px solid #e0e0e0" }}
    >
      <h4 className="fw-bold text-primary m-0">{title}</h4>
      <div className="d-flex align-items-center">
        <div className="text-end me-3">
          <div className="fw-semibold">Dr. Priya Sharma</div>
          <small className="text-muted">Elective Coordinator</small>
        </div>
        <FaUserCircle size={40} className="text-primary" />
      </div>
    </div>
  );
};

export default Header;
