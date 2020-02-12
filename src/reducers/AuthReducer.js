import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  RESET
} from '../actions/types';

const INITIAL_STATE = {
  email:'',
  password:''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case EMAIL_CHANGED:
      return {...state, email:action.payload};
    case PASSWORD_CHANGED:
      return {...state, password:action.payload};
    case RESET:
      return {...state, email:"", password:""};
    default:
      return state;
  }
};