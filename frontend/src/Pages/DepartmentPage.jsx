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
      const response = await fetch(`/api/departments/doctors/by-department/${departmentId}`);
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
      <div className="departments-container">
        <h2>Hospital Departments</h2>
        {departments.length > 0 ? (
          <div className="department-list">
            {departments.map((dept) => (
              <div key={dept._id} className="department-block" onClick={() => handleDepartmentClick(dept)}>
                <h3>{dept.name}</h3>
                <p>{dept.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No departments available.</p>
        )}

        {selectedDepartment && (
          <div className="doctors-container">
            <h3>Doctors in {selectedDepartment.name}</h3>
            {doctors.length > 0 ? (
              <ul>
                {doctors.map((doc) => (
                  <li key={doc._id}>
                    {doc.name} - {doc.specialization}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No doctors available in this department.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Departments;
