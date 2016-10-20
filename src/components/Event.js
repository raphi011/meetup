import React from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'momentjs';

function formattedDateTime(event) {
  console.log(event);
  var startDate = moment(new Date(event.startDate));
  var endDate = moment(new Date(event.endDate));
  var startTime, endTime;

  if (!event.allDay) {
    startTime = moment(new Date(event.startTime));
    endTime = moment(new Date(event.endTime));
  }

  let firstLine = '';
  let secondLine = '';

  if (event.startDate === event.endDate) {
    firstLine = startDate.format();

    if (!event.allDay) {
      firstLine += ' ' + startTime.format('hh:mm') + '-' + endTime.format('hh:mm');
    }
  } else {
    firstLine = startDate.format();
    secondLine = endDate.format();

    if (!event.allDay) {
      firstLine += ' ' + startTime.format('hh:mm');
      secondLine += ' ' + endTime.format('hh:mm');
    }
    firstLine += ' -';
  }

  return (
    <div>
      {firstLine}<br />
      {secondLine}
    </div>
  );
}

const Event = props => (
  <Card className="event-card">
    <CardTitle
      title={props.event.name}
      subtitle={
        <div>
          {props.event.host}<br />
          {formattedDateTime(props.event)}
          {props.event.type ? props.event.type : ''}<br />
          {props.event.location ? props.event.location : ''}
        </div>}
    / >
    <CardText>
      {props.event.message ? props.event.message : ''}
      <br />
      {props.event.guests ? 'Guestlist: ' + props.event.guests : ''}
    </CardText>
    <CardActions>
      <FlatButton label="Delete" onClick={props.delete} />
    </CardActions>
  </Card>
);

Event.propTypes = {
  delete: React.PropTypes.func,
  event: React.PropTypes.object
};

export default Event;
