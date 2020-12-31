// TODO - every language needs unique order
// TODO - order should be customizable by the user
// TODO - if the user can reorder the list, how to determin, which item was already learned, and which not?
// TODO - start with introduction for 'Space', 'Enter', 'Backspace', etc. keys
import { EventCode } from '@types';

// Original lesson order of the Hungarian manonet app: jfkdlséaárueiwovmc,x.t[Shift]zghbnqpy-íőöüóúű

// The keyOrder is the recommended order to learn the characters on the keyboard one-by-one. The list contains the keyboard key `code`, because characters are unknown on the beginning.
export const keyOrder = [
  'KeyJ',
  'KeyF',
  'KeyK',
  'KeyD',
  'KeyL',
  'KeyS',
  'Semicolon',
  'KeyA',
  'Quote',
  'KeyU',
  'KeyR',
  'KeyI',
  'KeyE',
  'KeyO',
  'KeyW',
  'KeyM',
  'KeyC',
  'Comma',
  'KeyX',
  'Period',
  'KeyZ',
  'KeyY',
  'KeyT',
  'KeyP',
  'KeyQ',
  'KeyN',
  'KeyV',
  'KeyH',
  'KeyG',
  'KeyB',
  'Slash',
  'BracketLeft',
  'Minus',
  'Minus',
  'Equal',
  'BracketRight',
  'Backslash',
  'IntlBackslash',
  'Backquote',
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
] as EventCode[];

export const homeRowKeys = [
  'KeyJ',
  'KeyF',
  'KeyK',
  'KeyD',
  'KeyL',
  'KeyS',
  'Semicolon',
  'KeyA',
];

export type KeyRequirements = {
  [key in EventCode]: {
    hits: number;
  };
};

export const keyRequirements = function (key: EventCode) {
  // this function returns a small number on the beginning and even bigger number while progressing
  const index = keyOrder.findIndex((e) => e === key) + 1;
  return Math.pow(index, 2) * 10;
};
