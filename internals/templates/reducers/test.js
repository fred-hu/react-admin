let defaultState = { namespace: 'test'};
let test = (state = defaultState, action) => {
  const {  } = state;
  if (action.namespace && action.namespace != state.namespace) {
    return state;
  }
  switch (action.type) {
    case '':
      return Object.assign({}, state, {});
    default:
      return state;
  }
};
export default test;