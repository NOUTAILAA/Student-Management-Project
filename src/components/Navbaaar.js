import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/ModifierProfil" className={location.pathname === "/profile" ? "active" : ""}>H</Link>
        </li>
        
        <li>
          <Link to="/add-demande" className={location.pathname === "/add-demande" ? "active" : ""}>Classes</Link>
        </li>
        <li>
          <Link to="/voir demande" className={location.pathname === "/user-demandes" ? "active" : ""}>Groupes</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
