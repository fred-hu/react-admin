const defaultState = { namespace: 'exampleReducer', count: 0 };
const exampleReducer = (state = defaultState, action) => {
  const { count } = state;
  if (action.namespace && action.namespace != state.namespace) {
    return state;
  }
  switch (action.type) {
  case 'TEST':
    return Object.assign({}, state, { count: count + 1 });
  default:
    return state;
  }
};
export default exampleReducer;
