import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { focusUserInput, inputChange, keyDown, keyUp } from '../../actions';
import { State as ReduxState } from '../../reducers';
import SampleBoardChar from '../SampleBoardChar';

function focusTextInput(
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  caretPosition: number
) {
  const userInput = textAreaRef.current;
  if (userInput) {
    userInput.focus();
    userInput.selectionStart = userInput.selectionEnd = caretPosition; // set caret position to the end of the user text
  }
}

export default function SampleBoard() {
  const textAreaRef: React.RefObject<HTMLTextAreaElement> = React.createRef();

  const dispatch = useDispatch();

  const isUserInputFocused = useSelector(
    (state: ReduxState) => state.focusUserInput.isUserInputFocused
  );

  const { cursorAt, sampleText, userText } = useSelector(
    (state: ReduxState) => state.typing
  );

  const sampleArray = sampleText.split('');

  function handleKeydown(event: KeyboardEvent) {
    dispatch(keyDown(event));
  }

  function handleKeyup(event: KeyboardEvent) {
    dispatch(keyUp(event));
  }

  useEffect(() => {
    focusTextInput(textAreaRef, userText?.length || 0);
  }, []);

  useEffect(() => {
    if (isUserInputFocused) {
      document.addEventListener('keydown', handleKeydown, true);
      document.addEventListener('keyup', handleKeyup, true);
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown, true);
      document.removeEventListener('keyup', handleKeyup, true);
    };
  }, [isUserInputFocused]);

  return (
    <div
      className={classNames('sampleBoard', {
        ['sampleBoard--focus']: isUserInputFocused,
      })}
      onClick={() => focusTextInput(textAreaRef, userText?.length || 0)}
      tabIndex={0}
      onKeyDown={undefined}
      role="button"
    >
      <div className={'sampleBoard__wrapper'}>
        <kbd className={classNames('sampleBoard__sample')}>
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
          ref={textAreaRef}
          className={'sampleBoard__userInput'}
          value={userText}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch(inputChange(event.target.value))
          }
          onFocus={() => dispatch(focusUserInput(true))}
          onBlur={() => dispatch(focusUserInput(false))}
        />
      </div>
    </div>
  );
}
