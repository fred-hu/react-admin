const defaultState = { namespace: 'ajaxReducer', data: {}, count: 0 };
const ajaxReducer = (state = defaultState, action) => {
  const { count } = state;
  if (action.namespace && action.namespace !== state.namespace) {
    return state;
  }
  switch (action.type) {
  case 'TEST':
    return Object.assign({}, state, { count: count + 1 });
  case 'AJAX':
    return Object.assign({}, state, { data: action.data });
  default:
    return state;
  }
};
export default ajaxReducer;
