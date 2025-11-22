import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold" data-aos="fade-up">Contact Us</h2>
          <p className="text-secondary w-75 mx-auto" data-aos="fade-up" data-aos-delay="100">
            Have questions, feedback, or technical issues? We’re here to help!  
            Reach out to the <strong>SSAEMS Support Team</strong> and we’ll ensure a quick response.
          </p>
        </div>

        {/* Contact Info Row */}
        <div className="row text-center mb-5">
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <FaEnvelope className="text-info fs-1 mb-3" />
              <h5 className="fw-bold">Email</h5>
              <p className="text-secondary mb-0">support@ssaems.edu.in</p>
              <p className="text-secondary">info@ssaems.edu.in</p>
            </div>
          </div>

          <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <FaPhoneAlt className="text-info fs-1 mb-3" />
              <h5 className="fw-bold">Phone</h5>
              <p className="text-secondary mb-0">+91 98765 43210</p>
              <p className="text-secondary">+91 91234 56789</p>
            </div>
          </div>

          <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <FaMapMarkerAlt className="text-info fs-1 mb-3" />
              <h5 className="fw-bold">Address</h5>
              <p className="text-secondary mb-0">Vignan’s Foundation for Science,</p>
              <p className="text-secondary">Guntur, Andhra Pradesh, India</p>
            </div>
          </div>

          <div className="col-md-3" data-aos="fade-up" data-aos-delay="400">
            <div className="p-4 bg-white shadow-sm rounded-4 h-100">
              <FaClock className="text-info fs-1 mb-3" />
              <h5 className="fw-bold">Office Hours</h5>
              <p className="text-secondary mb-0">Mon - Fri: 9 AM - 6 PM</p>
              <p className="text-secondary">Sat: 9 AM - 1 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-8" data-aos="fade-up">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <h4 className="fw-bold text-info mb-3 text-center">
                  Send Us a Message
                </h4>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your full name" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                    <input type="email" className="form-control" id="email" placeholder="example@domain.com" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label fw-semibold">Subject</label>
                    <input type="text" className="form-control" id="subject" placeholder="e.g. Issue with login" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label fw-semibold">Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="4"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-info text-white px-5 py-2">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map (optional)
        <div className="mt-5 text-center" data-aos="zoom-in">
          <iframe
            title="Campus Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.209463267285!2d80.57381357501416!3d16.441907284293828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a7ab402ff4d0b%3A0x48c453207a52d8cb!2sVignan%27s%20Foundation%20for%20Science%2C%20Technology%20and%20Research!5e0!3m2!1sen!2sin!4v1699012485123!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div> */}
      </div>
    </section>
  );
};

export default Contact;
