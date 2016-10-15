import React, { Component } from 'react';
import Base from '../core/firebase';
import {Textfield, Button} from 'react-mdl';

import $ from 'sprint-js';

class NewEventForm extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit(e) {
    e.preventDefault();

    const name = $('#event-name').val();

    Base.push(`${this.props.user.uid}/events`, {
      data: { name },
      then(err) {
        if (!err) {
          $('#event-name').val('');
        } else {
          console.log(err);
        }
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <Textfield
          label="Name"
          id="event-name"
          type="text"
          autoFocus
        />
        <Button
          type="submit"
          className="create-event-button"
          raised
          colored
          ripple>
          Create
        </Button>
      </form>
    );
  }
}

NewEventForm.propTypes = {
  user: React.PropTypes.object
};

export default NewEventForm;
