import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import './styles/MyEvents.css'
const MyEvents = ({ events, setEvents }) => {
  const [email, setEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editEventId, setEditEventId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    date: "",
    place: "",
    time:"",
    locationUrl:"",
    price: 0,
    seats: 0,
    imageUrl: ""
  });

  const [showModal, setShowModal] = useState(false);

const openEditModal = (event) => {
  setEditEventId(event._id);
  setEditForm(event); // Assuming editForm is a copy of the event object
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
  setEditEventId(null);
};


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (event) => {
    setEditEventId(event._id);
    setEditForm({ ...event });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/events/${editEventId}`, editForm);
      setEvents(events.map((e) => (e._id === editEventId ? response.data : e)));
      setEditEventId(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleCancel = () => {
    setEditEventId(null);
  };

  const filteredEvents = events
    .filter((event) => event.email === email)
    .filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (

    <div className="container">

    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search by event name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
    <div className="search-wrapper">
    <h1 className='allevents' style={{color:" rgb(255, 31, 68)"}}>My Events</h1>
  </div>

    <div className="events-container">
  
  {filteredEvents.length === 0 && <p>No events found.</p>}

  <div className="events-grid">
  {filteredEvents.map((event) => (
    <div className="event-card" key={event._id}>
      <img src={event.imageUrl} alt={event.title} className="event-img" />

      <div className="event-content">
        <h3>{event.title}</h3>
        <p className="description">{event.description}</p>

        <div className="row space-between">
          <p><strong>Place:</strong> {event.place}</p>
          <a href={event.locationUrl} target="_blank" rel="noopener noreferrer">
           View Location
          </a>
        </div>

        <div className="row space-between">
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
        </div>

        <div className="row space-between">
          <p><strong>Price:</strong> ₹{event.price}</p>
          <p><strong>Seats:</strong> {event.seats}</p>
        </div>

        <div className="row space-between buttons">
          <button onClick={() => openEditModal(event)}>Edit</button>
          <button onClick={() => handleDelete(event._id)}>Delete</button>
        </div>
      </div>
    </div>
  ))}
</div>


  {/* Edit Modal */}
  {showModal && (
    <div className="modal-overlay">
    <div className="modal-content" tabIndex="-1">
      <h2>Edit Event</h2>
  
      <label>Title</label>
      <input
        name="title"
        value={editForm.title}
        onChange={handleEditChange}
        placeholder="Event title"
      />
  
      <label>Description</label>
      <input
        name="description"
        value={editForm.description}
        onChange={handleEditChange}
        placeholder="Event description"
      />
  
      <label>Date</label>
      <input
        name="date"
        type="date"
        value={editForm.date}
        onChange={handleEditChange}
      />
  
      <label>Time</label>
      <input
        name="time"
        type="time"
        value={editForm.time}
        onChange={handleEditChange}
      />
  
      <label>Place</label>
      <input
        name="place"
        value={editForm.place}
        onChange={handleEditChange}
        placeholder="Event location"
      />
  
      <label>Price (₹)</label>
      <input
        name="price"
        value={editForm.price}
        onChange={handleEditChange}
        type="number"
        placeholder="Ticket price"
      />
  
      <label>Seats</label>
      <input
        name="seats"
        value={editForm.seats}
        onChange={handleEditChange}
        type="number"
        placeholder="Available seats"
      />
  
      <label>Image URL</label>
      <input
        name="imageUrl"
        value={editForm.imageUrl}
        onChange={handleEditChange}
        placeholder="Image link"
      />
  
      <label>Location URL (Google Maps)</label>
      <input
        name="locationUrl"
        value={editForm.locationUrl}
        onChange={handleEditChange}
        placeholder="Maps link"
      />
  
      <div className="modal-buttons">
        <button onClick={handleUpdate}>Update</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  </div>
  
  )}
</div>
</div>

  );
};

export default MyEvents;
