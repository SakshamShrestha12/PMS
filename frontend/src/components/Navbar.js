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
          <Link to="/">Home</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/billing">Billing</Link>
         
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
