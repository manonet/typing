import {
  SetSampleTextAction,
  InputChangeAction,
  KeyboardAction,
  INPUT_CHANGE,
  KEY_DOWN,
  KEY_UP,
  SET_SAMPLE_TEXT,
  FLUSH_KEYBOARD,
} from '../actions/index';
import {
  EventCode,
  Level,
  Levels,
  Key,
  PossibleKeyStates,
  Keyboard,
} from '../types';
import { functionalKeyCodes } from '../types/allEventKeyCodes';

import keyboard from './keyboard';

export type Marks = {
  [key in string]: PossibleKeyStates;
};

export type KeyDown = {
  code: EventCode;
  dead?: boolean;
  level: Level;
};

export type TypingState = {
  sampleText: string;
  lastKeyUp?: EventCode;
  previousKeyDown?: KeyDown;
  currentKeyDown?: KeyDown;
  keysDown: EventCode[];
  displayedLevel: Level;
  levels: Levels;
  cursorAt: number;
  signToWrite: string;
  writtenSign: string;
  inputChanged: boolean;
  userText: string;
  isCapsLockOn: boolean;
  keys: Key[];
  os: string;
} & Keyboard;

const initialState: TypingState = {
  cursorAt: 0,
  userText: '',
  signToWrite: '',
  writtenSign: '',
  inputChanged: false,
  sampleText: '',
  keysDown: [],
  ...keyboard,
  keys: [...keyboard.keys],
  isCapsLockOn: false,
  os: keyboard.os,
  levels: [
    'to',
    'Shift',
    'AltGraph',
    'AltGraph+Shift',
    // 'Alt',
    // 'Alt+Shift',
    // 'Alt+AltGraph',
    // 'CapsLock',
    // 'CapsLock+Shift',
    // 'Alt+CapsLock',
    // 'CapsLock+Control',
    // 'CapsLock+Control+Shift',
    // 'AltGraph+Control',
  ],
};

function markCharOnBoard({
  keys,
  levels,
  marks,
  reset,
}: {
  keys: Key[];
  levels: Levels;
  marks: Marks;
  reset: boolean;
}) {
  // reset all marks
  if (reset) {
    keys = keys.map((item) => {
      return {
        ...item,
        succeedState: undefined,
        marker: undefined,
      };
    });
  }
  // Loop in levels first. This is important, some characters exist on different keys on different levels, e.g.: 'í' on hungarian also exist on 'j' key + AltGr. We search obviously the basic ones.
  let modifierKeysToMark: Marks = {};
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    keys = keys.map((item) => {
      const mark = marks[item[level]];
      if (marks.hasOwnProperty(item[level])) {
        if (level !== 'to') {
          level.split('+').map((modifier) => {
            // mark only the opposite side than the character
            if (modifier === 'Shift') {
              if (item.hand === 'left') {
                modifierKeysToMark['ShiftRight'] = mark;
              } else {
                modifierKeysToMark['ShiftLeft'] = mark;
              }
            }
            if (modifier === 'Alt') {
              modifierKeysToMark['AltLeft'] = mark;
            }
            if (modifier === 'AltGraph') {
              modifierKeysToMark['AltRight'] = mark;
            }
            if (modifier === 'Control') {
              if (item.hand === 'left') {
                modifierKeysToMark['ControlRigt'] = mark;
              } else {
                modifierKeysToMark['ControlLeft'] = mark;
              }
            }
          });
        }
        delete marks[item[level]];
        return {
          ...item,
          ...mark,
        };
      }

      return item;
    });
    if (
      Object.keys(modifierKeysToMark).length !== 0 &&
      modifierKeysToMark.constructor === Object
    ) {
      keys = keys.map((item) => {
        if (modifierKeysToMark.hasOwnProperty(item.code)) {
          return {
            ...item,
            ...modifierKeysToMark[item.code],
          };
        }

        return item;
      });
    }

    if (Object.keys(marks).length === 0 && marks.constructor === Object) {
      // exit levels loop if all key marked
      break;
    }
  }
  return keys;
}

export default function typingReducer(
  state: TypingState = initialState,
  action: SetSampleTextAction | InputChangeAction | KeyboardAction
): TypingState {
  let layout = state.layout;

  switch (action.type) {
    case SET_SAMPLE_TEXT:
      return Object.assign({}, state, {
        sampleText: action.sampleText,
      });

    case INPUT_CHANGE: {
      // TODO desc
      const userText = action.userText;
      const sampleText = state.sampleText;
      const cursorAt = userText.length;
      const writtenSign = cursorAt > 0 ? userText.charAt(cursorAt - 1) : '';
      const nextSign = sampleText.charAt(cursorAt);
      const signToWrite = cursorAt >= 1 ? sampleText.charAt(cursorAt - 1) : '';
      const charsSucceed = signToWrite === writtenSign;
      const { currentKeyDown, previousKeyDown } = state;

      // change layout if necessary
      // TODO - add props to keys and make this check in Keyboard component for performance

      if (!(layout === '106/109-JIS' || layout === '103/106-KS')) {
        if (!(layout === '104/107-ABNT')) {
          if (currentKeyDown?.code === 'IntlYen') {
            layout = '101/104-Variant';
          }
          if (currentKeyDown?.code === 'IntlBackslash') {
            layout = '102/105-ISO';
          }
        }
        if (
          currentKeyDown?.code === 'Lang2' ||
          currentKeyDown?.code === 'Lang1'
        ) {
          layout = '103/106-KS';
        }
        if (currentKeyDown?.code === 'IntlRo') {
          layout = '104/107-ABNT';
        }
        if (
          currentKeyDown?.code === 'NonConvert' ||
          currentKeyDown?.code === 'Convert' ||
          currentKeyDown?.code === 'KanaMode'
        ) {
          layout = '106/109-JIS';
        }
      }

      // characters can repeat, but object property keys can not, so assign new props if key exist:
      const marks: Marks = {
        [nextSign]: {
          marker: 'toPressFirst',
        },
      };
      marks[signToWrite] = Object.assign(
        {},
        { ...(marks[signToWrite] ? marks[signToWrite] : {}) },
        {
          succeedState: charsSucceed ? 'correct' : 'missed',
        }
      );
      marks[writtenSign] = Object.assign(
        {},
        { ...(marks[writtenSign] ? marks[writtenSign] : {}) },
        {
          succeedState: charsSucceed ? 'correct' : 'error',
        }
      );

      let deadKeys = { ...state.deadKeys };
      let keys = markCharOnBoard({
        keys: [...state.keys],
        reset: true,
        levels: [...state.levels],
        marks,
      });

      if (previousKeyDown?.dead) {
        if (currentKeyDown && previousKeyDown.code === currentKeyDown.code) {
          // the dead key was pressed twice. It is highly possible that the iput is the right character as a key label. So update the keys, save it to corresponding level. ( It can be e.g.:´`¸˛)
          const { code, level } = previousKeyDown;
          keys = keys.map((item) => {
            if (item.code !== code) {
              return item;
            }
            return {
              ...item,
              [level]: writtenSign,
            };
          });
        } else {
          // Some key was pressed after a dead key. If it produces a different input than normal, save it into deadKeys. TODO - how to determine what is 'normal'?
          const previousKey = keys.find(
            (item) => item.code === previousKeyDown.code
          );
          const previousChar =
            previousKey && previousKey[previousKeyDown.level];
          const currentKey = keys.find(
            (item) => item.code === currentKeyDown?.code
          );
          const currentChar = currentKey && currentKey[currentKeyDown.level];
          if (previousChar && currentChar) {
            deadKeys[writtenSign] = [previousChar, currentChar];
          }
        }
      }

      return {
        ...state,
        userText,
        cursorAt,
        writtenSign,
        nextSign,
        signToWrite,
        charsSucceed,
        deadKeys,
        keys,
        layout,
      };
    }

    case KEY_DOWN: {
      // if 'DEAD' - second input does not count as label, but dead key combination

      const event = action.event;

      const { code, key } = event;

      const newKeysDown =
        state.keysDown.indexOf(code) === -1
          ? [...state.keysDown, code]
          : state.keysDown;

      const getModifierStateCapsLock = event.getModifierState('CapsLock'); // always true if CapsLock pressed, also buggy
      const isCapsLockOn = getModifierStateCapsLock ? true : state.isCapsLockOn;

      const modifiers = [
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
        // ORDER COUNTS!
        ...(event.getModifierState('Alt') ? ['Alt'] : []),
        ...(event.getModifierState('AltGraph') ? ['AltGraph'] : []),
        // ...(getModifierStateCapsLock ? ['CapsLock'] : []),
        // ...(event.getModifierState('Control') ? ['Control'] : []),
        ...(event.getModifierState('Shift') ? ['Shift'] : []),
      ];
      const level: Level = modifiers.length ? modifiers.join('+') : 'to';

      const modifiersDown = [
        // ORDER COUNTS!
        ...(newKeysDown.includes('AltLeft') ? ['Alt'] : []),
        ...(newKeysDown.includes('AltRight') ? ['AltGraph'] : []),
        // ...(isCapsLockOn ? ['CapsLock'] : []),
        ...(newKeysDown.includes('ShiftLeft') ? ['Shift'] : []),
        ...(newKeysDown.includes('ShiftRight') ? ['Shift'] : []),
      ];
      const displayedLevel: Level = modifiersDown.length
        ? modifiersDown.join('+')
        : 'to';

      let keys = [...state.keys];

      keys = keys.map((item) => {
        if (isCapsLockOn && item.code === 'CapsLock' && code !== 'CapsLock') {
          return {
            ...item,
            pressure: 'locked',
          };
        }
        if (item.code !== code) {
          return item;
        }
        if (functionalKeyCodes.includes(code)) {
          return {
            ...item,
            pressure: 'pressed',
          };
        }

        // Do not assign glyph to the key if CapsLock is on or a dead key was pressed before
        if (!(isCapsLockOn || state.currentKeyDown?.dead)) {
          return {
            // "discover key"
            [level]: key !== 'Dead' ? key : undefined, // this case will be handled on input
            ...item,
            pressure: 'pressed',
            dead: key === 'Dead',
          };
        }
        return {
          ...item,
          pressure: 'pressed',
          dead: key === 'Dead',
        };
      });

      const currentKeyDown: KeyDown = {
        code,
        dead: key === 'Dead',
        level,
      };

      return {
        ...state,
        displayedLevel,
        keysDown: newKeysDown,
        previousKeyDown: state.currentKeyDown,
        currentKeyDown,

        // displayedLevel,
        // cursorAt: state.userText.length,
        keys,
      };
    }

    case KEY_UP: {
      const event = action.event;

      const { code, key } = event;
      const modifiersActuallyNotDown = [
        ...(!event.getModifierState('Alt') ? ['AltLeft'] : []),
      ];
      const newKeysDown = state.keysDown.filter((item) => {
        // e.g. Alt key changes the focus of the browser, so no key up event fired for Alt
        return item !== code && !modifiersActuallyNotDown.includes(item);
      });

      let isCapsLockOn =
        code === 'CapsLock'
          ? !state.isCapsLockOn
          : event.getModifierState('CapsLock');

      const modifiersDown = [
        // ORDER COUNTS!
        ...(newKeysDown.includes('AltLeft') ? ['Alt'] : []),
        ...(newKeysDown.includes('AltRight') ? ['AltGraph'] : []),
        // ...(isCapsLockOn ? ['CapsLock'] : []),
        ...(newKeysDown.includes('ShiftLeft') ? ['Shift'] : []),
        ...(newKeysDown.includes('ShiftRight') ? ['Shift'] : []),
      ];
      const displayedLevel: Level = modifiersDown.length
        ? modifiersDown.join('+')
        : 'to';

      let keys = [...state.keys];
      keys = keys.map((item) => {
        if (isCapsLockOn && item.code === 'CapsLock') {
          return {
            ...item,
            pressure: 'locked',
          };
        }
        if (modifiersActuallyNotDown.includes(item.code)) {
          return {
            ...item,
            pressure: undefined,
          };
        }
        if (item.code === code) {
          return {
            ...item,
            pressure: undefined,
          };
        }

        return item;
      });

      return {
        ...state,
        // lastKeyUp: code,
        isCapsLockOn,
        keysDown: newKeysDown,
        displayedLevel,
        keys,
      };
    }

    case FLUSH_KEYBOARD: {
      return {
        ...state,
        keys: [...keyboard.keys],
      };
    }

    default:
      return state;
  }
}
