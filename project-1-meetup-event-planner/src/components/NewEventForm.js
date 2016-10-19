import React, { Component } from 'react';
import {browserHistory} from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import Base from '../core/firebase';

const inlineBlockStyle = {display: 'inline-block', maxWidth: '48%'}
const halfWidthStyle = { maxWidth: '100%'}

class NewEventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      host: this.props.user.displayName,
      type: '',
      guests: '',
      location: '',
      message: '',
      startDate: null
    };

    this.submit = this.submit.bind(this);

    this.handleSetName = this.handleSetName.bind(this);
    this.handleSetMessage = this.handleSetMessage.bind(this);
    this.handleSetLocation = this.handleSetLocation.bind(this);
    this.handleSetGuests = this.handleSetGuests.bind(this);
    this.handleSetType = this.handleSetType.bind(this);
    this.handleSetHost = this.handleSetHost.bind(this);
    this.handleSetStartDate = this.handleSetStartDate.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      {types: ['geocode']});
  }

  handleSetMessage(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSetLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  handleSetStartDate(e, date) {
    this.setState({
      startDate: date.getTime()
    });
  }

  handleSetGuests(e) {
    this.setState({
      guests: e.target.value
    });
  }

  handleSetType(e) {
    this.setState({
      type: e.target.value
    });
  }

  handleSetHost(e) {
    this.setState({
      host: e.target.value
    });
  }

  handleSetName(e) {
    this.setState({
      name: e.target.value
    });
  }

  submit(e) {
    if (e) {
      e.preventDefault();
    }
    const self = this;

    Base.push(`/events/${this.props.user.uid}`, {
      data: Object.assign({}, this.state, { timestamp: new Date().getTime() }),
      then(err) {
        if (!err) {
          self.setState({name: ''});
          browserHistory.push('/');
        } else {
          console.log(err);
        }
      }
    });

    if (this.props.onSubmitted) {
      this.props.onSubmitted();
    }
  }

  render() {
    var submitButton = (
      <RaisedButton
        label="Submit"
        type="submit"
        className="create-event-button"
        primary={true}
      />
      );

    if (!this.props.showSubmitButton) {
      submitButton = null;
    }

    return (
      <form onSubmit={this.submit}>
        <TextField
          value={this.state.name}
          onChange={this.handleSetName}
          floatingLabelText="Name"
          id="event-name"
          type="text"
          fullWidth={true}
          required
          autoFocus
        />
        <DatePicker
          style={inlineBlockStyle}
          textFieldStyle={halfWidthStyle}
          floatingLabelText="Start date"
          onChange={this.handleSetStartDate}
        />
        <TimePicker
          style={inlineBlockStyle}
          textFieldStyle={halfWidthStyle}
          floatingLabelText="Start time"

        />
        <TextField
          value={this.state.host}
          onChange={this.handleSetHost}
          fullWidth={true}
          floatingLabelText="Host"
          type="text"
        />
        <TextField
          value={this.state.type}
          onChange={this.handleSetType}
          floatingLabelText="Type"
          fullWidth={true}
          list="events"
          type="text"
        />
        <TextField
          value={this.state.guests}
          onChange={this.handleSetGuests}
          floatingLabelText="Guestlist"
          fullWidth={true}
          type="text"
        />
        <TextField
          value={this.state.location}
          onInput={this.handleSetLocation}
          id="autocomplete"
          fullWidth={true}
          floatingLabelText="Location"
          type="text"
          placeholder=""
        />
        <TextField
          value={this.state.message}
          onChange={this.handleSetMessage}
          floatingLabelText="Message"
          fullWidth={true}
          multiLine={true}
          rows={3}
        />
        <datalist id="events">
          <option value="Birthday" />
          <option value="Conference" />
        </datalist>
        {submitButton}
      </form>
    );
  }
}

NewEventForm.propTypes = {
  onSubmitted: React.PropTypes.func,
  showSubmitButton: React.PropTypes.bool,
  user: React.PropTypes.shape({
    uid: React.PropTypes.string,
    displayName: React.PropTypes.string
  })
};

export default NewEventForm;
