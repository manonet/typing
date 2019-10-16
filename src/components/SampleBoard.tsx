import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ThunkDispatch } from 'redux-thunk';
import { focusUserInput, FocusUserInputAction } from '../actions';
import { State as ReduxState } from '../reducers';
import SampleBoardChar from './SampleBoardChar';

export const SAMPLE_BOARD_ID = 'userText';

type Props = {
  className?: string;
  cursorAt: number;
  sampleText: string;
  signToWrite: string;
  writtenSign?: string;
  userText: string;
  isUserInputFocused: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  dispatchUserInputFocused: (isUserInputFocused: boolean) => {};
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sample: {
      position: 'relative',
      backgroundColor: theme.palette.grey[700],
    },
    wrapper: {
      position: 'relative',
    },
    sampleBoard: {
      display: 'block',
      background: theme.palette.grey[500],
      border: `2px solid ${theme.palette.grey[600]}`,
      padding: 10,
      color: theme.palette.grey[500],
      fontFamily: 'Inconsolata',
      fontSize: 18,
    },
    sampleBoardFocus: {
      background: theme.palette.common.white,
      border: `2px solid ${theme.palette.primary.main}`,
    },
    sampleBoardHint: {
      margin: 0,
    },
    userText: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: 'none',
      opacity: 0.01,
      height: '100%',
      maxHeight: 'none',
    },
  })
);

function SampleBoard(props: Props) {
  const {
    className,
    cursorAt,
    sampleText,
    signToWrite,
    writtenSign,
    userText,
    isUserInputFocused,
    onChange,
    dispatchUserInputFocused,
  } = props;
  const classes = useStyles();

  const sampleArray = sampleText.split('');

  return (
    <div className={classNames(classes.sample, className)}>
      <p className={classes.sampleBoardHint}>
        Requested: {signToWrite}, written: {writtenSign}
      </p>

      <div className={classes.wrapper}>
        <kbd
          className={classNames(classes.sampleBoard, {
            [classes.sampleBoardFocus]: isUserInputFocused,
          })}
        >
          {sampleArray.map((char, index) => (
            <SampleBoardChar
              key={index}
              index={index}
              cursorAt={cursorAt}
              userText={userText}
              char={char}
            />
          ))}
        </kbd>

        <textarea
          className={classes.userText}
          id={SAMPLE_BOARD_ID}
          value={userText}
          onChange={onChange}
          onFocus={() => dispatchUserInputFocused(true)}
          onBlur={() => dispatchUserInputFocused(false)}
        />
      </div>
    </div>
  );
}
const mapDispatchToProps = (
  dispatch: ThunkDispatch<ReduxState, undefined, FocusUserInputAction>
) => ({
  dispatchUserInputFocused: (isUserInputFocused: boolean) =>
    dispatch(focusUserInput(isUserInputFocused)),
});

const mapStateToProps = (state: ReduxState) => {
  const { focusUserInput, setSampleText } = state;
  return {
    isUserInputFocused: focusUserInput.isUserInputFocused,
    sampleText: setSampleText.sampleText,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleBoard);
