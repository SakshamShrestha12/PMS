import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import Modal from "../Pages/Modal";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Make sure to create this CSS file

const AdminHome = () => {
  const [patients, setPatients] = useState([]);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= exp * 1000;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      navigate("/");
    }
  }, [navigate]);

  const fetchPatients = async () => {
    try {
      setLoadingPatients(true);
      setError(null);
      const response = await fetch(`/api/Patients`);
      if (!response.ok) {
        throw new Error("Failed to fetch patients.");
      }
      const data = await response.json();
      // Add this check
      setPatients(data.patients || []); // Default to empty array if undefined
    } catch (err) {
      setError("Failed to fetch patients. Please try again later.");
      setPatients([]); // Ensure patients is an array even on error
    } finally {
      setLoadingPatients(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="admin-container">

      <main className="main-content">
        <header className="header">
          <h1>Patient Management System</h1>
          <div className="filter-search">
            <button className="filter-button">filter</button>
            <input type="text" placeholder="Search" className="search-bar" />
          </div>
        </header>

        <section className="patient-table">
          <h2>O P D</h2>
          {loadingPatients ? (
            <p>Loading patients...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Place</th>
                  <th>Date</th>
                  <th>Consultant</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.place}</td>
                    <td>{patient.date}</td>
                    <td>{patient.consultant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminHome;
