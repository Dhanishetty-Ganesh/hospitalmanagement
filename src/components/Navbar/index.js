import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './index.css';
import {
  FaHome,
  FaHospital,
  FaUserMd,
  FaUserInjured,
  FaChartPie,
  FaSignOutAlt,
} from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-logo">KristalCare</span>
        <div className="navbar-links">
          <NavLink to="/home" className="nav-link">
            <FaHome /> Home
          </NavLink>

          {role === 'admin' && (
            <>
              <NavLink to="/admin" className="nav-link">
                <FaHospital /> Admin Panel
              </NavLink>
              <NavLink to="/dashboard" className="nav-link">
                <FaChartPie /> Dashboard
              </NavLink>
            </>
          )}
          {(role === 'admin' || role === 'doctor') && (
  <NavLink to="/patients" className="nav-link">
    🧑‍🤝‍🧑 Patients
  </NavLink>
)}


          {role === 'doctor' && (
            <>
              <NavLink to="/doctor" className="nav-link">
                <FaUserMd /> Doctor Panel
              </NavLink>
              <NavLink to="/dashboard" className="nav-link">
                <FaChartPie /> Dashboard
              </NavLink>
            </>
          )}

          {role === 'patient' && (
            <>
              <NavLink to="/patient" className="nav-link">
                <FaUserInjured /> Patient Panel
              </NavLink>
            </>
          )}
        </div>

        <div className="navbar-user">
          <span>👤 {username}</span>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
