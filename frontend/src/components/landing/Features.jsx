import React from "react";
import { FaDatabase, FaUserGraduate, FaLock, FaChartBar } from "react-icons/fa";

const Features = () => {
  return (
    <section id="features" className="py-5 bg-light text-center">
      <div className="container">
        <h2 className="fw-bold mb-4" data-aos="fade-up">
          ✨ Key Features
        </h2>
        <p className="text-secondary mb-5" data-aos="fade-up" data-aos-delay="100">
          Explore what makes <span className="fw-semibold text-info">SSAEMS</span> a powerful and user-friendly platform for academic automation.
        </p>

        <div className="row g-4">
          {/* Feature Card 1 */}
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
            <div className="card shadow border-0 h-100 feature-card">
              <div className="card-body">
                <FaDatabase className="text-info fs-1 mb-3" />
                <h5 className="fw-bold">Automated Allocation</h5>
                <p className="text-secondary">
                  Allocates electives based on merit, preference, and seat availability with complete transparency.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
            <div className="card shadow border-0 h-100 feature-card">
              <div className="card-body">
                <FaUserGraduate className="text-info fs-1 mb-3" />
                <h5 className="fw-bold">Student Dashboard</h5>
                <p className="text-secondary">
                  Students can view preferences, track allocation status, and download confirmation slips.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
            <div className="card shadow border-0 h-100 feature-card">
              <div className="card-body">
                <FaLock className="text-info fs-1 mb-3" />
                <h5 className="fw-bold">Secure Access</h5>
                <p className="text-secondary">
                  JWT-based authentication ensures role-based secure access for every user type.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Card 4 */}
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="400">
            <div className="card shadow border-0 h-100 feature-card">
              <div className="card-body">
                <FaChartBar className="text-info fs-1 mb-3" />
                <h5 className="fw-bold">Real-Time Analytics</h5>
                <p className="text-secondary">
                  Get instant reports on subject demand, cutoff ranks, and overall student satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
