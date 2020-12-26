import { updatePracticeText } from '../updatePracticeText';

const testArray = [
  {
    practiceChar: 'a',
    index: 0,
  },
  {
    practiceChar: 's',
    index: 1,
  },
  {
    practiceChar: 'd',
    index: 2,
  },
];
describe('updatePracticeText', () => {
  it('returns the same array if it does not have a length', () => {
    const updatedArray = updatePracticeText({
      cursorAt: 0,
      practiceTextLetterArray: [],
      writtenSign: '',
    });

    expect(updatedArray).toEqual([]);
  });

  it('highlights the character letter on the start', () => {
    const updatedArray = updatePracticeText({
      cursorAt: 0,
      practiceTextLetterArray: testArray,
      writtenSign: '',
    });

    expect(updatedArray).toEqual([
      {
        active: true,
        index: 0,
        practiceChar: 'a',
      },
      {
        active: false,
        done: undefined,
        index: 1,
        practiceChar: 's',
        userChar: undefined,
      },
      {
        index: 2,
        practiceChar: 'd',
      },
    ]);
  });

  it('highlights the next character while progress, and marks the previous character done', () => {
    const updatedArray = updatePracticeText({
      cursorAt: 1,
      practiceTextLetterArray: testArray,
      writtenSign: 'a',
    });

    expect(updatedArray).toEqual([
      {
        active: false,
        corrected: undefined,
        done: true,
        error: false,
        index: 0,
        practiceChar: 'a',
        userChar: 'a',
      },
      {
        active: true,
        index: 1,
        practiceChar: 's',
      },
      {
        active: false,
        done: undefined,
        index: 2,
        practiceChar: 'd',
        userChar: undefined,
      },
    ]);
  });

  it('marks the character errored on mistake', () => {
    const updatedArray = updatePracticeText({
      cursorAt: 1,
      practiceTextLetterArray: testArray,
      writtenSign: 'm',
    });

    expect(updatedArray).toEqual([
      {
        active: false,
        corrected: undefined,
        done: true,
        error: true,
        index: 0,
        practiceChar: 'a',
        userChar: 'm',
      },
      {
        active: true,
        index: 1,
        practiceChar: 's',
      },
      {
        active: false,
        done: undefined,
        index: 2,
        practiceChar: 'd',
        userChar: undefined,
      },
    ]);
  });

  it('keeps the errored state even if the user deletes the text with backspace', () => {
    const updatedArray = updatePracticeText({
      cursorAt: 1,
      practiceTextLetterArray: testArray,
      writtenSign: 'm',
    });

    expect(updatedArray).toEqual([
      {
        active: false,
        corrected: undefined,
        done: true,
        error: true,
        index: 0,
        practiceChar: 'a',
        userChar: 'm',
      },
      {
        active: true,
        index: 1,
        practiceChar: 's',
      },
      {
        active: false,
        done: undefined,
        index: 2,
        practiceChar: 'd',
        userChar: undefined,
      },
    ]);

    const deletedChar = updatePracticeText({
      cursorAt: 0,
      practiceTextLetterArray: updatedArray,
      writtenSign: '',
    });

    expect(deletedChar).toEqual([
      {
        active: true,
        corrected: undefined,
        done: true,
        error: true,
        index: 0,
        practiceChar: 'a',
        userChar: 'm',
      },
      {
        active: false,
        done: undefined,
        index: 1,
        practiceChar: 's',
        userChar: undefined,
      },
      {
        active: false,
        done: undefined,
        index: 2,
        practiceChar: 'd',
        userChar: undefined,
      },
    ]);

    const fixedChar = updatePracticeText({
      cursorAt: 1,
      practiceTextLetterArray: deletedChar,
      writtenSign: 'a',
    });

    expect(fixedChar).toEqual([
      {
        active: false,
        corrected: true,
        done: true,
        error: true,
        index: 0,
        practiceChar: 'a',
        userChar: 'a',
      },
      {
        active: true,
        done: undefined,
        index: 1,
        practiceChar: 's',
        userChar: undefined,
      },
      {
        active: false,
        done: undefined,
        index: 2,
        practiceChar: 'd',
        userChar: undefined,
      },
    ]);
  });
});
