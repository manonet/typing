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

export type EventPropsType = {
  code: string; // optional and defaulting to "", of type DOMString, that sets the value of KeyboardEvent.code. For example, the code returned is "KeyQ" for the Q key on a QWERTY layout keyboard, but the same code value also represents the ' key on Dvorak keyboards and the A key on AZERTY keyboards. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
  key: string; // optional and defaulting to "", of type DOMString, that sets the value of KeyboardEvent.key.
  timeStamp: number;
  // location: number; // optional and defaulting to 0, of type unsigned long, that sets the value of KeyboardEvent.location. The KeyboardEvent.location read-only property returns an unsigned long representing the location of the key on the keyboard or other input device. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location
  // ctrlKey: boolean; // optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.ctrlKey. The KeyboardEvent.ctrlKey read-only property returns a Boolean that indicates if the control key was pressed (true) or not (false) when the event occured. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey
  // shiftKey: boolean; // optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.shiftKey. The KeyboardEvent.shiftKey read-only property is a Boolean that indicates if the shift key was pressed (true) or not (false) when the event occurred. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey
  // altKey: boolean; // optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.altKey. The KeyboardEvent.altKey read-only property is a Boolean that indicates if the alt key (Option or ⌥ on OS X) was pressed (true) or not (false) when the event occured. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/altKey
  // metaKey: boolean; // optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.metaKey. The KeyboardEvent.metaKey read-only property returning a Boolean that indicates if the Meta key was pressed (true) or not (false) when the event occurred. Some operating systems may intercept the key so it is never detected. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey
  // repeat: boolean; // optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.repeat. The repeat read-only property of the KeyboardEvent interface returns a Boolean that is true if the given key is being held down such that it is automatically repeating.
  // isComposing: boolean; // optional and defaulting to false, of type Boolean, that sets the value of KeyboardEvent.isComposing. The KeyboardEvent.isComposing read-only property returns a Boolean value indicating if the event is fired within a composition session, i.e. after compositionstart and before compositionend.
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing
  // charCode: Deprecated
  // keyCode: Deprecated
  // which: Deprecated
  // type: string; // E.g.: "keydown"
  isCapsLockDown?: boolean;
  isAltDown?: boolean;
  isAltGraphDown?: boolean;
  isShiftDown?: boolean;
};

export function keyDown(eventProps: EventPropsType) {
  return { type: KEY_DOWN, eventProps };
}

// KEY_UP

export const KEY_UP = 'KEY_UP';

export function keyUp(eventProps: EventPropsType) {
  return { type: KEY_UP, eventProps };
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

// EXPLORE_KEYS

export type exploreKeysAction = ReturnType<typeof exploreKeys>;

export const EXPLORE_KEYS = 'EXPLORE_KEYS';

export function exploreKeys() {
  return { type: EXPLORE_KEYS };
}
