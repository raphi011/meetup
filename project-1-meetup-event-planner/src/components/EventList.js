import React, { Component } from 'react';
import Event from './Event';
import Base from '../core/firebase';

class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    console.log(this.props.user);
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



export default EventList;
