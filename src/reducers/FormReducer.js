import {
  WASTE_TYPE_SELECTED,
  TOGGLE_PICKER_DISPLAY,
  QUANTITY_CHANGED,
  FORM_SUBMITTED,
  FORM_NOT_SUBMITTED
} from '../actions/types';
const INITIAL_STATE = {
  quantity:'',
  displayPicker:false,
  wasteType:'Select',
  message:''
}
export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case WASTE_TYPE_SELECTED: 
      return {...state, wasteType:action.payload};
    case TOGGLE_PICKER_DISPLAY: 
      return {...state, displayPicker:action.payload};
    case QUANTITY_CHANGED: 
      return {...state, quantity:action.payload};
    case FORM_SUBMITTED:
      return {...state, quantity:'', displayPicker:false, wasteType:'Select', message:'Successful'}
    case FORM_NOT_SUBMITTED:
      return {...state, message:'No Success'}
    default:
      return state;
  }
};