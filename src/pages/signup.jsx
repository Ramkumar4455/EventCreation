import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();

    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/signup", { username, password });
      toast.success("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <>
    <div className="search-wrapper" style={{marginTop:"100px",marginBottom:"0px"}}>
    <h1 className='allevents' style={{color:" rgb(255, 31, 68)"}}>Sign Up</h1>
  </div>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '100vh',
      paddingTop: '40px'
    }}>
      
      <div style={{
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
        width: '500px',
        textAlign: 'center'
      }}>
    
        <form onSubmit={signupHandler}>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="📧 Email"
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          /><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="🔒 Password"
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '20px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          /><br />
          <button type="submit" style={{
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            width:'100%',
            backgroundColor: 'rgb(255, 70, 101)' 
          }}>
            Signup
          </button>
        </form>
      </div>
    </div>
    
    </>
  );
}

export default Signup;
