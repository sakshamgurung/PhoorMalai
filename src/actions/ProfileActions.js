import AsyncStorage from '@react-native-community/async-storage';
import {
  PROFILE_LOADED,
  PROFILE_FAIL
} from './types';
import axios from 'axios';


export const getProfile = () => {
  return async(dispatch) => {
    try {
      let token = await AsyncStorage.getItem('token');
      //let token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ4MmYzZmM1YzZmODMwODVjMmU4N2ZhIn0sImlhdCI6MTU2OTIxMjI0NCwiZXhwIjoxNTY5NDcxNDQ0fQ.xk7-Yezdpg49PB6eSNUTumab4Tak3Q8H-W_vnu9pMiE'
      //axios.get('http://10.0.2.2:5000/api/profile/me',{headers:{'x-auth-token':token}})
      axios.get('http://192.168.3.13:5000/api/profile/me',{headers:{'x-auth-token':token}})
      .then((res)=> {console.log(res);onSuccess(dispatch,res.data)})
      .catch(()=> onFail(dispatch));
    } catch (error) {
      console.log(error);
    }
  }
}

const onSuccess = (dispatch, data) => {
  let email = data.email;
  let name = data.name;
  dispatch({
    type:PROFILE_LOADED,
    payload:{email, name}
  })
}
const onFail = (dispatch) => {
  dispatch({
    type:PROFILE_FAIL
  })
}

export const edit = () => {
  return({
    type: TOGGLE_EDITABLE,
    payload: true
  });
}
export const phoneChanged = (text) => {
  return({
    type: PHONE_CHANGED,
    payload: text
  });
}
export const houseNoChanged = (text) => {
  return({
    type: HOUSE_NO_CHANGED,
    payload: text
  });
}
export const streetChanged = (text) => {
  return({
    type: STREET_CHANGED,
    payload: text
  });
}
export const cityChanged = (text) => {
  return({
    type: CITY_CHANGED,
    payload: text
  });
}
export const districtChanged = (text) => {
  return({
    type: DISTRICT_CHANGED,
    payload: text
  });
}
