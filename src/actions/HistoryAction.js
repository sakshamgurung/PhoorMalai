import AsyncStorage from '@react-native-community/async-storage';
import {
  HISTORY_DATA_LOADED,
  HISTORY_DATA_NOT_LOADED
} from './types';
import axios from 'axios';
import Config from 'react-native-config';

let organicByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let recycleByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let unrecycleByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let otherByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let historyData = {
  organicPayload:0,
  recyclePayload:0,
  unrecyclePayload:0,
  otherPayload:0,
  monthId:0
};
let slice = '';
let i = 0;


export const historyDataLoading = (monthId) => {
  return async(dispatch) => {
    try {
      let token = await AsyncStorage.getItem('token');
      axios.get(Config.HISTORY_DATA_API,{headers:{'x-auth-token':token}})
      .then((res)=> onSuccess(dispatch,res.data,monthId))
      .catch(()=> onFail(dispatch));
    } catch (error) {
      console.log(error);
    }
  }
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
  if(wasteData.quantity_in_kg != 0){
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
}
const processData = (data) => {
  //resetting values for waste data array
  organicByMonth.forEach(function(item, index, arr){
    this[index] = 0;
  },organicByMonth);
  recycleByMonth.forEach(function(item, index, arr){
    this[index] = 0;
  },recycleByMonth);
  unrecycleByMonth.forEach(function(item, index, arr){
    this[index] = 0;
  },unrecycleByMonth);
  otherByMonth.forEach(function(item, index, arr){
    this[index] = 0;
  },otherByMonth);
  //resetting values for waste data object
  historyData.organicPayload = 0;
  historyData.recyclePayload = 0;
  historyData.unrecyclePayload = 0;
  historyData.otherPayload = 0;
  historyData.monthId = 0;
  data.map(wasteData =>{
    sliceAndConvertMonth(wasteData);
    counterMonth(wasteData);
  });
}

const filterData = (monthId) => {
  historyData.organicPayload = organicByMonth[monthId];
  historyData.recyclePayload = recycleByMonth[monthId];
  historyData.unrecyclePayload = unrecycleByMonth[monthId];
  historyData.otherPayload = otherByMonth[monthId];
  historyData.monthId = monthId;
}

const onSuccess = (dispatch, data, monthId) => {
  processData(data);
  filterData(monthId);
  dispatch({
    type: HISTORY_DATA_LOADED,
    payload: historyData
  })
}
const onFail = (dispatch) => {
  console.log("history action fails");
  dispatch({
    type: HISTORY_DATA_NOT_LOADED
  })
}