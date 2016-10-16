import React, { Component } from 'react';
import Base from '../core/firebase';
import {Textfield, Button} from 'react-mdl';

import $ from 'sprint-js';

class NewEventForm extends Component {
  constructor(props) {
    super(props);
  }

  submit() {
    const name = $('#event-name').val();

    Base.push(`/events/${this.props.user.uid}`, {
      data: { name, timestamp: new Date().getTime() },
      then(err) {
        if (!err) {
          $('#event-name').val('');
        } else {
          console.log(err);
        }
      }
    });

    console.log('submitted');

    this.props.onSubmitted();
  }

  _onSubmit(e) {
    e.preventDefault();

    this.submit();
  }

  render() {
    var submitButton = (
      <Button
        type="submit"
        className="create-event-button"
        raised
        colored
        ripple>
        Create
      </Button>);

    if (!this.props.showSubmitButton) {
      submitButton = null;
    }

    return (
      <form onSubmit={this._onSubmit.bind(this)}>
        <Textfield
          label="Name"
          id="event-name"
          type="text"
          autoFocus
        />
        {submitButton}
      </form>
    );
  }
}

NewEventForm.propTypes = {
  onSubmitted: React.PropTypes.func,
  showSubmitButton: React.PropTypes.bool,
  user: React.PropTypes.object
};

export default NewEventForm;
