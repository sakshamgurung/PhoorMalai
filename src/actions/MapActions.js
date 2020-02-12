import axios from 'axios';
import {
  USER_LOCATION_FOUND,
  SUCCESS_ON_GETTING_DUMP_LOC,
  FAIL_ON_GETTING_DUMP_LOC
} from './types';
import Config from 'react-native-config';

export const getUserLocation = ({lon,lat})=>{
  return{
    type:USER_LOCATION_FOUND,
    payload:{lon,lat}
  }
}

export const getSpotLocation = ({lon,lat})=>{
  return (dispatch) => {
    try {
      axios.post(Config.NEAR_SPOT_LIST_API, {
        lon: lon, 
        lat: lat
      }, {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(res => {
        onSuccessConnection(dispatch,res)})
      .catch((err) =>{
        console.log("err:"+err)
        onFailConnection(dispatch)});
    } catch (error) {
      console.warn('Err');
    }
  }
}

const onSuccessConnection = (dispatch, res)=>{
  let modifiedData = [];
  //modifying loc array to loc object to preserve precision while using in MapView.Marker
  res.data.map(arr => {
    let loc = {};
    loc.latitude = arr.loc[1];
    loc.longitude = arr.loc[0];
    let newObj = {...arr,loc:loc};
    modifiedData.push(newObj);
  })
  dispatch({
    type:SUCCESS_ON_GETTING_DUMP_LOC,
    payload:{modifiedData}
  });
}
const onFailConnection =(dispatch)=>{
  dispatch({
    type:FAIL_ON_GETTING_DUMP_LOC
  });
}


