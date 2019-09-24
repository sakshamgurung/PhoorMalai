import {
  TOGGLE_COLLECTOR_DIALOG,
  COLLECTOR_EMAIL_CHANGED,
  COLLECTOR_EMAIL_EXIST
} from '../actions/types';

const INITIAL_STATE = {
  collectorDialog: false,
  collector_email:'',
  redirect:false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case TOGGLE_COLLECTOR_DIALOG:
      return {...state, collectorDialog:action.payload}
    case COLLECTOR_EMAIL_CHANGED:
      return {...state, collector_email:action.payload}
    case COLLECTOR_EMAIL_EXIST:
      return {...state, redirect:action.payload}
    default:
      return state;
  }
};
