import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./styles/login.css"
function Login({ setIsLoggedIn }) {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
    <div className="search-wrapper auth-title-wrapper">
      <h1 className="allevents auth-title">Login</h1>
    </div>
  
    <div className="auth-wrapper">
      <div className="auth-card">
        <input
          value={email}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="📧 Username"
          className="auth-input"
        /><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔒 Password"
          className="auth-input"
        /><br />
        <button onClick={loginHandler} className="auth-button">Login</button>
        <p>Don't have an account? <a href="/signup">Signup</a></p>
      </div>
    </div>
  </>
  
  );
}

export default Login;
