import getKeyLocationFromIso from './getKeyLocationFromIso';
import { Keyboard, Level } from '../types';

// TODO - consider removing char from the output

type Props = {
  keyboard: Keyboard;
  characterToFind: string;
};

export default function findCharOnKeyboard(props: Props) {
  const { keyboard, characterToFind } = props;

  const { charMap, levels } = keyboard;

  const charMapItem = charMap[characterToFind];
  // e.g.: "ä": ["C11", "to"]

  if (charMapItem) {
    const iso = charMapItem[0];
    // e.g.: "C11"
    const levelID = charMapItem[1];
    // e.g.: "to"
    const level = levels[levelID];
    // e.g.: [] or "shift": [[["ShiftLeft"],["ShiftRight"]]]
    if (iso) {
      return {
        iso,
        level,
        char: characterToFind,
        location: getKeyLocationFromIso(iso),
      };
    }
  }
  // Hardcode values for Enter key on lewline character
  // Enter is not part of keyboard object but the functionKeys
  if (characterToFind === '\n') {
    return {
      // TODO - Enter is not a proper iso...
      iso: 'Enter',
      level: 'to',
      char: characterToFind,
      location: { side: 'Left' },
    };
  }

  return null;
}
