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
