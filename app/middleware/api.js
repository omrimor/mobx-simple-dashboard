import { API_REQUEST } from 'constants/action-types';
import request from 'superagent';

const apiMiddleware = ({ getState, dispatch }) => next => action => {
  if (action.type !== API_REQUEST) {
    return next(action);
  }

  const success = (response) => {
    dispatch({
      type: action.payload.nextType.SUCCESS,
      response: response.body,
      meta: action.meta
    });
  };

  const error = (response) => {
    dispatch({
      type: action.payload.nextType.FAILURE,
      response,
      error: response.error,
      meta: action.meta
    });
  };

  const paramsMethod = action.payload.method === 'GET' ? 'query' : 'send';
  const parameters = action.payload.parameters || {};
  const requestBody = action.payload.requestBody ? JSON.stringify(action.payload.requestBody) : undefined;

  request(action.payload.method, action.payload.url)
    .set('Authorization', 'Basic bW9yMjBAbWFpbGluYXRvci5jb206cGFzc3dvcmQx')
    .set('clientType', 'Web')
    .withCredentials()
    .type('json')[paramsMethod](requestBody || parameters)
    .then(success, error);

  dispatch({
    type: action.payload.nextType.PENDING,
    meta: action.meta
  });

  return next(action);
};

export default apiMiddleware;
