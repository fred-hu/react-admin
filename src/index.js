import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Router from './router';
import './styles/App.less';
let store = createStore(reducers,applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  document.getElementById('app')
);




