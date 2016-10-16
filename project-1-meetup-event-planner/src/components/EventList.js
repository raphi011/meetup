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
    Base.syncState(`/events/${this.props.user.uid}`, {
      context: this,
      state: 'events',
      asArray: true,
      queries: {
        orderByChild: 'timestamp'
      }
    });
  }

  deleteEvent(index) {
    var events = this.state.events;
    events.splice(index, 1);
    this.setState({
      events: events
    });
  }

  render() {
    return (
      <div className="event-list">
        {this.state.events.map((event, i) =>
          <Event name={event.name} key={i} delete={this.deleteEvent.bind(this)} />
        )}
      </div>
    );
  }
}

EventList.propTypes = {
  user: React.PropTypes.object
};

export default EventList;
