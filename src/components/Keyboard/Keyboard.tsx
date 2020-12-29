import Tippy, { useSingleton } from '@tippyjs/react';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import React from 'react';

import { KeyboardKey } from '@components';
import variables from '@theme/variables';
import { Level, Key, Layout, OS } from '@types';

import getEnterPath from './getEnterPath';

type Props = {
  className?: string;
  displayedLevel: Level;
  keys: Key[];
  layout: Layout;
  os: OS;
};

export default function Keyboard(props: Props) {
  const { className, displayedLevel, keys, layout, os } = props;

  if (!(Array.isArray(keys) && keys.length)) {
    return null;
  }

  const enterPath = getEnterPath({ layout });

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

  return (
    <div
      className={classNames(className, 'keyboard', os.name, `layout-${layout}`)}
    >
      {/* This is the tippy that gets used as the singleton */}
      <Tippy
        className="keyInfo"
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
          const to = key.keyTops && key.keyTops['to']?.label;

          const rowLetter = iso.substring(0, 1);
          const column = parseInt(iso.substring(1, 3), 10);

          let calculatedX = keyWidth * column;
          let calculatedY = 0;
          let calculatedWidth = keyWidth - keyPaddingX * 2;
          let calculatedHeight = keyHeight - keyPaddingX * 2;
          let title = to
            ? to
            : intl.formatMessage({
                id: 'typing.key.unexplored',
              });

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
              title = intl.formatMessage({
                id: 'keyboard.key.backspace',
                defaultMessage: 'Backspace',
              });
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
              title = intl.formatMessage({
                id: 'keyboard.key.capslock',
                defaultMessage: 'Caps Lock',
              });
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
              title = intl.formatMessage({
                id: 'keyboard.key.tab',
                defaultMessage: 'Tab',
              });
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
              title = intl.formatMessage({
                id: 'keyboard.key.shift',
                defaultMessage: 'Shift',
              });
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
              title = intl.formatMessage({
                id: 'keyboard.key.shift',
                defaultMessage: 'Shift',
              });
              calculatedWidth = keyWidth * 3 - bRowShift - keyPaddingX * 2;
              calculatedX = bRowShift + keyWidth * 12;
              calculatedY = keyHeight * 3;

              if (!(layout === '104/107-ABNT' || layout === '106/109-JIS')) {
                calculatedWidth = keyWidth * 4 - bRowShift - keyPaddingX * 2;
                calculatedX = bRowShift + keyWidth * 11;
              }
              break;

            case 'A99': // ControlLeft
              title = intl.formatMessage({
                id: 'keyboard.key.control',
                defaultMessage: 'Control',
              });
              calculatedWidth = bRowShift - keyPaddingX * 2;
              calculatedX = 0;
              calculatedY = keyHeight * 4;
              break;

            case 'A00': // fn, WakeUp
              title = intl.formatMessage({
                id: 'keyboard.key.fn',
                defaultMessage: 'Function',
              });
              calculatedX = aRowShift;
              calculatedY = keyHeight * 4;
              break;

            case 'A01': // OSLeft
              title = intl.formatMessage({
                id: 'keyboard.key.os',
                defaultMessage: 'Super-key',
              });
              calculatedX = aRowShift + keyWidth;
              calculatedY = keyHeight * 4;
              break;

            case 'A02': // AltLeft
              title = intl.formatMessage({
                id: 'keyboard.key.alt',
                defaultMessage: 'Alt',
              });
              calculatedX = aRowShift + keyWidth * 2;
              calculatedY = keyHeight * 4;
              break;

            case 'A08': // AltRight
              title = intl.formatMessage({
                id: 'keyboard.key.altgr',
                defaultMessage: 'Alt Graph',
              });
              calculatedX = aRowShift + keyWidth * 8;
              calculatedY = keyHeight * 4;
              break;

            case 'A10': // OSRight
              title = intl.formatMessage({
                id: 'keyboard.key.os',
                defaultMessage: 'Super-key',
              });
              calculatedX = aRowShift + keyWidth * 9;
              calculatedY = keyHeight * 4;
              break;

            case 'A11': // Menu
              title = intl.formatMessage({
                id: 'keyboard.key.menu',
                defaultMessage: 'Context Menu',
              });
              calculatedX = aRowShift + keyWidth * 11;
              calculatedY = keyHeight * 4;
              break;

            case 'A12': // ControlRight
              title = intl.formatMessage({
                id: 'keyboard.key.control',
                defaultMessage: 'Control',
              });
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
              title = intl.formatMessage({
                id: 'keyboard.key.space',
                defaultMessage: 'Space',
              });
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
              title = intl.formatMessage({
                id: 'keyboard.key.space',
                defaultMessage: 'Space',
              });
              calculatedWidth = keyWidth * 2 - keyPaddingX * 2;
              calculatedX = aRowShift + keyWidth * 4;
            }
          }

          if (!(layout === '103/106-KS' || layout === '106/109-JIS')) {
            if (code === 'Space') {
              // Space (A03 to A07) no label
              title = intl.formatMessage({
                id: 'keyboard.key.space',
                defaultMessage: 'Space',
              });
              calculatedX = aRowShift + keyWidth * 3;
              calculatedWidth = keyWidth * 5 - keyPaddingX * 2;
            }
          }

          if (code === 'Enter') {
            title = intl.formatMessage({
              id: 'keyboard.key.enter',
              defaultMessage: 'Enter',
            });
          }

          return (
            <Tippy
              key={iso}
              singleton={target}
              content={
                <>
                  <div className="keyInfo__title">{title}</div>
                  <div className="keyInfo__content">
                    <div className="keyInfo__left">
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
                    </div>

                    <div className="keyInfo__right">
                      {key.keyTops && (
                        <ul className="keyInfo__glyphs">
                          {key.keyTops &&
                            Object.keys(key.keyTops).map(function (
                              keyTop,
                              index
                            ) {
                              if (keyTop === 'to') return;
                              return (
                                <li key={keyTop}>
                                  {keyTop}
                                  {': '}
                                  {/* @ts-ignore */}
                                  <span>{key.keyTops[keyTop].label}</span>
                                </li>
                              );
                            })}
                        </ul>
                      )}
                    </div>
                  </div>
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
