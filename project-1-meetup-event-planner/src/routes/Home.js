import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';

import EventList from '../components/EventList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }

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
      <div className="home-container">
        <h2>Your Events</h2>
        <EventList user={this.props.user} onDeleted={this.onDeleted} />
        <FloatingActionButton
          className="add-event-button"
          onClick={this.addEvent}>
          <ContentAdd />
        </FloatingActionButton>
        <Snackbar
          open={this.state.open}
          message="Event deleted"
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

export default Home;
