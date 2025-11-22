import React from "react";
import {
  FaHome,
  FaListOl,
  FaCheckCircle,
  FaDownload,
  FaBell,
  FaSignOutAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const navItems = [
    { label: "Dashboard", icon: <FaHome />, link: "/student/dashboard" },
    { label: "Preferences", icon: <FaListOl />, link: "/student/preferences" },
    { label: "Allocated Subject", icon: <FaCheckCircle />, link: "/student/allocated" },
    { label: "Download Slip", icon: <FaDownload />, link: "/student/slip" },
    { label: "Notifications", icon: <FaBell />, link: "/student/notifications" },
  ];

  return (
    <motion.div
      className="d-flex flex-column align-items-start p-3 text-white shadow-lg"
      style={{
        width: "260px",
        height: "93vh",
        background: "linear-gradient(180deg, #283593 0%, #1A237E 100%)",
        position: "fixed",
        top: 0,
        left: 0,
        marginTop: "63px",
      }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo Section */}
      <div
        className="d-flex align-items-center mb-4 w-100 justify-content-center"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "15px",
          borderRadius: "12px",
        }}
      >
        <FaGraduationCap size={26} className="text-info me-2" />
        <h4 className="fw-bold m-0 text-white">SSAEMS</h4>
      </div>

      {/* Navigation Links */}
      <ul className="nav flex-column w-100 mt-2">
        {navItems.map((item, index) => (
          <motion.li
            key={index}
            className="nav-item mb-3"
            whileHover={{ scale: 1.03, x: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <a
              href={item.link}
              className="nav-link text-white d-flex align-items-center fw-semibold shadow-sm"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                borderRadius: "10px",
                padding: "12px 16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
            >
              <span className="me-3 fs-5 text-info">{item.icon}</span>
              {item.label}
            </a>
          </motion.li>
        ))}
      </ul>

      <div className="mt-auto w-100">
        <hr className="text-light opacity-50" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-light w-100 fw-bold d-flex align-items-center justify-content-center mt-2"
          style={{
            color: "#1A237E",
            borderRadius: "10px",
            padding: "10px 0",
          }}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Navbar;
