import React from 'react';

import { PracticeTextChar } from '@components';
import { PracticeTextLetterArray } from '@types';

export const PRACTICE_ROW_CLASS = 'ptr';
export const DEFAULT_PRACTICE_ROW_LENGTH = 42;
// number 40 can be divided with 2, 4, 5, 8, 10
// number 42 can be divided with 2, 3, 6, 7, 14
// number 45 can be divided with 3, 5, 9, 15
// number 60 can be divided with 2, 3, 4, 5, 6, 10, 12, and it has similar length as usual text editors per default
type RenderPracticeRowsProps = {
  practiceTextArray: PracticeTextLetterArray;
  rowInFocusIndex?: number;
  practiceRowLength?: number;
  cursorAt: number;
  scrollContentTo: (rowIndex: number) => void;
};

export default function RenderPracticeRows({
  practiceRowLength = DEFAULT_PRACTICE_ROW_LENGTH,
  practiceTextArray,
  rowInFocusIndex = 0,
  cursorAt,
  scrollContentTo,
}: RenderPracticeRowsProps): JSX.Element {
  const chunk = practiceTextArray.slice(0, practiceRowLength);

  let length = chunk.length; // equals practiceRowLength
  let lastRowSpaceIndex: number = 0;
  while (!lastRowSpaceIndex && length--) {
    // check for the last ocurrence of space character in the chunk
    chunk[length].practiceChar === ' ' && (lastRowSpaceIndex = length);
  }
  // increase row index for every iteration
  rowInFocusIndex++;
  if (!lastRowSpaceIndex && chunk.length < practiceTextArray.length) {
    // the "text" is longer than the desired length,
    // but it does not contain any spaces,
    // so just cut it to the desired length
    const arrayChunk = practiceTextArray.slice(0, practiceRowLength);
    const restArray = practiceTextArray.slice(practiceRowLength);
    return (
      <>
        <div className={PRACTICE_ROW_CLASS}>
          {arrayChunk.map((arr) => {
            const { index, ...rest } = arr;
            cursorAt === index && scrollContentTo(rowInFocusIndex);
            return <PracticeTextChar key={index} {...rest} />;
          })}
        </div>
        {/* recursion for the rest */}
        <RenderPracticeRows
          practiceTextArray={restArray}
          practiceRowLength={practiceRowLength}
          rowInFocusIndex={rowInFocusIndex}
          cursorAt={cursorAt}
          scrollContentTo={scrollContentTo}
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
          {arrayChunk.map((arr) => {
            const { index, ...rest } = arr;
            cursorAt === index && scrollContentTo(rowInFocusIndex);
            return <PracticeTextChar key={index} {...rest} />;
          })}
        </div>
        {/* recursion for the rest */}
        <RenderPracticeRows
          practiceTextArray={restArray}
          practiceRowLength={practiceRowLength}
          rowInFocusIndex={rowInFocusIndex}
          cursorAt={cursorAt}
          scrollContentTo={scrollContentTo}
        />
      </>
    );
  }
  // there is no need to cut the "text" further, display the last part
  // this is the last row output of the recursion
  return (
    <div className={PRACTICE_ROW_CLASS}>
      {chunk.map((arr) => {
        const { index, ...rest } = arr;
        cursorAt === index && scrollContentTo(rowInFocusIndex);
        return <PracticeTextChar key={index} {...rest} />;
      })}
    </div>
  );
}
