import React from 'react';

import { PracticeTextChar } from '@components';
import { PracticeTextLetterArray } from '@types';

export const PRACTICE_ROW_CLASS = 'ptr';
export const DEFAULT_PRACTICE_ROW_LENGTH = 60; // number 60 can be divided with 2, 3, 4, 5, 6, 10, 12, and it has similar length as usual text editors per default
type RenderPreacticeRowsProps = {
  practiceTextArray: PracticeTextLetterArray;
  practiceRowLength?: number;
};

export default function RenderPreacticeRows({
  practiceRowLength = DEFAULT_PRACTICE_ROW_LENGTH,
  practiceTextArray,
}: RenderPreacticeRowsProps): JSX.Element {
  const chunk = practiceTextArray.slice(0, practiceRowLength);

  let length = chunk.length; // equals practiceRowLength
  let lastRowSpaceIndex: number = 0;
  while (!lastRowSpaceIndex && length--) {
    // check for the last ocurrence of space character in the chunk
    chunk[length][0] === ' ' && (lastRowSpaceIndex = length);
  }

  if (!lastRowSpaceIndex && chunk.length < practiceTextArray.length) {
    // the "text" is longer than the desired length,
    // but it does not contain any spaces,
    // so just cut it to the desired length
    const arrayChunk = practiceTextArray.slice(0, practiceRowLength);
    const restArray = practiceTextArray.slice(practiceRowLength);
    return (
      <>
        <div className={PRACTICE_ROW_CLASS}>
          {arrayChunk.map((arr) => (
            <PracticeTextChar
              key={arr[1]}
              char={arr[0]}
              active={arr[2]}
              done={arr[3]}
              error={arr[4]}
              userChar={arr[5]}
            />
          ))}
        </div>
        {/* recursion for the rest */}
        <RenderPreacticeRows
          practiceTextArray={restArray}
          practiceRowLength={practiceRowLength}
        />
      </>
    );
  } else if (
    lastRowSpaceIndex && // there is a space in the chunk
    lastRowSpaceIndex < practiceTextArray.length && // space is not on the end
    practiceTextArray.length > practiceRowLength // "text" is long enough to cut
  ) {
    // split the "text" to 2 parts, + 1 means: include the space too
    const arrayChunk = practiceTextArray.slice(0, lastRowSpaceIndex + 1);
    const restArray = practiceTextArray.slice(lastRowSpaceIndex + 1);
    return (
      <>
        <div className={PRACTICE_ROW_CLASS}>
          {arrayChunk.map((arr) => (
            <PracticeTextChar
              key={arr[1]}
              char={arr[0]}
              active={arr[2]}
              done={arr[3]}
              error={arr[4]}
              userChar={arr[5]}
            />
          ))}
        </div>
        {/* recursion for the rest */}
        <RenderPreacticeRows
          practiceTextArray={restArray}
          practiceRowLength={practiceRowLength}
        />
      </>
    );
  }
  // there is no need to cut the "text" further, display the last part
  // this is the last row output of the recursion
  return (
    <div className={PRACTICE_ROW_CLASS}>
      {chunk.map((arr) => (
        <PracticeTextChar
          key={arr[1]}
          char={arr[0]}
          active={arr[2]}
          done={arr[3]}
          error={arr[4]}
          userChar={arr[5]}
        />
      ))}
    </div>
  );
}
