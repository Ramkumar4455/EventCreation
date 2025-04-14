import React, { useState } from 'react';
import './styles/Events.css';

function Events({ events }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <h1 className='allevents' style={{color:" rgb(255, 31, 68)"}}>All Events</h1>
  </div>

  <div className="events-container">
  {filteredEvents.map((event, index) => (
    <div className="event-card" key={index}>
      <div className="event-image">
        <img src={event.imageUrl} alt={event.title} />
      </div>
      <div className="event-details">
        <h3>{event.title}</h3>
        <p className="description">{event.description}</p>

        <div className="row">
          <p><strong >Place:</strong><span style={{ color: "#444"}}>{event.place}</span> </p>
          <p><strong>📍</strong> <a href={event.locationUrl} target="_blank" rel="noopener noreferrer">View on map</a></p>
        </div>

        <div className="row">
          <p><strong>Date:</strong><span style={{ color: "#444"}}>{event.date}</span> </p>
          <p><strong>Time:</strong><span style={{ color: "#444"}}>{event.time}</span> </p>
        </div>

        <div className="row">
          <p><strong>Price per seat:</strong><span style={{ color: "#444"}}>₹{event.price}</span> </p>
          <p><strong>No of Seats:</strong><span style={{ color: "#444"}}>{event.seats}</span> </p>
        </div>
      </div>
    </div>
  ))}
</div>

  </div>
  
  );
}

export default Events;
