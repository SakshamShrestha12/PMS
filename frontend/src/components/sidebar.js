import React from "react";
import { useNavigate } from "react-router-dom";

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
            <li onClick={() => navigate("/opd/payment")} style={{ cursor: "pointer" }}>
              Payment
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
            <li onClick={() => navigate("/ipd/payment")} style={{ cursor: "pointer" }}>
              Payment
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

export default Sidebar;
