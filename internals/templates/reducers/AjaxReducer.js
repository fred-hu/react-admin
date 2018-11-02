let defaultState = {data:{}};
let ajax = (state = defaultState, action) => {
  switch (action.type) {
    case 'AJAX':
      return Object.assign({},state,{data:action.data});
    default:
      return state;
  }
};
export default ajax;