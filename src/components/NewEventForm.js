import React, {Component} from 'react'; import {browserHistory} from 'react-router';
import {Row, Col} from 'react-flexbox-grid/lib/index';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';

import Base from '../core/firebase';

class NewEventForm extends Component {
  constructor(props) {
    super(props);

    var currentDateTime = new Date();

    this.state = {
      allDay: true,
      name: '',
      host: this.props.user.displayName,
      type: '',
      guests: '',
      location: '',
      message: '',
      startDate: currentDateTime,
      startTime: currentDateTime,
      endDate: currentDateTime,
      endTime: currentDateTime
    };

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      {types: ['geocode']});

    this.submit = this.submit.bind(this);

    this.handleSetName = this.handleSetName.bind(this);
    this.handleSetMessage = this.handleSetMessage.bind(this);
    this.handleSetLocation = this.handleSetLocation.bind(this);
    this.handleSetGuests = this.handleSetGuests.bind(this);
    this.handleSetType = this.handleSetType.bind(this);
    this.handleSetHost = this.handleSetHost.bind(this);
    this.handleSetStartDate = this.handleSetStartDate.bind(this);
    this.handleSetStartTime = this.handleSetStartTime.bind(this);
    this.handleSetEndDate = this.handleSetEndDate.bind(this);
    this.handleSetEndTime = this.handleSetEndTime.bind(this);
    this.handleSetAllDay = this.handleSetAllDay.bind(this);
  }

  componentDidMount() {
    const self = this;

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      {types: ['geocode']});

    this.autocomplete.addListener('place_changed', function() {
      self.setState({location: self.autocomplete.getPlace().formatted_address});
    });
  }

  /*
  componentWillUnmount() {
    console.log('unsuscribing from autocomple te event');
    this.autocomplete.clearListeners('place_changed');
  }
  */

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
    let state = {startDate: date};

    if (date.getTime() > this.state.endTime.getTime()) {
      state.endDate = date;
    }

    this.setState(state);
  }

  handleSetStartTime(e, date) {
    this.setState({startTime: date});
  }

  handleSetEndDate(e, date) {
    const state = {endDate: date};

    if (date.getTime() < this.state.startTime.getTime()) {
      state.startDate = date;
    }

    this.setState(state);
  }

  handleSetEndTime(e, date) {
    this.setState({endTime: date});
  }

  handleSetGuests(e) {
    this.setState({guests: e.target.value});
  }

  handleSetType(e) {
    this.setState({type: e.target.value});
  }

  handleSetHost(e) {
    this.setState({host: e.target.value});
  }

  handleSetName(e) {
    this.setState({name: e.target.value});
  }

  handleSetAllDay() {
    const allDay = !this.state.allDay;

    const state = {
      allDay
    };

    if (allDay) {
      state.startTime = null;
      state.endTime = null;
    }

    this.setState(state);
  }

  getData() {
    var startTime = this.state.startTime ?
                    this.state.startTime.getTime() :
                    null;
    var endTime = this.state.endTime ?
                    this.state.endTime.getTime() :
                    null;

    const event = Object.assign({}, this.state, {
      timestamp: new Date().getTime(),
      startDate: this.state.startDate.getTime(),
      startTime,
      endDate: this.state.endDate.getTime(),
      endTime
    });

    return event;
  }

  submit(e) {
    if (e) {
      e.preventDefault();
    }

    const event = this.getData();

    Base.push(`/events/${this.props.user.uid}`, {
      data: event,
      then(err) {
        if (!err) {
          browserHistory.push('/');
        }
      }
    });
  }

  render() {
    let datePickerColumns, startTimePicker, endTimePicker;

    if (this.state.allDay) {
      datePickerColumns = { xs: 6, sm: 6, md: 6 };
      startTimePicker = endTimePicker = null;
    } else {
      datePickerColumns = { xs: 6, sm: 6, md: 3 };
      startTimePicker = (
        <Col xs={6} sm={6} md={3} >
          <TimePicker
            floatingLabelText="Start time"
            value={this.state.startTime}
            onChange={this.handleSetStartTime}
            required
          />
        </Col>);
      endTimePicker = (
        <Col xs={6} sm={6} md={3} >
          <TimePicker
            floatingLabelText="End time"
            value={this.state.endTime}
            onChange={this.handleSetEndTime}
            required
          />
        </Col>);
    }

    return (
      <form onSubmit={this.submit}>
        <Row>
          <Col xs={12} sm={12} md={12}>
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
          </Col>
        </Row>
        <Row style={{ margin: '10px 0 0 0'}}>
          <Col xs={12} sm={12} md={12} >
            <Toggle
              label="All day"
              toggled={this.state.allDay}
              onToggle={this.handleSetAllDay}
            />
          </Col>
        </Row>
        <Row>
          <Col {...datePickerColumns} >
            <DatePicker
              floatingLabelText="Start date"
              value={this.state.startDate}
              fullWidth={true}
              onChange={this.handleSetStartDate}
              required
            />
          </Col>
          {startTimePicker}
          <Col {...datePickerColumns} >
            <DatePicker
              floatingLabelText="End date"
              fullWidth={true}
              value={this.state.endDate}
              onChange={this.handleSetEndDate}
              required
            />
          </Col>
          {endTimePicker}
        </Row>
        <TextField
          value={this.state.location}
          onInput={this.handleSetLocation}
          id="autocomplete"
          fullWidth={true}
          floatingLabelText="Location"
          placeholder=""
          type="text"
          required
        />
        <TextField
          value={this.state.host}
          onChange={this.handleSetHost}
          fullWidth={true}
          floatingLabelText="Host"
          type="text"
          required
        />
        <TextField
          value={this.state.type}
          onChange={this.handleSetType}
          floatingLabelText="Type"
          fullWidth={true}
          list="events"
          type="text"
          required
        />
        <TextField
          value={this.state.guests}
          onChange={this.handleSetGuests}
          floatingLabelText="Guestlist"
          fullWidth={true}
          type="text"
          required
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
        <RaisedButton
          label="Submit"
          type="submit"
          className="create-event-button"
          primary={true}
        />
      </form>
    );
  }
}

NewEventForm.propTypes = {
  user: React.PropTypes.shape({
    uid: React.PropTypes.string,
    displayName: React.PropTypes.string
  })
};

export default NewEventForm;
