import React, { Component } from 'react';
import Base from '../core/firebase';
import Event from './Event';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    Base.bindToState(`${this.props.user.uid}/events`, {
      context: this,
      state: 'events',
      asArray: true
    });
  }

  render() {
    return (
      <div className="event-list">
        {this.state.events.map((event, i) =>
          <Event name={event.name} key={i} />
        )}
      </div>
    );
  }
}

EventList.propTypes = {
  user: React.PropTypes.object
};

export default EventList;
