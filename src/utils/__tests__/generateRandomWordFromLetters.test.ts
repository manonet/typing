import { generateRandomWordFromLetters } from '../generateRandomWordFromLetters';

describe('generateRandomWordFromLetters', () => {
  global.Math.random = () => 0.5;

  it('returns an empty string if the array is empty', () => {
    const lessonText = generateRandomWordFromLetters({
      glyphs: [],
    });

    expect(lessonText).toEqual('');
  });

  it('returns a random string based on the array items', () => {
    const lessonText = generateRandomWordFromLetters({
      glyphs: ['a', 'b', 'c'],
    });

    expect(lessonText).toEqual('acb');
  });

  it('returns a random string with the given length', () => {
    const lessonText = generateRandomWordFromLetters({
      glyphs: ['a', 'b', 'c', 'd', 'e', 'f'],
      length: 3,
    });

    expect(lessonText).toEqual('acb');
  });

  it('returns a string with the given length, even if there are not enough glyphs', () => {
    const lessonText = generateRandomWordFromLetters({
      glyphs: ['d', 'e', 'f'],
      length: 10,
    });

    expect(lessonText).toEqual('ddeefddfef');
  });
});
