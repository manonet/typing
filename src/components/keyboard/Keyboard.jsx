import React from 'react'

import vars from '../../variables'
import KeyboardKey from './KeyboardKey'

export default class Keyboard extends React.Component {
  componentDidMount() {
    //
  }

  KeyboardTitle() {
    const { showTitle, keyboard } = this.props
    if (showTitle === true) {
      return (
        <h3 className="keyboard__title">{keyboard.name}</h3>
      )
    }
  }

  KeyboardDeadKeys() {
    const { showDeadKeys, keyboard } = this.props
    if (showDeadKeys === true) {
      return (
        <p dangerouslySetInnerHTML={{ __html: keyboard.allChars }} />
      )
    }
  }

  render() {
    const {
      keyboard,
      functionKeys,
    } = this.props
    // console.log("keyboard", keyboard)
    // console.log("keys", keyboardKeys)

    if (!keyboard.keys) {
      return null
    }

    const {
      keys,
    } = keyboard

    const {
      keyboardWidth,
      keyboardHeight,
      keyWidth,
      keyHeight,
      keyPaddingX,
      keyPaddingY,
      aRowShift,
      bRowShift,
      cRowShift,
      dRowShift,
      rX,
      rY,
      keyLabelX,
      keyLabelY,
    } = vars

    const displayedLevel = this.props.displayedLevel || 'to'

    return (
      <div className="keyboard" style={{ background: 'gray', borderRadius: 10 }}>
        {this.KeyboardTitle()}
        {this.KeyboardDeadKeys()}
        <svg className="keyboard__svg" version="1.1" viewBox={`0 0 ${keyboardWidth} ${keyboardHeight}`} textAnchor="middle">
          {
            Object.keys(keys).map((iso) => {
              if (!keys[iso].to) {
                return
              }

              const rowLetter = iso.substring(0, 1)
              const column = parseInt(iso.substring(1, 3), 10)

              let translateX = vars.keyWidth * column
              let translateY = 0

              switch (rowLetter) {
              case 'D':
                translateX = vars.dRowShift + vars.keyWidth * column
                translateY = vars.keyHeight
                break
              case 'C':
                translateX = vars.cRowShift + vars.keyWidth * column
                translateY = vars.keyHeight * 2
                break
              case 'B':
                translateX = vars.bRowShift + vars.keyWidth * column
                translateY = vars.keyHeight * 3
                break
              case 'A':
                translateX = vars.aRowShift + vars.keyWidth * column
                translateY = vars.keyHeight * 4
                break
              default:
                break
              }

              const labels = { to: keys[iso].to }
              return (
                <KeyboardKey
                  key={iso}
                  displayedLevel={displayedLevel}
                  iso={iso}
                  {...keys[iso]}
                  labels={labels}
                  x={translateX}
                  y={translateY}
                  width={keyWidth}
                  height={keyWidth}
                  rx={rY}
                  ry={rY}
                />
              )
            })
          };
          {
            Object.keys(functionKeys).map((iso) => {
              const labels = { to: functionKeys[iso].to }
              return (
                <KeyboardKey
                  key={iso}
                  displayedLevel="to"
                  iso={iso}
                  {...functionKeys[iso]}
                  labels={labels}
                  x={0}
                  y={0}
                  width={keyWidth}
                  height={keyWidth}
                  rx={rY}
                  ry={rY}
                />
              )
            })
          }
        </svg>
      </div>
    )
  }
}


/*
The harmonized 48 graphic key keyboard arrangement
Keyboards which comply to this narrower specification contain all the keys shown in white in the figure above, the key at C12 shown in yellow, and one of the two keys at E13 and B00 shown in red. The standard does not require this; it only says that keyboards complying to this narrower specification can be called such.
In fact, several layouts (e. g. the US layout), to allow a wider return key, have a key at D13 (shown in green) instead of C12 (shown in yellow). Thus, while they cannot be called “harmonized 48 graphic key keyboards” according to the standard, they still comply to the standard itself. It is to be noted that ISO/IEC 9995-3:2010, in referring to the basic layout within its specific scope, does take a possible substitution of C12 by D13 into account.
*/
