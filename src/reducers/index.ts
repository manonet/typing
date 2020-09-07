import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import focusUserInputReducer from './focusUserInput';
import typingReducer from './typing';
import userIsTouchingReducer from './userIsTouching';

const rootReducer = combineReducers({
  focusUserInput: focusUserInputReducer,
  typing: typingReducer,
  userIsTouching: userIsTouchingReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
});

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;
