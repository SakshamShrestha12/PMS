import React, { useState, useEffect } from "react";
import "../index.css";

const OPDPatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("/api/opd"); // ✅ Fixed API route
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

      <table className="patient-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Date</th>
            <th>Consultant</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
              <tr key={patient._id || index}> {/* ✅ Use MongoDB `_id` if available */}
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.place}</td>
                <td>{patient.date ? new Date(patient.date).toLocaleDateString() : "N/A"}</td> {/* ✅ Fix date format */}
                <td>{patient.consultant}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No patients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OPDPatientList;
