import { useEffect, useState } from "react";

const Home = () => {
  const [patients, setPatients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="home">
      <div className="patients">
        {loading && <p>Loading patients...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {patients && patients.map((patient) => (
          <p key={patient._id}>{patient.Patient_name}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;
