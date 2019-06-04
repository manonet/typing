/*
 * action types
 */

export const INCREMENT = 'INCREMENT'

/*
 * action creators
 */
export function incrementNumber(amount) {
  return { type: INCREMENT, payload: amount }
}
