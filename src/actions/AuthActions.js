// import axios from 'axios';
// import {NavigationActions} from 'react-navigation';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  RESET
} from './types';

export const resetState = () => {
  return({
    type: RESET
  });
}
export const emailChanged = (text) => {
  return({
    type: EMAIL_CHANGED,
    payload: text
  });
}

export const passwordChanged = (text) => {
  return ({
    type :    PASSWORD_CHANGED,
    payload:  text
  });
}

// export const loginUser = ({email, password}) => {
//   return (dispatch) => {
//     dispatch({type: LOGIN_USER});

//     const user = {
//       email,
//       password
//     };
//     try{
//         const body = JSON.stringify(user);
//         const config = {headers:{'Content-Type':'application/json'}};
//         axios.post('http://10.0.2.2:5000/api/auth',body,config)
//          axios.post('http://192.168.3.13:5000/api/auth',body,config)
//         .then((res) => loginUserSuccess(dispatch, res))
//         .catch(() => loginUserFail(dispatch));
        
//     }catch(err){this.loginUserFail(dispatch)}
//   }
// }

// const loginUserFail = (dispatch) => {
//   dispatch({
//     type: LOGIN_USER_FAIL
//   });
// }

// const loginUserSuccess = (dispatch,res) => {
//   const navigateAction = NavigationActions.navigate({
//     routeName: 'Map',
//     params:{'token':res.data.token}
//   });
//   dispatch({
//     type: LOGIN_USER_SUCCESS,
//     payload: res
//   });
//   this.props.navigate.dispatch(navigateAction);
// }