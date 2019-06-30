const defaultState = { namespace: 'test' };
const test = (state = defaultState, action) => {
  // const { _conut } = state;
  if (action.namespace && action.namespace !== state.namespace) {
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
