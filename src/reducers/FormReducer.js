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
      return {...state, quantity:'', displayPicker:false, wasteType:'Select'}
    case FORM_NOT_SUBMITTED:
      console.log('form not submitted')
    default:
      return state;
  }
};