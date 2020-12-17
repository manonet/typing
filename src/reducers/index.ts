import { combineReducers } from 'redux';

import typingReducer from './typing';
import focusUserInputReducer from './userInputFocus';
import userIsTouchingReducer from './userIsTouching';

const rootReducer = combineReducers({
  userInputFocus: focusUserInputReducer,
  typing: typingReducer,
  userIsTouching: userIsTouchingReducer,
});

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;

/*

User should be logged in.
User is logged in on a **device**
The device has at least one **physical keyboard**
A physical keyboard can be used for multiple **keyboard layouts** on the operation system

Loggin in to a different device may means a different physical keyboard and/or different keyboard layout. This is why the keyboard layout (name) must be saved on the device too.

*/
