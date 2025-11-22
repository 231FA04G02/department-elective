import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p className="mb-0">
        © {new Date().getFullYear()} SSAEMS | Developed with ❤️ by Team Vignan Innovators
      </p>
    </footer>
  );
};

export default Footer;
