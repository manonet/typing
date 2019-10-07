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
