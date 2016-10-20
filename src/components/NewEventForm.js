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

    this.currentDateTime = new Date();

    const time = this.currentDateTime.getTime();

    this.state = {
      allDay: true,
      name: '',
      host: this.props.user.displayName,
      type: '',
      guests: '',
      location: '',
      message: '',
      startDate: time,
      startTime: time,
      endDate: time,
      endTime: time,
      errors: {}
    };

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
    this.setValidationMessage = this.setValidationMessage.bind(this);
  }

  componentDidMount() {
    const self = this;

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('event-location'),
      {types: ['geocode']});

    this.autocomplete.addListener('place_changed', function() {
      self.setState({location: self.autocomplete.getPlace().formatted_address});
    });
  }

/*
  componentWillUnmount() {
    this.autocomplete.clearListeners('place_changed');
  }*/

  handleSetMessage(e) {
    this.setState({message: e.target.value});
  }

  handleSetLocation(e) {
    if (e.target.checkValidity()) {
      this.setState({
        location: e.target.value,
        errors: Object.assign({}, this.state.errors, { location: ''})
      });
    }
  }

  handleSetStartDate(e, date) {
    const time = date.getTime();
    const target = document.getElementById('event-startdate');

    if (time < new Date().getTime()) {
      target.setCustomValidity('Can\'t set date in the past');
    }

    if (time > this.state.endTime.getTime()) {
      target.setCustomValidity('Start date has to be before end date');
    } else {
      target.setCustomValidity('');
    }

    if (target.checkValidity()) {
      this.setState({
        startDate: time,
        errors: Object.assign({}, this.state.errors, { startDate: ''})
      });
    }
  }

  handleSetStartTime(e, date) {
    const target = document.getElementById('event-starttime');
    if (target.checkValidity()) {
      this.setState({
        startTime: date.getTime(),
        errors: Object.assign({}, this.state.errors, { startTime: ''})
      });
    }
  }

  handleSetEndDate(e, date) {
    const target = document.getElementById('event-enddate');
    const time = date.getTime();

    if (time < this.state.startTime) {
      target.setCustomValidity('End date can\'t be before start date');
    } else {
      target.setCustomValidity('');
    }

    if (target.checkValidity()) {
      this.setState({
        endDate: time,
        errors: Object.assign({}, this.state.errors, { endDate: ''})
      });
    }
  }

  handleSetEndTime(e, date) {
    const target = document.getElementById('event-endtime');

    if (target.checkValidity()) {
      this.setState({
        endTime: date.getTime(),
        errors: Object.assign({}, this.state.errors, { endTime: ''})
      });
    }
  }

  handleSetGuests(e) {
    if (e.target.checkValidity()) {
      this.setState({
        guests: e.target.value,
        errors: Object.assign({}, this.state.errors, { guests: ''})
      });
    }
  }

  handleSetType(e) {
    if (e.target.checkValidity()) {
      this.setState({
        type: e.target.value,
        errors: Object.assign({}, this.state.errors, { type: ''})
      });
    }
  }

  handleSetHost(e) {
    if (e.target.checkValidity()) {
      this.setState({
        host: e.target.value,
        errors: Object.assign({}, this.state.errors, { host: ''})
      });
    }
  }

  handleSetName(e) {
    if (e.target.checkValidity()) {
      this.setState({
        name: e.target.value,
        errors: Object.assign({}, this.state.errors, { name: ''})
      });
    }
  }

  handleSetAllDay() {
    this.setState({ allDay: !this.state.allDay });
  }

  setValidationMessage(e) {
    e.preventDefault();

    const target = e.target;
    const errors = Object.assign({}, this.state.errors);
    const message = target.validationMessage;

    switch (e.target.id) {
      case 'event-name': errors.name = message; break;
      case 'event-host': errors.host = message; break;
      case 'event-type': errors.type = message; break;
      // case 'event-allday': errors.allday = message; break;
      case 'event-endtime': errors.endTime = message; break;
      case 'event-enddate': errors.endDate = message; break;
      case 'event-starttime': errors.startTime = message; break;
      case 'event-startdate': errors.startDate = message; break;
      case 'event-guests': errors.guests = message; break;
      case 'event-location': errors.location = message; break;
      case 'event-message': errors.message = message; break;
      default: console.warn('setValidationMessage: unknown input name');
    }

    this.setState({ errors });
  }

  getData() {
    const event = Object.assign(
      {},
      this.state,
      { timestamp: new Date().getTime() }
    );

    delete event.errors;

    if (this.state.allDay) {
      event.startTime = null;
      event.endTime = null;
    }

    return event;
  }

  submit(e) {
    e.preventDefault();

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
            onInvalid={this.setValidationMessage}
            defaultTime={this.currentDateTime}
            errorText={this.state.errors.startTime}
            id="event-starttime"
            onChange={this.handleSetStartTime}
            required
          />
        </Col>);
      endTimePicker = (
        <Col xs={6} sm={6} md={3} >
          <TimePicker
            floatingLabelText="End time"
            onInvalid={this.setValidationMessage}
            defaultTime={this.currentDateTime}
            errorText={this.state.errors.endTime}
            id="event-endtime"
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
              onChange={this.handleSetName}
              floatingLabelText="Name"
              id="event-name"
              className="autofocus"
              onInvalid={this.setValidationMessage}
              errorText={this.state.errors.name}
              type="text"
              fullWidth={true}
              autoFocus={true}
              required
            />
          </Col>
        </Row>
        <Row style={{ margin: '10px 0 0 0'}}>
          <Col xs={12} sm={12} md={12} >
            <Toggle
              label="All day"
              id="event-allday"
              onInvalid={this.setValidationMessage}
              toggled={this.state.allDay}
              onToggle={this.handleSetAllDay}
            />
          </Col>
        </Row>
        <Row>
          <Col {...datePickerColumns} >
            <DatePicker
              floatingLabelText="Start date"
              fullWidth={true}
              id="event-startdate"
              defaultDate={this.currentDateTime}
              onInvalid={this.setValidationMessage}
              errorText={this.state.errors.startDate}
              onChange={this.handleSetStartDate}
              required
            />
          </Col>
          {startTimePicker}
          <Col {...datePickerColumns} >
            <DatePicker
              floatingLabelText="End date"
              id="event-enddate"
              defaultDate={this.currentDateTime}
              fullWidth={true}
              onInvalid={this.setValidationMessage}
              errorText={this.state.errors.endDate}
              onChange={this.handleSetEndDate}
              required
            />
          </Col>
          {endTimePicker}
        </Row>
        <TextField
          onInput={this.handleSetLocation}
          id="event-location"
          fullWidth={true}
          onInvalid={this.setValidationMessage}
          errorText={this.state.errors.location}
          floatingLabelText="Location"
          placeholder=""
          type="text"
          required
        />
        <TextField
          onChange={this.handleSetHost}
          errorText={this.state.errors.host}
          defaultValue={this.props.user.displayName}
          onInvalid={this.setValidationMessage}
          fullWidth={true}
          id="event-host"
          floatingLabelText="Host"
          type="text"
          required
        />
        <TextField
          onChange={this.handleSetType}
          errorText={this.state.errors.type}
          floatingLabelText="Type"
          fullWidth={true}
          list="events"
          id="event-type"
          onInvalid={this.setValidationMessage}
          type="text"
          required
        />
        <TextField
          onChange={this.handleSetGuests}
          errorText={this.state.errors.guests}
          floatingLabelText="Guestlist"
          fullWidth={true}
          id="event-guests"
          onInvalid={this.setValidationMessage}
          type="text"
          required
        />
        <TextField
          onChange={this.handleSetMessage}
          floatingLabelText="Message"
          id="event-message"
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
