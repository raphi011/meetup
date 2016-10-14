import React, { Component } from 'react';
import Base from '../core/firebase';

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
        <h4>Create new event</h4>
        <div className="mdl-textfield mdl-js-textfield">
          <input type="text" className="mdl-textfield__input" id="event-name" />
          <label className="mdl-textfield__label" htmlFor="event-name">Name</label>
        </div>
        <input type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" value="Create" />
      </form>
    );
  }
}

NewEventForm.propTypes = {
  user: React.PropTypes.object
};

export default NewEventForm;
