import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
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
    this.ref = Base.syncState(`/events/${this.props.user.uid}`, {
      context: this,
      state: 'events',
      asArray: true,
      queries: {
        orderByChild: 'timestamp'
      }
    });
  }

  componentWillUnmount() {
    Base.removeBinding(this.ref);
  }

  deleteEvent(index) {
    var events = this.state.events;
    events.splice(index, 1);
    this.setState({
      events: events
    });

    if (this.props.onDeleted) {
      this.props.onDeleted();
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          {this.state.events.map((event, i) =>
            <Col key={i} xs={12} sm={6} md={3}>
              <Event event={event} key={i} delete={this.deleteEvent.bind(this)} />
            </Col>
          )}
        </Row>
      </Grid>
    );
  }
}

EventList.propTypes = {
  onDeleted: React.PropTypes.func,
  user: React.PropTypes.shape({
    uid: React.PropTypes.string
  })
};

export default EventList;
