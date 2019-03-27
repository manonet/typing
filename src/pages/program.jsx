import React from 'react'
import { withPrefix } from 'gatsby-link'

import Layout from '../components/layout'
import SEO from '../components/seo'
import findCharOnKeyboard from '../components/utils/findCharOnKeyboard'
import getLevelFromKeys from '../components/utils/getLevelFromKeys'

import ProgramBoard from '../components/ProgramBoard'

export default class ProgramPage extends React.Component {
  constructor() {
    super()
    this.state = {
      sampleText: "Lí|Ä¶ćČ et's Type Something (@)...",
      userText: '',
      cursorAt: 0,
      signToWrite: '',
      writtenSign: '',
      nextSign: '',
      isUserInputFocused: false, // whenever the user types (or not)
      keyboard: {
        // name: '',
        // keys: {},
        // keyLevels: [],
        // allChars: [],
        // deadKeys: [],
      },
      markedKeyboard: {},
      functionKeys: {},
      markedFunctionKeys: {},
      keysColoredDown: [],
      keysDown: [],
      displayedLevel: 'to',
      isCapsLockOn: false,
    }

    this.markFunctionKey = this.markFunctionKey.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    // this.handleKeypress = this.handleKeypress.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)
    this.markKeyboardKeys = this.markKeyboardKeys.bind(this)
    this.userInputText = this.userInputText.bind(this)
    this.setUserInputFocus = this.setUserInputFocus.bind(this)
  }

  componentDidMount() {
    Promise.all([
      fetch(withPrefix('/keyboards/windows/hu-t-k0-windows.json')),
      fetch(withPrefix('/keyboards/codeToIso.json')),
      fetch(withPrefix('/keyboards/functionKeys.json')),
    ])
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then((responses) => {
        this.setState(
          {
            keyboard: responses[0],
            markedKeyboard: responses[0],
            codeToIso: responses[1],
            functionKeys: responses[2],
            markedFunctionKeys: responses[2],
          },
          document.addEventListener('keydown', this.handleKeydown, false),
          document.addEventListener('keyup', this.handleKeyup, false),
        )
      })
  }

  setUserInputFocus(isUserInputFocused) {
    this.setState({ isUserInputFocused })
  }

  userInputText(userText) {
    const { sampleText } = this.state
    const signToWrite = (userText.length >= 1) ? sampleText.substring(userText.length - 1, userText.length) : ''
    const cursorAt = userText.length
    const writtenSign = (cursorAt > 0) ? userText.charAt(cursorAt - 1) : ''
    const nextSign = sampleText.charAt(cursorAt)

    this.setState(
      {
        userText,
        cursorAt,
        signToWrite,
        writtenSign,
        nextSign,
      },
      this.markKeyboardForType(signToWrite, writtenSign, nextSign),
    )
  }

  markKeyboardKeys(keyboard, keys) {
    keys.map((key) => {
      if (keyboard.keys[key.iso]) {
        // TODO functionkeys
        keyboard.keys[key.iso].state = key.color
      }
    })
    return keyboard
  }

  markFunctionKey(functionKeys, keys) {
    // TODO extract findFunctionKeyForChar function
    Object.keys(functionKeys).map((functionKey) => {
      const fnKey = functionKeys[functionKey]
      fnKey.state = 'def'
    })
    keys.map((key) => {
      const {
        level,
        leftOrRightSide: side,
        color,
      } = key
      Object.keys(functionKeys).map((functionKey) => {
        const fnKey = functionKeys[functionKey]
        if (fnKey.level === level && (!fnKey.side || (fnKey.side && fnKey.side !== side))) {
          fnKey.state = color
        }
      })
    })
    return functionKeys
  }

  markKeyboardForType(signToWrite, writtenSign, nextSign) {
    const {
      keyboard: keyboardFromState,
      functionKeys: functionKeysFromState,
      keysDown,
    } = this.state
    const keyboard = JSON.parse(JSON.stringify(keyboardFromState))
    const functionKeys = JSON.parse(JSON.stringify(functionKeysFromState))
    const { deadKeys } = keyboard

    const charsSucceed = signToWrite === writtenSign

    if (charsSucceed === this.state.isoSucceed) {
      // text input is successful and key press match with keyboard layout
    } else if (charsSucceed) {
      console.warn('The selected keyboard layout is not matching with the actual input method')
    }
    let markedKeyboard
    let markedFunctionKeys
    let nextKeyIso

    // mark next key(s)
    const nextKeyInfo = findCharOnKeyboard({
      keyboard,
      characterToFind: nextSign,
    })
    if (nextKeyInfo) {
      nextKeyInfo.color = 'toWrite'
      markedKeyboard = this.markKeyboardKeys(keyboard, [nextKeyInfo])
      markedFunctionKeys = this.markFunctionKey(functionKeys, [nextKeyInfo])
      nextKeyIso = nextKeyInfo.iso
    } else if (deadKeys) {
      Object.keys(deadKeys).map((key) => {
        if (key === nextSign) {
          // keyToPressFound in deadKeys: deadKeys[key][0], deadKeys[key][1])
          const nextKey0Info = findCharOnKeyboard({
            keyboard,
            characterToFind: deadKeys[key][0],
          })
          const nextKey1Info = findCharOnKeyboard({
            keyboard,
            characterToFind: deadKeys[key][1],
          })

          if (nextKey0Info && nextKey1Info) {
            nextKey0Info.color = 'toPressFirst'
            nextKey1Info.color = 'toPressSecond'

            markedKeyboard = this.markKeyboardKeys(keyboard, [nextKey0Info, nextKey1Info])
            markedFunctionKeys = this.markFunctionKey(functionKeys, [nextKey0Info, nextKey1Info])
            nextKeyIso = nextKey0Info.iso
          }
        }
        return null
      })
    }
    // markedKeyboard.keys.E02.state = 'correct'

    markedKeyboard = this.markKeyboardKeys(keyboard, this.state.keysColoredDown)

    if (!markedKeyboard) {
      console.log('could not find character on the keyboard')
      markedKeyboard = keyboard
    }

    if (!markedFunctionKeys) {
      console.log('could not find function key on the keyboard')
      markedFunctionKeys = functionKeys
    }

    this.setState({
      markedKeyboard,
      markedFunctionKeys,
      nextKeyIso,
    })

    /*
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i]

      if (stillSearching) {
        // map only if the characters not found yet. Once need to be map all keys to reset the state.
        keys.map((item) => {
          // loop trough each keyboard key

          // reset the state of each key on each input change (only once in loop)
          if (level === 'to') {
            item.state = 'def'
          }

          if (stillSearching) {
            // if not all key found, check the character on the key at the specified level
            if (!nextSignFound && item.labels[level] === nextSign) {
              if (level !== 'to') {
                // key combination, using of function key necessary
                this.markFunctionKey(level, 'toWrite')
              }
              item.state = 'toWrite'
              nextSignFound = true
            }
            if (!writtenSignFound && item.labels[level] === writtenSign) {
              item.state = 'error'
              if (signToWrite === writtenSign) {
                item.state = 'correct'
              }
              writtenSignFound = true
            }
            if (!signToWriteFound && item.labels[level] === signToWrite) {
              if (signToWrite !== writtenSign) {
                item.state = 'missed'
                // TODO enable/disable backspace
                this.markFunctionKey('backspace', 'toWrite')
              }
              signToWriteFound = true
            }

            if (nextSignFound && writtenSignFound && signToWriteFound) {
              // all character found, no search more necessary
              stillSearching = false

              if (level !== 'to') {
                // all key status resetted to default, no action more necessary, so exit the loop

              }
            }
          }
        })
      }
    }
    */
    /*
    if (stillSearching) {
      // the character not appears on any key, so search for it in the keyboard.deadKeys
      // console.log("transform"); TODO don't run this function on the first time

      const { deadKeys } = keyboard
      for (let i = 0; i < deadKeys.length; i++) {
        const transform = deadKeys[i]

        if (!nextSignFound && transform.to === nextSign) {
          // if the character found in the transform array
          const combo1 = transform.from.substring(0, 1)
          const combo2 = transform.from.substring(1, 2)
          let combo1Found = false
          let combo2Found = false

          for (let i = 0; i < levels.length; i++) {
            // loop trough each level again
            const level = levels[i]

            // console.log('test', combo1Found, combo2Found)
            if (!(combo1Found && combo2Found)) {
              // map only if still necessary
              keys.map((item) => {
                // and map each keyboard key again
                if (!combo1Found && item.labels[level] === combo1) {
                  if (level !== 'to') {
                    // key combination, using of function key necessary
                    // console.log(item.labels[level])
                    this.markFunctionKey(level, 'toWrite')
                  }
                  item.state = 'toWrite'
                  nextSignFound = true // it is enough to check only one half of the sign in the same loop, because the sign is found anyway
                  combo1Found = true
                  // console.log('combo1Found ', combo1)
                }
                if (!combo2Found && item.labels[level] === combo2) {
                  if (level !== 'to') {
                    // key combination, using of function key necessary
                    // console.log(item.labels[level])
                    // TODO item.priority = 'secondary'
                    this.markFunctionKey(level, 'toWrite secondary')
                  }
                  item.state = 'toWrite'
                  item.priority = 'secondary'
                  combo2Found = true
                  // console.log('combo2Found ', combo2)
                }
              })
            }
          }
        }
        if (!writtenSignFound && transform.to === writtenSign) {
          // if the character found in the transform array
          const combo1 = transform.from.substring(0, 1)
          const combo2 = transform.from.substring(1, 2)

          for (let i = 0; i < levels.length; i++) {
            // loop trough each level again
            const level = levels[i]
            keys.map((item) => {
              // and map each keyboard key again
              if (item.labels[level] === combo1) {
                item.state = 'error'
                if (signToWrite === writtenSign) {
                  item.state = 'correct'
                }
                writtenSignFound = true
              }
              if (item.labels[level] === combo2) {
                item.state = 'error'
                if (signToWrite === writtenSign) {
                  item.state = 'correct'
                  item.priority = 'secondary'
                }
              }
            })
          }
        }
        if (!signToWriteFound && transform.to === signToWrite) {
          // if the character found in the transform array
          const combo1 = transform.from.substring(0, 1)
          const combo2 = transform.from.substring(1, 2)

          for (let i = 0; i < levels.length; i++) {
            // loop trough each level again
            const level = levels[i]
            keys.map((item) => {
              // and map each keyboard key again
              if (item.labels[level] === combo1) {
                if (signToWrite !== writtenSign) {
                  item.state = 'missed'
                }
                signToWriteFound = true
              }
              if (item.labels[level] === combo2) {
                if (signToWrite !== writtenSign) {
                  item.state = 'missed'
                  item.priority = 'secondary'
                }
              }
            })
          }
        }

        if (nextSignFound && writtenSignFound && signToWriteFound) {
          // all character found, no search more necessary
          stillSearching = false
          return
        }
      }
    }
    */
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
    const {
      keysColoredDown: keysColoredDownFromState,
      keysDown: keysDownFromState,
      codeToIso,
      nextKeyIso,
      isCapsLockOn: isCapsLockOnFromState,
    } = this.state

    const keysColoredDown = JSON.parse(JSON.stringify(keysColoredDownFromState))
    const keysDown = JSON.parse(JSON.stringify(keysDownFromState))

    const downIso = codeToIso[event.code]
    const lastKeyDown = event.code

    const isoSucceed = nextKeyIso === downIso
    const succeedState = isoSucceed ? 'correct' : 'error'

    keysColoredDown.push({ iso: downIso, color: succeedState })
    keysDown.push(event.key)

    const getModifierStateCapsLock = event.getModifierState('CapsLock') // always true if CapsLock pressed
    let isCapsLockOn = isCapsLockOnFromState
    if (lastKeyDown === 'CapsLock') {
      isCapsLockOn = !isCapsLockOn
    } else {
      isCapsLockOn = getModifierStateCapsLock
    }
    const displayedLevel = getLevelFromKeys(keysDown, isCapsLockOn)

    this.setState({
      keysColoredDown,
      displayedLevel,
      isoSucceed,
      keysDown,
      lastKeyDown,
      isCapsLockOn,
    })
  }

  handleKeyup(event) {
    const {
      keysColoredDown: keysColoredDownFromState,
      keysDown: keysDownFromState,
      codeToIso,
      isCapsLockOn: isCapsLockOnFromState,
    } = this.state
    const keysColoredDown = JSON.parse(JSON.stringify(keysColoredDownFromState))
    const keysDown = JSON.parse(JSON.stringify(keysDownFromState))

    const upIso = codeToIso[event.code]
    const lastKeyUp = event.code


    const filteredArray = keysColoredDown.filter(obj => obj.iso !== upIso)
    const filteredKeysDownArray = keysDown.filter(code => code !== event.key)
    const getModifierStateCapsLock = event.getModifierState('CapsLock')
    let isCapsLockOn = isCapsLockOnFromState
    if (lastKeyUp === 'CapsLock') {
      if (!event.getModifierState('CapsLock')) {
        isCapsLockOn = false
      }
    } else {
      isCapsLockOn = getModifierStateCapsLock
      if (keysDown.includes('CapsLock')) {
        isCapsLockOn = false
      }
    }
    const displayedLevel = getLevelFromKeys(filteredKeysDownArray, isCapsLockOn)

    this.setState({
      keysColoredDown: filteredArray,
      displayedLevel,
      keysDown: filteredKeysDownArray,
      lastKeyUp,
      isCapsLockOn,
    })
  }

  render() {
    const {
      markedKeyboard,
      sampleText,
      userText,
      cursorAt,
      signToWrite,
      writtenSign,
      isUserInputFocused,
      displayedLevel,
      markedFunctionKeys,
    } = this.state

    return (
      <Layout>
        <SEO title="Typewriting program" />
        <h1>Typewriting program</h1>

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
          keyboard={markedKeyboard}
          functionKeys={markedFunctionKeys}
        />
      </Layout>
    )
  }
}
