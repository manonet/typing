import React from 'react';
import classNames from 'classnames';
import {
  createStyles,
  makeStyles,
  Theme,
  withTheme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    key: {
      cursor: 'default',
    },
    labels: {
      // also called keytop
      // fill: theme.palette.grey[700],
      fontSize: 36,
    },
    labelTransform: {
      display: 'none',
    },
    label: {
      fill: theme.palette.grey[400],
    },
    labelToWrite: {
      fill: theme.palette.primary.contrastText,
    },
    keyBg: {
      stroke: theme.palette.grey[500],
      strokeWidth: 5,
      fill: theme.palette.grey[500],
    },
    alphabet: {
      // fill: orange[100],
    },
    toWrite: {
      fill: theme.palette.primary.main, // theme.palette.primary.main,
    },
    locked: {
      fill: theme.palette.green[300],
    },
    toPressFirst: {
      fill: theme.palette.primary.main,
    },
    toPressSecond: {
      fill: theme.palette.secondary.main,
    },
    pressed: {
      fill: theme.palette.teal[700],
    },
    missed: {
      stroke: theme.palette.red[800],
    },
    error: {
      stroke: theme.palette.orange[800],
    },
    correct: {
      stroke: theme.palette.green[800],
    },
  })
);

export type KeyboardThemeProps = {
  keyWidth: number;
  keyHeight: number;
  keyPaddingX: number;
  keyPaddingY: number;
  aRowShift: number;
  bRowShift: number;
  cRowShift: number;
  dRowShift: number;
  keyLabelX: number;
  keyLabelY: number;
  rX: number;
  rY: number;
};

export type ThemeProps = {
  keyboard: KeyboardThemeProps;
};

export type KeyboardKeyProps = {
  theme: ThemeProps;
  to: string;
  shift: 'SHIFT';
  iso: string;
  succeedState: 'missed' | 'correct' | 'error';
  pressure: 'none' | 'pressed' | 'locked'; // locked is for CapsLock 'on' state
  marker: 'none' | 'toPressFirst' | 'toPressSecond';
  transform: string;
  translate: string;
  displayedLevel: string;
  x: number;
  y: number;
};

function KeyboardKey(props: KeyboardKeyProps) {
  // console.log(props)
  const {
    theme,
    to,
    shift,
    iso,
    succeedState,
    pressure,
    marker,
    transform,
    displayedLevel,
    x,
    y,
  } = props;

  const {
    keyWidth,
    keyHeight,
    keyPaddingX,
    keyPaddingY,
    aRowShift,
    bRowShift,
    cRowShift,
    dRowShift,
    keyLabelX,
    keyLabelY,
    rX,
    rY,
  } = theme.keyboard;

  const classes = useStyles();

  // When letters on a case pair are associated with a key, only the capital character need to be shown on the keytop for the primary group, while the lowercase character only is shown for the secondary group.
  let alphabet;
  if (to.toString().toUpperCase() === shift) {
    alphabet = true;
  }
  const toWrite = marker === 'toPressFirst';

  let width = keyWidth - keyPaddingX * 2;
  const height = keyHeight - keyPaddingY * 2;

  let translate = 'none';

  const keyClass = classNames('key', iso, classes.key);
  const keyBgClass = classNames(classes.keyBg, {
    [classes.missed]: succeedState === 'missed',
    [classes.correct]: succeedState === 'correct',
    [classes.error]: succeedState === 'error',
    [classes.alphabet]: alphabet,
    [classes.toWrite]: toWrite,
    [classes.toPressFirst]: marker === 'toPressFirst',
    [classes.toPressSecond]: marker === 'toPressSecond',
    [classes.pressed]: pressure === 'pressed',
    [classes.locked]: pressure === 'locked',
  });
  const labelClass = classNames(classes.label, {
    [classes.labelToWrite]: toWrite,
  });

  switch (iso) {
    case 'Backspace':
      width = keyWidth * 2 - keyPaddingX * 2;
      translate = props.translate || `translate(${keyWidth * 13}, 0)`;
      break;

    case 'CapsLock':
      width = keyWidth + cRowShift - keyPaddingX * 2;
      translate = props.translate || `translate(0, ${keyHeight * 2})`;
      break;

    case 'Tab':
      width = keyWidth + dRowShift - keyPaddingX * 2;
      translate = props.translate || `translate(0, ${keyHeight})`;
      break;

    case 'ShiftLeft':
      width = bRowShift - keyPaddingX * 2;
      translate = props.translate || `translate(0, ${keyHeight * 3})`;
      break;

    case 'ShiftRight':
      width = keyWidth * 3 - bRowShift - keyPaddingX * 2;
      translate =
        props.translate ||
        `translate(${bRowShift + keyWidth * 12}, ${keyHeight * 3})`;
      break;

    case 'ControlLeft':
      width = bRowShift - keyPaddingX * 2;
      translate = props.translate || `translate(0, ${keyHeight * 4})`;
      break;

    case 'WakeUp': // fn
      translate =
        props.translate || `translate(${aRowShift}, ${keyHeight * 4})`;
      break;

    case 'OSLeft':
      translate =
        props.translate ||
        `translate(${aRowShift + keyWidth}, ${keyHeight * 4})`;
      break;

    case 'AltLeft':
      translate =
        props.translate ||
        `translate(${aRowShift + keyWidth * 2}, ${keyHeight * 4})`;
      break;

    case 'AltRight':
      translate =
        props.translate ||
        `translate(${aRowShift + keyWidth * 8}, ${keyHeight * 4})`;
      break;

    case 'OSRight':
      translate =
        props.translate ||
        `translate(${aRowShift + keyWidth * 9}, ${keyHeight * 4})`;
      break;

    case 'A11': // Menu
      translate =
        props.translate ||
        `translate(${aRowShift + keyWidth * 11}, ${keyHeight * 4})`;
      break;

    case 'ControlRight':
      width = keyWidth * 3 - bRowShift - keyPaddingX * 2;
      translate =
        props.translate ||
        `translate(${bRowShift + keyWidth * 12}, ${keyHeight * 4})`;
      break;

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
      );
    default:
      break;
  }

  if (iso === 'Enter') {
    // for Enter
    const leftD = dRowShift;
    let leftC = cRowShift;
    const right = keyWidth * 2;
    const bottom = keyHeight * 2;
    translate = props.translate || `translate(${keyWidth * 13}, ${keyHeight})`;

    const enterPath = `M${leftD + keyPaddingX} ${rY + keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${leftD +
      rX +
      keyPaddingX} ${keyPaddingY}\
              L ${right - rX - keyPaddingX} ${keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${right - keyPaddingX} ${rY +
      keyPaddingY}\
              L ${right - keyPaddingX} ${bottom - rY - keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${right - rX - keyPaddingX} ${bottom -
      keyPaddingY}\
              L ${leftC + rX + keyPaddingX} ${bottom - keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${leftC + keyPaddingX} ${bottom -
      rY -
      keyPaddingY}\
              L ${leftC + keyPaddingX} ${keyHeight + rY - keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 0, ${leftC - rX + keyPaddingX} ${keyHeight -
      keyPaddingY}\
              L ${leftD + rX + keyPaddingX} ${keyHeight - keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${leftD + keyPaddingX} ${keyHeight -
      rY -
      keyPaddingY}\
              L ${leftD + keyPaddingX} ${rY + keyPaddingY} Z`;

    leftC = cRowShift - keyWidth;
    const enterPath2 = `M${leftD + keyPaddingX} ${rY + keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${leftD +
      rX +
      keyPaddingX} ${keyPaddingY}\
              L ${right - rX - keyPaddingX} ${keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${right - keyPaddingX} ${rY +
      keyPaddingY}\
              L ${right - keyPaddingX} ${bottom - rY - keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${right - rX - keyPaddingX} ${bottom -
      keyPaddingY}\
              L ${leftC + rX + keyPaddingX} ${bottom - keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${leftC + keyPaddingX} ${bottom -
      rY -
      keyPaddingY}\
              L ${leftC + keyPaddingX} ${keyHeight + rY + keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${leftC + rX + keyPaddingX} ${keyHeight +
      keyPaddingY}\
              L ${leftD - rX + keyPaddingX} ${keyHeight + keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 0, ${leftD + keyPaddingX} ${keyHeight -
      rY +
      keyPaddingY}\
              L ${leftD + keyPaddingX} ${rY + keyPaddingY} Z`;

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
              <text className={labelClass} x="160" y="140">
                {to}
              </text>
            </g>
          </g>
        );

      case 2:
        /* shape:
          --
          xx
      */
        return (
          <g
            className={keyClass}
            transform={`translate(${cRowShift + keyWidth * 12}, ${keyHeight *
              2})`}
          >
            <rect
              className={keyBgClass}
              x={x + keyPaddingX}
              y={y + keyPaddingY}
              width={keyWidth * 3 - cRowShift - keyPaddingX * 2}
              height={height}
              rx={rX}
              ry={rY}
            />
            <g className={classes.labels}>
              <text className={labelClass} x="30" y="80">
                {to}
              </text>
            </g>
          </g>
        );

      case 3:
        /* shape:
          xx
          --
      */
        return (
          <g
            className={keyClass}
            transform={`translate(${dRowShift + keyWidth * 12}, ${keyHeight})`}
          >
            <rect
              className={keyBgClass}
              x={x + keyPaddingX}
              y={y + keyPaddingY}
              width={keyWidth * 3 - dRowShift - keyPaddingX * 2}
              height={height}
              rx={rX}
              ry={rY}
            />
            <g className={classes.labels}>
              <text className={labelClass} x="30" y="80">
                {to}
              </text>
            </g>
          </g>
        );

      default:
        // 4
        /* shape:
          -x
          xx
      */
        return (
          <g className={keyClass} transform={translate}>
            <path className={keyBgClass} d={enterPath2} />
            <g className={classes.labels}>
              <text className={labelClass} x="120" y="140">
                {to}
              </text>
            </g>
          </g>
        );
    }
  }

  return (
    <g className={keyClass} textAnchor="middle" transform={translate}>
      <rect
        className={keyBgClass}
        x={x + keyPaddingX}
        y={y + keyPaddingY}
        width={width}
        height={height}
        rx={rX}
        ry={rY}
      />
      {displayedLevel && (
        <g className={classes.labels}>
          <text
            className={labelClass}
            dangerouslySetInnerHTML={{ __html: props[displayedLevel] }}
            x={x + keyLabelX}
            y={y + keyLabelY + 10}
          />
        </g>
      )}
      {transform && (
        <text
          className={classes.labelTransform}
          dangerouslySetInnerHTML={{ __html: transform }}
        />
      )}
    </g>
  );
}

export default withTheme(KeyboardKey);
