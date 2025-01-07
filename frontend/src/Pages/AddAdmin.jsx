import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default to admin
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const route = "/api/user/register"; // Adjust the endpoint for adding admins

    try {
      const response = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add admin.");
      }

      const data = await response.json();
      setSuccess("Admin added successfully!");
      // Clear form fields
      setEmail("");
      setPassword("");
      setRole("admin");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="add-admin">
      <h1>Add Admin</h1>
      <form onSubmit={handleSubmit}>
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
        <button type="submit">Add Admin</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default AddAdmin;
