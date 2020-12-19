import { Glyph } from '@types';

type Props = {
  glyphs: Glyph[];
  length?: number;
  outArray?: Glyph[];
  index?: number;
};

export const resizeArray = function ({
  glyphs,
  length = 3,
  outArray = [],
  index = 0,
}: Props): Glyph[] {
  if (!(Array.isArray(glyphs) && glyphs && glyphs.length)) {
    // If parameters are invalid, return an empty array.
    return [];
  }

  if (glyphs.length === length) {
    // If the array already has the desired length
    return glyphs;
  }

  if (glyphs.length > length) {
    // If the array has more items than the given length, slice the array
    return glyphs.slice(0, length);
  }

  if (outArray.length === 0 && glyphs.length < length) {
    // In the first round, take the array, and add it to the output as it is.
    outArray = [...glyphs];
  }

  if (outArray.length < length) {
    // Add the same array items one by one, again and again in a recursive call untill it reaches the desired length.
    const newItem = outArray[index];
    index++;
    outArray.push(newItem);
    return resizeArray({ glyphs, length, outArray, index });
  }

  return outArray;
};
