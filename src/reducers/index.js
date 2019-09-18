import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import MapReducer from './MapReducer';
import GraphReducer from './GraphReducer';

export default combineReducers({
  auth: AuthReducer,
  map: MapReducer,
  graph: GraphReducer
});