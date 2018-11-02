let defaultState = {count:0};
let exampleReducer = (state = defaultState, action) => {
  const {count} = state;
  switch (action.type) {
    case 'TEST':
      return Object.assign({},state,{count:count+1});
    default:
      return state;
  }
};
export default exampleReducer;