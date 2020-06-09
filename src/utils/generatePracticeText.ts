import { Glyph } from '../types';

import resizeArray from './resizeArray';
import shuffleArray from './shuffleArray';

type Params = {
  glyphs: Glyph[];
  parcticeLength?: number;
  wordLength?: number;
  uniqueWordCount?: number;
  spacer?: string;
};

export const DEFAULT_PRACTICE_LENGTH = 200;
export const DEFAULT_UNIQUE_WORD_COUNT = 4;
export const DEFAULT_WORD_LENGTH = 4;
export const DEFAULT_SPEACER = ' ';

const generatePracticeText = ({
  glyphs,
  parcticeLength = DEFAULT_PRACTICE_LENGTH,
  uniqueWordCount = DEFAULT_UNIQUE_WORD_COUNT,
  wordLength = DEFAULT_WORD_LENGTH,
  spacer = DEFAULT_SPEACER,
}: Params) => {
  let words: string[] = [];

  if (glyphs.length < wordLength) {
    // There are not enough glyphs for a word, some will repeat
    for (let j = 0; j < uniqueWordCount; j++) {
      // generate "unique" words
      // shuffle the array first,
      shuffleArray(glyphs);
      // so when it will be extended, random glyphs will repeat
      const wordLetters = resizeArray({ glyphs, length: wordLength });
      // shuffle array afain, in order not to have the same sequence or repetition
      shuffleArray(wordLetters);
      const word = wordLetters.join('');
      words.push(word);
    }
  } else {
    for (let j = 0; j < uniqueWordCount; j++) {
      // generate "unique" words
      let wordLetters: Glyph[] = [];
      // create a copy of the array every time, and shuffle it
      const glyphArray = [...glyphs];
      for (let i = 0; i < wordLength; i++) {
        // and take random item from it
        const glyph = glyphArray.splice(
          Math.floor(Math.random() * glyphArray.length),
          1
        );
        wordLetters.push(glyph[0]);
      }
      const word = wordLetters.join('');
      words.push(word);
    }
  }

  // create the repeating string part
  const sequence = words.join(spacer);

  if (sequence.length < parcticeLength) {
    // if the string is short, repeat it as long it reach the length of the practice

    // + 1 because of the space attached every time
    const multiplier = parcticeLength / Math.floor(sequence.length + 1);
    let practice = sequence;
    for (let i = 0; i < multiplier; i++) {
      const extendedString = practice.concat(spacer, sequence);
      practice = extendedString;
    }
    return practice;
  }

  // or if the sequence is long enough, return it
  return sequence;
};

export default generatePracticeText;
