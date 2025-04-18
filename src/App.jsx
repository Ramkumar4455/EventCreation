import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Events from "./pages/events";
import Navbar from "./componenets/navbar";
import CreateEvent from "./pages/createevent";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import MyEvents from "./pages/MyEvents"
function App() {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const fetchEvents = () => {
    axios.get("http://localhost:5000/events")
      .then((res) => setEvents(res.data))
      .catch(() => toast.error("Failed to load events"));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Events events={events} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create-event"
          element={
            isLoggedIn ? <CreateEvent fetchEvents={fetchEvents} /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
     
        <Route
          path="/my-event"
          element={
            isLoggedIn ?<MyEvents events={events} setEvents={setEvents} />: <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
