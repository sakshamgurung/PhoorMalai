import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import MapReducer from './MapReducer';
import CurrentReducer from './CurrentReducer';
import HistoryReducer from './HistoryReducer';
import FormReducer  from './FormReducer';
import CollectorReducer from './CollectorReducer';
import MainFormReducer from './MainFormReducer';
import ProfileReducer from './ProfileReducer';
export default combineReducers({
  auth: AuthReducer,
  profile: ProfileReducer,
  map: MapReducer,
  current: CurrentReducer,
  history: HistoryReducer,
  form: FormReducer,
  collector: CollectorReducer,
  mainForm: MainFormReducer
});