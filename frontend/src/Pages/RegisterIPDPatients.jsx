import React, { useState, useEffect } from "react";
import "../index.css"; // Import CSS file

const RegisterIPDPatients = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    gender: "",
    bloodGroup: "",
    address: "",
    phone: "",
    dob: "",
    department: "",
    doctor: "", // Add doctor to the formData
  });

  const [age, setAge] = useState(""); // State to store calculated age

  // Fetch departments from backend
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments");  // Make sure to update the correct API endpoint
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // Fetch doctors based on selected department
  const [doctors, setDoctors] = useState([]);
  const handleDepartmentChange = async (e) => {
    const departmentId = e.target.value;
    setFormData({ ...formData, department: departmentId });

    if (departmentId) {
      try {
        const response = await fetch(`/api/doctors/by-department/${departmentId}`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    } else {
      setDoctors([]);  // Reset doctors list if no department selected
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      const ageValue = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        setAge(ageValue - 1);
      } else {
        setAge(ageValue);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/ipd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, age }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("IPD patient registered successfully!");
        setFormData({
          name: "",
          date: "",
          gender: "",
          bloodGroup: "",
          address: "",
          phone: "",
          dob: "",
          department: "",
          doctor: "",
        });
        setAge("");
      } else {
        alert(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="main-content">
      <section className="register-form">
        <h2>IP - Register a Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <label htmlFor="date">Registration Date</label>
          </div>

          <div className="form-row">
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  required
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                />{" "}
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                />{" "}
                Other
              </label>
            </div>
            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood group"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="address"
              placeholder="House address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              placeholder="Date Of Birth"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <label htmlFor="dob">Date of Birth</label>
            {age && <span>Age: {age} years</span>}
          </div>

          <div className="form-row">
            <select
              name="department"
              value={formData.department}
              onChange={handleDepartmentChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              disabled={!formData.department}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                   {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </section>
    </main>
  );
};

export default RegisterIPDPatients;