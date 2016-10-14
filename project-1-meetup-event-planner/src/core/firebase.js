import * as firebase from 'firebase';
import * as config from '../../firebase.config';

export const firebaseApp = firebase.initializeApp(config);
export const firebaseAuth = firebase.auth();
export const firebaseDb = firebase.auth();

/*
firebaseAuth.onAuthStateChanged(function(user) {
  if (user) {
    console.log('logged in');
  } else {
    console.log('logged out');
  }
});

firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function () {
          hashHistory.push('/');
        })
        .catch(function (error) {
          // avar errorCode = error.code;
          // var errorMessage = error.message;
        });

const $ = require('sprint-js');
        <form onSubmit={this.handleSubmit}>
          <input id="event-name" type="text" />
          <input type="submit" value="submit" />
        </form>
  handleSubmit(e) {
    e.preventDefault();

    const user = firebase.auth().currentUser;

  }
const eventName = $('#event-name').val();
const newEvent = firebase.database().ref(`${user.uid}/events`).push();

newEvent.set({
  name: eventName,
});

firebaseDb.ref(`${user.uid}/events`)
.on('value', function (dataSnapshot) {
  const events = [];
  dataSnapshot.forEach(function (childSnapshot) {
    events.push(childSnapshot.val().name);
    // console.log(childSnapshot.val().name);
    // self.setState(state =>
    // ({ events: state.events
    //                 .concat() }));
  });
  self.setState({ events });
});
*/
