import React, {Component} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, FABButton, Icon} from 'react-mdl';

import Base from '../core/firebase';
import NewEventForm from '../components/NewEventForm';
import EventList from '../components/EventList';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      showDialog: false
    };
  }

  componentDidMount() {
    Base.onAuth(this.onLogin.bind(this));
  }

  onLogin(user) {
    this.setState({user});
  }

  openDialog() {
    this.setState({showDialog: true});
  }

  closeDialog() {
    this.setState({showDialog: false});
  }

  saveDialog() {
    this._newEventForm.submit(this.state.user.uid);
  }

  render() {
    return (
      this.state.user !== null ?
        <div className="home-container">
          <EventList user={this.state.user} />
          <FABButton
            onClick={this.openDialog.bind(this)}
            className="add-event-button"
            colored>
            <Icon name="add" />
          </FABButton>
          <Dialog open={this.state.showDialog}>
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
              <NewEventForm user={this.state.user} ref={nef => this._newEventForm = nef} onSubmitted={this.closeDialog.bind(this)} showSubmitButton={false} />
            </DialogContent>
            <DialogActions>
              <Button type="button" onClick={this.saveDialog.bind(this)}>Save</Button>
              <Button type="button" onClick={this.closeDialog.bind(this)}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
       :
         <h1>Please login</h1>
    ); }
}

export default Home;
