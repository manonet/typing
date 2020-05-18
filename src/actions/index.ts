export type SetSampleTextAction = ReturnType<typeof setSampleText>;

export const SET_SAMPLE_TEXT = 'SET_SAMPLE_TEXT';

export function setSampleText(sampleText: string) {
  return { type: SET_SAMPLE_TEXT, sampleText };
}

export type FocusUserInputAction = ReturnType<typeof focusUserInput>;

export const FOCUSUSERINPUT = 'FOCUSUSERINPUT';

export function focusUserInput(isUserInputFocused: boolean) {
  return { type: FOCUSUSERINPUT, isUserInputFocused };
}

export type UserIsTouchingAction = ReturnType<typeof userIsTouching>;

export const USER_IS_TOUCHING = 'USER_IS_TOUCHING';

export function userIsTouching(isTouchDevice: boolean) {
  return { type: USER_IS_TOUCHING, isTouchDevice };
}
