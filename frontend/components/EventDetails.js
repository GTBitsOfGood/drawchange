import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

const EventDetails = ({event}) => (
  <div>
    <h3>{event.name}</h3>
    <p><b>Date:</b> {new Date(event.date).toDateString()}</p>
    <p><b>Location:</b> {event.location}</p>
    <p><b>Contact:</b> {event.contact}</p>
    <p><b>Description:</b> {event.description}</p>
    <p><b>Volunteers:</b></p>
    {event.volunteers.length === 0 && <p>No Volunteers Registered</p>}

    {/* Not Sure if this part works yet... */}
    {event.volunteers.length > 0 && (<ul>{event.volunteers.map(current => <li>{`${current.bio.first_name} ${current.bio.last_name}`}</li>)}</ul>)}

  </div>
);

EventDetails.propTypes = {
};

export default EventDetails;
