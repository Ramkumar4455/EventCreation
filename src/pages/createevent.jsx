import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/CreateEvent.css'; // Make sure this file exists

function CreateEvent({ fetchEvents }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '', 
    place: '',
    locationUrl: '',
    email: '',
    seats: '',
    price: '',
    imageUrl: ''
  });
  

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent non-numeric input for number fields
    if ((name === 'seats' || name === 'price') && value !== '') {
      if (!/^\d+$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Step 1: Get existing events
      const { data: existingEvents } = await axios.get('http://localhost:5000/events');
  
      // Step 2: Check for duplicates
      const isDuplicate = existingEvents.some(event =>
        event.title.toLowerCase() === formData.title.toLowerCase() &&
        event.place.toLowerCase() === formData.place.toLowerCase() &&
        event.date === formData.date
      );
  
      if (isDuplicate) {
        toast.error('An event with the same title, place, and date already exists.');
        return;
      }
  
      // Step 3: Proceed with event creation
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/events', formData, {
        headers: {
          Authorization: token
        }
      });
  
      toast.success('Event created successfully!');
      fetchEvents?.();
      navigate('/');
      
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create event');
    }
  };
  

  return (
    <div className="form-container">
    <h2 className="form-title" style={{color:" rgb(255, 31, 68)"}}>Create Event</h2>
    <form onSubmit={handleSubmit} className="event-form">
      
      <fieldset>
        <legend>Title</legend>
        <input type="text" name="title" onChange={handleChange} value={formData.title} required />
      </fieldset>
  
      <fieldset>
        <legend>Description</legend>
        <textarea
          name="description"
          rows="5"
          onChange={handleChange}
          value={formData.description}
          required
        ></textarea>
      </fieldset>
  
      <fieldset>
        <legend>Date</legend>
        <input type="date" name="date" onChange={handleChange} value={formData.date} required />
      </fieldset>
  
      <fieldset>
        <legend>Time</legend>
        <input type="time" name="time" onChange={handleChange} value={formData.time} required />
      </fieldset>
  
      <fieldset>
        <legend>Place</legend>
        <input type="text" name="place" onChange={handleChange} value={formData.place} required />
      </fieldset>
  
      <fieldset>
        <legend>Email</legend>
        <input type="email" name="email" onChange={handleChange} value={formData.email} required />
      </fieldset>
  
      <fieldset>
        <legend>No. of Seats</legend>
        <input type="number" name="seats" onChange={handleChange} value={formData.seats} required />
      </fieldset>
  
      <fieldset>
        <legend>Price per Seat</legend>
        <input type="number" name="price" onChange={handleChange} value={formData.price} required />
      </fieldset>
  
      <fieldset>
        <legend>Google Maps Location URL</legend>
        <input type="url" name="locationUrl" onChange={handleChange} value={formData.locationUrl} required />
      </fieldset>
  
      <fieldset>
        <legend>Image URL</legend>
        <input type="url" name="imageUrl" onChange={handleChange} value={formData.imageUrl} required />
      </fieldset>
  
      <button type="submit">Create</button>
    </form>
  </div>
  
  );
}

export default CreateEvent;
