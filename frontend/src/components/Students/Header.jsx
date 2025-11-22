import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, LogOut, User, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ added

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // ✅ added

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
      style={{
        background: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <h5 className="fw-bold text-primary m-0">🎓 Student Dashboard</h5>

      <div className="d-flex align-items-center gap-3" ref={menuRef}>
        <motion.div
          whileHover={{ scale: 1.2 }}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <Bell size={22} color="#3f51b5" />
          <span
            className="badge bg-danger rounded-circle"
            style={{
              position: "absolute",
              top: "-6px",
              right: "-6px",
              fontSize: "0.6rem",
              padding: "4px 6px",
            }}
          >
            3
          </span>
        </motion.div>

        <div style={{ position: "relative" }}>
          <motion.img
            src="https://i.pravatar.cc/50"
            alt="profile"
            className="rounded-circle border border-2 border-primary"
            style={{
              width: "42px",
              height: "42px",
              cursor: "pointer",
              objectFit: "cover",
            }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setShowMenu((prev) => !prev)}
          />

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="shadow-lg bg-white rounded-3 py-2"
                style={{
                  position: "absolute",
                  top: "52px",
                  right: 0,
                  width: "180px",
                  zIndex: 20,
                }}
              >
                <button
                  className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 fw-semibold text-secondary"
                  onClick={() => alert("Edit Profile Clicked")}
                >
                  <Edit size={16} /> Edit Profile
                </button>
                <hr className="my-1" />
                <button
                  className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 fw-semibold text-danger"
                  onClick={() => navigate("/login")} // ✅ changed this line only
                >
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Header;
