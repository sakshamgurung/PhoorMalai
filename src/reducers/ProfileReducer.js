import {
  PROFILE_LOADED,
  PROFILE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  message:"",
  email:'',
  name:''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case PROFILE_LOADED:
      const {email, name} = action.payload;
      return {...state, email:email, name:name};
    case PROFILE_FAIL:
      return {...state, message:"Error occured, try again later !!"};
    default:
      return state;
  }
};