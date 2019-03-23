import React from 'react'
import { withPrefix } from 'gatsby-link'
import { merge } from 'lodash'

import Layout from '../components/layout'
import SEO from '../components/seo'
import findCharOnKeyboard from '../components/utils/findCharOnKeyboard'

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
      keysDown: [],
      /*
      keyEvent: {
        altKey: false,
        bubbles: true,
        cancelBubble: false,
        cancelable: true,
        charCode: 0,
        code: '', // e.g. "F12"
        composed: true,
        ctrlKey: false,
        currentTarget: null,
        defaultPrevented: false,
        detail: 0,
        eventPhase: 0,
        isComposing: false,
        isTrusted: true,
        key: '', // e.g. "F12"
        keyCode: 0, // e.g. 123
        location: 0,
        metaKey: false,
        path: [],
        repeat: false,
        returnValue: true,
        shiftKey: false,
        sourceCapabilities: null, // e.g. InputDeviceCapabilities
        srcElement: null, // e.g. body
        target: null, // e.g. body
        timeStamp: 0, // e.g. 6372.995000000001
        type: '', // e.g. keydown
        view: null, // e.g. Window
        which: 0, // e.g. 123

        CapsLock: false,
      },
      */

      displayedLevel: 'to',
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
      keyboard.keys[key.iso].state = key.color
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
    } = this.state
    const keyboard = JSON.parse(JSON.stringify(keyboardFromState))
    const functionKeys = JSON.parse(JSON.stringify(functionKeysFromState))
    const { deadKeys } = keyboard

    const succeed = signToWrite === writtenSign
    const succeedState = succeed ? 'correct' : 'error'

    let markedKeyboard
    let markedFunctionKeys

    // mark next key(s)
    const nextKeyInfo = findCharOnKeyboard({
      keyboard,
      characterToFind: nextSign,
    })
    if (nextKeyInfo) {
      nextKeyInfo.color = 'toWrite'
      markedKeyboard = this.markKeyboardKeys(keyboard, [nextKeyInfo])
      markedFunctionKeys = this.markFunctionKey(functionKeys, [nextKeyInfo])
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
          }
        }
        return null
      })
    }
    // markedKeyboard.keys.E02.state = 'correct'

    markedKeyboard = this.markKeyboardKeys(keyboard, this.state.keysDown)

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


  handleKeys(event, source) {
    const keyEvent = Object.assign({}, this.state.keyEvent)
    // console.log(source, event);

    let displayedLevel = 'to'
    if (keyEvent.shiftKey && keyEvent.CapsLock) {
      displayedLevel = 'caps+shift'
    } else if (keyEvent.CapsLock && !(keyEvent.altKey && keyEvent.ctrlKey)) {
      displayedLevel = 'caps'
    } else if (keyEvent.shiftKey) {
      displayedLevel = 'shift'
    } else if (keyEvent.altKey && keyEvent.ctrlKey) {
      displayedLevel = 'altR+caps? ctrl+alt+caps?'
    }

    this.setState({
      displayedLevel,
    })

    if (event.altKey !== keyEvent.altKey) {
      // console.log("altKey");
      keyEvent.altKey = event.altKey
      this.setState({
        keyEvent,
      })
    }

    if (event.ctrlKey !== keyEvent.ctrlKey) {
      // console.log("ctrlKey");
      keyEvent.ctrlKey = event.ctrlKey
      this.setState({
        keyEvent,
      })
    }
    if (event.metaKey !== keyEvent.metaKey) {
      // console.log("metaKey");
      keyEvent.metaKey = event.metaKey
      this.setState({
        keyEvent,
      })
    }
    if (!event.shiftKey !== !keyEvent.shiftKey) {
      // console.log("shiftKey");
      keyEvent.shiftKey = event.shiftKey
      this.setState({
        keyEvent,
      })
    }

    if (event.getModifierState) {
      // console.log(event.getModifierState("CapsLock"));
      if (event.getModifierState('CapsLock') !== keyEvent.CapsLock) {
        // console.log("CapsLock");
        keyEvent.CapsLock = event.getModifierState('CapsLock')
        this.setState({
          keyEvent,
        })
      }
      /* else if (event.getModifierState("CapsLock") && event.getModifierState("shift")) {
        if (name === "caps+shift") {
          visibility = "visible";
        } else if (name === "to") {
          visibility = "hidden";
        }
      } else if (event.getModifierState("AltGraph")) {
        if (name === "altR+caps? ctrl+alt+caps?") {
          visibility = "visible";
        } else if (name === "to") {
          visibility = "hidden";
        }
      } else if (name === "to") {
        visibility = "visible";
      } */

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
    }
  }

  handleKeydown(event) {
    // console.dir(event.code, event.key, event.getModifierState('Alt'), event.location)
    const { keysDown: keysDownFromState, codeToIso } = this.state
    const keysDown = JSON.parse(JSON.stringify(keysDownFromState))

    const downIso = codeToIso[event.code]
    keysDown.push({ iso: downIso, color: 'error' })

    this.setState({
      keysDown,
    })
  }

  // handleKeypress(event) {
  //   this.handleKeys(event, 'Keypress')
  // }

  handleKeyup(event) {
    // this.handleKeys(event, 'Keyup')
    const { keysDown: keysDownFromState, codeToIso } = this.state
    const keysDown = JSON.parse(JSON.stringify(keysDownFromState))

    const downIso = codeToIso[event.code]
    const filteredArray = keysDown.filter(obj => obj.iso !== downIso)

    // console.log(filteredArray)
    this.setState({
      keysDown: filteredArray,
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
