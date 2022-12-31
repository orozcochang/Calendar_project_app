import axios from 'axios';
import React, { useState } from 'react';

function AddEventForm(props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new event object
    const newEvent = {
      id: Date.now(),
      title,
      date: new Date(date)
    };

    // Add the event to the calendar
    let response = async () => await axios.post('api/events/',{'event':newEvent})
    console.log(response.data)

    // Reset the form
    setTitle('');
    setDate('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:  
        <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
      </label>
      <br />
      <label>
        Date:  
        <input type="date" value={date} onChange={event => setDate(event.target.value)} />
      </label>
      <br />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default AddEventForm;
