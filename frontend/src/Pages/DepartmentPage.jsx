import React, { useState, useEffect } from "react";
import "../index.css";

const checkAvailabilityStatus = (day, start_time, end_time) => {
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  
  // If it's not the matching day, return unavailable
  if (currentDay !== day) {
    return "red"; // Unavailable on different days
  }
  
  // Extract hours and minutes from current time
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;
  
  // Extract hours and minutes from availability times
  const [startHours, startMinutes] = start_time.split(':').map(Number);
  const [endHours, endMinutes] = end_time.split(':').map(Number);
  
  const startTimeInMinutes = startHours * 60 + startMinutes;
  const endTimeInMinutes = endHours * 60 + endMinutes;
  
  // Check if current time falls within the availability window
  if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) {
    return "green"; // Available
  } else {
    return "red"; // Unavailable
  }
};

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [newEntry, setNewEntry] = useState({
    type: "department",
    name: "",
    description: "",
    specialization: "",
    department_id: "",
    availability: [], // List of doctor availability
  });
  const [doctorAvailability, setDoctorAvailability] = useState({
    days: [], // Array of selected days
    times: {}, // Key-value pair of day -> {start_time, end_time}
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments/with-doctors");
        if (!response.ok) throw new Error("Failed to fetch departments");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleDepartmentClick = (dept) => {
    setSelectedDepartment(dept);
    setDoctors(dept.doctors || []);
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    // If doctor availability is empty, show alert
    if (newEntry.type === "doctor" && newEntry.availability.length === 0) {
      alert("Please select at least one availability day with start and end times.");
      return;
    }

    try {
      const url = newEntry.type === "department" ? "/api/departments" : "/api/doctors";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          newEntry.type === "department"
            ? { name: newEntry.name, description: newEntry.description }
            : {
                name: newEntry.name,
                specialization: newEntry.specialization,
                department_id: newEntry.department_id,
                availability: newEntry.availability,
              }
        ),
      });

      if (!response.ok) throw new Error(`Failed to add ${newEntry.type}`);
      const addedEntry = await response.json();

      if (newEntry.type === "department") {
        setDepartments([...departments, addedEntry]);
      } else {
        setDoctors([...doctors, addedEntry]);
      }

      // Reset state after successful submission
      setNewEntry({
        type: "department",
        name: "",
        description: "",
        specialization: "",
        department_id: "",
        availability: [],
      });
      setDoctorAvailability({ days: [], times: {} });
    } catch (error) {
      console.error(`Error adding ${newEntry.type}:`, error);
    }
  };

  const handleDaySelection = (e) => {
    const { value, checked } = e.target;

    // Update doctor availability state
    setDoctorAvailability((prev) => {
      const newDays = checked
        ? [...prev.days, value]
        : prev.days.filter((day) => day !== value);
      const newTimes = { ...prev.times };
      if (!checked) {
        delete newTimes[value];
      }
      return { ...prev, days: newDays, times: newTimes };
    });

    // Update newEntry.availability when days are selected
    if (checked) {
      setNewEntry((prev) => ({
        ...prev,
        availability: [
          ...prev.availability,
          { day: value, start_time: "", end_time: "" }, // Add empty time slots for the selected day
        ],
      }));
    } else {
      setNewEntry((prev) => ({
        ...prev,
        availability: prev.availability.filter((slot) => slot.day !== value),
      }));
    }
  };

  const handleTimeChange = (day, start_time, end_time) => {
    // Update doctor availability state
    setDoctorAvailability((prev) => ({
      ...prev,
      times: { ...prev.times, [day]: { start_time, end_time } },
    }));

    // Update newEntry.availability with selected start and end times
    setNewEntry((prev) => ({
      ...prev,
      availability: prev.availability.map((slot) =>
        slot.day === day ? { ...slot, start_time, end_time } : slot
      ),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  return (
    <div className="main-content">
      <h2>Manage Departments & Doctors</h2>

      <div className="button-container">
        <button onClick={() => setNewEntry({ ...newEntry, type: "department" })}>
          Add Department
        </button>
        <button onClick={() => setNewEntry({ ...newEntry, type: "doctor" })}>
          Add Doctor
        </button>
      </div>

      <form className="add-entry-form" onSubmit={handleAddEntry}>
        {newEntry.type === "department" ? (
          <>
            <input
              type="text"
              placeholder="Department Name"
              name="name"
              value={newEntry.name}
              onChange={handleInputChange}
              required
            />
            <textarea
              placeholder="Department Description"
              name="description"
              value={newEntry.description}
              onChange={handleInputChange}
              required
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Doctor Name"
              name="name"
              value={newEntry.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Specialization"
              name="specialization"
              value={newEntry.specialization}
              onChange={handleInputChange}
              required
            />
            <select
              name="department_id"
              value={newEntry.department_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>

            <div className="doctor-availability">
              <div className="days-selection">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      value={day}
                      checked={doctorAvailability.days.includes(day)}
                      onChange={handleDaySelection}
                    />
                    {day}
                  </label>
                ))}
              </div>

              {doctorAvailability.days.length > 0 && (
                <div className="time-selection">
                  {doctorAvailability.days.map((day) => (
                    <div key={day} className="day-time-selection">
                      <label>{day}</label>
                      <input
                        type="time"
                        placeholder="Start Time"
                        onChange={(e) =>
                          handleTimeChange(day, e.target.value, doctorAvailability.times[day]?.end_time || "")
                        }
                        required
                      />
                      <input
                        type="time"
                        placeholder="End Time"
                        onChange={(e) =>
                          handleTimeChange(day, doctorAvailability.times[day]?.start_time || "", e.target.value)
                        }
                        required
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        <button type="submit">
          Add {newEntry.type === "department" ? "Department" : "Doctor"}
        </button>
      </form>

      <div className="departments-grid">
        {departments.map((dept) => (
          <div
            key={dept._id}
            className="department-card"
            onClick={() => handleDepartmentClick(dept)}
          >
            <h3>Department: {dept.name}</h3>
            <p>{dept.description}</p>
            <p>Doctors: {dept.doctors ? dept.doctors.length : 0}</p>
          </div>
        ))}
      </div>

      {selectedDepartment && (
        <div className="doctor-table">
          <h3>Doctors in {selectedDepartment.name} Department</h3>
          {doctors.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Availability</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>
                      {doctor.availability.length > 0 ? (
                        <ul>
                          {doctor.availability.map((slot, index) => (
                            <li key={index}>
                              {slot.day}: {slot.start_time} - {slot.end_time}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "No availability"
                      )}
                    </td>
                    <td>
                      {doctor.availability.length > 0 ? (
                        doctor.availability.map((slot, index) => {
                          const status = checkAvailabilityStatus(slot.day, slot.start_time, slot.end_time);
                          return (
                            <div key={index} style={{ display: "flex", alignItems: "center" }}>
                              <span
                                className={`status-indicator ${status === "green" ? "green" : "red"}`}
                              />
                              <span style={{ marginLeft: "5px" }}>
                                {status === "green" ? "Available" : "Unavailable"}
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        "No availability"
                      )}
                    </td>
                  </tr>
                ))}
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

export default Departments;