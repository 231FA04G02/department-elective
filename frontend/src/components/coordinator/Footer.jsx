import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-center py-3 mt-auto bg-white shadow-sm"
      style={{ borderTop: "2px solid #e0e0e0" }}
    >
      <small className="text-muted">
        © {new Date().getFullYear()} SSAEMS | Developed for Academic Automation
      </small>
    </footer>
  );
};

export default Footer;
