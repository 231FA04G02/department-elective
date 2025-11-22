import React from "react";
import {
  FaHome,
  FaUpload,
  FaBook,
  FaCogs,
  FaChartBar,
  FaSignOutAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const links = [
    { label: "Dashboard", icon: <FaHome />, link: "/coordinator/dashboard" },
    { label: "Upload CSV", icon: <FaUpload />, link: "/coordinator/upload" },
    { label: "Manage Subjects", icon: <FaBook />, link: "/coordinator/subjects" },
    { label: "Allocation", icon: <FaCogs />, link: "/coordinator/allocation" },
    { label: "Reports", icon: <FaChartBar />, link: "/coordinator/reports" },
  ];

  return (
    <motion.div
      className="d-flex flex-column text-white p-3"
      style={{
        width: "250px",
        height: "100vh",
        background: "linear-gradient(180deg, #1A237E 0%, #283593 100%)",
        position: "fixed",
        top: 0,
        left: 0,
      }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex align-items-center justify-content-center mb-4">
        <FaGraduationCap size={26} className="text-info me-2" />
        <h4 className="fw-bold m-0 text-white">SSAEMS</h4>
      </div>

      <ul className="nav flex-column w-100">
        {links.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.05, x: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="nav-item mb-3"
          >
            <a
              href={item.link}
              className="nav-link text-white d-flex align-items-center p-2 rounded"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <span className="me-3 fs-5 text-info">{item.icon}</span>
              {item.label}
            </a>
          </motion.li>
        ))}
      </ul>

      <div className="mt-auto">
        <hr className="text-light opacity-50" />
        <button className="btn btn-light w-100 d-flex align-items-center justify-content-center fw-semibold">
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Navbar;
