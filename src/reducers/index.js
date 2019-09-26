import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import MapReducer from './MapReducer';
import GraphReducer from './GraphReducer';
import HistoryGraphReducer from './HistoryGraphReducer';
import FormReducer  from './FormReducer';
import CollectorReducer from './CollectorReducer';
import MainFormReducer from './MainFormReducer';
import ProfileReducer from './ProfileReducer';
export default combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  map: MapReducer,
  graph: GraphReducer,
  historyGraph: HistoryGraphReducer,
  form: FormReducer,
  collector: CollectorReducer,
  mainForm: MainFormReducer
});