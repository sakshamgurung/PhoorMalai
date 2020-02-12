import {
  RESET,
  TOGGLE_COLLECTOR_DIALOG,
  COLLECTOR_EMAIL_CHANGED,
  COLLECTOR_EMAIL_EXIST,
  COLLECTOR_EMAIL_NOT_FOUND
} from '../actions/types';

const INITIAL_STATE = {
  collectorDialog: false,
  collector_email:'',
  notFoundMessage:''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case TOGGLE_COLLECTOR_DIALOG:
      return {...state, collectorDialog:action.payload}
    case COLLECTOR_EMAIL_CHANGED:
      return {...state, collector_email:action.payload}
    case COLLECTOR_EMAIL_EXIST:
      return {...state}
    case COLLECTOR_EMAIL_NOT_FOUND:
      return {...state, collector_email:'', notFoundMessage:action.payload}
    case RESET:
      return {...state, collector_email:'',collectorDialog:false}
    default:
      return state;
  }
};
