import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/login";
import AdminHome from "./Pages/AdminHome";
import SuperAdminHome from "./Pages/SuperAdminHome";
import DepartmentsPage from "./Pages/DepartmentPage";
import RegisterIPDPatients from "./Pages/RegisterIPDPatients";
import RegisterOPDPatients from "./Pages/RegisterOPDPatients";
import AppLayout from "./components/AppLayout"; // New Layout Component
import OPDPatientList from "./Pages/OPDPatients";
import IPDPatientList from "./Pages/IPDPatients";
import Departments from "./Pages/DepartmentPage";


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
        <Route
          path="/ipd/register"
          element={
            <AppLayout>
              <RegisterIPDPatients />
            </AppLayout>
          }
        />
         <Route
          path="/opd/patients"
          element={
            <AppLayout>
              <OPDPatientList />
            </AppLayout>
          }
        />
        <Route
          path="/ipd/patients"
          element={
            <AppLayout>
              <IPDPatientList />
            </AppLayout>
          }
        />
        <Route
          path="/api/departments"
          element={
            <AppLayout>
              <Departments />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
