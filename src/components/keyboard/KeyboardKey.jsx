import React from 'react'
import vars from '../../variables'

import './keyboardKey.scss'

function mapObject(object, callback) {
  return Object.keys(object).map(key => callback(key, object[key]))
}

// ================================================================================================
// FUNCTION KEYS

function KeyBackground(props) {
  // Background "image", the visible key
  const x = props.x + vars.keyPaddingX || vars.keyPaddingX
  const y = props.y + vars.keyPaddingY || vars.keyPaddingY
  const width = props.width || vars.keyWidth - vars.keyPaddingX * 2
  const height = props.height || vars.keyHeight - vars.keyPaddingY * 2
  const rx = vars.rX
  const ry = vars.rY

  return (
    <rect className="key__bg" x={x} y={y} width={width} height={height} rx={rx} ry={ry} />
  )
}

function FunctionKeyBackspace(props) {
  // Backspace
  const { keyObj } = props
  const backspaceWidth = vars.keyWidth * 2 - vars.keyPaddingX * 2
  const translate = keyObj.translate || `translate(${vars.keyWidth * 13}, 0)`
  return (
    <g className={`key key__backspace ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground width={backspaceWidth} />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}

function FunctionKeyCapsLock(props) {
  // CapsLock
  const { keyObj } = props
  const capsLockWidth = vars.keyWidth + vars.cRowShift - vars.keyPaddingX * 2
  const translate = keyObj.translate || `translate(0, ${vars.keyHeight * 2})`

  return (
    <g className={`key key__capslock ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground width={capsLockWidth} />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}

function FunctionKeyTab(props) {
  // Tab
  const { keyObj } = props
  const tabWidth = vars.keyWidth + vars.dRowShift - vars.keyPaddingX * 2
  const translate = keyObj.translate || `translate(0, ${vars.keyHeight})`

  return (
    <g className={`key key__tab ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground width={tabWidth} />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}


function FunctionKeyLeftShift(props) {
  // Left Shift
  const { keyObj } = props
  const leftShiftWidth = vars.bRowShift - vars.keyPaddingX * 2
  const translate = keyObj.translate || `translate(0, ${vars.keyHeight * 3})`

  return (
    <g className={`key key__left-shift ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground width={leftShiftWidth} />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}

function FunctionKeyRightShift(props) {
  // Right Shift
  const { keyObj } = props
  const rightShiftWidth = (vars.keyWidth * 3 - vars.bRowShift) - vars.keyPaddingX * 2
  const translate = keyObj.translate || `translate(${vars.bRowShift + vars.keyWidth * 12}, ${vars.keyHeight * 3})`

  return (
    <g className={`key key__right-shift ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground width={rightShiftWidth} />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}

function FunctionKeyLeftCtrl(props) {
  // Left Ctrl
  const { keyObj } = props
  const leftCtrlWidth = vars.bRowShift - vars.keyPaddingX * 2
  const translate = keyObj.translate || `translate(0, ${vars.keyHeight * 4})`

  return (
    <g className={`key key__left-ctrl ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground width={leftCtrlWidth} />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}

function FunctionKeyFn(props) {
  // fn
  const { keyObj } = props
  const translate = keyObj.translate || `translate(${vars.aRowShift}, ${vars.keyHeight * 4})`

  return (
    <g className={`key key__fn ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}

function FunctionKeyLeftCommand(props) {
  // left Command
  const { keyObj } = props
  const translate = keyObj.translate || `translate(${vars.aRowShift + vars.keyWidth}, ${vars.keyHeight * 4})`

  return (
    <g className={`key key__left-command ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}

function FunctionKeyAlt(props) {
  // Alt
  const { keyObj } = props
  const translate = keyObj.translate || `translate(${vars.aRowShift + vars.keyWidth * 2}, ${vars.keyHeight * 4})`

  return (
    <g className={`key key__alt ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}

function FunctionKeyAltGr(props) {
  // AltGr
  const { keyObj } = props
  const translate = keyObj.translate || `translate(${vars.aRowShift + vars.keyWidth * 8}, ${vars.keyHeight * 4})`

  return (
    <g className={`key key__altgr ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}

function FunctionKeyRightCommand(props) {
  // right Command
  const { keyObj } = props
  const translate = keyObj.translate || `translate(${vars.aRowShift + vars.keyWidth * 9}, ${vars.keyHeight * 4})`

  return (
    <g className={`key key__right-command ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}

function FunctionKeyMenu(props) {
  // Menu
  const { keyObj } = props
  const translate = keyObj.translate || `translate(${vars.aRowShift + vars.keyWidth * 11}, ${vars.keyHeight * 4})`

  return (
    <g className={`key key__menu ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}

function FunctionKeyRightCtrl(props) {
  // Right Ctrl
  const { keyObj } = props
  const rightCtrlWidth = (vars.keyWidth * 3 - vars.bRowShift) - vars.keyPaddingX * 2
  const translate = keyObj.translate || `translate(${vars.bRowShift + vars.keyWidth * 12}, ${vars.keyHeight * 4})`

  return (
    <g className={`key key__right-shift ${keyObj.iso} ${keyObj.state}`} transform={translate}>
      <KeyBackground width={rightCtrlWidth} />
      <g className="key__labels">
        <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
      </g>
    </g>
  )
}


function KeyEnter(props) {
  // Enter
  const { keyObj } = props
  const { keyWidth } = vars
  const { keyHeight } = vars
  const { keyboardWidth } = vars
  const { keyboardHeight } = vars
  const { keyPaddingX } = vars
  const { keyPaddingY } = vars
  const { dRowShift } = vars
  const { cRowShift } = vars
  const { bRowShift } = vars
  const { aRowShift } = vars
  const { rX } = vars
  const { rY } = vars

  // for Enter
  const leftD = dRowShift
  let leftC = cRowShift
  const right = keyWidth * 2
  const bottom = keyHeight * 2
  const translate = keyObj.translate || `translate(${vars.keyWidth * 13}, ${vars.keyHeight})`

  const enterPath = `M${leftD + keyPaddingX} ${rY + keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 1, ${leftD + rX + keyPaddingX} ${keyPaddingY}\
            L ${right - rX - keyPaddingX} ${keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 1, ${right - keyPaddingX} ${rY + keyPaddingY}\
            L ${right - keyPaddingX} ${bottom - rY - keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 1, ${right - rX - keyPaddingX} ${bottom - keyPaddingY}\
            L ${leftC + rX + keyPaddingX} ${bottom - keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 1, ${leftC + keyPaddingX} ${bottom - rY - keyPaddingY}\
            L ${leftC + keyPaddingX} ${keyHeight + rY - keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 0, ${leftC - rX + keyPaddingX} ${keyHeight - keyPaddingY}\
            L ${leftD + rX + keyPaddingX} ${keyHeight - keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 1, ${leftD + keyPaddingX} ${keyHeight - rY - keyPaddingY}\
            L ${leftD + keyPaddingX} ${rY + keyPaddingY} Z`

  leftC = cRowShift - vars.keyWidth
  const enterPath2 = `M${leftD + keyPaddingX} ${rY + keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 1, ${leftD + rX + keyPaddingX} ${keyPaddingY}\
            L ${right - rX - keyPaddingX} ${keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 1, ${right - keyPaddingX} ${rY + keyPaddingY}\
            L ${right - keyPaddingX} ${bottom - rY - keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 1, ${right - rX - keyPaddingX} ${bottom - keyPaddingY}\
            L ${leftC + rX + keyPaddingX} ${bottom - keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 1, ${leftC + keyPaddingX} ${bottom - rY - keyPaddingY}\
            L ${leftC + keyPaddingX} ${keyHeight + rY + keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 1, ${leftC + rX + keyPaddingX} ${keyHeight + keyPaddingY}\
            L ${leftD - rX + keyPaddingX} ${keyHeight + keyPaddingY}\
            A ${rX} ${rY}, 0, 0, 0, ${leftD + keyPaddingX} ${keyHeight - rY + keyPaddingY}\
            L ${leftD + keyPaddingX} ${rY + keyPaddingY} Z`

  if (keyObj.variant === 1) {
    /* shape:
       xx
       -x
    */
    return (
      <g className={`key key__enter ${keyObj.iso} ${keyObj.state}`} transform={translate}>
        <path className="key__bg" d={enterPath} />
        <g className="key__labels">
          <text className="key__to" x="160" y="140">{keyObj.labels.to}</text>
        </g>
      </g>
    )
  } if (keyObj.variant === 2) {
    /* shape:
       --
       xx
    */
    return (
      <g className={`key key__enter ${keyObj.iso} ${keyObj.state}`} transform={`translate(${vars.cRowShift + vars.keyWidth * 12}, ${vars.keyHeight * 2})`}>
        <KeyBackground width={(vars.keyWidth * 3 - vars.cRowShift) - vars.keyPaddingX * 2} />
        <g className="key__labels">
          <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
        </g>
      </g>
    )
  } if (keyObj.variant === 3) {
    /* shape:
       xx
       --
    */
    return (
      <g className={`key key__enter ${keyObj.iso} ${keyObj.state}`} transform={`translate(${vars.dRowShift + vars.keyWidth * 12}, ${vars.keyHeight})`}>
        <KeyBackground width={(vars.keyWidth * 3 - vars.dRowShift) - vars.keyPaddingX * 2} />
        <g className="key__labels">
          <text className="key__to" x="30" y="80">{keyObj.labels.to}</text>
        </g>
      </g>
    )
  } if (keyObj.variant === 4) {
    /* shape:
       -x
       xx
    */
    return (
      <g className={`key key__enter ${keyObj.iso} ${keyObj.state}`} transform={translate}>
        <path className="key__bg" d={enterPath2} />
        <g className="key__labels">
          <text className="key__to" x="120" y="140">{keyObj.labels.to}</text>
        </g>
      </g>
    )
  }
  // TODO
  return null
}

// ================================================================================================
// KEY COMPONENTS

function Text(props) {
  let x = props.x + vars.keyLabelX
  let y = props.y + vars.keyLabelY + 10
  const { name } = props
  let visibility = 'hidden'
  const { keyEvent } = props
  const { checkKeyEvents } = props


  switch (name) {
  case '':
    x = props.x
    y = props.y
    break

  default:
    break
  }

  if (name === 'to') {
    visibility = 'visible'
  }

  if (checkKeyEvents) {
    // console.log("inLabel checkKeyEvents");


    if (keyEvent.shiftKey && keyEvent.CapsLock) {
      // console.log("shift");
      if (name === 'caps+shift') {
        visibility = 'visible'
      } else if (name === 'to') {
        visibility = 'hidden'
      }
    } else if (keyEvent.CapsLock && !(keyEvent.altKey && keyEvent.ctrlKey)) {
      // console.log("caps");
      if (name === 'caps') {
        visibility = 'visible'
      } else if (name === 'to') {
        visibility = 'hidden'
      }
    } else if (keyEvent.shiftKey) {
      // console.log("shift");
      if (name === 'shift') {
        visibility = 'visible'
      } else if (name === 'to') {
        visibility = 'hidden'
      }
    } else if (keyEvent.altKey && keyEvent.ctrlKey) {
      // console.log("AltGr");
      if (name === 'altR+caps? ctrl+alt+caps?') {
        visibility = 'visible'
      } else if (name === 'to') {
        visibility = 'hidden'
      }
    }
  }

  return (
    <text
      className={`key__label ${props.name} ${visibility}`}
      dangerouslySetInnerHTML={{ __html: props.value }}
      x={x}
      y={y}
    />
  )
}

function Labels(props) {
  const { keyObj } = props
  const x = props.keyObj.x || 0
  const y = props.keyObj.y || 0
  const { labels } = props.keyObj
  const { iso } = props.keyObj
  const { displayedLevel } = props

  // chech if labels is empty
  if (Object.keys(labels).length === 0) {
    return null
  }
  // display all characters within own text on keytop
  return (
    <g className="key__labels">
      {
        mapObject(labels, (key, value) => (
          <Text
            key={key}
            name={key}
            value={value}
            keyEvent={props.keyEvent}
            checkKeyEvents={props.checkKeyEvents}
            x={x}
            y={y}
          />
        ))
      }
    </g>
  )
}

function LabelTransform(props) {
  if (props.transform !== undefined) {
    return (
      <text className="key__transform" dangerouslySetInnerHTML={{ __html: props.transform }} display="none" />
    )
  }
  return null
}


export default class KeyboardKey extends React.Component {
  render() {
    const {keyObj} = this.props;
    const {keyEvent} = this.props;
    const checkKeyEvents = (Object.keys(keyEvent).length !== 0);

    const x = keyObj.x || 0
    let y = keyObj.y || 0

    let keyClass = 'key key--' + keyObj.iso.substring(0, 1) + ' ' + keyObj.iso + ' ' + keyObj.state

    // When letters on a case pair are associated with a key, only the capital character need to be shown on the keytop for the primary group, while the lowercase character only is shown for the secondary group.
    if (keyObj.labels.to.toString().toUpperCase() === keyObj.labels.shift) {
      keyClass += ' alpha';
    }

    if (keyObj.iso === 'E14') {
      return <FunctionKeyBackspace keyObj={keyObj} />
    } if (keyObj.iso === 'C00') {
      return <FunctionKeyCapsLock keyObj={keyObj} />
    } if (keyObj.name === 'enter') {
      return <KeyEnter keyObj={keyObj} />
    } if (keyObj.iso === 'D00') {
      return <FunctionKeyTab keyObj={keyObj} />
    } if (keyObj.iso === 'B99') {
      return <FunctionKeyLeftShift keyObj={keyObj} />
    } if (keyObj.iso === 'B13') {
      return <FunctionKeyRightShift keyObj={keyObj} />
    } if (keyObj.iso === 'A99') {
      return <FunctionKeyLeftCtrl keyObj={keyObj} />
    } if (keyObj.iso === 'A00') {
      return <FunctionKeyFn keyObj={keyObj} />
    } if (keyObj.iso === 'A01') {
      return <FunctionKeyLeftCommand keyObj={keyObj} />
    } if (keyObj.iso === 'A02') {
      return <FunctionKeyAlt keyObj={keyObj} />
    } else if (keyObj.iso === 'A08') {
      return <FunctionKeyAltGr keyObj={keyObj} />
    } else if (keyObj.iso === 'A09') {
      return <FunctionKeyRightCommand keyObj={keyObj} />
    } else if (keyObj.iso === 'A11') {
      return <FunctionKeyMenu keyObj={keyObj} />
    } else if (keyObj.iso === 'A12') {
      return <FunctionKeyRightCtrl keyObj={keyObj} />
    } else if (keyObj.iso === 'A03') {
      // Space (A03 to A07)
      return (
        <g className={keyClass}>
          <KeyBackground width={vars.keyWidth * 5 - vars.keyPaddingX * 2} x={x} y={y} />
        </g>
      )
    } else {
      return (
        <g className={keyClass} textAnchor="middle">
          <KeyBackground x={x} y={y} />
          <Labels keyObj={keyObj} checkKeyEvents={checkKeyEvents} keyEvent={keyEvent} displayedLevel={this.props.displayedLevel} />
          <LabelTransform transform={keyObj.transform} />
        </g>
      )
    }
  }
}
