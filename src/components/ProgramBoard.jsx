import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import SampleBoard, { SAMPLE_BOARD_ID } from './SampleBoard';
import Keyboard from './keyboard/Keyboard';

const styles = (theme) => ({
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

class ProgramBoard extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    // set focus on input
    const userText = document.querySelector(`#${SAMPLE_BOARD_ID}`);
    // console.log(userText)
    userText.focus();
  }

  onFocus(e) {
    const { setUserInputFocus } = this.props;
    setUserInputFocus(true);
  }

  onBlur(e) {
    const { setUserInputFocus } = this.props;
    setUserInputFocus(false);
  }

  handleChange(e) {
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
      isUserInputFocused,
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
          isUserInputFocused={isUserInputFocused}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
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

export default withStyles(styles)(ProgramBoard);
