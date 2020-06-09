import resizeArray from '../resizeArray';

describe('resizeArray', () => {
  it('return empty array if no parameters was provided', () => {
    const extendedArray = resizeArray({
      glyphs: [],
      length: 5,
    });

    expect(extendedArray).toEqual([]);
  });

  it('returns the same array, if the length matches with the given length', () => {
    const extendedArray = resizeArray({
      glyphs: ['a', 'b', 'c', 'd', 'e'],
      length: 5,
    });

    expect(extendedArray).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it('returns a sliced array, if the given length is smaller than the length of the input array', () => {
    const extendedArray = resizeArray({
      glyphs: ['a', 'b', 'c', 'd', 'e'],
      length: 2,
    });

    expect(extendedArray).toEqual(['a', 'b']);
  });

  it('returns an extended array, if the desired lenght is bigger that the length of the input array', () => {
    const extendedArray = resizeArray({
      glyphs: ['a', 'b'],
      length: 5,
    });

    expect(extendedArray).toEqual(['a', 'b', 'a', 'b', 'a']);
  });
});
