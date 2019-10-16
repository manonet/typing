import React from 'react';
import classNames from 'classnames';
import { withStyles, Theme } from '@material-ui/core/styles';

import SampleBoard from './SampleBoard';
import Keyboard from './keyboard/Keyboard';

type Props = {
  classes?: Record<keyof typeof styles, string>;
  className?: string;
  userText: string;
  cursorAt: number;
  signToWrite: string;
  writtenSign: string;
  displayedLevel: string;
  keyboard: [];
  keyboardKeys: [];
  functionKeys: [];
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
  public textAreaRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: any) {
    super(props);
    this.textAreaRef = React.createRef();
  }

  handleChangeRef = this.handleChange.bind(this);

  componentDidMount() {
    if (this.textAreaRef.current) {
      this.textAreaRef.current.focus();
    }
  }

  handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { userInputText } = this.props;
    userInputText(e.target.value);
  }

  render() {
    const {
      classes,
      className,
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
          ref={this.textAreaRef}
          userText={userText}
          cursorAt={cursorAt}
          signToWrite={signToWrite}
          writtenSign={writtenSign}
          onChange={this.handleChangeRef}
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
