import React, { useState, useEffect } from "react";
import "../index.css";

const OPDPatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    // Fetch departments from backend
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments"); // Fetch departments
        if (!response.ok) throw new Error("Failed to fetch departments");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    // Fetch patients from backend
    const fetchPatients = async () => {
      try {
        const response = await fetch("/api/opd"); // Fetch IPD patients
        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDepartmentChange = async (e) => {
    const departmentId = e.target.value;
    setSelectedDepartment(departmentId);

    if (departmentId) {
      try {
        const response = await fetch(`/api/doctors/by-department/${departmentId}`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    } else {
      setDoctors([]); // Reset doctors list if no department selected
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.age.toString().includes(searchTerm)
  );

  return (
    <div className="patient-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Name or Age"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="department-filter">
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>

      <table className="patient-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Date</th>
            <th>Consultant</th>
            <th>Department</th> {/* Added Department Column */}
            <th>Doctor</th> {/* Added Doctor Column */}
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
              <tr key={patient._id || index}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.address}</td>
                <td>{patient.date ? new Date(patient.date).toLocaleDateString() : "N/A"}</td>
                <td>{patient.consultant}</td>
                <td>{patient.department?.name || "N/A"}</td> {/* Use department name */}
                <td>{patient.doctor?.name || "N/A"}</td> {/* Use doctor name */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No patients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OPDPatientList;
