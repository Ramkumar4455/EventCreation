import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/navbar.css";
const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      padding: 20, 
      boxShadow: "0 4px 6px -1px rgba(102, 98, 98, 0.1)", 
      fontFamily: "Trebuchet MS" 
  }}>
    <div >
    <Link style={{ marginLeft: 50, display: "flex", alignItems: "center" }} to="/">
    <img 
        src="https://logodix.com/logo/985738.png" 
        className="CR7" 
        alt="CR7 Logo" 
        style={{ height: "40px", width: "auto", marginRight: "10px" }}
    />
    <h1 className="title" style={{color:" rgb(255, 31, 68)"}}>CR7 Events</h1></Link>
</div>

      <div class="leftnav" style={{ display: "flex", gap: 50 }}>
        {isLoggedIn ? (
          <>
          <Link to="/" className="navLink">Home</Link>
            <Link to="/create-event" className="navLink">Create Event</Link>
           
            <Link to="/my-event" className="navLink" >MyEvents</Link>
            <button onClick={handleLogout} className="signout">Log out</button>
          </>
        ) : (
          <>
          <Link to="/" className="navLink">Home</Link>
            <Link to="/login" className="navLink">Login</Link>
            <Link to="/signup" className="navLink">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
