import { combineReducers } from 'redux';

import focusUserInputReducer from './focusUserInput';
import increment from './increment';

const rootReducer = combineReducers({
  focusUserInput: focusUserInputReducer,
  increment,
});

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;
