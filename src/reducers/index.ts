import { combineReducers } from 'redux';

import focusUserInputReducer from './focusUserInput';
import setSampleTextReducer from './setSampleText';
import userIsTouchingReducer from './userIsTouching';

const rootReducer = combineReducers({
  focusUserInput: focusUserInputReducer,
  setSampleText: setSampleTextReducer,
  userIsTouching: userIsTouchingReducer,
});

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;
