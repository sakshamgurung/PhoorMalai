import axios from 'axios';
import {
  USER_LOCATION_FOUND,
  SUCCESS_ON_GETTING_DUMP_LOC,
  FAIL_ON_GETTING_DUMP_LOC
} from './types';

export const getUserLocation = ({lon,lat})=>{
  return{
    type:USER_LOCATION_FOUND,
    payload:{lon,lat}
  }
}


export const getSpotLocation = ({lon,lat})=>{
  return (dispatch) => {
    try {
      axios.post('http://10.0.2.2:5000/api/spot_list/list', {
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
  dispatch({
    type:SUCCESS_ON_GETTING_DUMP_LOC,
    payload:{res}
  });
}
const onFailConnection =(dispatch)=>{
  dispatch({
    type:FAIL_ON_GETTING_DUMP_LOC
  });
}


