import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout(); // Call the logout function from your custom hook
    navigate("/"); // Redirect to the login page after logout
  };

  return (
    <div className="navbar-container">
      <Link to="/">
        <h1>Patient Management System</h1>
      </Link>
      <nav>
        <div>
          <button onClick={handleClick}>Log Out</button>
        </div>
        <div className="navbar-links">
          <Link to="/admin/home">Home</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/billing">Billing</Link>
        </div>
      </nav>
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <h2>Manager</h2>
      <nav>
        <ul>
          <li>OPD</li>
          <ul>
            <li onClick={() => navigate("/opd/register")} style={{ cursor: "pointer" }}>
              Register patients
            </li>
            <li onClick={() => navigate("/opd/patients")} style={{ cursor: "pointer" }}>
              Patients list
            </li>
          </ul>
          <li>IPD</li>
          <ul>
            <li onClick={() => navigate("/ipd/register")} style={{ cursor: "pointer" }}>
              Register patients
            </li>
            <li onClick={() => navigate("/ipd/patients")} style={{ cursor: "pointer" }}>
              Patients list
            </li>
          </ul>
          <li>Medicine</li>
          <ul>
            <li onClick={() => navigate("/medicine/list")} style={{ cursor: "pointer" }}>
              List all
            </li>
          </ul>
        </ul>
      </nav>
    </aside>
  );
};

// Export both components
export { Navbar, Sidebar };
