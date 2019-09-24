import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import MapReducer from './MapReducer';
import GraphReducer from './GraphReducer';
import HistoryGraphReducer from './HistoryGraphReducer';
import FormReducer  from './FormReducer';
import CollectorReducer from './CollectorReducer';
import MainFormReducer from './MainFormReducer';
export default combineReducers({
  auth: AuthReducer,
  map: MapReducer,
  graph: GraphReducer,
  historyGraph: HistoryGraphReducer,
  form: FormReducer,
  collector: CollectorReducer,
  mainForm: MainFormReducer
});