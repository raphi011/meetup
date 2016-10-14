import React, { PropTypes } from 'react';

const EventList = ({ events }) =>
  <ul>
    {events.map(event =>
      <li>
        {event.name}
      </li>
    )}
  </ul>;

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
};

export default EventList;
