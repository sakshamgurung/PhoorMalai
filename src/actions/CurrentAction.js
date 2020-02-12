import AsyncStorage from '@react-native-community/async-storage';
import {
  CURRENT_DATA_LOADED,
  CURRENT_DATA_NOT_LOADED,
  CURRENT_DATA_RElOADED
} from './types';
import axios from 'axios';
import Config from 'react-native-config';

let organicByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let recycleByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let unrecycleByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let otherByMonth = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let currentData = {
  organicPayload:0,
  recyclePayload:0,
  unrecyclePayload:0,
  otherPayload:0,
  monthId:0
};
let slice = '';
let i = 0;

export const currentDataLoading = (monthId) => {
  return async(dispatch) => {
    try {
      let token = await AsyncStorage.getItem('token');
      axios.get(Config.CURRENT_DATA_API,{headers:{'x-auth-token':token}})
      .then((res)=> onSuccess(dispatch,res.data,monthId))
      .catch(()=> onFail(dispatch));
    } catch (error) {
      console.log(error);
    }
  }
}
export const currentDataReloading = (nextProps) => {
  return ({
    type: CURRENT_DATA_RElOADED,
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
    currentData.organicPayload = 0;
    currentData.recyclePayload = 0;
    currentData.unrecyclePayload = 0;
    currentData.otherPayload = 0;
    currentData.monthId = 0;
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
  processData(data);
  filterData(monthId);
  dispatch({
    type: CURRENT_DATA_LOADED,
    payload: currentData
  })
}
const onFail = (dispatch) => {
  console.log("graph action fails");
  dispatch({
    type: CURRENT_DATA_NOT_LOADED
  })
}