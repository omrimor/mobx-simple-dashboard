import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root';
import apiMiddleware from './middleware/api';
import createLogger from 'redux-logger';
import { compose } from 'recompose';

const middlewareChain = [apiMiddleware];

const enhancers = [];

if ($_ENVIRONMENT === 'development') {
  middlewareChain.unshift(createLogger({ collapsed: true }));
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewareChain),
    ...enhancers)
);

if ($_ENVIRONMENT === 'development') {
  window.store = store;
  window.devToolsExtension && window.devToolsExtension();
}

export default store;

