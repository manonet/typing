import React from 'react'
import classNames from 'classnames'
import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import orange from '@material-ui/core/colors/orange'
import { withStyles } from '@material-ui/core/styles'
import vars from '../../variables'

const styles = theme => ({
  key: {
    cursor: 'default',
  },
  labels: { // also called keytop
    fill: theme.palette.grey[700],
    fontSize: 36,
  },
  labelTransform: {
    display: 'none',
  },
  label: {
    fill: theme.palette.grey[700],
  },
  labelToWrite: {
    fill: theme.palette.primary.contrastText,
  },
  keyBg: {
    stroke: theme.palette.grey[200],
    strokeWidth: 5,
    fill: theme.palette.common.white,
  },
  alphabet: {
    fill: orange[100],
  },
  toWrite: {
    fill: theme.palette.primary.main,
  },
  toPressFirst: {
    fill: theme.palette.primary.dark,
  },
  toPressSecond: {
    fill: theme.palette.primary.light,
  },
  secondary: {
    fill: cyan[500],
  },
  missed: {
    stroke: orange[500],
  },
  error: {
    stroke: theme.palette.error.main,
  },
  correct: {
    stroke: green[500],
  },
})

function mapObject(object, callback) {
  return Object.keys(object).map(key => callback(key, object[key]))
}

function KeyboardKey(props) {
  // console.log(props)
  const {
    classes,
    to,
    shift,
    iso,
    state,
    priority,
    transform,
    displayedLevel,
    x,
    y,
  } = props

  const {
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

  // When letters on a case pair are associated with a key, only the capital character need to be shown on the keytop for the primary group, while the lowercase character only is shown for the secondary group.
  let alphabet
  if (to.toString().toUpperCase() === shift) {
    alphabet = true
  }
  const toWrite = state === 'toWrite'
  const toPressFirst = state === 'toPressFirst'
  const toPressSecond = state === 'toPressSecond'

  let width = keyWidth - keyPaddingX * 2
  const height = keyHeight - keyPaddingY * 2

  let translate = 'none'

  const keyClass = classNames(
    'key',
    iso,
    classes.key,
  )
  const keyBgClass = classNames(
    classes.keyBg,
    {
      [classes.missed]: state === 'missed',
      [classes.correct]: state === 'correct',
      [classes.error]: state === 'error',
      [classes.secondary]: priority === 'secondary',
      [classes.alphabet]: alphabet,
      [classes.toWrite]: toWrite,
      [classes.toPressFirst]: toPressFirst,
      [classes.toPressSecond]: toPressSecond,
    },
  )
  const labelClass = classNames(
    classes.label,
    {
      [classes.labelToWrite]: toWrite,
    },
  )

  switch (iso) {
  case 'E13': // Backspace
    width = keyWidth * 2 - keyPaddingX * 2
    translate = props.translate || `translate(${keyWidth * 13}, 0)`
    break

  case 'C00': // CapsLock
    width = keyWidth + cRowShift - keyPaddingX * 2
    translate = props.translate || `translate(0, ${keyHeight * 2})`
    break

  case 'D00': // Tab
    width = keyWidth + dRowShift - keyPaddingX * 2
    translate = props.translate || `translate(0, ${keyHeight})`
    break

  case 'B99': // Left Shift
    width = bRowShift - keyPaddingX * 2
    translate = props.translate || `translate(0, ${keyHeight * 3})`
    break

  case 'B13': // Right Shift
    width = (keyWidth * 3 - bRowShift) - keyPaddingX * 2
    translate = props.translate || `translate(${bRowShift + keyWidth * 12}, ${keyHeight * 3})`
    break

  case 'A99': // Left Ctrl
    width = bRowShift - keyPaddingX * 2
    translate = props.translate || `translate(0, ${keyHeight * 4})`
    break

  case 'A00': // fn
    translate = props.translate || `translate(${aRowShift}, ${keyHeight * 4})`
    break

  case 'A01': // left Command
    translate = props.translate || `translate(${aRowShift + keyWidth}, ${keyHeight * 4})`
    break

  case 'A02': // Alt
    translate = props.translate || `translate(${aRowShift + keyWidth * 2}, ${keyHeight * 4})`
    break

  case 'A08': // AltGr
    translate = props.translate || `translate(${aRowShift + keyWidth * 8}, ${keyHeight * 4})`
    break

  case 'A09': // right Command
    translate = props.translate || `translate(${aRowShift + keyWidth * 9}, ${keyHeight * 4})`
    break

  case 'A11': // Menu
    translate = props.translate || `translate(${aRowShift + keyWidth * 11}, ${keyHeight * 4})`
    break

  case 'A12': // Right Ctrl
    width = (keyWidth * 3 - bRowShift) - keyPaddingX * 2
    translate = props.translate || `translate(${bRowShift + keyWidth * 12}, ${keyHeight * 4})`
    break

  case 'A03': // Space (A03 to A07)
    return (
      <g className={keyClass}>
        <rect
          className={keyBgClass}
          x={x + keyPaddingX}
          y={y + keyPaddingY}
          width={keyWidth * 5 - keyPaddingX * 2}
          height={height}
          rx={rX}
          ry={rY}
        />
      </g>
    )
  default:
    break
  }

  if (props.name === 'enter') {
    // for Enter
    const leftD = dRowShift
    let leftC = cRowShift
    const right = keyWidth * 2
    const bottom = keyHeight * 2
    translate = props.translate || `translate(${keyWidth * 13}, ${keyHeight})`

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

    leftC = cRowShift - keyWidth
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

    switch (props.variant) {
    case 1:
      /* shape:
          xx
          -x
      */
      return (
        <g className={keyClass} transform={translate}>
          <path className={keyBgClass} d={enterPath} />
          <g className={classes.labels}>
            <text className={labelClass} x="160" y="140">{to}</text>
          </g>
        </g>
      )

    case 2:
      /* shape:
          --
          xx
      */
      return (
        <g className={keyClass} transform={`translate(${cRowShift + keyWidth * 12}, ${keyHeight * 2})`}>
          <rect
            className={keyBgClass}
            x={x + keyPaddingX}
            y={y + keyPaddingY}
            width={(keyWidth * 3 - cRowShift) - keyPaddingX * 2}
            height={height}
            rx={rY}
            ry={rY}
          />
          <g className={classes.labels}>
            <text className={labelClass} x="30" y="80">{to}</text>
          </g>
        </g>
      )

    case 3:
      /* shape:
          xx
          --
      */
      return (
        <g className={keyClass} transform={`translate(${dRowShift + keyWidth * 12}, ${keyHeight})`}>
          <rect
            className={keyBgClass}
            x={x + keyPaddingX}
            y={y + keyPaddingY}
            width={(keyWidth * 3 - dRowShift) - keyPaddingX * 2}
            height={height}
            rx={rY}
            ry={rY}
          />
          <g className={classes.labels}>
            <text className={labelClass} x="30" y="80">{to}</text>
          </g>
        </g>
      )

    default: // 4
      /* shape:
          -x
          xx
      */
      return (
        <g className={keyClass} transform={translate}>
          <path className={keyBgClass} d={enterPath2} />
          <g className={classes.labels}>
            <text className={labelClass} x="120" y="140">{to}</text>
          </g>
        </g>
      )
    }
  }

  return (
    <g
      className={keyClass}
      textAnchor="middle"
      transform={translate}
    >
      <rect
        className={keyBgClass}
        x={x + keyPaddingX}
        y={y + keyPaddingY}
        width={width}
        height={height}
        rx={rY}
        ry={rY}
      />
      {
        displayedLevel
        && (
          <g className={classes.labels}>
            <text
              className={labelClass}
              dangerouslySetInnerHTML={{ __html: props[displayedLevel] }}
              x={x + keyLabelX}
              y={y + keyLabelY + 10}
            />
          </g>
        )
      }
      {
        transform && <text className={classes.labelTransform} dangerouslySetInnerHTML={{ __html: transform }} />
      }
    </g>
  )
}

export default withStyles(styles)(KeyboardKey)
