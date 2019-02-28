 const asyncAction = (type) => ({
   PENDING: `${type}_PENDING`,
   SUCCESS: `${type}_SUCCESS`,
   FAILURE: `${type}_FAILURE`
 });

// API
export const API_REQUEST = 'API_REQUEST';
// Cycles
export const FETCH_CYCLES =  asyncAction('FETCH_CYCLES');