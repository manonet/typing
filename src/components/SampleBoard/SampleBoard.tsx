import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { focusUserInput, FocusUserInputAction } from '../../actions';
import { State as ReduxState } from '../../reducers';
import SampleBoardChar from '../SampleBoardChar';

type Props = {
  className?: string;
  focusTextInput: () => void;
  cursorAt: number;
  sampleText: string;
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
      dispatchUserInputFocused,
      focusTextInput,
      isUserInputFocused,
      onChange,
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
          onChange={onChange}
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
