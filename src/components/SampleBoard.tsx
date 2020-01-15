import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { ThunkDispatch } from 'redux-thunk';
import { focusUserInput, FocusUserInputAction } from '../actions';
import { State as ReduxState } from '../reducers';
import SampleBoardChar from './SampleBoardChar';

import './SampleBoard.scss';

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

const SampleBoard = React.forwardRef(
  (props: Props, ref?: React.Ref<HTMLTextAreaElement>) => {
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

    const sampleArray = sampleText.split('');

    return (
      <div className={classNames('sampleBoard__sample', className)}>
        <p className={'sampleBoard__sampleBoardHint'}>
          Requested: {signToWrite}, written: {writtenSign}
        </p>

        <div className={'sampleBoard__wrapper'}>
          <kbd
            className={classNames('sampleBoard__sampleBoard', {
              ['sampleBoard__sampleBoardFocus']: isUserInputFocused,
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
            ref={ref}
            className={'sampleBoard__userInput'}
            value={userText}
            onChange={onChange}
            onFocus={() => dispatchUserInputFocused(true)}
            onBlur={() => dispatchUserInputFocused(false)}
          />
        </div>
      </div>
    );
  }
);

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

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(SampleBoard);
