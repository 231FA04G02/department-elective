import React from "react";
import Header from "./landing/Header";
import Features from "./landing/Features";
import About from "./landing/About";
import Contact from "./landing/Contact";
import Footer from "./landing/Footer";
import Home from "./landing/Home";

const Landing = () => {
  return (
    <div>
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <Home />

      {/* Features Section */}
      <Features />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Landing;
