import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  focusUserInput,
  FocusUserInputAction,
  inputChange,
  InputChangeAction,
} from '../../actions';
import { State as ReduxState } from '../../reducers';
import SampleBoardChar from '../SampleBoardChar';

type Props = {
  className?: string;
  focusTextInput: () => void;
  cursorAt: number;
  sampleText: string;
  userText: string;
  isUserInputFocused: boolean;
  dispatchInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  dispatchUserInputFocused: (isUserInputFocused: boolean) => {};
};

const SampleBoard = React.forwardRef(
  (props: Props, ref?: React.Ref<HTMLTextAreaElement>) => {
    const {
      className,
      cursorAt,
      dispatchInputChange,
      dispatchUserInputFocused,
      focusTextInput,
      isUserInputFocused,
      sampleText,
      userText,
    } = props;

    const sampleArray = sampleText.split('');

    return (
      <div
        className={classNames('sampleBoard', {
          ['sampleBoard--focus']: isUserInputFocused,
        })}
        onClick={focusTextInput}
        tabIndex={0}
        onKeyDown={undefined}
        role="button"
      >
        <textarea
          ref={ref}
          className={'sampleBoard__userInput'}
          value={userText}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatchInputChange(event)
          }
          onFocus={() => dispatchUserInputFocused(true)}
          onBlur={() => dispatchUserInputFocused(false)}
        />

        <div className={'sampleBoard__wrapper'}>
          <kbd className={classNames('sampleBoard__sample', className)}>
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
        </div>
      </div>
    );
  }
);

const mapStateToProps = (state: ReduxState) => {
  const { focusUserInput, typing } = state;
  return {
    isUserInputFocused: focusUserInput.isUserInputFocused,
    sampleText: typing.sampleText,
    userText: typing.userText,
    cursorAt: typing.cursorAt,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    ReduxState,
    undefined,
    FocusUserInputAction | InputChangeAction
  >
) => ({
  dispatchUserInputFocused: (isUserInputFocused: boolean) =>
    dispatch(focusUserInput(isUserInputFocused)),
  dispatchInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(inputChange(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(SampleBoard);
