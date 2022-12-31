import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    // Fetch events from the Django backend
    let response = await axios.get ('api/events/')
      console.log(response.data)
      setEvents(response.data.events)
  }, []);

  // Render the calendar with the events
  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          {event.date} - {event.event}: {event.user}
        </div>
      ))}
    </div>
  );
};

export default Calendar;

