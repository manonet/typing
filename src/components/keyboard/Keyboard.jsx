import React from 'react';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';

import KeyboardKey from './KeyboardKey';
import './Keyboard.css';

const styles = (theme) => ({
  keyboard: {
    borderRadius: theme.keyboard.rX,
  },
});

class Keyboard extends React.Component {
  componentDidMount() {
    //
  }

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

  render() {
    const {
      theme,
      classes,
      keyboard,
      className,
      functionKeys,
      displayedLevel,
    } = this.props;
    // console.log("keyboard", keyboard)
    // console.log("keys", keyboardKeys)

    if (!keyboard.keys) {
      return null;
    }

    const { keys } = keyboard;

    const {
      keyboardWidth,
      keyboardHeight,
      keyWidth,
      keyHeight,
      aRowShift,
      bRowShift,
      cRowShift,
      dRowShift,
      rX,
      rY,
    } = theme.keyboard;

    return (
      <div className={classNames(className, classes.keyboard)}>
        {this.KeyboardTitle()}
        {this.KeyboardDeadKeys()}
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
              <KeyboardKey
                key={iso}
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
            );
          })}
          ;
          {Object.keys(functionKeys).map((iso) => (
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
          ))}
        </svg>
      </div>
    );
  }
}

export default withTheme(withStyles(styles)(Keyboard));

/*
The harmonized 48 graphic key keyboard arrangement
Keyboards which comply to this narrower specification contain all the keys shown in white in the figure above, the key at C12 shown in yellow, and one of the two keys at E13 and B00 shown in red. The standard does not require this; it only says that keyboards complying to this narrower specification can be called such.
In fact, several layouts (e. g. the US layout), to allow a wider return key, have a key at D13 (shown in green) instead of C12 (shown in yellow). Thus, while they cannot be called “harmonized 48 graphic key keyboards” according to the standard, they still comply to the standard itself. It is to be noted that ISO/IEC 9995-3:2010, in referring to the basic layout within its specific scope, does take a possible substitution of C12 by D13 into account.
*/
