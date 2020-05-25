import classNames from 'classnames';
import React, { forwardRef } from 'react';

import variables from '../../theme/variables';
import { Level, Key } from '../../types';

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

export type KeyboardKeyProps = Key & {
  displayedLevel: Level;
  label?: string;
  width?: number;
  height?: number;
  x: number;
  y: number;
};

const KeyboardKey = forwardRef((props: KeyboardKeyProps, ref) => {
  // console.log(props)
  const {
    Shift,
    code,
    dead,
    displayedLevel,
    enterPath,
    height,
    iso,
    label,
    layout,
    marker,
    pressure,
    succeedState,
    to,
    width,
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
  if (to && to.toString().toUpperCase() === Shift) {
    alphabet = true;
  }

  // TODO - make Enter iso constant
  const uncovered = !label && !props[displayedLevel];

  const keyClass = classNames('key', iso, code, {
    ['key--missed']: succeedState === 'missed',
    ['key--correct']: succeedState === 'correct',
    ['key--error']: succeedState === 'error',
    ['key--alphabet']: alphabet,
    ['key--toPressFirst']: marker === 'toPressFirst',
    ['key--toPressSecond']: marker === 'toPressSecond',
    ['key--uncovered']: uncovered,
    ['key--pressed']: pressure === 'pressed',
    ['key--locked']: pressure === 'locked',
    ['key--dead']: dead,
  });
  const keyShadowClass = classNames('key__shadow');
  const keyBgClass = classNames('key__keyBg');
  const labelClass = classNames('key__label');

  // TODO - define Enter variant

  if (iso === 'C13') {
    if (layout === '101/104-Variant' || layout === '103/106-KS') {
      return (
        <>
          <path className={keyShadowClass} d={enterPath} />
          <g className={keyClass}>
            <path ref={ref} className={keyBgClass} d={enterPath} />
            <g className={'key__labels'}>
              <text
                className={labelClass}
                x={dRowShift + keyWidth * 14}
                y={keyHeight * 2 + 60}
              >
                {label}
              </text>
            </g>
          </g>
        </>
      );
    } else if (layout === '101/104-ANSI') {
      /* shape:
          --
          xx
      */
      return (
        <>
          <rect
            className={keyShadowClass}
            width={keyWidth * 3 - cRowShift - keyPaddingX * 2}
            height={height}
            x={x - keyWidth + keyPaddingX}
            y={y + keyPaddingY}
            rx={rX}
            ry={rY}
          />
          <g className={keyClass}>
            <rect
              ref={ref}
              className={keyBgClass}
              width={keyWidth * 3 - cRowShift - keyPaddingX * 2}
              height={height}
              x={x - keyWidth + keyPaddingX}
              y={y + keyPaddingY}
              rx={rX}
              ry={rY}
            />
            <g className={'key__labels'}>
              <text
                className={labelClass}
                x={cRowShift + keyWidth * 12 + 170}
                y={keyHeight * 2 + 70}
              >
                {label}
              </text>
            </g>
          </g>
        </>
      );
    } else {
      /* shape:
          xx
          -x
      */

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
                {label}
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
        x={x + keyPaddingX}
        y={y + keyPaddingY}
        width={width}
        height={height}
        rx={rX}
        ry={rY}
      />
      <g ref={ref} className={keyClass} textAnchor="middle">
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
          <g className={'key__labels'}>
            <text
              className={labelClass}
              dangerouslySetInnerHTML={{
                __html: props[displayedLevel] || label || '?',
              }}
              x={x + keyLabelX}
              y={y + keyLabelY + 10}
            />
          </g>
        )}
      </g>
    </>
  );
});

export default KeyboardKey;
