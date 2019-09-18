import {
  CURRENT_GRAPH_DATA_LOADED,
  CURRENT_GRAPH_DATA_NOT_LOADED
} from '../actions/types';

const INITIAL_STATE = {
  organic: [],
  recycle: [],
  unrecycle: [],
  other: [],
  renderGraph:false,
  spinner:true
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case CURRENT_GRAPH_DATA_LOADED:
      const {organic, recycle, unrecycle, other} = action.payload
      return {...state,spinner:false, renderGraph:true, organic:organic, recycle:recycle, unrecycle:unrecycle, other:other};
    case CURRENT_GRAPH_DATA_NOT_LOADED:
      return {...state, spinner:false};
    default:
      return state;
  }
};