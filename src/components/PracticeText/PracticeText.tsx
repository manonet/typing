import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { focusUserInput, inputChange, keyDown, keyUp } from '../../actions';
import { State as ReduxState } from '../../reducers';
import PracticeTextChar from '../PracticeTextChar';

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

export default function PracticeText() {
  const textAreaRef: React.RefObject<HTMLTextAreaElement> = React.createRef();

  const dispatch = useDispatch();

  const isUserInputFocused = useSelector(
    (state: ReduxState) => state.focusUserInput.isUserInputFocused
  );

  const { cursorAt, lessonText, userText } = useSelector(
    (state: ReduxState) => state.typing
  );

  const lessonContentArray = lessonText.split('');

  function handleKeydown(event: KeyboardEvent) {
    dispatch(
      keyDown({
        code: event.code,
        key: event.key,
        isCapsLockDown: event.getModifierState('CapsLock') ? true : undefined,
        isAltDown: event.getModifierState('Alt') ? true : undefined,
        isAltGraphDown: event.getModifierState('AltGraph') ? true : undefined,
        isShiftDown: event.getModifierState('Shift') ? true : undefined,
        // isControlDown: event.getModifierState('Control') ? true : undefined,
        timeStamp: event.timeStamp,
      })
    );
  }

  function handleKeyup(event: KeyboardEvent) {
    dispatch(
      keyUp({
        code: event.code,
        key: event.key,
        isCapsLockDown: event.getModifierState('CapsLock') ? true : undefined,
        isAltDown: event.getModifierState('Alt') ? true : undefined,
        isAltGraphDown: event.getModifierState('AltGraph') ? true : undefined,
        isShiftDown: event.getModifierState('Shift') ? true : undefined,
        // isControlDown: event.getModifierState('Control') ? true : undefined,
        timeStamp: event.timeStamp,
      })
    );
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
      className={classNames('PracticeText', {
        ['PracticeText--focus']: isUserInputFocused,
      })}
      onClick={() => focusTextInput(textAreaRef, userText?.length || 0)}
      tabIndex={0}
      onKeyDown={undefined}
      role="button"
    >
      <div className={'PracticeText__wrapper'}>
        <kbd className={classNames('PracticeText__lessonContent')}>
          {lessonContentArray.map((char, index) => (
            <PracticeTextChar
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
          className={'PracticeText__userInput'}
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
