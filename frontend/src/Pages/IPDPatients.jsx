import React, { useState, useEffect } from "react";
import "../index.css";

const IPDPatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState("status");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments");
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
    const fetchPatients = async () => {
      try {
        const response = await fetch("/api/ipd");
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
      setDoctors([]);
    }
  };

  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
    setEditMode("status");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/ipd/${selectedPatient._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPatient),
      });
      if (response.ok) {
        alert("Patient details updated successfully");
        setPatients((prev) => prev.map((p) => (p._id === selectedPatient._id ? selectedPatient : p)));
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.age.toString().includes(searchTerm)
  );

  return (
    <div className="patient-list-container">
      <input type="text" placeholder="Search by Name or Age" value={searchTerm} onChange={handleSearch} />

      <select value={selectedDepartment} onChange={handleDepartmentChange}>
        <option value="">Select Department</option>
        {departments.map((department) => (
          <option key={department._id} value={department._id}>{department.name}</option>
        ))}
      </select>

      <table className="patient-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Date</th>
            <th>Consultant</th>
            <th>Department</th>
            <th>Doctor</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.address}</td>
              <td>{new Date(patient.date).toLocaleDateString()}</td>
              <td>{patient.consultant}</td>
              <td>{patient.department?.name || "N/A"}</td>
              <td>{patient.doctor?.name || "N/A"}</td>
              <td>{patient.status || "N/A"}</td>
              <td><button onClick={() => handleEditClick(patient)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Patient</h3>
            <div className="edit-options">
              <button className={`edit-button ${editMode === "status" ? "active" : ""}`} onClick={() => setEditMode("status")}>Edit Status</button>
              <button className={`edit-button ${editMode === "details" ? "active" : ""}`} onClick={() => setEditMode("details")}>Edit Details</button>
            </div>

            {editMode === "status" ? (
              <input
                type="text"
                value={selectedPatient.status || ""}
                onChange={(e) => setSelectedPatient({ ...selectedPatient, status: e.target.value })}
                placeholder="Enter status"
              />
            ) : (
              <>
                <input type="text" value={selectedPatient.name} onChange={(e) => setSelectedPatient({ ...selectedPatient, name: e.target.value })} placeholder="Enter Name" />
                <input type="number" value={selectedPatient.age} onChange={(e) => setSelectedPatient({ ...selectedPatient, age: e.target.value })} placeholder="Enter Age" />
                <input type="text" value={selectedPatient.address} onChange={(e) => setSelectedPatient({ ...selectedPatient, address: e.target.value })} placeholder="Enter Address" />
              </>
            )}

            <div className="modal-buttons">
              <button onClick={handleSaveChanges}>Save</button>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPDPatientList;