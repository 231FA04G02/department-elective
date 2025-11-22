import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaBook, FaCog } from "react-icons/fa";

const Cards = () => {
  const data = [
    { title: "Students Uploaded", value: "320", icon: <FaUsers />, color: "#42a5f5" },
    { title: "Subjects Added", value: "12", icon: <FaBook />, color: "#66bb6a" },
    { title: "Pending Allocations", value: "0", icon: <FaCog />, color: "#ffa726" },
  ];

  return (
    <div className="row g-3 mb-4">
      {data.map((item, i) => (
        <div className="col-md-4" key={i}>
          <motion.div
            className="card text-center text-white border-0 shadow-sm p-3"
            style={{
              background: item.color,
              borderRadius: "12px",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="fs-3 mb-2">{item.icon}</div>
            <h6>{item.title}</h6>
            <h3 className="fw-bold">{item.value}</h3>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
