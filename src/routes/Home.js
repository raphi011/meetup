import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import {Row, Col} from 'react-flexbox-grid/lib/index';

import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import EventList from '../components/EventList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.onDeleted = this.onDeleted.bind(this);
  }

  addEvent() {
    browserHistory.push('/new');
  }

  onDeleted() {
    this.setState({open: true});
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} style={{ position: 'relative'}}>
            <h1>Your Events</h1>
            <RaisedButton
              onClick={this.addEvent}
              className="add-event-button"
              label="New Event"
              primary={true}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <EventList user={this.props.user} onDeleted={this.onDeleted} />
          </Col>
        </Row>
        <Snackbar
          open={this.state.open}
          message="Event deleted"
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

Home.propTypes = {
  user: React.PropTypes.object
};

export default Home;
