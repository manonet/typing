import Tippy, { useSingleton } from '@tippyjs/react';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import React from 'react';
import { connect } from 'react-redux';

import { State as ReduxState } from '../../reducers';
import variables from '../../theme/variables';
import { Keyboard as KeyboardProps } from '../../types';
import KeyboardKey from '../KeyboardKey';

import './Keyboard.scss';

type Props = KeyboardProps & {
  className?: string;
};

function Keyboard(props: Props) {
  const { className, displayedLevel, keys, layout, os } = props;

  if (!(keys && keys.length)) {
    return null;
  }

  const intl = useIntl();

  const [source, target] = useSingleton({
    overrides: ['placement'],
  });

  const {
    aRowShift,
    bRowShift,
    cRowShift,
    dRowShift,
    keyHeight,
    keyPaddingX,
    keyPaddingY,
    keyWidth,
    keyboardHeight,
    keyboardWidth,
    rX,
    rY,
  } = variables;

  // for Enter
  const leftD = dRowShift + keyWidth * 13;
  let leftC = cRowShift + keyWidth * 13;
  const right = keyWidth * 2 + keyWidth * 13;
  const top = keyHeight;
  const bottom = keyHeight * 3;

  let enterPath = '';
  if (layout === '101/104-Variant' || layout === '103/106-KS') {
    // 3
    /* shape:
          -x
          xx
      */

    leftC = leftC - keyWidth;
    enterPath = `M${leftD + keyPaddingX} ${rY + top + keyPaddingY}\
      A ${rX} ${rY}, 0, 0, 1, ${leftD + rX + keyPaddingX} ${top + keyPaddingY}\
      L ${right - rX - keyPaddingX} ${top + keyPaddingY}\
      A ${rX} ${rY}, 0, 0, 1, ${right - keyPaddingX} ${rY + top + keyPaddingY}\
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
  } else if (layout !== '101/104-ANSI') {
    enterPath = `M${leftD + keyPaddingX} ${rY + top + keyPaddingY}\
    A ${rX} ${rY}, 0, 0, 1, ${leftD + rX + keyPaddingX} ${top + keyPaddingY}\
    L ${right - rX - keyPaddingX} ${top + keyPaddingY}\
    A ${rX} ${rY}, 0, 0, 1, ${right - keyPaddingX} ${top + rY + keyPaddingY}\
    L ${right - keyPaddingX} ${bottom - rY - keyPaddingY}\
    A ${rX} ${rY}, 0, 0, 1, ${right - rX - keyPaddingX} ${bottom - keyPaddingY}\
    L ${leftC + rX + keyPaddingX} ${bottom - keyPaddingY}\
    A ${rX} ${rY}, 0, 0, 1, ${leftC + keyPaddingX} ${bottom - rY - keyPaddingY}\
    L ${leftC + keyPaddingX} ${top + keyHeight + rY - keyPaddingY}\
    A ${rX} ${rY}, 0, 0, 0, ${leftC - rX + keyPaddingX} ${
      top + keyHeight - keyPaddingY
    }\
    L ${leftD + rX + keyPaddingX} ${top + keyHeight - keyPaddingY}\
    A ${rX} ${rY}, 0, 0, 1, ${leftD + keyPaddingX} ${
      top + keyHeight - rY - keyPaddingY
    }\
    L ${leftD + keyPaddingX} ${top + rY + keyPaddingY} Z`;
  }

  return (
    <div
      className={classNames(className, 'keyboard', os.name, `layout-${layout}`)}
    >
      {/* This is the tippy that gets used as the singleton */}
      <Tippy
        singleton={source}
        delay={500}
        moveTransition={'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'}
      />
      <svg
        className="keyboard__svg"
        version="1.1"
        viewBox={`0 0 ${keyboardWidth} ${keyboardHeight}`}
        textAnchor="middle"
      >
        {keys.map((key) => {
          const { code, finger, hand, iso } = key;

          const rowLetter = iso.substring(0, 1);
          const column = parseInt(iso.substring(1, 3), 10);

          let calculatedX = keyWidth * column;
          let calculatedY = 0;
          let calculatedWidth = keyWidth - keyPaddingX * 2;
          let calculatedHeight = keyHeight - keyPaddingX * 2;

          switch (rowLetter) {
            case 'D':
              calculatedX = dRowShift + keyWidth * column;
              calculatedY = keyHeight;
              break;
            case 'C':
              calculatedX = cRowShift + keyWidth * column;
              calculatedY = keyHeight * 2;
              break;
            case 'B':
              calculatedX = bRowShift + keyWidth * column;
              calculatedY = keyHeight * 3;
              break;
            case 'A':
              calculatedX = aRowShift + keyWidth * column;
              calculatedY = keyHeight * 4;
              break;
            default:
              break;
          }

          switch (iso) {
            case 'E14': // Backspace
              calculatedWidth = keyWidth - keyPaddingX * 2;
              calculatedX = keyWidth * 14;
              calculatedY = 0;
              if (
                !(
                  layout === '101/104-Variant' ||
                  layout === '103/106-KS' ||
                  layout === '106/109-JIS'
                )
              ) {
                calculatedWidth = keyWidth * 2 - keyPaddingX * 2;
                calculatedX = keyWidth * 13;
              }
              break;

            case 'E13': // IntlYen
              if (
                !(
                  layout === '101/104-Variant' ||
                  layout === '103/106-KS' ||
                  layout === '106/109-JIS'
                )
              ) {
                return;
              }
              break;

            case 'C00': // CapsLock
              calculatedWidth = keyWidth + cRowShift - keyPaddingX * 2;
              calculatedX = 0;
              calculatedY = keyHeight * 2;
              break;

            case 'C12': // Backslash
              if (
                !(
                  layout === '102/105-ISO' ||
                  layout === '104/107-ABNT' ||
                  layout === '106/109-JIS'
                )
              ) {
                return;
              }
              break;

            case 'D00': // Tab
              calculatedWidth = keyWidth + dRowShift - keyPaddingX * 2;
              calculatedX = 0;
              calculatedY = keyHeight;
              break;

            case 'D13':
              if (layout !== '101/104-ANSI') {
                return;
              }
              calculatedWidth = keyWidth * 2 - dRowShift - keyPaddingX * 2;
              break;

            case 'B99': // ShiftLeft
              calculatedWidth = bRowShift - keyPaddingX * 2;
              calculatedX = 0;
              calculatedY = keyHeight * 3;

              if (!(layout === '102/105-ISO' || layout === '104/107-ABNT')) {
                calculatedWidth = bRowShift + keyWidth - keyPaddingX * 2;
              }
              break;

            case 'B00': // IntlBackslash
              if (!(layout === '102/105-ISO' || layout === '104/107-ABNT')) {
                return;
              }
              break;

            case 'B11': // IntlRo
              if (!(layout === '104/107-ABNT' || layout === '106/109-JIS')) {
                return;
              }
              break;

            case 'B12': // ShiftRight
              calculatedWidth = keyWidth * 3 - bRowShift - keyPaddingX * 2;
              calculatedX = bRowShift + keyWidth * 12;
              calculatedY = keyHeight * 3;

              if (!(layout === '104/107-ABNT' || layout === '106/109-JIS')) {
                calculatedWidth = keyWidth * 4 - bRowShift - keyPaddingX * 2;
                calculatedX = bRowShift + keyWidth * 11;
              }
              break;

            case 'A99': // ControlLeft
              calculatedWidth = bRowShift - keyPaddingX * 2;
              calculatedX = 0;
              calculatedY = keyHeight * 4;
              break;

            case 'A00': // fn, WakeUp
              calculatedX = aRowShift;
              calculatedY = keyHeight * 4;
              break;

            case 'A01': // OSLeft
              calculatedX = aRowShift + keyWidth;
              calculatedY = keyHeight * 4;
              break;

            case 'A02': // AltLeft
              calculatedX = aRowShift + keyWidth * 2;
              calculatedY = keyHeight * 4;
              break;

            case 'A08': // AltRight
              calculatedX = aRowShift + keyWidth * 8;
              calculatedY = keyHeight * 4;
              break;

            case 'A10': // OSRight
              calculatedX = aRowShift + keyWidth * 9;
              calculatedY = keyHeight * 4;
              break;

            case 'A11': // Menu
              calculatedX = aRowShift + keyWidth * 11;
              calculatedY = keyHeight * 4;
              break;

            case 'A12': // ControlRight
              calculatedWidth = keyWidth * 3 - bRowShift - keyPaddingX * 2;
              calculatedX = aRowShift + keyWidth * 12;
              calculatedY = keyHeight * 4;
              break;

            default:
              break;
          }

          if (layout !== '103/106-KS') {
            if (code === 'Lang2' || code === 'Lang1') {
              return;
            }
          } else {
            if (code === 'Space') {
              calculatedWidth = keyWidth * 3 - keyPaddingX * 2;
              calculatedX = aRowShift + keyWidth * 4;
            }
          }

          if (layout !== '106/109-JIS') {
            if (
              code === 'NonConvert' ||
              code === 'Convert' ||
              code === 'KanaMode'
            ) {
              return;
            }
          } else {
            if (code === 'Space') {
              calculatedWidth = keyWidth * 2 - keyPaddingX * 2;
              calculatedX = aRowShift + keyWidth * 4;
            }
          }

          if (!(layout === '103/106-KS' || layout === '106/109-JIS')) {
            if (code === 'Space') {
              // Space (A03 to A07) no label
              calculatedX = aRowShift + keyWidth * 3;
              calculatedWidth = keyWidth * 5 - keyPaddingX * 2;
            }
          }

          return (
            <Tippy
              key={iso}
              singleton={target}
              content={
                <>
                  <FormattedMessage
                    id="typing.hand.finger"
                    values={{
                      hand: intl.formatMessage({
                        id: `typing.hand.${hand}`,
                      }),
                      finger: intl.formatMessage({
                        id: `typing.finger.${finger}`,
                      }),
                    }}
                  />
                </>
              }
            >
              <KeyboardKey
                {...key}
                x={calculatedX}
                y={calculatedY}
                width={calculatedWidth}
                height={calculatedHeight}
                displayedLevel={displayedLevel}
                layout={layout}
                enterPath={iso === 'C13' ? enterPath : undefined}
              />
            </Tippy>
          );
        })}
        ;
      </svg>
    </div>
  );
}

const mapStateToProps = (state: ReduxState) => {
  const { typing } = state;
  return {
    displayedLevel: typing.displayedLevel,
    keys: typing.keys,
    os: typing.os,
    layout: typing.layout,
  };
};

export default connect(mapStateToProps, null)(Keyboard);
