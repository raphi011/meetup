import {combineReducers} from 'redux';
import events from './events';
import auth from './auth';

const reducer = combineReducers({
  events,
  auth
});

export default reducer;
