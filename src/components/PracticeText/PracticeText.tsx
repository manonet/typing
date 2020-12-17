import classNames from 'classnames';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserInputFocus, inputChange, keyDown, keyUp } from '../../actions';
import { State as ReduxState } from '../../reducers';
import { navigationKeyCodes } from '../../types/allEventKeyCodes';
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
function blurTextInput(textAreaRef: React.RefObject<HTMLTextAreaElement>) {
  const userInput = textAreaRef.current;
  if (userInput) {
    userInput.blur();
  }
}

export default function PracticeText() {
  const textAreaRef: React.RefObject<HTMLTextAreaElement> = React.createRef();

  const dispatch = useDispatch();

  const { isUserInputFocused, shouldUserInputFocus } = useSelector(
    (state: ReduxState) => state.userInputFocus
  );

  const {
    charToLearn,
    cursorAt,
    explorerMode,
    lessonText,
    userText,
  } = useSelector((state: ReduxState) => state.typing);

  const lessonContentArray = lessonText.split('');

  function handleKeydown(event: KeyboardEvent) {
    if (navigationKeyCodes.includes(event.code)) {
      event.preventDefault();
      // TODO: make it user friendly, e.g. toaster like info.
      console.info(`The usage of the ${event.code} key is disabled`);
    }

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

  useEffect(() => {
    if (shouldUserInputFocus) {
      focusTextInput(textAreaRef, userText?.length || 0);
    } else {
      blurTextInput(textAreaRef);
    }
  }, [shouldUserInputFocus]);

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

        {explorerMode && (
          <div className="PracticeText__exploreHelper">
            {charToLearn ? (
              <span>
                <FormattedMessage
                  id="keyboard.instruction.continue"
                  defaultMessage="Feel free to explore more, and hit Enter when ready."
                />
              </span>
            ) : (
              <span>
                <FormattedMessage
                  id="keyboard.instruction.pressKey"
                  defaultMessage="Press the highlighted char on your keyboard."
                />
              </span>
            )}
          </div>
        )}

        {!isUserInputFocused && (
          <div className="PracticeText__clickHelper">
            <FormattedMessage
              id="keyboard.instruction.clickTofocus"
              defaultMessage="Click here"
            />
          </div>
        )}
        <textarea
          ref={textAreaRef}
          className={'PracticeText__userInput'}
          value={userText}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch(inputChange(event.target.value))
          }
          onFocus={() => dispatch(getUserInputFocus(true))}
          onBlur={() => dispatch(getUserInputFocus(false))}
        />
      </div>
    </div>
  );
}
