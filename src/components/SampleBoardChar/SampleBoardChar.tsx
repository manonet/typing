import classNames from 'classnames';
import React from 'react';

type Props = {
  className?: string;
  cursorAt: number;
  index: number;
  char: {};
  userText: string;
};

export default function SampleBoardChar(props: Props) {
  const { char, className, cursorAt, index, userText } = props;

  // classes
  const done = cursorAt > index;
  const active = cursorAt === index;
  const error = done && char !== userText.substring(index, index + 1);

  let letterToDisplay = error ? userText.substring(index, index + 1) : char;

  // exchange invisible space to U+2E31 WORD SEPARATOR MIDDLE DOT in user input for clearity
  // see https://codepoints.net/U+2E31 for more details
  if (letterToDisplay === ' ') {
    letterToDisplay = '⸱';
  }

  if (letterToDisplay === '\n') {
    letterToDisplay = '↵';
  }

  return (
    <>
      <i
        className={classNames(
          'SampleBoardChar',
          {
            ['SampleBoardChar__done']: done,
            ['SampleBoardChar__active']: active,
            ['SampleBoardChar__error']: error,
            ['SampleBoardChar__space']: letterToDisplay === '⸱',
            ['SampleBoardChar__lineFeed']: letterToDisplay === '↵',
          },
          className
        )}
      >
        {letterToDisplay}
      </i>
      {letterToDisplay === '↵' ? <br /> : null}
    </>
  );
}
