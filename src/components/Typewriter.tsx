import React from 'react';
import { withPrefix } from 'gatsby-link';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
// @ts-ignore
import { injectIntl, Link } from 'gatsby-plugin-intl';
import mem from 'mem';

import {
  focusUserInput,
  FocusUserInputAction,
  setSampleText,
  SetSampleTextAction,
} from '../actions';
import { State as ReduxState } from '../reducers';

import getLevelFromKeys from '../utils/getLevelFromKeys';
import getKeyboardOS from '../utils/getKeyboardOS';
import getKeysFromChar from '../utils/getKeysFromChar';

import TypewriterBoard from './TypewriterBoard';
import LessonModal from './LessonModal';
import ErrorModal from './ErrorModal';
import { Keyboard, StatisticProps } from '../types';

const memoizedGetLevelFromKeys = mem(getLevelFromKeys);
// TODO consider adding Enter key to keyboard object instead of functionKeys
// TODO add close on Enter function to modals
// TODO lift ErrorModal, make it reusable
// TODO enable/disable backspace
// TODO differentiate same character on different levels: 'e', 'E', '€' ...
// TODO fix stucked last hint on new lesson
// TODO initial hint on the very first lesson
// TODO fix movable caret in input, disable arrow keys
// TODO fix focus and blur styles on user input
// TODO disable tab jump on writing

type Props = {
  sampleText: string;
  dispatchSetSampleText: (sampleText: string) => {};
  dispatchUserInputFocused: (isUserInputFocused: boolean) => {};
};

type State = {
  userText?: string;
  cursorAt: number;
  signToWrite: string;
  writtenSign?: string;
  inputChanged: boolean;
  keyboard: Keyboard;
  codeToIso: {};
  functionKeys: {};
  keysDown: [];
  displayedLevel: string;
  isCapsLockOn: boolean;
  statistics: StatisticProps;
  characterNotFound: boolean;
  currentKeyInfo: [];
};

class Typewriter extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      userText: '',
      cursorAt: 0,
      signToWrite: '',
      writtenSign: '',
      inputChanged: false,
      keyboard: {
        name: '',
        keys: [],
        levels: {},
        allChars: [],
        charMap: [],
        deadKeys: [],
        enterVariant: 1,
        enterIso: 'C13',
      },
      codeToIso: {},
      functionKeys: {},
      keysDown: [],
      displayedLevel: 'to',
      isCapsLockOn: false,
      statistics: {
        correct: [],
        miswrite: [],
        misspell: [],
      },
      characterNotFound: false,
    };

    this.markCharOnBoard = this.markCharOnBoard.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.userInputText = this.userInputText.bind(this);
    this.setUserInputFocus = this.setUserInputFocus.bind(this);
    this.startNewLesson = this.startNewLesson.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);
  }

  componentDidMount() {
    const keyboardOS = getKeyboardOS();
    const keyboardLang = navigator.language.substring(0, 2);
    console.info('keyboardOS', keyboardOS, 'keyboardLang', keyboardLang);

    const { dispatchSetSampleText } = this.props;

    dispatchSetSampleText('');

    Promise.all([
      // fetch(withPrefix(`/keyboards/${keyboardOS}/${keyboardLang}-t-k0-${keyboardOS}.json`)),
      fetch(withPrefix('/keyboards/windows/hu-t-k0-windows.json')),
      fetch(withPrefix('/keyboards/codeToIso.json')),
      fetch(withPrefix('/keyboards/functionKeys.json')),
      // fetch(withPrefix(`/keyboards/${keyboardOS}FunctionKeys.json`)),
    ])
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      .then((responses) => {
        const keyboard = responses[0];
        const codeToIso = responses[1];
        const functionKeys = responses[2];
        functionKeys.Enter.variant = keyboard.enterVariant;

        const { sampleText } = this.props;
        const nextCharInfo = getKeysFromChar(keyboard, sampleText.charAt(0));

        this.setState(
          {
            keyboard,
            codeToIso,
            functionKeys,
            currentKeyInfo: nextCharInfo,
          },
          this.startNewLesson("Lí|Ä¶ćČ et's\nTyyyype Something (@)...")
        );
      });
  }

  setUserInputFocus(isUserInputFocused: boolean) {
    const { dispatchUserInputFocused } = this.props;

    dispatchUserInputFocused(isUserInputFocused);
    if (isUserInputFocused) {
      document.addEventListener('keydown', this.handleKeydown, false);
      document.addEventListener('keyup', this.handleKeyup, false);
    } else {
      document.removeEventListener('keydown', this.handleKeydown, false);
      document.removeEventListener('keyup', this.handleKeyup, false);
    }
  }

  markCharOnBoard(keyboard, functionKeys, keyInfo, colorProp, color) {
    if (keyInfo) {
      if (keyboard.keys[keyInfo.iso]) {
        keyboard.keys[keyInfo.iso][colorProp] = color;
        const { level } = keyInfo;
        if (level && level.length && level[Object.keys(level)[0]][0]) {
          let previousFunctionKey;
          level[0].map((l) => {
            if (functionKeys[l[0]]) {
              // mark function key
              functionKeys[l[0]][colorProp] = color;
              // if the function key is in pair of both left and right
              if (
                previousFunctionKey &&
                previousFunctionKey.lastIndexOf('Left') !== -1 &&
                previousFunctionKey.substring(
                  0,
                  previousFunctionKey.lastIndexOf('Left')
                ) === l[0].substring(0, l[0].lastIndexOf('Right'))
              ) {
                // mark only the opposite side than the character
                if (keyInfo.side === 'Left') {
                  functionKeys[previousFunctionKey][colorProp] = 'def';
                } else {
                  functionKeys[l[0]][colorProp] = 'def';
                }
              } else if (
                previousFunctionKey &&
                previousFunctionKey.lastIndexOf('Right') !== -1 &&
                previousFunctionKey.substring(
                  0,
                  previousFunctionKey.lastIndexOf('Right')
                ) === l[0].substring(0, l[0].lastIndexOf('Left'))
              ) {
                if (keyInfo.side === 'Right') {
                  functionKeys[previousFunctionKey][colorProp] = 'def';
                } else {
                  functionKeys[l[0]][colorProp] = 'def';
                }
              }
              previousFunctionKey = l[0];
            }
          });
        }
      } else if (keyInfo.iso === 'Enter') {
        // Enter is not part of keyboard object but the functionkexs
        functionKeys.Enter[colorProp] = color;
      }
    }
  }

  userInputText(userText) {
    const { sampleText } = this.props;
    if (userText.length === sampleText.length) {
      this.props.handleModalOpen();
      return;
    }

    this.setState((prevState) => {
      const {
        keyboard,
        functionKeys,
        isoSucceed,
        currentKeyInfo,
        previousKeyInfo,
        previousPressedKeyInfo,
        statistics,
      } = { ...prevState };

      const signToWrite =
        userText.length >= 1
          ? sampleText.substring(userText.length - 1, userText.length)
          : '';
      const cursorAt = userText.length;
      const writtenSign = cursorAt > 0 ? userText.charAt(cursorAt - 1) : '';
      const nextSign = sampleText.charAt(cursorAt);
      const charsSucceed = signToWrite === writtenSign;

      if (charsSucceed && charsSucceed !== isoSucceed) {
        console.warn(
          'The selected keyboard layout is not matching with the actual input method'
        );
      }

      const pressedKeyInfo = getKeysFromChar(keyboard, writtenSign);

      // reset previous keys
      if (currentKeyInfo && currentKeyInfo[0] && currentKeyInfo[0].iso) {
        this.markCharOnBoard(
          keyboard,
          functionKeys,
          currentKeyInfo[0],
          'marker',
          'none'
        );
        this.markCharOnBoard(
          keyboard,
          functionKeys,
          currentKeyInfo[1],
          'marker',
          'none'
        );
      }

      if (previousKeyInfo) {
        this.markCharOnBoard(
          keyboard,
          functionKeys,
          previousKeyInfo[0],
          'succeedState',
          'def'
        );
        this.markCharOnBoard(
          keyboard,
          functionKeys,
          previousKeyInfo[1],
          'succeedState',
          'def'
        );
      }
      if (previousPressedKeyInfo) {
        this.markCharOnBoard(
          keyboard,
          functionKeys,
          previousPressedKeyInfo[0],
          'succeedState',
          'def'
        );
        this.markCharOnBoard(
          keyboard,
          functionKeys,
          previousPressedKeyInfo[1],
          'succeedState',
          'def'
        );
      }

      const nextCharInfo = getKeysFromChar(keyboard, nextSign);
      this.markCharOnBoard(
        keyboard,
        functionKeys,
        nextCharInfo[0],
        'marker',
        'toPressFirst'
      );
      this.markCharOnBoard(
        keyboard,
        functionKeys,
        nextCharInfo[1],
        'marker',
        'toPressSecond'
      );

      if (!nextCharInfo[0]) {
        this.handleError();
      }

      if (charsSucceed) {
        this.markCharOnBoard(
          keyboard,
          functionKeys,
          currentKeyInfo[0],
          'succeedState',
          'correct'
        );
        this.markCharOnBoard(
          keyboard,
          functionKeys,
          currentKeyInfo[1],
          'succeedState',
          'correct'
        );
        statistics.correct.push(currentKeyInfo);
      } else if (currentKeyInfo) {
        this.markCharOnBoard(
          keyboard,
          functionKeys,
          currentKeyInfo[0],
          'succeedState',
          'error'
        );
        this.markCharOnBoard(
          keyboard,
          functionKeys,
          currentKeyInfo[1],
          'succeedState',
          'error'
        );
        statistics.misspell.push(currentKeyInfo);

        if (pressedKeyInfo) {
          this.markCharOnBoard(
            keyboard,
            functionKeys,
            pressedKeyInfo[0],
            'succeedState',
            'missed'
          );
          this.markCharOnBoard(
            keyboard,
            functionKeys,
            pressedKeyInfo[1],
            'succeedState',
            'missed'
          );
          statistics.miswrite.push(pressedKeyInfo);
        }
      }

      return {
        userText,
        cursorAt,
        signToWrite,
        writtenSign,
        inputChanged: true,
        keyboard,
        functionKeys,
        currentKeyInfo: nextCharInfo,
        previousKeyInfo: currentKeyInfo,
        previousPressedKeyInfo: pressedKeyInfo,
        statistics,
      };
    });
  }

  startNewLesson(sampleText: string) {
    const { keyboard, functionKeys } = this.state;

    const nextCharInfo = getKeysFromChar(keyboard, sampleText.charAt(0));

    const { dispatchSetSampleText } = this.props;

    dispatchSetSampleText(sampleText);

    this.markCharOnBoard(
      keyboard,
      functionKeys,
      nextCharInfo[0],
      'marker',
      'toPressFirst'
    );
    this.markCharOnBoard(
      keyboard,
      functionKeys,
      nextCharInfo[1],
      'marker',
      'toPressSecond'
    );

    this.setState(() => ({
      userText: '',
      cursorAt: 0,
      signToWrite: '',
      writtenSign: '',
      inputChanged: false,
      currentKeyInfo: nextCharInfo,
    }));
  }

  handleKeydown(event) {
    // const succeedState = isoSucceed ? 'correct' : 'error'

    const getModifierStateCapsLock = event.getModifierState('CapsLock'); // always true if CapsLock pressed

    this.setState((prevState) => {
      const {
        keyboard,
        functionKeys,
        codeToIso,
        keysDown,
        isCapsLockOn: isCapsLockOnFromState,
      } = { ...prevState };

      const lastKeyDown = event.code;
      const downIso = codeToIso[lastKeyDown];
      keysDown.push(lastKeyDown);

      let isCapsLockOn = isCapsLockOnFromState;

      if (lastKeyDown === 'CapsLock') {
        isCapsLockOn = !isCapsLockOn;
      } else if (!keysDown.includes('CapsLock')) {
        isCapsLockOn = getModifierStateCapsLock;
      }

      if (keyboard.keys[downIso]) {
        keyboard.keys[downIso].pressure = 'pressed';
      } else if (functionKeys[lastKeyDown]) {
        functionKeys[lastKeyDown].pressure = 'pressed';
      }

      const displayedLevel = memoizedGetLevelFromKeys(
        keysDown,
        keyboard.levels,
        isCapsLockOn
      );

      return {
        keyboard,
        functionKeys,
        keysDown,
        isCapsLockOn,
        displayedLevel,
      };
    });
  }

  handleKeyup(event) {
    this.setState((prevState) => {
      const {
        keyboard,
        functionKeys,
        codeToIso,
        keysDown,
        isCapsLockOn,
        inputChanged,
      } = { ...prevState };

      const lastKeyUp = event.code;
      const upIso = codeToIso[lastKeyUp];

      const filteredKeysDownArray = keysDown.filter((code) => {
        const modifiersActuallyNotDown = [];
        // e.g. Alt key changes the focus of the browser, so no key up event fired for Alt
        if (!event.getModifierState('Alt')) {
          modifiersActuallyNotDown.push('AltLeft');
          functionKeys.AltLeft.pressure = 'none';
        }
        return code !== event.code && !modifiersActuallyNotDown.includes(code);
      });

      const displayedLevel = memoizedGetLevelFromKeys(
        filteredKeysDownArray,
        keyboard.levels,
        isCapsLockOn
      );

      if (inputChanged) {
        if (keyboard.keys[upIso]) {
          keyboard.keys[upIso].pressure = 'none';
        } else if (functionKeys[lastKeyUp]) {
          functionKeys[lastKeyUp].pressure = 'none';
        }
      }

      if (isCapsLockOn) {
        functionKeys.CapsLock.pressure = 'locked';
      }

      return {
        keyboard,
        functionKeys,
        displayedLevel,
        keysDown: filteredKeysDownArray,
      };
    });
  }

  handleModalClose() {
    const { handleModalClose } = this.props;

    if (handleModalClose) {
      handleModalClose();
    }

    this.startNewLesson('New lesson');
  }

  handleError() {
    this.setState({ characterNotFound: true });
  }

  handleErrorClose() {
    this.setState({ characterNotFound: false });
  }

  render() {
    const {
      keyboard,
      userText,
      cursorAt,
      signToWrite,
      writtenSign,
      displayedLevel,
      functionKeys,
      characterNotFound,
    } = this.state;

    const { intl, isModalOpen } = this.props;

    return (
      <>
        <TypewriterBoard
          userText={userText}
          cursorAt={cursorAt}
          signToWrite={signToWrite}
          writtenSign={writtenSign}
          userInputText={this.userInputText}
          setUserInputFocus={this.setUserInputFocus}
          displayedLevel={displayedLevel}
          keyboard={keyboard}
          functionKeys={functionKeys}
        />
        <LessonModal
          open={isModalOpen}
          onClose={this.handleModalClose}
          content="content"
        />
        <ErrorModal
          open={characterNotFound}
          handleClose={this.handleErrorClose}
          content={intl.formatMessage({
            id: 'error.not.found.character.on.keyboard',
          })}
        />
      </>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const { setSampleText, focusUserInput } = state;
  return {
    sampleText: setSampleText.sampleText,
    isUserInputFocused: focusUserInput.isUserInputFocused,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    ReduxState,
    undefined,
    FocusUserInputAction | SetSampleTextAction
  >
) => ({
  dispatchUserInputFocused: (isUserInputFocused: boolean) =>
    dispatch(focusUserInput(isUserInputFocused)),
  dispatchSetSampleText: (sampleText: string) =>
    dispatch(setSampleText(sampleText)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Typewriter));
