import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="logo-section">
        <Link to="/" className="logo-link">
          <img
            src="https://logodix.com/logo/985738.png"
            alt="CR7 Logo"
            className="CR7"
          />
          <h1 className="title">CR7 Events</h1>
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        {isLoggedIn ? (
          <>
            <Link to="/" className="navLink" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/create-event" className="navLink" onClick={() => setIsMenuOpen(false)}>Create Event</Link>
            <Link to="/my-event" className="navLink" onClick={() => setIsMenuOpen(false)}>MyEvents</Link>
            <button onClick={handleLogout} className="logoutBtn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navLink" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/signup" className="navLink" onClick={() => setIsMenuOpen(false)}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
