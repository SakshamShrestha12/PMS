import React, { useState } from "react";
import "../index.css"; // Import CSS file

const RegisterOPDPatients = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
    phone: "",
    dob: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/opd/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("OPD patient registered successfully!");
        setFormData({ name: "", date: "", age: "", gender: "", bloodGroup: "", address: "", phone: "", dob: "", department: "" });
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
        <h2>OP - Register a Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="date" name="date" placeholder="Date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
            <div className="radio-group">
              <label><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
              <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
              <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> Other</label>
            </div>
            <input type="text" name="bloodGroup" placeholder="Blood group" value={formData.bloodGroup} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="text" name="address" placeholder="House address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            <input type="date" name="dob" placeholder="Date Of Birth" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </section>
    </main>
  );
};

export default RegisterOPDPatients;
