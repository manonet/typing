import {
  CLOSE_SUMMARY,
  FLUSH_KEYBOARD,
  INIT_PRACTICE,
  INPUT_CHANGE,
  InputChangeAction,
  KEY_DOWN,
  KEY_UP,
  KeyboardAction,
  PracticeAction,
  SUMMARIZE_PRACTICE,
  EXPLORE_KEYS,
} from '../actions';
import {
  EventCode,
  GlyphStatistics,
  Key,
  Keyboard,
  KeyDown,
  Level,
  Marks,
  OS,
  Glyph,
  allLevelsOrdered,
  KeyMap,
} from '../types';
import { functionalKeyCodes } from '../types/allEventKeyCodes';
import {
  markCharOnBoard,
  keyOrder,
  keyRequirements,
  complianceRatio,
} from '../utils';

import keyboard from './keyboard';

export type TypingState = {
  allChars: GlyphStatistics[];
  keyToLearn: EventCode;
  levelToLearn: Level;
  explorerMode: boolean;
  charToLearn?: Glyph;
  charsLearned: Glyph[];
  currentKeyDown?: KeyDown;
  cursorAt: number;
  displayedLevel: Level;
  finishedPractices: number;
  inputChanged: boolean;
  isCapsLockOn: boolean;
  isPracticing: boolean;
  isPracticeAccomplished: boolean; // TODO - make it work
  keyMap: KeyMap;
  keys: Key[];
  keysDown: EventCode[];
  lastKeyUp?: EventCode;
  levels: typeof allLevelsOrdered;
  os: OS;
  practiceLength: number;
  previousKeyDown?: KeyDown;
  lessonText: string;
  signToWrite: string;
  showIntroduction: boolean;
  showSummary: boolean;
  showExploreMore: boolean;
  userText: string;
  writtenSign: string;
} & Keyboard;

const initialState: TypingState = {
  ...keyboard,
  allChars: [...keyboard.allChars],
  keyToLearn: keyOrder[0],
  levelToLearn: allLevelsOrdered[0],
  charsLearned: [],
  explorerMode: true,
  cursorAt: 0,
  finishedPractices: 0,
  inputChanged: false,
  isCapsLockOn: false,
  isPracticing: false,
  isPracticeAccomplished: true, // TODO - make it work
  keyMap: { ...keyboard.keyMap },
  keys: [...keyboard.keys],
  keysDown: [],
  levels: allLevelsOrdered,
  os: keyboard.os,
  practiceLength: 0,
  lessonText: '',
  signToWrite: '',
  showIntroduction: false,
  showSummary: false,
  showExploreMore: false,
  userText: '',
  writtenSign: '',
};

export default function typingReducer(
  state: TypingState = initialState,
  action: PracticeAction | InputChangeAction | KeyboardAction
): TypingState {
  let layout = state.layout;

  function changeBackslashPosition() {
    // Change the physical position of the Backslash key
    const backslashKey = state.keys.find((key) => key.code === 'Backslash');
    // @ts-ignore
    backslashKey.iso = 'C12';
  }

  switch (action.type) {
    case INIT_PRACTICE:
      return {
        ...state,
        // @ts-ignore
        lessonText: action.lessonText,
        // @ts-ignore
        practiceLength: action.lessonText.length,
        userText: '',
        cursorAt: 0,
        isPracticing: true,
        showSummary: false,
        showIntroduction: false,
      };
    case EXPLORE_KEYS:
      return {
        ...state,
        explorerMode: true,
        showSummary: false,
      };
    case SUMMARIZE_PRACTICE:
      return {
        ...state,
        showSummary: true,
      };
    case INPUT_CHANGE: {
      const { currentKeyDown, previousKeyDown } = state;

      let keyMap = { ...state.keyMap };
      let allChars = [...state.allChars];
      let keys = state.keys;
      let explorerMode = state.explorerMode;

      // TODO desc
      // @ts-ignore
      const userText = action.userText;
      const lessonText = state.lessonText;
      const cursorAt = userText.length;
      const writtenSign = cursorAt > 0 ? userText.charAt(cursorAt - 1) : '';
      const nextSign = lessonText.charAt(cursorAt);
      const signToWrite = cursorAt >= 1 ? lessonText.charAt(cursorAt - 1) : '';
      const charsSucceed = signToWrite === writtenSign;

      // change layout if necessary
      // TODO - add props to keys instead and make this check in Keyboard component for performance
      if (!(layout === '106/109-JIS' || layout === '103/106-KS')) {
        if (!(layout === '104/107-ABNT')) {
          // @ts-ignore
          if (currentKeyDown.code === 'IntlYen') {
            layout = '101/104-Variant';
          }
          // @ts-ignore
          if (currentKeyDown.code === 'IntlBackslash') {
            layout = '102/105-ISO';
            changeBackslashPosition();
          }
        }
        if (
          // @ts-ignore
          currentKeyDown.code === 'Lang2' ||
          // @ts-ignore
          currentKeyDown.code === 'Lang1'
        ) {
          layout = '103/106-KS';
        }

        // @ts-ignore
        if (currentKeyDown.code === 'IntlRo') {
          layout = '104/107-ABNT';
          changeBackslashPosition();
        }
        if (
          // @ts-ignore
          currentKeyDown.code === 'NonConvert' ||
          // @ts-ignore
          currentKeyDown.code === 'Convert' ||
          // @ts-ignore
          currentKeyDown.code === 'KanaMode'
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
          // first time found
          allChars.push({
            glyph: writtenSign,
            correct: 1,
            miswrite: 0,
            misread: 0,
            discoveredAt: Date.now(),
          });
        } else {
          // @ts-ignore
          allChars[allCharsWrittenIndex].correct += 1;
        }
      } else {
        if (allCharsWrittenIndex === -1) {
          // first time found
          allChars.push({
            glyph: writtenSign,
            correct: 0,
            miswrite: 1,
            misread: 0,
            discoveredAt: Date.now(),
          });
        } else {
          // @ts-ignore
          allChars[allCharsWrittenIndex].miswrite += 1;
        }
        const allCharsToWriteIndex = allChars.findIndex(
          (char) => char.glyph === signToWrite
        );
        if (allCharsToWriteIndex === -1) {
          // first time found
          allChars.push({
            glyph: signToWrite,
            correct: 0,
            miswrite: 0,
            misread: 1,
            discoveredAt: Date.now(),
          });
        } else {
          // @ts-ignore
          allChars[allCharsToWriteIndex].misread += 1;
        }
      }

      // characters can repeat, but object property keys can not, so assign new props if key exist:
      const marks: Marks = {
        [nextSign]: {
          marker: 'toPressFirst',
        },
      };
      if (!explorerMode) {
        marks[signToWrite] = {
          ...(marks[signToWrite] ? marks[signToWrite] : {}),
          succeedState: charsSucceed ? 'correct' : 'missed',
        };
        marks[writtenSign] = {
          ...(marks[writtenSign] ? marks[writtenSign] : {}),
          succeedState: charsSucceed ? 'correct' : 'error',
        };
      }
      // handle dead keys
      let deadKeys = { ...state.deadKeys };
      keys = markCharOnBoard({
        keys: [...state.keys],
        reset: true,
        // @ts-ignore
        keyMap,
        marks,
        deadKeys,
      });

      if (previousKeyDown && previousKeyDown.dead) {
        if (
          currentKeyDown &&
          previousKeyDown &&
          previousKeyDown.code === currentKeyDown.code
        ) {
          // the dead key was pressed at least twice. It is highly possible that the iput is the right character as a key label. So update the keys, save it to corresponding level. ( It can be e.g.:´`¸˛)

          // @ts-ignore
          const { code, level } = previousKeyDown;
          keys = keys.map((item, index) => {
            if (item.code !== code) {
              return item;
            }
            const keyTops = {
              ...(item.keyTops ? item.keyTops : {}),
              [level]: {
                ...(item.keyTops && item.keyTops[level]
                  ? item.keyTops[level]
                  : {}),
                label: writtenSign,
              },
            };

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
            // @ts-ignore
            (item) => item.code === previousKeyDown.code
          );
          const previousChar =
            previousKey &&
            // @ts-ignore
            previousKey.keyTops[previousKeyDown.level];
          const currentKey = keys.find(
            // @ts-ignore
            (item) => item.code === currentKeyDown.code
          );
          const currentChar =
            currentKey &&
            // @ts-ignore
            currentKey.keyTops[currentKeyDown.level];
          if (previousChar && currentChar) {
            // @ts-ignore
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
        // @ts-ignore
        nextSign,
        signToWrite,
        charsSucceed,
        deadKeys,
        keys,
        layout,
        keyMap,
        explorerMode,
      };
    }

    case KEY_DOWN: {
      // if 'DEAD' - second input does not count as label, but dead key combination

      const {
        code,
        isAltDown,
        isAltGraphDown,
        isCapsLockDown,
        isShiftDown,
        key,
        // @ts-ignore
      } = action.eventProps;

      let keyMap = { ...state.keyMap };
      let keys = [...state.keys];

      // disable keys which makes able the navigation within the textinput. (changing caret position is undesirable)

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

      const getModifierStateCapsLock = isCapsLockDown; // always true if CapsLock pressed, also buggy
      const isCapsLockOn = getModifierStateCapsLock ? true : state.isCapsLockOn;

      const modifiers = [
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
        // ORDER COUNTS!
        ...(isAltDown ? ['Alt'] : []),
        ...(isAltGraphDown ? ['AltGraph'] : []),
        // ...(getModifierStateCapsLock ? ['CapsLock'] : []),
        // ...(isControlDown ? ['Control'] : []),
        ...(isShiftDown ? ['Shift'] : []),
      ];
      // @ts-ignore
      const level: Level = modifiers.length ? modifiers.join('+') : 'to';

      const modifiersDown = [
        // ORDER COUNTS!
        ...(newKeysDown.includes('AltLeft') ? ['Alt'] : []),
        ...(newKeysDown.includes('AltRight') ? ['AltGraph'] : []),
        // ...(isCapsLockOn ? ['CapsLock'] : []),
        ...(newKeysDown.includes('ShiftLeft') ? ['Shift'] : []),
        ...(newKeysDown.includes('ShiftRight') ? ['Shift'] : []),
      ];
      // @ts-ignore
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
        if (
          !(isCapsLockOn || (state.currentKeyDown && state.currentKeyDown.dead))
        ) {
          const keyTops = {
            ...(item.keyTops ? item.keyTops : {}),
            [level]: {
              ...(item.keyTops && item.keyTops[level]
                ? item.keyTops[level]
                : {}),
              label: key !== 'Dead' ? key : undefined, // this case will be handled on input
              dead: key === 'Dead',
            },
          };

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
      // @ts-ignore
      const { code, isAltDown, isCapsLockDown } = action.eventProps;

      const modifiersActuallyNotDown = [...(!isAltDown ? ['AltLeft'] : [])];
      const newKeysDown = state.keysDown.filter((item) => {
        // e.g. Alt key changes the focus of the browser, so no key up event fired for Alt
        return item !== code && !modifiersActuallyNotDown.includes(item);
      });

      const {
        currentKeyDown,
        cursorAt,
        levelToLearn,
        practiceLength,
        writtenSign,
      } = state;

      let isCapsLockOn =
        code === 'CapsLock' ? !state.isCapsLockOn : isCapsLockDown;
      let keys = [...state.keys];
      let finishedPractices = state.finishedPractices;
      let isPracticing = state.isPracticing;
      let showSummary = state.showSummary;
      let showIntroduction = state.showIntroduction;
      let showExploreMore = state.showExploreMore;
      let keyToLearn = state.keyToLearn;
      let explorerMode = state.explorerMode;
      let charToLearn = state.charToLearn;
      let charsLearned = state.charsLearned;

      const modifiersDown = [
        // ORDER COUNTS!
        ...(newKeysDown.includes('AltLeft') ? ['Alt'] : []),
        ...(newKeysDown.includes('AltRight') ? ['AltGraph'] : []),
        // ...(isCapsLockOn ? ['CapsLock'] : []),
        ...(newKeysDown.includes('ShiftLeft') ? ['Shift'] : []),
        ...(newKeysDown.includes('ShiftRight') ? ['Shift'] : []),
      ];
      // @ts-ignore
      const displayedLevel: Level = modifiersDown.length
        ? modifiersDown.join('+')
        : 'to';

      if (
        !charToLearn &&
        currentKeyDown &&
        currentKeyDown.code === keyToLearn &&
        displayedLevel === levelToLearn
      ) {
        charToLearn = writtenSign;
      }

      if (
        explorerMode &&
        !showIntroduction &&
        currentKeyDown &&
        currentKeyDown.code === 'Enter' &&
        charToLearn
      ) {
        // While exploring characters, the next keyToLearn was discovered, and after that Enter key was pressed in order to escape discovering and continue practicing
        explorerMode = false;
        showIntroduction = true;
      }

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
        if (item.code === 'Enter' && explorerMode && charToLearn) {
          // highlight Enter to make it easier to recognize, that it can be used for the default action
          return {
            ...item,
            marker: 'toPressFirst',
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

      if (cursorAt >= practiceLength && isPracticing && charToLearn) {
        // end of practice text reached (or exceeded)

        // TODO - if the user chooses repeat, the practice should be repeated, regardless from other conditions

        isPracticing = false;
        showSummary = true;
        finishedPractices += 1;

        const charStats = state.allChars.find(
          (char) => char.glyph === charToLearn
        );
        const correctHits = (charStats && charStats.correct) || 0;
        const mistakenHits = (charStats && charStats.miswrite) || 0;
        const charComplianceRatio = correctHits / mistakenHits;
        const requiredHits =
          keyRequirements[keyToLearn] && keyRequirements[keyToLearn].hits;

        if (
          correctHits > requiredHits &&
          charComplianceRatio > complianceRatio
        ) {
          // the given character is "learned", time to move on to the next one

          charsLearned.push(charToLearn);

          keyToLearn =
            keyOrder[keyOrder.findIndex((elem) => elem === keyToLearn) + 1];
          const keyboardKeyToLearn = keys.find(
            (key) => key.code === keyToLearn
          );

          charToLearn =
            keyboardKeyToLearn &&
            keyboardKeyToLearn.keyTops &&
            keyboardKeyToLearn.keyTops[levelToLearn] &&
            // @ts-ignore
            keyboardKeyToLearn.keyTops[levelToLearn].label;

          if (!charToLearn) {
            explorerMode = true;
            showExploreMore = true;
          }

          keys = keys.map((item) => {
            if (keyToLearn === item.code) {
              const keyTops = {
                ...item.keyTops,
                [levelToLearn]: {
                  ...(item.keyTops ? item.keyTops[levelToLearn] : {}),
                  toLearn: true,
                },
              };
              return {
                ...item,
                keyTops,
              };
            } else if (
              item &&
              item.keyTops &&
              item.keyTops[levelToLearn] &&
              // @ts-ignore
              item.keyTops[levelToLearn].toLearn === true
            ) {
              const keyTops = {
                ...item.keyTops,
                [levelToLearn]: {
                  ...(item.keyTops ? item.keyTops[levelToLearn] : {}),
                  toLearn: false,
                  learned: true,
                },
              };
              return {
                ...item,
                keyTops,
              };
            }
            return item;
          });
        }
      }

      return {
        ...state,
        // lastKeyUp: code,
        isCapsLockOn,
        keysDown: newKeysDown,
        displayedLevel,
        keys,
        keyToLearn,
        explorerMode,
        finishedPractices,
        isPracticing,
        showSummary,
        showExploreMore,
        showIntroduction,
        charToLearn,
        charsLearned,
      };
    }

    case FLUSH_KEYBOARD: {
      return {
        ...state,
        keys: [...keyboard.keys],
      };
    }

    case CLOSE_SUMMARY: {
      return {
        ...state,
        showSummary: false,
        isPracticing: false,
        showExploreMore: false,
      };
    }

    default:
      return state;
  }
}
