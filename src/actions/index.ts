export * from './practices';

// FOCUSUSERINPUT

export type FocusUserInputAction = ReturnType<typeof focusUserInput>;

export const FOCUSUSERINPUT = 'FOCUSUSERINPUT';

export function focusUserInput(isUserInputFocused: boolean) {
  return { type: FOCUSUSERINPUT, isUserInputFocused };
}

// USER_IS_TOUCHING

export type UserIsTouchingAction = ReturnType<typeof userIsTouching>;

export const USER_IS_TOUCHING = 'USER_IS_TOUCHING';

export function userIsTouching(isTouchDevice: boolean) {
  return { type: USER_IS_TOUCHING, isTouchDevice };
}

// KEY_DOWN

export type KeyboardAction = ReturnType<
  typeof keyDown | typeof keyUp | typeof flushKeyboard | typeof inputChange
>;

export const KEY_DOWN = 'KEY_DOWN';

export function keyDown(event: KeyboardEvent) {
  return { type: KEY_DOWN, event };
}

// KEY_UP

export const KEY_UP = 'KEY_UP';

export function keyUp(event: KeyboardEvent) {
  return { type: KEY_UP, event };
}

// INPUT_CHANGE

export type InputChangeAction = ReturnType<typeof inputChange>;

export const INPUT_CHANGE = 'INPUT_CHANGE';

export function inputChange(userText: string) {
  return { type: INPUT_CHANGE, userText };
}

// FLUSH_KEYBOARD

export type FlushKeyboardAction = ReturnType<typeof flushKeyboard>;

export const FLUSH_KEYBOARD = 'FLUSH_KEYBOARD';

export function flushKeyboard() {
  return { type: FLUSH_KEYBOARD };
}

// CLOSE_SUMMARY

export type CloseSummaryAction = ReturnType<typeof closeSummary>;

export const CLOSE_SUMMARY = 'CLOSE_SUMMARY';

export function closeSummary() {
  return { type: CLOSE_SUMMARY };
}
