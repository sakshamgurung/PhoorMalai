import{
  TOGGLE_COLLECTOR_DIALOG,
  COLLECTOR_EMAIL_CHANGED,
  COLLECTOR_EMAIL_EXIST
} from './types';

import axios from 'axios';

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
  return (dispatch) => {
    //let token = await AsyncStorage('token');
    let token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWQ4MmYzZmM1YzZmODMwODVjMmU4N2ZhIn0sImlhdCI6MTU2OTIxMjI0NCwiZXhwIjoxNTY5NDcxNDQ0fQ.xk7-Yezdpg49PB6eSNUTumab4Tak3Q8H-W_vnu9pMiE'
    axios.post('http://10.0.2.2:5000/api/collector_list/get_collector',{
        collector_email:collector_email
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      })
    .then((res)=> onSuccess(res.data.msg, navigation, spot_ref, spot_street, spot_city, spot_district, collector_email))
    .catch(()=> onFail(dispatch));
  }
}

const onSuccess = (status, navigation,spot_ref, spot_street, spot_city, spot_district, collector_email)=>{
  if(status == "200"){
    navigation.navigate("Collector",{
      spot_ref,
      spot_street,
      spot_city,
      spot_district,
      collector_email
    });
  }
}

