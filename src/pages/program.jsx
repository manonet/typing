import React from 'react'
import { withPrefix } from 'gatsby-link'
import mem from 'mem'

import Layout from '../components/layout'
import SEO from '../components/seo'
import getLevelFromKeys from '../components/utils/getLevelFromKeys'
import getKeyboardOS from '../components/utils/getKeyboardOS'
import getKeysFromChar from '../components/utils/getKeysFromChar'

import ProgramBoard from '../components/ProgramBoard'

const memoizedGetLevelFromKeys = mem(getLevelFromKeys)
// TODO enable/disable backspace

export default class ProgramPage extends React.Component {
  constructor() {
    super()
    this.state = {
      sampleText: "Lí|Ä¶ćČ et's Tyyyype Something (@)...",
      userText: '',
      cursorAt: 0,
      signToWrite: '',
      writtenSign: '',
      nextSign: '',
      inputChanged: false,
      isUserInputFocused: false, // whenever the user types (or not)
      keyboard: {
        // name: '',
        // keys: {},
        // keyLevels: [],
        // allChars: [],
        // deadKeys: [],
      },
      functionKeys: {},
      keysDown: [],
      displayedLevel: 'to',
      isCapsLockOn: false,
    }

    this.markCharOnBoard = this.markCharOnBoard.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)
    this.userInputText = this.userInputText.bind(this)
    this.setUserInputFocus = this.setUserInputFocus.bind(this)
  }

  componentDidMount() {
    const keyboardOS = getKeyboardOS()
    const keyboardLang = navigator.language.substring(0, 2)
    console.info('keyboardOS', keyboardOS, 'keyboardLang', keyboardLang)
    Promise.all([
      // fetch(withPrefix(`/keyboards/${keyboardOS}/${keyboardLang}-t-k0-${keyboardOS}.json`)),
      fetch(withPrefix('/keyboards/windows/hu-t-k0-windows.json')),
      fetch(withPrefix('/keyboards/codeToIso.json')),
      fetch(withPrefix('/keyboards/functionKeys.json')),
    // fetch(withPrefix(`/keyboards/${keyboardOS}FunctionKeys.json`)),
    ])
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then((responses) => {
        const keyboard = responses[0]
        const codeToIso = responses[1]
        const functionKeys = responses[2]
        functionKeys.Enter.variant = keyboard.enterVariant

        this.setState(
          {
            keyboard,
            codeToIso,
            functionKeys,
          },
          document.addEventListener('keydown', this.handleKeydown, false),
          document.addEventListener('keyup', this.handleKeyup, false),
        )
      })
  }

  setUserInputFocus(isUserInputFocused) {
    this.setState({ isUserInputFocused })
  }

  markCharOnBoard(keyboard, functionKeys, keyInfo, colorProp, color) {
    if (keyInfo) {
      if (keyboard.keys[keyInfo.iso]) {
        keyboard.keys[keyInfo.iso][colorProp] = color
        const { level } = keyInfo
        if (level[Object.keys(level)[0]][0]) {
          level[Object.keys(level)[0]][0].map((l) => {
            if (functionKeys[l[0]]) {
              functionKeys[l[0]][colorProp] = color
            }
          })
        }
      }
    }
  }

  userInputText(userText) {
    this.setState((prevState) => {
      const {
        keyboard,
        functionKeys,
        sampleText,
        isoSucceed,
        currentKeyInfo,
        previousKeyInfo,
        previousPressedKeyInfo,
      } = { ...prevState }

      const signToWrite = (userText.length >= 1) ? sampleText.substring(userText.length - 1, userText.length) : ''
      const cursorAt = userText.length
      const writtenSign = (cursorAt > 0) ? userText.charAt(cursorAt - 1) : ''
      const nextSign = sampleText.charAt(cursorAt)
      const charsSucceed = signToWrite === writtenSign

      if (charsSucceed && charsSucceed !== isoSucceed) {
        console.warn('The selected keyboard layout is not matching with the actual input method')
      }

      const pressedKeyInfo = getKeysFromChar(keyboard, writtenSign)

      // reset previous keys
      if (currentKeyInfo) {
        this.markCharOnBoard(keyboard, functionKeys, currentKeyInfo[0], 'marker', 'def')
        this.markCharOnBoard(keyboard, functionKeys, currentKeyInfo[1], 'marker', 'def')
      }

      if (previousKeyInfo) {
        this.markCharOnBoard(keyboard, functionKeys, previousKeyInfo[0], 'succeedState', 'def')
        this.markCharOnBoard(keyboard, functionKeys, previousKeyInfo[1], 'succeedState', 'def')
      }
      if (previousPressedKeyInfo) {
        this.markCharOnBoard(keyboard, functionKeys, previousPressedKeyInfo[0], 'succeedState', 'def')
        this.markCharOnBoard(keyboard, functionKeys, previousPressedKeyInfo[1], 'succeedState', 'def')
      }

      const nextCharInfo = getKeysFromChar(keyboard, nextSign)
      this.markCharOnBoard(keyboard, functionKeys, nextCharInfo[0], 'marker', 'toPressFirst')
      this.markCharOnBoard(keyboard, functionKeys, nextCharInfo[1], 'marker', 'toPressSecond')

      if (!true) {
        console.log('could not find character on the keyboard')
      }

      if (!true) {
        console.log('could not find function key on the keyboard')
      }

      if (charsSucceed) {
        this.markCharOnBoard(keyboard, functionKeys, currentKeyInfo[0], 'succeedState', 'correct')
        this.markCharOnBoard(keyboard, functionKeys, currentKeyInfo[1], 'succeedState', 'correct')
      } else if (currentKeyInfo) {
        this.markCharOnBoard(keyboard, functionKeys, currentKeyInfo[0], 'succeedState', 'error')
        this.markCharOnBoard(keyboard, functionKeys, currentKeyInfo[1], 'succeedState', 'error')

        if (pressedKeyInfo) {
          this.markCharOnBoard(keyboard, functionKeys, pressedKeyInfo[0], 'succeedState', 'missed')
          this.markCharOnBoard(keyboard, functionKeys, pressedKeyInfo[1], 'succeedState', 'missed')
        }
      }

      return {
        userText,
        cursorAt,
        signToWrite,
        writtenSign,
        nextSign,
        inputChanged: true,
        keyboard,
        functionKeys,
        currentKeyInfo: nextCharInfo,
        previousKeyInfo: currentKeyInfo,
        previousPressedKeyInfo: pressedKeyInfo,
      }
    })
  }

  /*
  // console.log(event.key);
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
  let Alt = event.getModifierState && event.getModifierState("Alt");
  let AltGraph = event.getModifierState && event.getModifierState("AltGraph");
  let CapsLock = event.getModifierState && event.getModifierState("CapsLock");
  let Control = event.getModifierState && event.getModifierState("Control");
  let Meta = event.getModifierState && event.getModifierState("Meta"); // ⌘ Command key
  let NumLock = event.getModifierState && event.getModifierState("NumLock");
  let OS = event.getModifierState && event.getModifierState("OS");
  let ScrollLock = event.getModifierState && event.getModifierState("ScrollLock");
  let Shift = event.getModifierState && event.getModifierState("Shift");
  */

  handleKeydown(event) {
    // const succeedState = isoSucceed ? 'correct' : 'error'

    const getModifierStateCapsLock = event.getModifierState('CapsLock') // always true if CapsLock pressed

    this.setState((prevState) => {
      const {
        keyboard,
        functionKeys,
        codeToIso,
        keysDown,
        isCapsLockOn: isCapsLockOnFromState,
      } = { ...prevState }

      const lastKeyDown = event.code
      const downIso = codeToIso[lastKeyDown]
      keysDown.push(lastKeyDown)

      let isCapsLockOn = isCapsLockOnFromState

      if (lastKeyDown === 'CapsLock') {
        isCapsLockOn = !isCapsLockOn
      } else if (!keysDown.includes('CapsLock')) {
        isCapsLockOn = getModifierStateCapsLock
      }

      if (keyboard.keys[downIso]) {
        keyboard.keys[downIso].pressure = 'pressed'
      } else if (functionKeys[lastKeyDown]) {
        functionKeys[lastKeyDown].pressure = 'pressed'
      }

      const displayedLevel = memoizedGetLevelFromKeys(keysDown, keyboard.levels, isCapsLockOn)

      return {
        keyboard,
        functionKeys,
        keysDown,
        isCapsLockOn,
        displayedLevel,
      }
    })
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
      } = { ...prevState }

      const lastKeyUp = event.code
      const upIso = codeToIso[lastKeyUp]

      const filteredKeysDownArray = keysDown.filter((code) => {
        const modifiersActuallyNotDown = []
        // e.g. Alt key changes the focus of the browser, so no key up event fired for Alt
        if (!event.getModifierState('Alt')) {
          modifiersActuallyNotDown.push('AltLeft')
          functionKeys.AltLeft.pressure = 'none'
        }
        return code !== event.code && !modifiersActuallyNotDown.includes(code)
      })

      const displayedLevel = memoizedGetLevelFromKeys(filteredKeysDownArray, keyboard.levels, isCapsLockOn)

      if (inputChanged) {
        if (keyboard.keys[upIso]) {
          keyboard.keys[upIso].pressure = 'none'
        } else if (functionKeys[lastKeyUp]) {
          functionKeys[lastKeyUp].pressure = 'none'
        }
      }

      if (isCapsLockOn) {
        functionKeys.CapsLock.pressure = 'locked'
      }

      return {
        keyboard,
        functionKeys,
        displayedLevel,
        keysDown: filteredKeysDownArray,
      }
    })
  }

  render() {
    const {
      keyboard,
      sampleText,
      userText,
      cursorAt,
      signToWrite,
      writtenSign,
      isUserInputFocused,
      displayedLevel,
      functionKeys,
    } = this.state

    return (
      <Layout>
        <SEO title="Typewriting program" />
        <ProgramBoard
          sampleText={sampleText}
          userText={userText}
          cursorAt={cursorAt}
          signToWrite={signToWrite}
          writtenSign={writtenSign}
          userInputText={this.userInputText}
          setUserInputFocus={this.setUserInputFocus}
          isUserInputFocused={isUserInputFocused}
          displayedLevel={displayedLevel}
          keyboard={keyboard}
          functionKeys={functionKeys}
        />
      </Layout>
    )
  }
}
