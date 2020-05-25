import { combineReducers } from 'redux';

import focusUserInputReducer from './focusUserInput';
import typingReducer from './typing';
import userIsTouchingReducer from './userIsTouching';

const rootReducer = combineReducers({
  focusUserInput: focusUserInputReducer,
  typing: typingReducer,
  userIsTouching: userIsTouchingReducer,
});

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;
