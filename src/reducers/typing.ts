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
  OS,
  KeyMap,
  DeadKeys,
} from '../types';
import {
  functionalKeyCodes,
  navigationKeyCodes,
} from '../types/allEventKeyCodes';

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
  allChars: [];
  keyMap: {};
  os: OS;
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
  allChars: [...keyboard.allChars],
  keyMap: { ...keyboard.keyMap },
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
  deadKeys,
  keyMap,
  keys,
  marks,
  reset,
}: {
  keys: Key[];
  keyMap: KeyMap;
  marks: Marks;
  deadKeys: DeadKeys;
  reset: boolean;
}) {
  keys = keys.map((item, index) => {
    let mark = {};
    let modifierKeysToMark: PossibleKeyStates = {};

    Object.keys(marks).map(function (key) {
      const level = keyMap[key] && keyMap[key].level;
      if (level && level !== 'to') {
        const hand = keyMap[key].index && keys[keyMap[key].index].hand;
        level.split('+').map((modifier) => {
          // mark only the opposite side than the character
          if (modifier === 'Shift') {
            if (hand === 'left' && item.code === 'ShiftRight') {
              modifierKeysToMark = marks[key];
            }
            if (hand === 'right' && item.code === 'ShiftLeft') {
              modifierKeysToMark = marks[key];
            }
          }
          if (modifier === 'Alt' && item.code === 'AltLeft') {
            modifierKeysToMark = marks[key];
          }
          if (modifier === 'AltGraph' && item.code === 'AltRight') {
            modifierKeysToMark = marks[key];
          }
        });
      }

      if (keyMap[key] && index === keyMap[key].index) {
        mark = marks[key];
        delete marks[key];
      }
    });

    return {
      ...item,
      // reset all marks
      ...(reset ? { succeedState: undefined } : {}),
      ...(reset ? { marker: undefined } : {}),
      ...mark,
      ...modifierKeysToMark,
    };
  });

  if (Object.keys(marks).length !== 0) {
    Object.keys(marks).map(function (key) {
      const deadKey = deadKeys[key];
      const mark = marks[key];
      if (deadKey) {
        const glyph1 = deadKey[0].label;
        const glyph2 = deadKey[1].label;
        console.log(mark);
        const mark2 =
          mark.marker === 'toPressFirst'
            ? { ...mark, marker: 'toPressSecond' }
            : mark;
        const deadMarks = {
          [glyph1]: { ...mark },
          [glyph2]: { ...mark2 },
        };
        keys = markCharOnBoard({
          deadKeys,
          keyMap,
          keys,
          marks: deadMarks,
        });
      }
    });
  }

  console.log('marks', keys);
  return keys;
}

export default function typingReducer(
  state: TypingState = initialState,
  action: SetSampleTextAction | InputChangeAction | KeyboardAction
): TypingState {
  let layout = state.layout;

  function changeBackslashPosition() {
    // Change the physical position of the Backslash key
    const backslashKey = state.keys.find((key) => key.code === 'Backslash');
    backslashKey.iso = 'C12';
  }

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
      let keyMap = { ...state.keyMap };
      let allChars = [...state.allChars];

      // change layout if necessary
      // TODO - add props to keys instead and make this check in Keyboard component for performance
      if (!(layout === '106/109-JIS' || layout === '103/106-KS')) {
        if (!(layout === '104/107-ABNT')) {
          if (currentKeyDown?.code === 'IntlYen') {
            layout = '101/104-Variant';
          }
          if (currentKeyDown?.code === 'IntlBackslash') {
            layout = '102/105-ISO';
            changeBackslashPosition();
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
          changeBackslashPosition();
        }
        if (
          currentKeyDown?.code === 'NonConvert' ||
          currentKeyDown?.code === 'Convert' ||
          currentKeyDown?.code === 'KanaMode'
        ) {
          layout = '106/109-JIS';
          changeBackslashPosition();
        }
      }

      // allChars, statistics
      const allCharsWrittenIndex = allChars.findIndex(
        (char) => char.glyph === writtenSign
      );
      if (charsSucceed) {
        if (allCharsWrittenIndex === -1) {
          allChars.push({
            glyph: writtenSign,
            correct: 1,
            miswrite: 0,
            misread: 0,
          });
        } else {
          allChars[allCharsWrittenIndex].correct += 1;
        }
      } else {
        if (allCharsWrittenIndex === -1) {
          allChars.push({
            glyph: writtenSign,
            correct: 0,
            miswrite: 1,
            misread: 0,
          });
        } else {
          allChars[allCharsWrittenIndex].miswrite += 1;
        }
        const allCharsToWriteIndex = allChars.findIndex(
          (char) => char.glyph === signToWrite
        );
        if (allCharsToWriteIndex === -1) {
          allChars.push({
            glyph: signToWrite,
            correct: 0,
            miswrite: 0,
            misread: 1,
          });
        } else {
          allChars[allCharsToWriteIndex].misread += 1;
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

      // handle dead keys
      let deadKeys = { ...state.deadKeys };
      let keys = markCharOnBoard({
        keys: [...state.keys],
        reset: true,
        keyMap,
        marks,
        deadKeys,
      });

      if (previousKeyDown?.dead) {
        if (currentKeyDown && previousKeyDown.code === currentKeyDown.code) {
          // the dead key was pressed at least twice. It is highly possible that the iput is the right character as a key label. So update the keys, save it to corresponding level. ( It can be e.g.:´`¸˛)
          const { code, level } = previousKeyDown;
          keys = keys.map((item, index) => {
            if (item.code !== code) {
              return item;
            }

            let keyTops = item.keyTops ? [...item.keyTops] : [];
            const i = keyTops.findIndex((top) => top.level === level);
            if (i) {
              keyTops[i].label = writtenSign;
            }

            if (!keyMap[writtenSign]) {
              keyMap[writtenSign] = {
                index,
                level,
              };
            }
            return {
              ...item,
              keyTops,
            };
          });
        } else {
          // Some key was pressed after a dead key. If it produces a different input than normal, save it into deadKeys. TODO - how to determine what is 'normal'?
          const previousKey = keys.find(
            (item) => item.code === previousKeyDown.code
          );
          const previousChar =
            previousKey &&
            previousKey.keyTops?.find(
              (top) => top.level === previousKeyDown.level
            );
          const currentKey = keys.find(
            (item) => item.code === currentKeyDown?.code
          );
          const currentChar =
            currentKey &&
            currentKey.keyTops?.find(
              (top) => top.level === currentKeyDown?.level
            );
          if (previousChar && currentChar) {
            deadKeys[writtenSign] = [previousChar, currentChar];
          }
        }
      }

      return {
        ...state,
        allChars,
        userText,
        cursorAt,
        writtenSign,
        nextSign,
        signToWrite,
        charsSucceed,
        deadKeys,
        keys,
        layout,
        keyMap,
      };
    }

    case KEY_DOWN: {
      // if 'DEAD' - second input does not count as label, but dead key combination

      const event = action.event;
      const { code, key, marker } = event;

      let keyMap = { ...state.keyMap };
      let keys = [...state.keys];

      // disable keys which makes able the navigation within the textinput. (changing caret position is undesirable)
      if (navigationKeyCodes.includes(code)) {
        event.view.event.preventDefault();
        // TODO: make it user friendly, e.g. toaster like info.
        console.info(`The usage of the ${code} key is disabled`);
      }

      /*
      const isToPressNext =
        keyMap[key] && keys[keyMap[key].index].marker === 'toPressFirst';
      console.log(isToPressNext);
      if (!isToPressNext) {
        event.view.event.preventDefault();
      }
      */

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

      keys = keys.map((item, index) => {
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
          let keyTops = item.keyTops ? [...item.keyTops] : [];

          const i = keyTops.findIndex((top) => top.level === level);

          if (i === -1) {
            keyTops.push({
              level,
              label: key !== 'Dead' ? key : undefined, // this case will be handled on input
              dead: key === 'Dead',
            });
          }

          if (!keyMap[key]) {
            keyMap[key] = {
              index,
              level,
            };
          }
          return {
            // "discover key"
            ...item,
            keyTops,
            pressure: 'pressed',
          };
        }
        return {
          ...item,
          pressure: 'pressed',
          // dead: key === 'Dead',
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
        keyMap,
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
