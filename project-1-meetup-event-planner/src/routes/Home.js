import React, {Component} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, FABButton, Icon} from 'react-mdl';

import Base from '../core/firebase';
import NewEventForm from '../components/NewEventForm';
import EventList from '../components/EventList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.user = Base.auth().currentUser;
    this.state = {
      showDialog: false
    };
  }

  openDialog() {
    this.setState({showDialog: true});
  }

  closeDialog() {
    this.setState({showDialog: false});
  }

  saveDialog() {
    this._newEventForm.submit(this.user.uid);
  }

  render() {
    return (
      <div className="home-container">
        <EventList user={this.user} />
        <FABButton
          onClick={this.openDialog.bind(this)}
          className="add-event-button"
          ripple
          colored>
          <Icon name="add" />
        </FABButton>
        <Dialog open={this.state.showDialog}>
          <DialogTitle>Create Event</DialogTitle>
          <DialogContent>
            <NewEventForm
              user={this.user}
              ref={nef => this._newEventForm = nef}
              onSubmitted={this.closeDialog.bind(this)}
              showSubmitButton={false}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={this.saveDialog.bind(this)}>
              Save
            </Button>
            <Button
              type="button"
              onClick={this.closeDialog.bind(this)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
/*

*/

export default Home;
