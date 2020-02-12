import AsyncStorage from '@react-native-community/async-storage';
import {
  PROFILE_LOADED,
  PROFILE_FAIL
} from './types';
import axios from 'axios';
import Config from 'react-native-config';

export const getProfile = () => {
  return async(dispatch) => {
    try {
      let token = await AsyncStorage.getItem('token');
      axios.get(Config.PROFILE_API,{headers:{'x-auth-token':token}})
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
