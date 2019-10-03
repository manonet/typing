import { incrementAction } from '../actions/index';
export type IncrementState = {
  count: number;
};

const initialState: IncrementState = {
  count: 0,
};

export default function incrementReducer(
  state: IncrementState = initialState,
  action: incrementAction
) {
  const { type, payload } = action;
  if (type === 'INCREMENT') {
    return Object.assign({}, state, {
      count: state.count + payload,
    });
  }
  return state;
}
