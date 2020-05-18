import { UserIsTouchingAction } from '../actions/index';
export type UserIsTouchingState = {
  isTouchDevice: boolean;
};

const initialState: UserIsTouchingState = {
  isTouchDevice: false,
};

export default function userIsTouchingReducer(
  state: UserIsTouchingState = initialState,
  action: UserIsTouchingAction
) {
  const { isTouchDevice, type } = action;
  if (type === 'USER_IS_TOUCHING') {
    return Object.assign({}, state, {
      isTouchDevice,
    });
  }
  return state;
}
