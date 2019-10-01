import React from 'react';
import classNames from 'classnames';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type Props = {
  className?: string;
  cursorAt: number;
  index: number;
  char: {};
  userText: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block',
      width: 10,
      color: theme.palette.grey[700],
      fontStyle: 'normal',
      fontFamily: 'monospace, monospace',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
    },
    done: {
      color: theme.palette.grey[400],
    },
    active: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
    error: {
      color: theme.palette.error.main,
      backgroundColor: theme.palette.error.contrastText,
    },
    space: {
      opacity: 0.5,
    },
    lineFeed: {
      opacity: 0.5,
    },
  })
);

function SampleBoardChar(props: Props) {
  const { className, cursorAt, index, char, userText } = props;
  const classes = useStyles();

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
          classes.root,
          {
            [classes.done]: done,
            [classes.active]: active,
            [classes.error]: error,
            [classes.space]: letterToDisplay === '⸱',
            [classes.lineFeed]: letterToDisplay === '↵',
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

export default SampleBoardChar;
