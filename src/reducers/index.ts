// import { combineReducers } from 'redux'

import initialState from '../state/initialState';

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === 'INCREMENT') {
    return Object.assign({}, state, {
      count: state.count + payload,
    });
  }
  return state;
};

// const reducers = combineReducers({
//   reducer,
// })

export default reducer;
