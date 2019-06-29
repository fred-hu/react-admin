import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line
import { composeWithDevTools } from 'redux-devtools-extension';
// eslint-disable-next-line
import * as logOnlyInProduction from 'redux-devtools-extension/logOnlyInProduction';
import reducers from './reducers';
import Router from './router';
import './styles/App.less';
import './styles/index.css';
import './styles/test.scss';
let composeEnhancers;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });
} else {
  composeEnhancers = logOnlyInProduction.composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });
}

let store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app')
);
