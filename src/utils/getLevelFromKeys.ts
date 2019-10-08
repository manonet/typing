import { CapsLockDown, EventCode, Level, Levels } from '../types';
import arrayContainsAnotherArray from './arrayContainsAnotherArray';

/**
 * Returns the level string which should be displayed on the keyboard based on modifier state
 * Usually it means if level string is 'to', "normal" labels should displayed, like q, w, e, r
 * if level string is 'shift', capitals should be displayed, like Q, W, E, R
 * if level string is 'altR+caps? ctrl+alt+caps?' special characters should displayed, like @, ł, €, ¶
 *
 * @param keysArray - The array of keyCodes currently pressed, e.g.: [ "KeyD", "KeyA" ]
 * @param levels - complex object of level mapping from keyboard.json
 * @param capsLockDown - boolean, whenever capsLock is in on or off state
 *
 * @returns level string e.g.: 'to' or 'altR+caps? ctrl+alt+caps?'
 */
const getLevelFromKeys = function(
  keysArray: EventCode[],
  levels: Levels,
  capsLockDown: CapsLockDown
) {
  if (capsLockDown) {
    keysArray.push('CapsLock');
  }

  let displayedLevel: Level = 'to';

  const levelName = Object.keys(levels) as Array<keyof typeof levels>; // https://stackoverflow.com/questions/52856496/typescript-object-keys-return-string

  levelName.map((level) => {
    levels[level].map((levelArrays) => {
      levelArrays.map((levelArray) => {
        if (arrayContainsAnotherArray(levelArray, keysArray)) {
          displayedLevel = level;
        }
      });
    });
  });

  console.log('levels', levels);
  return displayedLevel;
};

export default getLevelFromKeys;
