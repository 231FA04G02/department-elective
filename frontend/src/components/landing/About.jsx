import React from "react";

const About = () => {
  return (
    <section id="about" className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold" data-aos="fade-up">About SSAEMS</h2>
          <p className="text-secondary w-75 mx-auto" data-aos="fade-up" data-aos-delay="100">
            The <span className="fw-semibold text-info">Smart Subject Allocation & Elective Management System (SSAEMS)</span> 
            is a next-generation web solution designed to automate and simplify elective subject management in universities.
            Built using the <strong>MERN Stack</strong>, it ensures a transparent, data-driven, and fair process for both 
            students and faculty members.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="row align-items-center">
          <div className="col-md-6" data-aos="fade-right">
            <img
              src="https://cdn.pixabay.com/photo/2017/01/10/19/05/graduation-1965639_1280.jpg"
              alt="Students choosing subjects"
              className="img-fluid rounded-4 shadow"
            />
          </div>

          <div className="col-md-6" data-aos="fade-left" data-aos-delay="200">
            <h4 className="fw-bold text-info mb-3">What Makes SSAEMS Unique?</h4>
            <ul className="list-group list-group-flush text-start">
              <li className="list-group-item">
                ✅ <strong>Automated Fairness:</strong> Allocation based on merit, preference, and availability — no manual bias.
              </li>
              <li className="list-group-item">
                ⚙️ <strong>Data-Driven Decisions:</strong> Integrates academic performance and real-time analytics for smarter allocations.
              </li>
              <li className="list-group-item">
                🔒 <strong>Role-Based Security:</strong> JWT-based login ensures only authorized users access the system.
              </li>
              <li className="list-group-item">
                📊 <strong>Transparent Reports:</strong> Easily export results to Excel/PDF and visualize seat usage trends.
              </li>
              <li className="list-group-item">
                🧠 <strong>Future-Ready:</strong> Designed for AI-based elective recommendations and ERP integration.
              </li>
            </ul>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="text-center mt-5" data-aos="fade-up">
          <h4 className="fw-bold text-info mb-3">Our Vision & Mission</h4>
          <p className="text-secondary w-75 mx-auto">
            At SSAEMS, our mission is to <strong>empower institutions</strong> with automation tools 
            that reduce manual workload, promote fairness, and improve academic efficiency.  
            Our vision is to make <em>digital academic management</em> simple, transparent, and accessible 
            to every university across India and beyond.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="row text-center mt-5">
          <div className="col-md-4" data-aos="zoom-in">
            <div className="p-4 shadow rounded-4 bg-light h-100">
              <h5 className="fw-bold text-info">70% Workload Reduction</h5>
              <p className="text-secondary small mb-0">
                Automation minimizes manual sorting, data entry, and subject mapping.
              </p>
            </div>
          </div>
          <div className="col-md-4" data-aos="zoom-in" data-aos-delay="150">
            <div className="p-4 shadow rounded-4 bg-light h-100">
              <h5 className="fw-bold text-info">100% Transparency</h5>
              <p className="text-secondary small mb-0">
                Every allocation decision is data-driven and visible to all stakeholders.
              </p>
            </div>
          </div>
          <div className="col-md-4" data-aos="zoom-in" data-aos-delay="300">
            <div className="p-4 shadow rounded-4 bg-light h-100">
              <h5 className="fw-bold text-info">Faster Results</h5>
              <p className="text-secondary small mb-0">
                Allocation results are generated in seconds, not days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
