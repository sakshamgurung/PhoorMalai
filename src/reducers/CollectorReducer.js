import {
  LOCATION_WASTE_DATA_LOADED,
  LOCATION_WASTE_DATA_FAILED,
  COLLECT_WASTE,
  COLLECT_WASTE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  organic: 0,
  recycle: 0,
  unrecycle: 0,
  other: 0,
  collectMessage:''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LOCATION_WASTE_DATA_LOADED:
      const {organic, recycle, unrecycle, other} = action.payload
      return {...state, organic:organic, recycle:recycle, unrecycle:unrecycle, other:other};
    case LOCATION_WASTE_DATA_FAILED:
      return {...state};
    case COLLECT_WASTE:
      return {...state, organic:0, recycle:0, unrecycle:0, other:0, collectMessage:"Collection Successful"};
    case COLLECT_WASTE_FAIL:
      return {...state, collectMessage:"No Success"};
    default:
      return state;
  }
};