import React, { useEffect, useState } from "react";
import API from "../../api/api";

const Preferences = () => {
  const [preferences, setPreferences] = useState([]);
  const [message, setMessage] = useState("Loading your preferences...");

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("You must be logged in to view your preferences.");
          return;
        }

        // ✅ Fetch logged-in student profile (to get regNo)
        const { data: profile } = await API.get("/student/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = profile.student;

        // ✅ Fetch all elective forms
        const { data: forms } = await API.get("/student/electives", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Find submission with matching regNo
        let found = null;
        for (const form of forms) {
          const { data: formData } = await API.get(`/student/electives/${form._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const match = formData.submissions?.find(
            (sub) => sub.regNo === user.regNo
          );
          if (match) {
            found = match.preferences;
            break;
          }
        }

        if (found && found.length > 0) {
          setPreferences(found);
          setMessage("");
        } else {
          setMessage("No preferences found for your account.");
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
        setMessage("Failed to fetch preferences from the server.");
      }
    };

    fetchPreferences();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h2 style={{ color: "#3f51b5" }}>🎯 Your Elective Preferences</h2>

      {message && <p style={{ color: "gray", marginTop: "15px" }}>{message}</p>}

      {preferences.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {preferences.map((pref, index) => (
            <li
              key={index}
              style={{
                background: "#f0f4ff",
                margin: "8px 0",
                padding: "10px 15px",
                borderRadius: "8px",
                fontWeight: "500",
              }}
            >
              {index + 1}. {pref}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Preferences;
