import findCharOnKeyboard from './findCharOnKeyboard';
import { Keyboard, Character } from '../types';

const getKeysFromChar = function(
  keyboard: Keyboard,
  characterToFind: Character
) {
  const { deadKeys } = keyboard;

  let key0Info = findCharOnKeyboard({
    keyboard,
    characterToFind,
  });
  let key1Info;

  if (!key0Info && deadKeys) {
    Object.keys(deadKeys).map((key) => {
      if (key === characterToFind) {
        // keyToPressFound in deadKeys: deadKeys[key][0], deadKeys[key][1])
        key0Info = findCharOnKeyboard({
          keyboard,
          characterToFind: deadKeys[key][0],
        });
        key1Info = findCharOnKeyboard({
          keyboard,
          characterToFind: deadKeys[key][1],
        });
      }
      return null;
    });
  }

  return [key0Info, key1Info];
};

export default getKeysFromChar;
