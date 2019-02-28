import { API_REQUEST, FETCH_CYCLES } from 'constants/action-types';

export const fetchCycles = () => ({
  type: API_REQUEST,
  payload: {
    url: 'http://ci-dash.mobimate.local:3001/ci/cycles',
    method: 'GET',
    params: {
      branch: 'master',
      limit: 12
    },
    nextType: FETCH_CYCLES
  }
});
