import React, { Component } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from 'react-mdl';

import NewEventForm from './NewEventForm';

class NewEventDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open
    };
  }

  closeDialog() {
    this.setState({open: false});
    console.log('closing');
  }

  render() {
    return (
      <Dialog open={this.state.open}>
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
          <NewEventForm />
        </DialogContent>
        <DialogActions>
          <Button type="button">Agree</Button>
          <Button type="button" onClick={this.closeDialog.bind(this)}>Disagree</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NewEventDialog.propTypes = {
  open: React.PropTypes.bool
};

export default NewEventDialog;
