// Minimal type implementation of KeyboardEvent: code values
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values

// https://en.wikipedia.org/wiki/Function_key
// https://en.wikipedia.org/wiki/File:ISO_keyboard_(105)_QWERTY_UK.svg
export const modifierKeyCodes = [
  'AltLeft',
  'AltRight',
  'CapsLock',
  'ControlLeft',
  'ControlRight',
  'MetaLeft',
  'MetaRight',
  'ShiftLeft',
  'ShiftRight',
];

export const functionalKeyCodes = [
  ...modifierKeyCodes,
  'Backspace',
  'ContextMenu',
  'Convert',
  'Enter',
  'IntlYen',
  'KanaMode',
  'Lang1',
  'Lang2',
  'NonConvert',
  'OSLeft',
  'OSRight',
  'Tab',
  'Space',
];

export const editingKeyCodes = [
  'Copy',
  'Cut',
  'Delete',
  'Insert',
  'Paste',
  'Undo',
];

export const lockKeyCodes = [
  // contain duplicates
  'CapsLock',
  'ScrollLock',
  'NumLock',
];

export const arrowKeyCodes = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
];

export const navigationKeyCodes = [
  'Tab',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ...arrowKeyCodes,
];

export const functionKeyCodes = [
  'Escape',
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'F13',
  'F14',
  'F15',
  'F16',
  'F17',
  'F18',
  'F19',
  'F20',
  'F21',
  'F22',
  'F23',
  'F24',
  'PrintScreen',
  'ScrollLock',
  'Pause',
];

export const numericKeypadKeyCodes = [
  'Numpad0',
  'Numpad1',
  'Numpad2',
  'Numpad3',
  'Numpad4',
  'Numpad5',
  'Numpad6',
  'Numpad7',
  'Numpad8',
  'Numpad9',
  'NumpadAdd',
  'NumpadDecimal',
  'NumpadMultiply',
  'NumpadSubtract',
  'NumpadEqual',
  'NumpadDivide',
  'NumpadEnter',
  'NumLock',
];

export const mediaKeyCodes = [
  'AudioVolumeDown',
  'AudioVolumeMute',
  'AudioVolumeUp',
  'BrowserBack',
  'BrowserFavorites',
  'BrowserForward',
  'BrowserHome',
  'BrowserRefresh',
  'BrowserSearch',
  'BrowserStop',
  'Eject',
  'Help',
  'LaunchApp1',
  'LaunchApp2',
  'LaunchMail',
  'LaunchMediaPlayer',
  'MediaPlayPause',
  'MediaSelect',
  'MediaStop',
  'MediaTrackNext',
  'MediaTrackPrevious',
  'Power',
  'Sleep',
  'WakeUp',
];

export const numericKeyCodes = [
  'Digit0',
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
  'Digit5',
  'Digit6',
  'Digit7',
  'Digit8',
  'Digit9',
];

export const alphaKeyCodes = [
  'KeyA',
  'KeyB',
  'KeyC',
  'KeyD',
  'KeyE',
  'KeyF',
  'KeyG',
  'KeyH',
  'KeyI',
  'KeyJ',
  'KeyK',
  'KeyL',
  'KeyM',
  'KeyN',
  'KeyO',
  'KeyP',
  'KeyQ',
  'KeyR',
  'KeyS',
  'KeyT',
  'KeyU',
  'KeyV',
  'KeyW',
  'KeyX',
  'KeyY',
  'KeyZ',
];

export const specialCharacterKeyCodes = [
  'Backquote',
  'Backslash',
  'BracketLeft',
  'BracketRight',
  'Comma',
  'Equal',
  'IntlBackslash',
  'IntlRo',
  'IntlYen',
  'Minus',
  'Period',
  'Quote',
  'Semicolon',
  'Slash',
];

export const writingSystemKeyCodes = [
  ...alphaKeyCodes,
  ...numericKeyCodes,
  ...specialCharacterKeyCodes,
];

export const alphaNumericKeyCodes = [
  ...writingSystemKeyCodes,
  ...functionalKeyCodes,
];

export const allEventKeyCodes = [
  ...alphaNumericKeyCodes,
  ...navigationKeyCodes,

  // not yet in use
  // ...editingKeyCodes,
  // ...numericKeypadKeyCodes,
  // ...mediaKeyCodes,
] as const;
