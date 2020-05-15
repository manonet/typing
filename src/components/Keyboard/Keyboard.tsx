import Tippy, { useSingleton } from '@tippyjs/react';
import classNames from 'classnames';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import React from 'react';

import variables from '../../theme/variables';
import { ISOFingers } from '../../types';
import KeyboardKey from '../KeyboardKey';

import './Keyboard.scss';

type Props = {
  classes?: string;
  className?: string;
  displayedLevel: string;
  functionKeys: [];
  isoToHandFingers: ISOFingers;
  keyboard: [];
  showDeadKeys?: boolean;
  showTitle?: boolean;
};

function Keyboard(props: Props) {
  /*
  KeyboardTitle() {
    const { showTitle, keyboard } = this.props;
    if (showTitle === true) {
      return <h3 className="keyboard__title">{keyboard.name}</h3>;
    }
  }

  KeyboardDeadKeys() {
    const { showDeadKeys, keyboard } = this.props;
    if (showDeadKeys === true) {
      return <p dangerouslySetInnerHTML={{ __html: keyboard.allChars }} />;
    }
  }
  */

  const {
    className,
    displayedLevel,
    functionKeys,
    isoToHandFingers,
    keyboard,
  } = props;
  // console.log("keyboard", keyboard)
  // console.log("keys", keyboardKeys)

  if (!keyboard.keys) {
    return null;
  }

  const intl = useIntl();

  const [source, target] = useSingleton({
    overrides: ['placement'],
  });
  const { keys } = keyboard;

  const {
    aRowShift,
    bRowShift,
    cRowShift,
    dRowShift,
    keyHeight,
    keyWidth,
    keyboardHeight,
    keyboardWidth,
    rX,
    rY,
  } = variables;

  return (
    <div className={classNames(className, 'keyboard')}>
      {/* {this.KeyboardTitle()}
      {this.KeyboardDeadKeys()} */}

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
        {Object.keys(keys).map((iso) => {
          if (!keys[iso].to) {
            return;
          }

          const rowLetter = iso.substring(0, 1);
          const column = parseInt(iso.substring(1, 3), 10);

          let translateX = keyWidth * column;
          let translateY = 0;

          switch (rowLetter) {
            case 'D':
              translateX = dRowShift + keyWidth * column;
              translateY = keyHeight;
              break;
            case 'C':
              translateX = cRowShift + keyWidth * column;
              translateY = keyHeight * 2;
              break;
            case 'B':
              translateX = bRowShift + keyWidth * column;
              translateY = keyHeight * 3;
              break;
            case 'A':
              translateX = aRowShift + keyWidth * column;
              translateY = keyHeight * 4;
              break;
            default:
              break;
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
                        id: `typing.hand.${isoToHandFingers.keys[iso].hand}`,
                      }),
                      finger: intl.formatMessage({
                        id: `typing.finger.${isoToHandFingers.keys[iso].finger}`,
                      }),
                    }}
                  />
                </>
              }
            >
              <KeyboardKey
                displayedLevel={displayedLevel}
                iso={iso}
                {...keys[iso]}
                x={translateX}
                y={translateY}
                width={keyWidth}
                height={keyWidth}
                rx={rY}
                ry={rY}
              />
            </Tippy>
          );
        })}
        ;
        {Object.keys(functionKeys).map((iso) => (
          <Tippy
            key={iso}
            singleton={target}
            content={
              <>
                <FormattedMessage
                  id="typing.hand.finger"
                  values={{
                    hand: intl.formatMessage({
                      id: `typing.hand.${isoToHandFingers.keys[iso].hand}`,
                    }),
                    finger: intl.formatMessage({
                      id: `typing.finger.${isoToHandFingers.keys[iso].finger}`,
                    }),
                  }}
                />
              </>
            }
          >
            <KeyboardKey
              key={iso}
              displayedLevel="to"
              iso={iso}
              {...functionKeys[iso]}
              x={0}
              y={0}
              width={keyWidth}
              height={keyWidth}
              rx={rY}
              ry={rY}
            />
          </Tippy>
        ))}
      </svg>
    </div>
  );
}

export default Keyboard;

/*
The harmonized 48 graphic key keyboard arrangement
Keyboards which comply to this narrower specification contain all the keys shown in white in the figure above, the key at C12 shown in yellow, and one of the two keys at E13 and B00 shown in red. The standard does not require this; it only says that keyboards complying to this narrower specification can be called such.
In fact, several layouts (e. g. the US layout), to allow a wider return key, have a key at D13 (shown in green) instead of C12 (shown in yellow). Thus, while they cannot be called “harmonized 48 graphic key keyboards” according to the standard, they still comply to the standard itself. It is to be noted that ISO/IEC 9995-3:2010, in referring to the basic layout within its specific scope, does take a possible substitution of C12 by D13 into account.
*/
