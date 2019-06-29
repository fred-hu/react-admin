import { combineReducers } from 'redux';
import exampleReducer from './ExamplerReducer';
import ajaxReducer from './AjaxReducer';
import menuReducer from './Menu';

export default combineReducers({
  exampleReducer,
  ajaxReducer,
  menuReducer
});
