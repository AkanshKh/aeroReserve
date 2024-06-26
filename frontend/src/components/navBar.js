import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import '../css/layout.css';
import { AuthContext } from "../context/authContext";
import { FaUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">
        <img src="/logo.png" height="34" alt="Logo" />
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/bookings">My Bookings</Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          {user ? (
            <li className="nav-item dropdown my-account" ref={dropdownRef}>
              <button className="nav-link dropdown-toggle acc-btn" onClick={toggleDropdown}>
                My Account
              </button>
              <div className={dropdownOpen ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="navbarDropdown" style={{ right: 0 }}>
                <div className="dropdown-header">
                  
                  <span className="dropdown-username">
                    <FaUserCircle size={20} style={{ marginRight: "10px" }} />
                    {user.username}
                  </span>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>
                  <CiLogout style={{ marginRight: "10px" }} />
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <button className="btnm" style={{ borderRadius: '15rem' }} onClick={() => window.location.href = '/login'}>
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
