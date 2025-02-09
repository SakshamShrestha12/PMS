import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/login";
import AdminHome from "./Pages/AdminHome";
import SuperAdminHome from "./Pages/SuperAdminHome";
import DepartmentsPage from "./Pages/DepartmentPage";
import RegisterOPDPatients from "./Pages/RegisterOPDPatients";
import AppLayout from "./components/AppLayout"; // New Layout Component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Pages with Layout */}
        <Route
          path="/admin/home"
          element={
            <AppLayout>
              <AdminHome />
            </AppLayout>
          }
        />
        <Route
          path="/superadmin/home"
          element={
            <AppLayout>
              <SuperAdminHome />
            </AppLayout>
          }
        />
        <Route
          path="/departments"
          element={
            <AppLayout>
              <DepartmentsPage />
            </AppLayout>
          }
        />
        <Route
          path="/opd/register"
          element={
            <AppLayout>
              <RegisterOPDPatients />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
