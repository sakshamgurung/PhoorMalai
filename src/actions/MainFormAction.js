import AsyncStorage from '@react-native-community/async-storage';
import{
  RESET,
  TOGGLE_COLLECTOR_DIALOG,
  COLLECTOR_EMAIL_CHANGED,
  COLLECTOR_EMAIL_EXIST,
  COLLECTOR_EMAIL_NOT_FOUND
} from './types';
import axios from 'axios';
import Config from 'react-native-config';

export const resetCollectorDialog = () => {
  return({
    type: RESET
  });
}

export const displayCollectorDialog = (flag)=> {
  return({
    type:TOGGLE_COLLECTOR_DIALOG,
    payload: flag
  });
}
export const collectorEmailChanged = (text)=> {
  return({
    type:COLLECTOR_EMAIL_CHANGED,
    payload: text
  });
}

export const checkEmail = (collector_email, navigation, spot_ref, spot_street, spot_city, spot_district) => {
  return async(dispatch) => {
    try {
      let token = await AsyncStorage.getItem('token');
      axios.post(Config.GET_COLLECTOR_API,{
          collector_email:collector_email
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        })
      .then((res)=> onSuccess(dispatch,res.data.msg, navigation, spot_ref, spot_street, spot_city, spot_district, collector_email))
      .catch(()=> onFail(dispatch));
    } catch (error) {
      console.log(error);
    }
  }
}

const onSuccess = (dispatch,status, navigation,spot_ref, spot_street, spot_city, spot_district, collector_email)=>{
  if(status == "200"){
    dispatch({
      type:COLLECTOR_EMAIL_EXIST
    })
    navigation.navigate("Collector",{
      spot_ref,
      spot_street,
      spot_city,
      spot_district,
      collector_email
    });
  }
}

const onFail = (dispatch)=>{
  dispatch({
    type:COLLECTOR_EMAIL_NOT_FOUND,
    payload:"Not registered as collector"
  })
}

