import classNames from 'classnames';
import React from 'react';

import Keyboard from '../Keyboard';
import SampleBoard from '../SampleBoard';

type Props = {
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

class TypewriterBoard extends React.Component<Props> {
  public textAreaRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: any) {
    super(props);
    this.textAreaRef = React.createRef();
  }

  handleChangeRef = this.handleChange.bind(this);
  focusTextInputRef = this.focusTextInput.bind(this);

  componentDidMount() {
    this.focusTextInputRef();
  }

  focusTextInput() {
    event?.preventDefault();
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
      className,
      cursorAt,
      displayedLevel,
      functionKeys,
      keyboard,
      keyboardKeys,
      signToWrite,
      userText,
      writtenSign,
    } = this.props;

    return (
      <div className={classNames('TypewriterBoard', className)}>
        <SampleBoard
          ref={this.textAreaRef}
          userText={userText}
          cursorAt={cursorAt}
          signToWrite={signToWrite}
          writtenSign={writtenSign}
          onChange={this.handleChangeRef}
          focusTextInput={this.focusTextInputRef}
        />
        <Keyboard
          className={'TypewriterBoard__keyboard'}
          keyboard={keyboard}
          functionKeys={functionKeys}
          keyboardKeys={keyboardKeys}
          displayedLevel={displayedLevel}
        />
      </div>
    );
  }
}

export default TypewriterBoard;
