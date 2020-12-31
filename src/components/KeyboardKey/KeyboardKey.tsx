import classNames from 'classnames';
import React, { forwardRef } from 'react';

import variables from '@theme/variables';
import { Level, Key, Layout } from '@types';

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
  enterPath?: string;
  label?: string;
  width?: number;
  height?: number;
  layout: Layout;
  x: number;
  y: number;
};

// FIXME replace any with proper ref types
const KeyboardKey = forwardRef<any, KeyboardKeyProps>(
  (
    {
      code,
      color,
      dead,
      displayedLevel,
      enterPath,
      height,
      iso,
      keyTops,
      label,
      layout,
      marker,
      pressure,
      succeedState,
      width,
      x,
      y,
    }: KeyboardKeyProps,
    ref
  ) => {
    const keyTop = keyTops && keyTops[displayedLevel];

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
    // let alphabet;

    const uncovered = !label && !keyTop?.label;

    const keyClass = classNames('key', iso, code, {
      ['key--missed']: succeedState === 'missed',
      ['key--correct']: succeedState === 'correct',
      ['key--error']: succeedState === 'error',
      ['key--toPressFirst']: marker === 'toPressFirst',
      ['key--toPressSecond']: marker === 'toPressSecond',
      ['key--toLearn']: keyTop?.toLearn,
      ['key--learned']: keyTop?.learned,
      ['key--uncovered']: uncovered,
      // toLearn + uncovered means toDiscover
      ['key--pressed']: pressure === 'pressed',
      ['key--locked']: pressure === 'locked',
      ['key--dead']: keyTop?.dead,
      // ['key--alphabet']: alphabet,
    });
    const keyShadowClass = classNames('key__shadow');
    const keyBgClass = classNames('key__keyBg');
    const labelClass = classNames('key__label');

    // overwrite color values
    let overwriteColor = color;
    // if (marker === 'toPressFirst') {
    //   overwriteColor = '#42c6ff';
    // }
    // if (pressure === 'pressed') {
    //   overwriteColor = '#15d1c6';
    // }
    // if (pressure === 'locked') {
    //   overwriteColor = '#37efba';
    // }
    // TODO - if key is colored by 'color' prop on keyboard, it overwrites css properties. it can be fixed here

    function renderBump() {
      const bumpWidth = (keyWidth - keyPaddingX * 2) / 3;
      const bumpHeight = (keyHeight - keyPaddingY * 2) / 15;

      // bump on F key
      if (iso === 'C04') {
        return (
          <rect
            className="key__bump"
            width={bumpWidth}
            height={bumpHeight}
            x={
              cRowShift +
              keyWidth * 4 +
              (keyPaddingY + (keyWidth - keyPaddingX * 2) / 3)
            }
            y={keyHeight * 3 - (keyPaddingY + 2 * bumpHeight)}
            rx={(keyHeight - keyPaddingY * 2) / 20}
            ry={(keyHeight - keyPaddingY * 2) / 20}
          />
        );
      }

      // bump on J key
      if (iso === 'C07') {
        return (
          <rect
            className="key__bump"
            width={bumpWidth}
            height={bumpHeight}
            x={
              cRowShift +
              keyWidth * 7 +
              (keyPaddingY + (keyWidth - keyPaddingX * 2) / 3)
            }
            y={keyHeight * 3 - (keyPaddingY + 2 * bumpHeight)}
            rx={(keyHeight - keyPaddingY * 2) / 20}
            ry={(keyHeight - keyPaddingY * 2) / 20}
          />
        );
      }
      return null;
    }

    if (iso === 'C13') {
      if (layout === '101/104-Variant' || layout === '103/106-KS') {
        return (
          <>
            <path className={keyShadowClass} d={enterPath} />
            <g className={keyClass}>
              <path
                ref={ref}
                className={keyBgClass}
                d={enterPath}
                style={{
                  fill: overwriteColor,
                }}
              />
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
                style={{
                  fill: overwriteColor,
                }}
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
              <path
                ref={ref}
                className={keyBgClass}
                d={enterPath}
                style={{
                  fill: overwriteColor,
                }}
              />
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
            style={{
              fill: overwriteColor,
            }}
          />
          {displayedLevel && (
            <g className={'key__labels'}>
              <text
                className={labelClass}
                dangerouslySetInnerHTML={{
                  __html: keyTop?.label || label || '?',
                }}
                x={x + keyLabelX}
                y={y + keyLabelY + 10}
              />
            </g>
          )}
          {(iso === 'C04' || iso === 'C07') && renderBump()}
        </g>
      </>
    );
  }
);

export default KeyboardKey;
