import classNames from 'classnames';
import React from 'react';

import { PracticeTextCharProps } from '@types';

// keep classNames short and compact for performance
export const PRACTICE_TEXT_CHAR_CLASS = 'ptc';
export const PRACTICE_TEXT_ACTIVE_CHAR_CLASS = PRACTICE_TEXT_CHAR_CLASS + '-a';
export const PRACTICE_TEXT_DONE_CHAR_CLASS = PRACTICE_TEXT_CHAR_CLASS + '-d';
export const PRACTICE_TEXT_ERROR_CHAR_CLASS = PRACTICE_TEXT_CHAR_CLASS + '-e';
export const PRACTICE_TEXT_CORRECTED_CHAR_CLASS =
  PRACTICE_TEXT_CHAR_CLASS + '-c';
export const SPACE_CHAR_CLASS = 'c--space';
export const ENTER_CHAR_CLASS = 'c--lineFeed';

// exchange invisible space to U+00B7 MIDDLE DOT in user input for clearity
// https://codepoints.net/U+00B7
// WORD SEPARATOR MIDDLE DOT does not have the same char width as other chars
// see https://codepoints.net/U+2E31 for more details
export const SPACE_CHAR = '·';
export const ENTER_CHAR = '↵';

type Props = PracticeTextCharProps & { className?: string };
export default function PracticeTextChar({
  active,
  className,
  corrected,
  done,
  error,
  practiceChar,
  userChar,
}: Props) {
  let practiceCharToDisplay = practiceChar;

  if (practiceCharToDisplay === ' ') {
    practiceCharToDisplay = SPACE_CHAR;
  }

  if (practiceCharToDisplay === '\n') {
    practiceCharToDisplay = ENTER_CHAR;
  }

  let userCharToDisplay = userChar;

  if (userCharToDisplay === ' ') {
    userCharToDisplay = SPACE_CHAR;
  }

  if (userCharToDisplay === '\n') {
    userCharToDisplay = ENTER_CHAR;
  }

  return (
    <span
      className={classNames(
        PRACTICE_TEXT_CHAR_CLASS,
        {
          [PRACTICE_TEXT_DONE_CHAR_CLASS]: done,
          [PRACTICE_TEXT_ACTIVE_CHAR_CLASS]: active,
          [PRACTICE_TEXT_ERROR_CHAR_CLASS]: error,
          [PRACTICE_TEXT_CORRECTED_CHAR_CLASS]: corrected,
        },
        className
      )}
    >
      <i
        className={classNames({
          [SPACE_CHAR_CLASS]: practiceCharToDisplay === SPACE_CHAR,
          [ENTER_CHAR_CLASS]: practiceCharToDisplay === ENTER_CHAR,
        })}
      >
        {practiceCharToDisplay}
      </i>
      <b
        className={classNames({
          [SPACE_CHAR_CLASS]: userCharToDisplay === SPACE_CHAR,
          [ENTER_CHAR_CLASS]: userCharToDisplay === ENTER_CHAR,
        })}
      >
        {userCharToDisplay}
      </b>
    </span>
  );
}
