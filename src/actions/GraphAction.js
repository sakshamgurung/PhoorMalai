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
let o = 0;
let r = 0;
let ur = 0;
let ot = 0;
let s = '';
let i = 0;


export const currentDataLoading = (monthId) => {
  return (dispatch) => {
    try {
      //let token = await AsyncStorage.getItem('token');
      let token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ1YTg3NDY2YjE5ODYyNDYwNjlkYjFhIn0sImlhdCI6MTU3MjU3Nzc4NSwiZXhwIjoxNTcyODM2OTg1fQ.S4VreC7kcOsPKBTFP_UGCzof27FIUQlPsAlPhoXRsTI'
      //axios.get('http://10.0.2.2:5000/api/spot/current',{headers:{'x-auth-token':token}})
      axios.get('http://192.168.3.13:5000/api/spot/current',{headers:{'x-auth-token':token}})
      .then((res)=> onSuccess(dispatch,res.data,monthId))
      .catch(()=> onFail(dispatch));
    } catch (error) {
      console.log(error);
    }
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
const readyData = (monthId) => {
  if(monthId == -1){
    o = r = ur = ot = 0;
    for (t = 0; t<12; t++){
      o += organic[t].y;
      r += recycle[t].y;
      ur += unrecycle[t].y;
      ot += other[t].y;
    }
  }else{
    o = organic[monthId-1].y;
    r = recycle[monthId-1].y;
    ur = unrecycle[monthId-1].y;
    ot = other[monthId-1].y;
  }
}

const onSuccess = (dispatch, data, monthId) => {
  processData(data);
  processGraphData();
  readyData(monthId);
  dispatch({
    type: CURRENT_GRAPH_DATA_LOADED,
    payload: {o, r, ur, ot, monthId}
  })
}
const onFail = (dispatch) => {
  dispatch({
    type: CURRENT_GRAPH_DATA_NOT_LOADED
  })
}