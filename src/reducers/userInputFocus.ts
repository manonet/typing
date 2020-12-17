import { UserInputFocusAction } from '../actions';

export type FocusUserInputState = {
  isUserInputFocused: boolean;
  shouldUserInputFocus: boolean;
};

const initialState: FocusUserInputState = {
  isUserInputFocused: false,
  shouldUserInputFocus: false,
};

export default function focusUserInputReducer(
  state: FocusUserInputState = initialState,
  action: UserInputFocusAction
) {
  const { focus, type } = action;
  if (type === 'GET_USER_INPUT_FOCUS') {
    return Object.assign({}, state, {
      isUserInputFocused: focus,
    });
  }
  if (type === 'SET_USER_INPUT_FOCUS') {
    return Object.assign({}, state, {
      shouldUserInputFocus: focus,
    });
  }
  return state;
}
