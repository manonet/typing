import { DeadKeys, Key, KeyMap, PossibleKeyStates, Marks } from '../types';

export const markCharOnBoard = function ({
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
        // @ts-ignore
        const glyph1 = deadKey[0].label;
        // @ts-ignore
        const glyph2 = deadKey[1].label;

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
          // @ts-ignore
          marks: deadMarks,
        });
      }
    });
  }

  return keys;
};
