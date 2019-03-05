import React from 'react'

import vars from '../../variables'
import KeyboardLoadXML from './KeyboardLoadXML'
import KeyboardKey from './KeyboardKey'

export default class Keyboard extends React.Component {
  constructor() {
    super()
    this.state = {
      keyboard: {
        /*
        alphanumeric section
          alphanumeric zone
          function zones
        numeric section
          numeric zone
          function zone
        editing and function section (in fact covering all parts of the keyboard which do not belong to the alphanumeric or numeric section)
          cursor key zone
          editing function zone
        */
        name: '',
        keys: [],
        keyLevels: [],
        allChars: [],
        deadKeys: [],
        functionKeys: {},
      },

      onKeyboardLoaded: this.onKeyboardLoaded.bind(this),
    }
  }

  componentDidMount() {
    KeyboardLoadXML(this.props, this.state.onKeyboardLoaded)
  }

  onKeyboardLoaded(data) {
    this.setState(data)
    this.props.onKeyboardLoaded(data)
  }

  KeyboardTitle() {
    if (this.props.showTitle === true) {
      return (
        <h3 className="keyboard__title">{this.state.keyboard.name}</h3>
      )
    }
  }

  KeyboardDeadKeys() {
    if (this.props.showDeadKeys === true) {
      return (
        <p dangerouslySetInnerHTML={{ __html: this.state.keyboard.allChars }} />
      )
    }
  }

  render() {
    const { functionKeys } = this.state.keyboard
    const keyEvent = this.props.keyEvent || {}
    const displayedLevel = this.props.displayedLevel || 'to'

    function mapObject(object, callback) {
      return Object.keys(object).map(key => callback(key, object[key]))
    }

    return (
      <div className="keyboard" style={{ background: 'gray', borderRadius: 10 }}>
        {this.KeyboardTitle()}
        {this.KeyboardDeadKeys()}
        <svg className="keyboard__svg" version="1.1" viewBox={`0 0 ${vars.keyboardWidth} ${vars.keyboardHeight}`} textAnchor="middle">
          {
            this.state.keyboard.keys.map(item => (
              <KeyboardKey
                key={item.iso}
                keyObj={item}
                keyEvent={keyEvent}
                displayedLevel={displayedLevel}
              />
            ))
          };
          {
            mapObject(this.state.keyboard.functionKeys, (key, value) => (
              <KeyboardKey
                key={value.iso}
                keyObj={value}
                keyEvent={keyEvent}
              />
            ))
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
