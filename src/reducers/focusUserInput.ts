import { FocusUserInputAction } from '../actions/index';
export type FocusUserInputState = {
  isUserInputFocused: boolean;
};

const initialState: FocusUserInputState = {
  isUserInputFocused: false,
};

export default function focusUserInputReducer(
  state: FocusUserInputState = initialState,
  action: FocusUserInputAction
) {
  const { type, isUserInputFocused } = action;
  if (type === 'FOCUSUSERINPUT') {
    return Object.assign({}, state, {
      isUserInputFocused,
    });
  }
  return state;
}
