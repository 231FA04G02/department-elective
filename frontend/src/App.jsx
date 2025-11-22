import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🌐 Common Pages
import Landing from "./components/Landing";
import Register from "./components/register/Register";
import Login from "./components/login/Login";

// 🎓 Student Components
import StudentLanding from "./components/Students/StudentLanding";
import ElectiveForm from "./components/Students/ElectiveForm";
import StudentProfile from "./components/Students/StudentProfile";
import ViewAllotment from "./components/Students/ViewAllotment";
// import Preference from "./components/Students/SubmitPreferences";

// 🧑‍🏫 Faculty / Coordinator Components
import CoordinatorDashboard from "./components/coordinator/CoordinatorDashboard";
import CreateElectiveForm from "./components/coordinator/CreateElectiveForm";
import ViewElectiveForms from "./components/coordinator/ViewElectiveForms";
import UploadStudents from "./components/coordinator/UploadStudents";
import AddSubject from "./components/coordinator/AddSubject";
import ViewSubjects from "./components/coordinator/ViewSubjects";
import RunAllocation from "./components/coordinator/RunAllocation";

// 👨‍💼 Admin Components
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminDashboardStats from "./components/admin/AdminDashboardStats";
import CreateFaculty from "./components/admin/CreateFaculty";
import ViewFaculty from "./components/admin/ViewFaculty";
import PendingFaculty from "./components/admin/PendingFaculty";
import AssignCoordinator from "./components/admin/AssignCoordinator";

// 📚 Subject Components
import SubjectsList from "./components/subjects/SubjectsList";
import CreateSubject from "./components/subjects/CreateSubject";
import UpdateSubject from "./components/subjects/UpdateSubject";
import DeleteSubject from "./components/subjects/DeleteSubject";
import SubjectDetails from "./components/subjects/SubjectDetails";

import "./App.css"; // ✅ Custom CSS for chatbot styles
import SubmitPreferences from "./components/Students/SubmitPreferences";


function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => setShowChatbot(!showChatbot);

  return (
    <Router>
      <div className="app-container">
        {/* ✅ App Routes */}
        <Routes>
          {/* 🌐 Public Pages */}
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* 🎓 Student Routes */}
          <Route path="/student/dashboard" element={<StudentLanding />} />
          <Route path="/student/elective/:id" element={<ElectiveForm />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/preferences" element={<SubmitPreferences />} />
          <Route path="/student/allocated" element={<ViewAllotment />} />
          <Route path="/allocation/results" element={<ViewAllotment />} />



          {/* 🧑‍🏫 Coordinator / Faculty Routes */}
          <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
          <Route path="/faculty/create-elective-form" element={<CreateElectiveForm />} />
          <Route path="/faculty/electives" element={<ViewElectiveForms />} />
          <Route path="/faculty/upload-students" element={<UploadStudents />} />
          <Route path="/faculty/add-subject" element={<AddSubject />} />
          <Route path="/faculty/subjects" element={<ViewSubjects />} />
          <Route path="/faculty/allocate" element={<RunAllocation />} />

          {/* 👨‍💼 Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/stats" element={<AdminDashboardStats />} />
          <Route path="/admin/create-faculty" element={<CreateFaculty />} />
          <Route path="/admin/faculty" element={<ViewFaculty />} />
          <Route path="/admin/faculty/pending" element={<PendingFaculty />} />
          <Route path="/admin/assign-coordinator" element={<AssignCoordinator />} />

          {/* 📚 Subject Routes */}
          <Route path="/subjects" element={<SubjectsList />} />
          <Route path="/subjects/create" element={<CreateSubject />} />
          <Route path="/subjects/:id/update" element={<UpdateSubject />} />
          <Route path="/subjects/:id/delete" element={<DeleteSubject />} />
          <Route path="/subjects/:id" element={<SubjectDetails />} />
        </Routes>

        {/* 💬 Floating Chat Button */}
        <button onClick={toggleChatbot} className="chatbot-toggle-btn">
          🤖
        </button>

        {/* 🪟 Chatbot Popup */}
        {showChatbot && (
          <div className="chatbot-popup">
            <div className="chatbot-header">
              <h3>Smart Assistant</h3>
              <button onClick={toggleChatbot} className="chatbot-close-btn">
                ✖
              </button>
            </div>

            {/* 🧠 You can replace this with your AI chatbot or local bot */}
            <iframe
              src={import.meta.env.VITE_CHATBOT_URL || "http://localhost:3000"}
              title="Chatbot"
              className="chatbot-iframe"
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
