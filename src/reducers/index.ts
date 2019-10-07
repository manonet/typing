import { combineReducers } from 'redux';

import focusUserInputReducer from './focusUserInput';
import setSampleTextReducer from './setSampleText';

const rootReducer = combineReducers({
  focusUserInput: focusUserInputReducer,
  setSampleText: setSampleTextReducer,
});

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;
