import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


import { browserHistory } from 'react-router';

import EventList from '../components/EventList';

class Home extends Component {
  constructor(props) {
    super(props);
    console.log('home received prop user: ' + props.user);
  }

  addEvent() {
    browserHistory.push('/new');
  }

  render() {
    return (
      <div className="home-container">
        <EventList user={this.props.user} />
        <FloatingActionButton
          className="add-event-button"
          onClick={this.addEvent}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default Home;
