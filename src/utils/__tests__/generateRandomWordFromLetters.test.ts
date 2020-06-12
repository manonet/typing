import { generateRandomWordFromLetters } from '../generateRandomWordFromLetters';

describe('generateRandomWordFromLetters', () => {
  global.Math.random = () => 0.5;

  it('returns an empty string if the array is empty', () => {
    const sampleText = generateRandomWordFromLetters({
      glyphs: [],
    });

    expect(sampleText).toEqual('');
  });

  it('returns a random string based on the array items', () => {
    const sampleText = generateRandomWordFromLetters({
      glyphs: ['a', 'b', 'c'],
    });

    expect(sampleText).toEqual('acb');
  });

  it('returns a random string with the given length', () => {
    const sampleText = generateRandomWordFromLetters({
      glyphs: ['a', 'b', 'c', 'd', 'e', 'f'],
      length: 3,
    });

    expect(sampleText).toEqual('acb');
  });

  it('returns a string with the given length, even if there are not enough glyphs', () => {
    const sampleText = generateRandomWordFromLetters({
      glyphs: ['d', 'e', 'f'],
      length: 10,
    });

    expect(sampleText).toEqual('ddeefddfef');
  });
});
