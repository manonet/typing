import { PracticeTextLetterArray } from '@types';

type Props = {
  practiceTextLetterArray: PracticeTextLetterArray;
  cursorAt: number;
  writtenSign: string;
};

export const updatePracticeText = function ({
  cursorAt,
  practiceTextLetterArray: arr,
  writtenSign,
}: Props) {
  const practiceTextLetterArray = [...arr];
  if (practiceTextLetterArray.length) {
    // if there is text at all
    if (cursorAt < practiceTextLetterArray.length) {
      // if the caret position is within the text
      // set the character to type active
      practiceTextLetterArray[cursorAt] = {
        ...practiceTextLetterArray[cursorAt],
        active: true,
      };
    }
    if (cursorAt > 0 && practiceTextLetterArray[cursorAt - 1]) {
      // TODO - investigate "practiceTextLetterArray[cursorAt - 1] is undefined" error. Typing too fast can cause it without this condition
      practiceTextLetterArray[cursorAt - 1] = {
        ...practiceTextLetterArray[cursorAt - 1],
        // if user already typed anything, set the previous character
        active: false,
        done: true,
        // keep error if it was true already!
        error:
          practiceTextLetterArray[cursorAt - 1].error ||
          practiceTextLetterArray[cursorAt - 1].practiceChar !== writtenSign,
        // corrected state means it has error state,
        // but requested and written characters are corrected to be the same
        corrected:
          practiceTextLetterArray[cursorAt - 1].error &&
          practiceTextLetterArray[cursorAt - 1].practiceChar === writtenSign,
        userChar: writtenSign,
      };
    }
    if (
      cursorAt + 1 < practiceTextLetterArray.length &&
      practiceTextLetterArray[cursorAt + 1]
    ) {
      // TODO - investigate "practiceTextLetterArray[cursorAt + 1] is undefined" error. Typing too fast can cause it without this condition
      practiceTextLetterArray[cursorAt + 1] = {
        ...practiceTextLetterArray[cursorAt + 1],
        // if characters are deleted with backspace, set the "deleted" ones
        active: false,
        done: undefined,
        // keep error for calculating corrected!
        userChar: undefined,
      };
    }
  }
  return practiceTextLetterArray;
};
