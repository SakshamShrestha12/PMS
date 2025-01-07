import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/userLogin"; // Ensure this is the correct path

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default to admin
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login, isLoading } = useLogin(); // Use the login hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const route = role === "admin"
    ? "/api/user/login/admin"
    : "/api/user/login/superadmin";


    try {
      const data = await login(email, password, route);

      if (data) {
        // Redirect after successful login based on role
        if (data.user.role === "admin") {
          navigate("/admin/home");
        } else if (data.user.role === "super_admin") {
          navigate("/superadmin/home");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
