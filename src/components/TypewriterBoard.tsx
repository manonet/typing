import React from 'react';
import classNames from 'classnames';
import { withStyles, Theme } from '@material-ui/core/styles';

import SampleBoard, { SAMPLE_BOARD_ID } from './SampleBoard';
import Keyboard from './keyboard/Keyboard';

type Props = {
  classes?: Record<keyof typeof styles, string>;
  className?: string;
  sampleText: string;
  userText: string;
  cursorAt: number;
  signToWrite: string;
  writtenSign: string;
  displayedLevel: string;
  keyboard: [];
  keyboardKeys: [];
  functionKeys: [];
  setUserInputFocus: (focus: boolean) => {};
  userInputText: (value: string) => {};
};

const styles = (theme: Theme) => ({
  root: {
    position: 'relative',
  },
  keyboard: {
    maxHeight: 'calc(100vh - 160px)',
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
  },
});

class TypewriterBoard extends React.Component<Props> {
  handleChangeRef = this.handleChange.bind(this);
  onFocusRef = this.onFocus.bind(this);
  onBlurRef = this.onBlur.bind(this);

  componentDidMount() {
    // set focus on input
    const userText = document.querySelector(`#${SAMPLE_BOARD_ID}`);
    // console.log(userText)
    if (userText) {
      // TODO - change it to React.forwardRef or something
      // https://reactjs.org/docs/forwarding-refs.html
      // https://stackoverflow.com/questions/40080742/how-to-get-refs-from-another-component-in-react-js
      // @ts-ignore
      userText.focus();
    }
  }

  onFocus(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { setUserInputFocus } = this.props;
    setUserInputFocus(true);
  }

  onBlur(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { setUserInputFocus } = this.props;
    setUserInputFocus(false);
  }

  handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { userInputText } = this.props;
    userInputText(e.target.value);
  }

  render() {
    const {
      classes,
      className,
      sampleText,
      userText,
      cursorAt,
      signToWrite,
      writtenSign,
      displayedLevel,
      keyboard,
      keyboardKeys,
      functionKeys,
    } = this.props;

    return (
      <div className={classNames(classes.root, className)}>
        <SampleBoard
          sampleText={sampleText}
          userText={userText}
          cursorAt={cursorAt}
          signToWrite={signToWrite}
          writtenSign={writtenSign}
          onChange={this.handleChangeRef}
          onFocus={this.onFocusRef}
          onBlur={this.onBlurRef}
          className={SAMPLE_BOARD_ID}
        />
        <Keyboard
          className={classes.keyboard}
          keyboard={keyboard}
          functionKeys={functionKeys}
          keyboardKeys={keyboardKeys}
          displayedLevel={displayedLevel}
        />
      </div>
    );
  }
}

export default withStyles(styles)(TypewriterBoard);
