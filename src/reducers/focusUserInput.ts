import { FocusUserInputAction } from '../actions';
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
  const { isUserInputFocused, type } = action;
  if (type === 'FOCUSUSERINPUT') {
    return Object.assign({}, state, {
      isUserInputFocused,
    });
  }
  return state;
}
