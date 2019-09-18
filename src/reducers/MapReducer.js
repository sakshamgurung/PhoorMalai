import {
  USER_LOCATION_FOUND,
  SUCCESS_ON_GETTING_DUMP_LOC,
  FAIL_ON_GETTING_DUMP_LOC
} from '../actions/types';

const INITIAL_STATE = {
  lon:'0',
  lat:'0',
  loadSpotMarker:false,
  dumpSiteLocation:[]
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){

    case USER_LOCATION_FOUND:
      const {lon, lat} = action.payload;
      return {...state, lon, lat}

    case SUCCESS_ON_GETTING_DUMP_LOC:
      const {data} = action.payload.res;
      return {...state, loadSpotMarker:true,dumpSiteLocation:data}
    
    case FAIL_ON_GETTING_DUMP_LOC:
      return {...state};

    default:
      return state;
  }
};
