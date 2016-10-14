import {connect} from 'react-redux';
import EventList from '../components/EventList';

const mapStateToProps = state => {
  return {
    events: state.events
  };
};

const EventListContainer = connect(
  mapStateToProps,
  null
)(EventList);

export default EventListContainer;
