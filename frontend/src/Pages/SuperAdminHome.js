import { useState, useEffect } from "react";
import Modal from "../Pages/Modal";
import { useNavigate } from "react-router-dom";

const SuperAdminHome = () => {
  const [patients, setPatients] = useState([]); // Store patients data
  const [admins, setAdmins] = useState([]); // Store admins data
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [error, setError] = useState(null);
  const [modalError, setModalError] = useState(""); // Error specific to modal
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // Check token validity
  const isTokenExpired = (token) => {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    return Date.now() >= exp * 1000;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch all patients
  const fetchPatients = async () => {
    try {
      setLoadingPatients(true);
      setError(null);
      const response = await fetch(`/api/Patients`); // No pagination query
      if (!response.ok) {
        throw new Error("Failed to fetch patients.");
      }
      const data = await response.json();
      setPatients(data.patients); // Update patients data
    } catch (err) {
      setError("Failed to fetch patients. Please try again later.");
    } finally {
      setLoadingPatients(false);
    }
  };

  // Fetch admins data
  const fetchAdmins = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoadingAdmins(true);
      setError(null);
      const response = await fetch("/api/user/get-admins", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch admins.");
      }
      const data = await response.json();
      setAdmins(data);
    } catch (err) {
      setError("Failed to fetch admins. Please try again later.");
    } finally {
      setLoadingAdmins(false);
    }
  };

  useEffect(() => {
    fetchPatients(); // Fetch all patients
    fetchAdmins();
  }, []); // Only run once when the component is mounted

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    setModalError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setModalError("Passwords do not match. Please try again.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setModalError("Please log in first.");
      return;
    }

    try {
      const response = await fetch("/api/user/add-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password, role: "admin" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setModalError(errorData.message || "Failed to add admin.");
        return;
      }

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowModal(false);
      setSuccessMessage("Admin added successfully!");
      fetchAdmins();
    } catch (err) {
      setModalError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="home">
      <div className="header" style={{ marginLeft: "250px" }}>
        <h1>Super Admin Dashboard</h1>
        <button onClick={() => setShowModal(true)} className="add-admin-button">
          Add Admins
        </button>
      </div>

      {successMessage && (
        <div className="success-message" onClick={() => setSuccessMessage("")}>
          {successMessage}
        </div>
      )}

      <div className="patients" style={{ marginLeft: "250px" }}>
        <h2>Patients</h2>
        {loadingPatients && <p>Loading patients...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {Array.isArray(patients) && patients.length > 0 ? (
            patients.map((patient) => <li key={patient._id}>{patient.Patient_name}</li>)
          ) : (
            <p>No patients found.</p>
          )}
        </ul>
      </div>

      <div className="admins" style={{ marginLeft: "250px" }}>
        <h2>Admins</h2>
        {loadingAdmins && <p>Loading admins...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {admins.length > 0 ? (
            admins.map((admin) => <li key={admin._id}>{admin.email}</li>)
          ) : (
            <p>No admins found.</p>
          )}
        </ul>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Add Admin</h2>
        {modalError && <p style={{ color: "red" }}>{modalError}</p>}
        <form onSubmit={handleAddAdmin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <button type="submit">Add Admin</button>
        </form>
      </Modal>
    </div>
  );
};

export default SuperAdminHome;
