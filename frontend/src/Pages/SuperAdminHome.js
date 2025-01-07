import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuperAdminHome = () => {
  const [patients, setPatients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching patients...");
        const response = await fetch("/api/Patients/"); // Uses proxy
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log("Fetched data:", json);
        setPatients(json);
      } catch (err) {
        setError("Failed to fetch patients. Please try again later.");
        console.error("Error fetching patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Navigate to the add admins page
  const handleAddAdminClick = () => {
    navigate("/add-admin");
  };

  return (
    <div className="home">
      <div className="header">
        <h1>Super Admin Dashboard</h1>
        <button onClick={handleAddAdminClick} className="add-admin-button">
          Add Admins
        </button>
      </div>
      <div className="patients">
        {loading && <p>Loading patients...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {patients &&
          patients.map((patient) => (
            <p key={patient._id}>{patient.Patient_name}</p>
          ))}
      </div>
    </div>
  );
};

export default SuperAdminHome;
