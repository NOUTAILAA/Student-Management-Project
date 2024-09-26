import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/login" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <Link to="/students" className={location.pathname === "/students" ? "active" : ""}>Students</Link>
        </li>
        <li>
          <Link to="/classes" className={location.pathname === "/classes" ? "active" : ""}>Classes</Link>
        </li>
        <li>
          <Link to="/groupes" className={location.pathname === "/groupes" ? "active" : ""}>Groupes</Link>
        </li>
        <li>
          <Link to="/all-demandes" className={location.pathname === "/all-demandes" ? "active" : ""}>All Requests</Link> {/* Add new link */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
