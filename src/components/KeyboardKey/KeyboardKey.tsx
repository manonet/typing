import classNames from 'classnames';
import React, { forwardRef } from 'react';

import variables from '../../theme/variables';

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

export type KeyboardKeyProps = {
  to: string;
  shift: 'SHIFT';
  iso: string;
  succeedState: 'missed' | 'correct' | 'error';
  pressure: 'none' | 'pressed' | 'locked'; // locked is for CapsLock 'on' state
  marker: 'none' | 'toPressFirst' | 'toPressSecond';
  transform: string;
  displayedLevel: string;
  x: number;
  y: number;
};

const KeyboardKey = forwardRef((props: KeyboardKeyProps, ref) => {
  // console.log(props)
  const {
    displayedLevel,
    iso,
    marker,
    pressure,
    shift,
    succeedState,
    to,
    transform,
    x,
    y,
  } = props;

  const {
    aRowShift,
    bRowShift,
    cRowShift,
    dRowShift,
    keyHeight,
    keyLabelX,
    keyLabelY,
    keyPaddingX,
    keyPaddingY,
    keyWidth,
    rX,
    rY,
  } = variables;

  // When letters on a case pair are associated with a key, only the capital character need to be shown on the keytop for the primary group, while the lowercase character only is shown for the secondary group.
  let alphabet;
  if (to.toString().toUpperCase() === shift) {
    alphabet = true;
  }

  let width = keyWidth - keyPaddingX * 2;
  const height = keyHeight - keyPaddingY * 2;

  let calculatedX = 0;
  let calculatedY = 0;

  const keyClass = classNames('key', iso, {
    ['key--missed']: succeedState === 'missed',
    ['key--correct']: succeedState === 'correct',
    ['key--error']: succeedState === 'error',
    ['key--alphabet']: alphabet,
    ['key--toPressFirst']: marker === 'toPressFirst',
    ['key--toPressSecond']: marker === 'toPressSecond',
    ['key--pressed']: pressure === 'pressed',
    ['key--locked']: pressure === 'locked',
  });
  const keyShadowClass = classNames('key__shadow');
  const keyBgClass = classNames('key__keyBg');
  const labelClass = classNames('key__label');

  switch (iso) {
    case 'Backspace':
      width = keyWidth * 2 - keyPaddingX * 2;
      calculatedX = keyWidth * 13;
      calculatedY = 0;
      break;

    case 'CapsLock':
      width = keyWidth + cRowShift - keyPaddingX * 2;
      calculatedX = 0;
      calculatedY = keyHeight * 2;
      break;

    case 'Tab':
      width = keyWidth + dRowShift - keyPaddingX * 2;
      calculatedX = 0;
      calculatedY = keyHeight;
      break;

    case 'ShiftLeft':
      width = bRowShift - keyPaddingX * 2;
      calculatedX = 0;
      calculatedY = keyHeight * 3;
      break;

    case 'ShiftRight':
      width = keyWidth * 3 - bRowShift - keyPaddingX * 2;
      calculatedX = bRowShift + keyWidth * 12;
      calculatedY = keyHeight * 3;
      break;

    case 'ControlLeft':
      width = bRowShift - keyPaddingX * 2;
      calculatedX = 0;
      calculatedY = keyHeight * 4;
      break;

    case 'WakeUp': // fn
      calculatedX = aRowShift;
      calculatedY = keyHeight * 4;
      break;

    case 'OSLeft':
      calculatedX = aRowShift + keyWidth;
      calculatedY = keyHeight * 4;
      break;

    case 'AltLeft':
      calculatedX = aRowShift + keyWidth * 2;
      calculatedY = keyHeight * 4;
      break;

    case 'AltRight':
      calculatedX = aRowShift + keyWidth * 8;
      calculatedY = keyHeight * 4;
      break;

    case 'OSRight':
      calculatedX = aRowShift + keyWidth * 9;
      calculatedY = keyHeight * 4;
      break;

    case 'A11': // Menu
      calculatedX = aRowShift + keyWidth * 11;
      calculatedY = keyHeight * 4;
      break;

    case 'ControlRight':
      width = keyWidth * 3 - bRowShift - keyPaddingX * 2;
      calculatedX = aRowShift + keyWidth * 12;
      calculatedY = keyHeight * 4;
      break;

    case 'A03': // Space (A03 to A07) no label
      width = keyWidth * 5 - keyPaddingX * 2;
      break;

    default:
      break;
  }

  if (iso === 'Enter') {
    // for Enter
    const leftD = dRowShift + keyWidth * 13;
    let leftC = cRowShift + keyWidth * 13;
    const right = keyWidth * 2 + keyWidth * 13;
    const top = keyHeight;
    const bottom = keyHeight * 3;

    switch (props.variant) {
      case 1:
        /* shape:
          xx
          -x
      */
        const enterPath = `M${leftD + keyPaddingX} ${rY + top + keyPaddingY}\
     A ${rX} ${rY}, 0, 0, 1, ${leftD + rX + keyPaddingX} ${top + keyPaddingY}\
     L ${right - rX - keyPaddingX} ${top + keyPaddingY}\
     A ${rX} ${rY}, 0, 0, 1, ${right - keyPaddingX} ${top + rY + keyPaddingY}\
     L ${right - keyPaddingX} ${bottom - rY - keyPaddingY}\
     A ${rX} ${rY}, 0, 0, 1, ${right - rX - keyPaddingX} ${
          bottom - keyPaddingY
        }\
     L ${leftC + rX + keyPaddingX} ${bottom - keyPaddingY}\
     A ${rX} ${rY}, 0, 0, 1, ${leftC + keyPaddingX} ${
          bottom - rY - keyPaddingY
        }\
     L ${leftC + keyPaddingX} ${top + keyHeight + rY - keyPaddingY}\
     A ${rX} ${rY}, 0, 0, 0, ${leftC - rX + keyPaddingX} ${
          top + keyHeight - keyPaddingY
        }\
     L ${leftD + rX + keyPaddingX} ${top + keyHeight - keyPaddingY}\
     A ${rX} ${rY}, 0, 0, 1, ${leftD + keyPaddingX} ${
          top + keyHeight - rY - keyPaddingY
        }\
     L ${leftD + keyPaddingX} ${top + rY + keyPaddingY} Z`;

        return (
          <>
            <path className={keyShadowClass} d={enterPath} />
            <g className={keyClass}>
              <path ref={ref} className={keyBgClass} d={enterPath} />
              <g className={'key__labels'}>
                <text
                  className={labelClass}
                  x={cRowShift + keyWidth * 13 + 70}
                  y={keyHeight + 80}
                >
                  {to}
                </text>
              </g>
            </g>
          </>
        );

      case 2:
        /* shape:
          --
          xx
      */
        return (
          <>
            <rect
              className={keyShadowClass}
              x={cRowShift + keyWidth * 12 + x + keyPaddingX}
              y={keyHeight * 2 + y + keyPaddingY}
              width={keyWidth * 3 - cRowShift - keyPaddingX * 2}
              height={height}
              rx={rX}
              ry={rY}
            />
            <g className={keyClass}>
              <rect
                ref={ref}
                className={keyBgClass}
                x={cRowShift + keyWidth * 12 + x + keyPaddingX}
                y={keyHeight * 2 + y + keyPaddingY}
                width={keyWidth * 3 - cRowShift - keyPaddingX * 2}
                height={height}
                rx={rX}
                ry={rY}
              />
              <g className={'key__labels'}>
                <text
                  className={labelClass}
                  x={cRowShift + keyWidth * 12 + 170}
                  y={keyHeight * 2 + 70}
                >
                  {to}
                </text>
              </g>
            </g>
          </>
        );

      case 3:
        /* shape:
          xx
          --
      */
        return (
          <>
            <rect
              className={keyShadowClass}
              x={dRowShift + keyWidth * 12 + x + keyPaddingX}
              y={keyHeight + y + keyPaddingY}
              width={keyWidth * 3 - dRowShift - keyPaddingX * 2}
              height={height}
              rx={rX}
              ry={rY}
            />
            <g className={keyClass}>
              <rect
                ref={ref}
                className={keyBgClass}
                x={dRowShift + keyWidth * 12 + x + keyPaddingX}
                y={keyHeight + y + keyPaddingY}
                width={keyWidth * 3 - dRowShift - keyPaddingX * 2}
                height={height}
                rx={rX}
                ry={rY}
              />
              <g className={'key__labels'}>
                <text
                  className={labelClass}
                  x={dRowShift + keyWidth * 12 + 200}
                  y={keyHeight + 70}
                >
                  {to}
                </text>
              </g>
            </g>
          </>
        );

      default:
        // 4
        /* shape:
          -x
          xx
      */

        leftC = leftC - keyWidth;
        const enterPath2 = `M${leftD + keyPaddingX} ${rY + top + keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${leftD + rX + keyPaddingX} ${
          top + keyPaddingY
        }\
              L ${right - rX - keyPaddingX} ${top + keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${right - keyPaddingX} ${
          rY + top + keyPaddingY
        }\
              L ${right - keyPaddingX} ${bottom - rY - keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${right - rX - keyPaddingX} ${
          bottom - keyPaddingY
        }\
              L ${leftC + rX + keyPaddingX} ${bottom - keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${leftC + keyPaddingX} ${
          bottom - rY - keyPaddingY
        }\
              L ${leftC + keyPaddingX} ${top + keyHeight + rY + keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 1, ${leftC + rX + keyPaddingX} ${
          top + keyHeight + keyPaddingY
        }\
              L ${leftD - rX + keyPaddingX} ${keyHeight + top + keyPaddingY}\
              A ${rX} ${rY}, 0, 0, 0, ${leftD + keyPaddingX} ${
          top + keyHeight - rY + keyPaddingY
        }\
              L ${leftD + keyPaddingX} ${rY + top + keyPaddingY} Z`;

        return (
          <>
            <path className={keyShadowClass} d={enterPath2} />
            <g className={keyClass}>
              <path ref={ref} className={keyBgClass} d={enterPath2} />
              <g className={'key__labels'}>
                <text
                  className={labelClass}
                  x={dRowShift + keyWidth * 14}
                  y={keyHeight * 2 + 60}
                >
                  {to}
                </text>
              </g>
            </g>
          </>
        );
    }
  }

  return (
    <>
      <rect
        className={keyShadowClass}
        x={(x || calculatedX) + keyPaddingX}
        y={(y || calculatedY) + keyPaddingY}
        width={width}
        height={height}
        rx={rX}
        ry={rY}
      />
      <g ref={ref} className={keyClass} textAnchor="middle">
        <rect
          className={keyBgClass}
          x={(x || calculatedX) + keyPaddingX}
          y={(y || calculatedY) + keyPaddingY}
          width={width}
          height={height}
          rx={rX}
          ry={rY}
        />
        {displayedLevel && iso !== 'A03' && (
          <g className={'key__labels'}>
            <text
              className={labelClass}
              dangerouslySetInnerHTML={{ __html: props[displayedLevel] }}
              x={(x || calculatedX) + keyLabelX}
              y={(y || calculatedY) + keyLabelY + 10}
            />
          </g>
        )}
        {transform && (
          <text
            className={'key__labelTransform'}
            dangerouslySetInnerHTML={{ __html: transform }}
          />
        )}
      </g>
    </>
  );
});

export default KeyboardKey;
