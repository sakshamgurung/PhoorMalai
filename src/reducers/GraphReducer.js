import {
  CURRENT_GRAPH_DATA_LOADED,
  CURRENT_GRAPH_DATA_NOT_LOADED,
  CURRENT_GRAPH_DATA_RElOADED
} from '../actions/types';

const INITIAL_STATE = {
  organic:0,
  recycle:0,
  unrecycle:0,
  other:0,
  selected:"All"
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case CURRENT_GRAPH_DATA_LOADED:
      const {organicPayload, recyclePayload, unrecyclePayload, otherPayload, monthId} = action.payload
      let month = null;
      switch(monthId){
        case 0: month = "All";break;
        case 1: month = "Jan";break;
        case 2: month = "Feb";break;
        case 3: month = "Mar";break;
        case 4: month = "Apr";break;
        case 5: month = "May";break;
        case 6: month = "June";break;
        case 7: month = "July";break;
        case 8: month = "Aug";break;
        case 9: month = "Sept";break;
        case 10: month = "Oct";break;
        case 11: month = "Nov";break;
        case 12: month = "Dec";break;
      }
      return {...state, organic:organicPayload,recycle:recyclePayload,unrecycle:unrecyclePayload, other:otherPayload, selected:month}
    case CURRENT_GRAPH_DATA_RElOADED:
      const {organic, recycle, unrecycle, other, selected} = action.payload;
      return {...state, organic:organic, recycle:recycle, unrecycle:unrecycle, other:other, selected:selected};
    case CURRENT_GRAPH_DATA_NOT_LOADED:
      return {...state};
    default:
      return state;
  }
};
