/*
 * action types
 */
export type incrementAction = ReturnType<typeof incrementNumber>;

export const INCREMENT = 'INCREMENT';

/*
 * action creators
 */
export function incrementNumber(amount: number) {
  return { type: INCREMENT, payload: amount };
}

export type focusUserInputAction = ReturnType<typeof focusUserInput>;

export const FOCUSUSERINPUT = 'FOCUSUSERINPUT';

export function focusUserInput(isUserInputFocused: boolean) {
  return { type: FOCUSUSERINPUT, isUserInputFocused };
}
