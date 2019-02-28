import { handleActions } from 'redux-actions';
import { FETCH_CYCLES } from 'constants/action-types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  loading: true,
  error: false,
  list: []
});

const cyclesReducer = handleActions({

  [FETCH_CYCLES.PENDING]: (state, action) => ({
    loading: true,
    error: false,
    list: []
  }),

  [FETCH_CYCLES.SUCCESS]: (state, action) => ({
    loading: false,
    error: false,
    list: action.response
  }),

  [FETCH_CYCLES.ERROR]: (state, action) => ({
    loading: false,
    error: true,
    list: []
  })

}, initialState);


export default cyclesReducer;
