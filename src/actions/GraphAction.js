import AsyncStorage from '@react-native-community/async-storage';
import {
  CURRENT_GRAPH_DATA_LOADED,
  CURRENT_GRAPH_DATA_NOT_LOADED
} from './types';
import axios from 'axios';

let organic = [];
let recycle = [];
let unrecycle = [];
let other = [];
let organicByMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
let recycleByMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
let unrecycleByMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
let otherByMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
let s = '';
let i = 0;


export const currentDataLoading = () => {
  return (dispatch) => {
    //let token = await AsyncStorage('token');
    let token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ1YTg3NDY2YjE5ODYyNDYwNjlkYjFhIn0sImlhdCI6MTU2NzA3NDk4OSwiZXhwIjoxNTY3MzM0MTg5fQ.nwIvijvP7ZgTb0TnihhWK3hAMiK-mxTWNuFqenUNVFM'
    axios.get('http://10.0.2.2:5000/api/spot/current',{headers:{'x-auth-token':token}})
    .then((res)=> onSuccess(dispatch,res.data))
    .catch(()=> onFail(dispatch));
  }
}

const sliceAndConvertMonth = (wasteData) => {
  s = wasteData.date.slice(5,7);
  if(s.length == 2){
    i = Number( s.charAt(1));
  }else{
    i = Number(s);
  }
}
const counterMonth = (wasteData) => {
  if(wasteData.quantity_in_kg != 0){
    switch(wasteData.waste_type){
      case 'organic': organicByMonth[i-1] += wasteData.quantity_in_kg; break;
      case 'recycle': recycleByMonth[i-1] += wasteData.quantity_in_kg; break;
      case 'unrecycle': unrecycleByMonth[i-1] += wasteData.quantity_in_kg; break;
      case 'other': otherByMonth[i-1] += wasteData.quantity_in_kg; break;
    }
  }
}
const processData = (data) => {
  data.map(wasteData =>{
    sliceAndConvertMonth(wasteData);
    counterMonth(wasteData);
  });
}

const processGraphData = () => {
  for(t = 0; t<12; t++){
   organic.push({x:t+1, y:organicByMonth[t]});
   recycle.push({x:t+1, y:recycleByMonth[t]});
   unrecycle.push({x:t+1, y:unrecycleByMonth[t]});
   other.push({x:t+1, y:otherByMonth[t]});
  }
}

const onSuccess = (dispatch, data) => {
  processData(data);
  processGraphData();
  dispatch({
    type: CURRENT_GRAPH_DATA_LOADED,
    payload: {organic, recycle, unrecycle, other}
  })
}
const onFail = (dispatch) => {
  dispatch({
    type: CURRENT_GRAPH_DATA_NOT_LOADED
  })
}