import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm"
      style={{
      background: "linear-gradient(90deg, #a8dadc, #457b9d)",


      }}
    >
      <div className="container">
        <a
          className="navbar-brand fw-bold fs-3 d-flex align-items-center text-white"
          href="#"
        >
          <FaGraduationCap className="me-2 text-warning" />
          SSAEMS
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item mx-2">
              <a className="nav-link text-white fw-semibold" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link text-white fw-semibold" href="#about">
                About
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link text-white fw-semibold" href="#process">
                How It Works
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link text-white fw-semibold" href="#contact">
                Contact
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="btn btn-outline-light px-4" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item mx-2">
              <a className="btn btn-warning text-dark px-4 fw-bold" href="/login">
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
