import React, { useState, useEffect } from "react";
import "../index.css";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [doctors, setDoctors] = useState([]);

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

  const fetchDoctors = async (departmentId) => {
    try {
      const response = await fetch(`/api/doctors/by-department/${departmentId}`);
      if (!response.ok) throw new Error("Failed to fetch doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleDepartmentClick = (dept) => {
    setSelectedDepartment(dept);
    fetchDoctors(dept._id);
  };

  return (
    <div className="main-content">
      <h2>Departments</h2>

      {/* Sort Dropdown */}
      <select className="sort-dropdown">
        <option value="name">Sort by Name</option>
        <option value="doctors">Sort by No. of Doctors</option>
      </select>

      {/* Department Grid */}
      <div className="departments-grid">
        {departments.map((dept) => (
          <div key={dept._id} className="department-card" onClick={() => handleDepartmentClick(dept)}>
            <h3>Department: {dept.name}</h3>
            <p>Doctors: {dept.totalDoctors}</p>
            <p>Available: {dept.availableDoctors}</p>
            <p>Busy: {dept.busyDoctors}</p>
          </div>
        ))}
      </div>

      {/* Doctor List when a department is selected */}
      {selectedDepartment && (
        <div className="doctors-container">
          <h3>Doctors in {selectedDepartment.name}</h3>
          {doctors.length > 0 ? (
            <table className="doctors-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Available till</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => {
                  const { isAvailable, availableTill } = getDoctorStatus(doc.availability);
                  return (
                    <tr key={doc._id}>
                      <td>{doc.name}</td>
                      <td>
                        <span className={`status-indicator ${isAvailable ? "green" : "red"}`}></span>
                      </td>
                      <td>{availableTill}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No doctors available in this department.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Function to get doctor status
const getDoctorStatus = (availability) => {
  if (!availability || availability.length === 0) return { isAvailable: false, availableTill: "N/A" };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let isAvailable = false;
  let latestEndTime = "";

  availability.forEach((slot) => {
    const slotEndTime = convertToMinutes(slot.end_time);
    if (currentMinutes <= slotEndTime) isAvailable = true;
    latestEndTime = slot.end_time;
  });

  return { isAvailable, availableTill: latestEndTime };
};

// Helper function to convert time to minutes
const convertToMinutes = (time) => {
  const [timePart, period] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

export default Departments;
