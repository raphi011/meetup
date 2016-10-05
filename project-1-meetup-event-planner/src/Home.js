import React, { Component } from 'react';
import Register from './Register';

var $ = require("sprint-js");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { events : [] };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    var self = this;

    firebase.database()
            .ref(user.uid + '/events')
            .on('value', function (dataSnapshot) {

      dataSnapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val().name);
        self.setState((state) => ({ events: state.events.concat(childSnapshot.val().name)}));
      })
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    var user = firebase.auth().currentUser;
    var eventName = $("#event-name").val();

    if (!user) {
      alert('not logged in');
      return;
    }

    var newEvent = firebase.database().ref(user.uid + '/events').push();

    newEvent.set({
      name : eventName
    });

    alert('added event');
  }

  render() {
    var eventNodes = this.state.events.map(function(event, id) {
      return (
        <li key={id}>{event}</li>
      );
    });
    return (
      <section>
        <form onSubmit={this.handleSubmit}>
          <input id="event-name" type="text" ></input>
          <input type="submit" value="submit"></input>
        </form>
        <ul>
          {eventNodes}
        </ul>
      </section>
    );
  }
}

export default Home;
