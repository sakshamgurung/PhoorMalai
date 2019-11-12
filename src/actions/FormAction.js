import AsyncStorage from '@react-native-community/async-storage';
import{
  WASTE_TYPE_SELECTED,
  TOGGLE_PICKER_DISPLAY,
  QUANTITY_CHANGED,
  FORM_SUBMITTED,
  FORM_NOT_SUBMITTED
} from './types';
import axios from 'axios';
export const quantityChanged = (text)=> {
  return({
    type:QUANTITY_CHANGED,
    payload: text
  });
}
export const wasteTypeSelected = (text)=> {
  return({
    type:WASTE_TYPE_SELECTED,
    payload: text
  });
}
export const togglePickerDisplay = (text)=> {
  return({
    type:TOGGLE_PICKER_DISPLAY,
    payload: text
  });
}
export const formSubmitted = ({spot_ref, wasteType, quantity})=> {
  return async(dispatch) => {
    try {
      if(wasteType == "Select" || quantity == ""){
        onFail(dispatch);
      }
      let qty = Number(quantity);
      if(qty < 0 ){
        onFail(dispatch);
      }
      let token = await AsyncStorage.getItem('token');
      //let token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ1YTg3NDY2YjE5ODYyNDYwNjlkYjFhIn0sImlhdCI6MTU3MjU3Nzc4NSwiZXhwIjoxNTcyODM2OTg1fQ.S4VreC7kcOsPKBTFP_UGCzof27FIUQlPsAlPhoXRsTI';
      //axios.post('http://10.0.2.2:5000/api/spot',{
      axios.post('http://192.168.3.13:5000/api/spot',{
        spot_list_ref: spot_ref,
        waste_type: wasteType,
        quantity_in_kg: qty,
        history_flag: false
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      })
      .then((res) => {onSuccess(dispatch)})
      .catch((err) => {onFail(dispatch)});      
    } catch (err) {
      console.log(err);
    }
    
  }
}

const onSuccess = (dispatch)=>{
  dispatch({
    type:FORM_SUBMITTED
  });
}
const onFail = (dispatch)=>{
  dispatch({
    type:FORM_NOT_SUBMITTED
  });
}

