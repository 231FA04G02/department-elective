import React from "react";

const Home = () => {
  return (
    <section
      id="home"
      className="d-flex align-items-center justify-content-center text-center text-white"
      style={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,50,0.7), rgba(0,0,70,0.9)), url('https://cdn.pixabay.com/photo/2016/11/22/23/42/graduation-1858255_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold">
          Smart Subject Allocation <br />
          <span className="text-info">Made Effortless</span>
        </h1>
        <p className="lead mt-3 mb-4">
          Automate, simplify, and enhance elective management with transparency, fairness, and speed — designed for modern universities.
        </p>

        <div>
          <a href="#features" className="btn btn-info text-white btn-lg px-4 me-3">
            Start Your Journey →
          </a>
          <a href="/login" className="btn btn-outline-light btn-lg px-4">
            Sign In
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
