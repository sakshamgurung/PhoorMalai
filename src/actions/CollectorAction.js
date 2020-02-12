import AsyncStorage from '@react-native-community/async-storage';
import {
  LOCATION_WASTE_DATA_LOADED,
  LOCATION_WASTE_DATA_FAILED,
  COLLECT_WASTE,
  COLLECT_WASTE_FAIL
} from './types';
import axios from 'axios';
import Config from 'react-native-config';
//import {JWT_TOKEN} from 'react-native-dotenv';

let organic = null;
let recycle = null;
let unrecycle = null;
let other = null;

export const showLocationWasteData = ({spot_ref,collector_email}) => {
  return async(dispatch) => {
    try {
      let token = await AsyncStorage.getItem('token');
      axios.post(Config.COLLECTOR_SHOW_API,{
          spot_list_ref: spot_ref,
          collector_email: collector_email
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        })
      .then((res)=> {console.log(res); onSuccess(dispatch,res.data)})
      .catch((err)=> {console.log(err); onFail(dispatch)});
    } catch (error) {
      console.log(error);
    }
  }
}
export const collectWaste = (spot_ref) =>{
  return async(dispatch) => {
    try {
      let token = await AsyncStorage.getItem('token');
      axios.post(Config.COLLECTOR_CLEAR_API,{
        spot_list_ref:spot_ref,
        history_flag:true
      },{
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      })
      .then(() => onCollectionSuccess(dispatch))
      .catch(() => onCollectionFail(dispatch));
    } catch (error) {
      console.log(error);
    }
  }
}

const onCollectionSuccess = (dispatch) =>{
  dispatch({
    type:COLLECT_WASTE
  })
}
const onCollectionFail = (dispatch) =>{
  dispatch({
    type:COLLECT_WASTE_FAIL
  })
}

const counter = (wasteData) => {
  if(wasteData.quantity_in_kg != 0){
    switch(wasteData.waste_type){
      case 'organic': organic += wasteData.quantity_in_kg; break;
      case 'recycle': recycle += wasteData.quantity_in_kg; break;
      case 'unrecycle': unrecycle += wasteData.quantity_in_kg; break;
      case 'other': other += wasteData.quantity_in_kg; break;
    }
  }
}
const processData = (data) => {
  organic = 0;
  recycle = 0;
  unrecycle = 0;
  other = 0;
  data.map(wasteData =>{
    counter(wasteData);
  });
}

const onSuccess = (dispatch, data) => {
  processData(data);
  dispatch({
    type: LOCATION_WASTE_DATA_LOADED,
    payload: {organic, recycle, unrecycle, other}
  })
}
const onFail = (dispatch) => {
  dispatch({
    type: LOCATION_WASTE_DATA_FAILED
  })
}