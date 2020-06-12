import { shuffleArray } from '../shuffleArray';

describe('shuffleArray', () => {
  global.Math.random = () => 0.5;

  it('returns an empty array, if empty array is given', () => {
    const shuffledArray = shuffleArray([]);

    expect(shuffledArray).toEqual([]);
  });

  it('returns the same array, if the array has only one item', () => {
    const shuffledArray = shuffleArray(['a']);

    expect(shuffledArray).toEqual(['a']);
  });

  it('returns a shuffled array', () => {
    const shuffledArray = shuffleArray(['a', 'b', 'c']);

    expect(shuffledArray).toEqual(['a', 'c', 'b']);
  });
});
