import AsyncStorage from '@react-native-community/async-storage';
import {
  CURRENT_GRAPH_DATA_LOADED,
  CURRENT_GRAPH_DATA_NOT_LOADED,
  CURRENT_GRAPH_DATA_RElOADED
} from './types';
import axios from 'axios';
import Config from 'react-native-config';

let organicByMonth;
let recycleByMonth;
let unrecycleByMonth;
let otherByMonth;
let currentData = {};
let slice = '';
let i = 0;


export const currentDataLoading = (monthId) => {
  return async(dispatch) => {
    try {
      organicByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
      recycleByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
      unrecycleByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
      otherByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
      let token = await AsyncStorage.getItem('token');
      //let token = Config.TOKEN;
      axios.get(Config.CURRENT_DATA_API_DEVICE,{headers:{'x-auth-token':token}})
      .then((res)=> onSuccess(dispatch,res.data,monthId))
      .catch(()=> onFail(dispatch));
    } catch (error) {
      console.log(error);
    }
  }
}
export const currentDataReloading = (nextProps) => {
  return ({
    type: CURRENT_GRAPH_DATA_RElOADED,
    payload: nextProps
  })
}

const sliceAndConvertMonth = (wasteData) => {
  slice = wasteData.date.slice(5,7);
  if(slice.charAt(1) === "0"){
    i = Number( slice.charAt(2));
  }else{
    i = Number(slice);
  }
}
const counterMonth = (wasteData) => {
    switch(wasteData.waste_type){
      case 'organic': 
        organicByMonth[i] += wasteData.quantity_in_kg;
        organicByMonth[0] += wasteData.quantity_in_kg;
        break;
      case 'recycle':
        recycleByMonth[i] += wasteData.quantity_in_kg; 
        recycleByMonth[0] += wasteData.quantity_in_kg;
        break;
      case 'unrecycle': 
        unrecycleByMonth[i] += wasteData.quantity_in_kg; 
        unrecycleByMonth[0] += wasteData.quantity_in_kg;
        break;
      case 'other': 
        otherByMonth[i] += wasteData.quantity_in_kg; 
        otherByMonth[0] += wasteData.quantity_in_kg;
        break;
    }
}

const processData = (data) => {
  data.map(wasteData =>{
    sliceAndConvertMonth(wasteData);
    counterMonth(wasteData);
  });
}

const filterData = (monthId) => {
  currentData.organicPayload = organicByMonth[monthId];
  currentData.recyclePayload = recycleByMonth[monthId];
  currentData.unrecyclePayload = unrecycleByMonth[monthId];
  currentData.otherPayload = otherByMonth[monthId];
  currentData.monthId = monthId;
}

const onSuccess = (dispatch, data, monthId) => {
  console.log(data);
  processData(data);
  filterData(monthId);
  console.log("Current Data is ",currentData);
  dispatch({
    type: CURRENT_GRAPH_DATA_LOADED,
    payload: currentData
  })
}
const onFail = (dispatch) => {
  dispatch({
    type: CURRENT_GRAPH_DATA_NOT_LOADED
  })
}