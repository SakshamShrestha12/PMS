import React from "react";
import { Link } from "react-router-dom";
import "../index.css"; // Ensure the CSS file is linked

const DepartmentsPage = () => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Patient Management System</h2>
        <nav>
          <ul>
            <li>
              <strong>Manager</strong>
            </li>
            <li>
              <strong>OPD</strong>
              <ul>
                <li><Link to="/opd/register">Register patients</Link></li>
                <li><Link to="/opd/patients">Patients list</Link></li>
                <li><Link to="/opd/paiment">Payment</Link></li>
              </ul>
            </li>
            <li>
              <strong>IPD</strong>
              <ul>
                <li><Link to="/ipd/register">Register patients</Link></li>
                <li><Link to="/ipd/patients">Patients list</Link></li>
                <li><Link to="/ipd/paiment">Payment</Link></li>
              </ul>
            </li>
            <li>
              <strong>Medicines</strong>
              <ul>
                <li><Link to="/medicines">List all</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <h2>Departments - Name</h2>
        <table>
          <thead>
            <tr>
              <th>Doctors</th>
              <th>Status</th>
              <th>Available till</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dr. Smith</td>
              <td><span className="status green"></span></td>
              <td>02:30 PM</td>
            </tr>
            <tr>
              <td>Dr. John</td>
              <td><span className="status red"></span></td>
              <td>04:00 PM</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default DepartmentsPage;
