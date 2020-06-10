import resizeArray from './resizeArray';
import shuffleArray from './shuffleArray';

type Params = {
  length?: number;
  glyphs: string[];
};

export const DEFAULT_WORD_LENGTH = 3;

// warning, it can contain repeating glyphs in the output
// e.g.: input ['d', 'e', 'f'] output 'ddeefddfef'
const generateRandomWordFromLetters = ({
  length = DEFAULT_WORD_LENGTH,
  glyphs,
}: Params) => {
  return shuffleArray(
    resizeArray({
      glyphs,
      length: length,
    })
  ).join('');
};

export default generateRandomWordFromLetters;
