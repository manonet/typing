import React from 'react';
import classNames from 'classnames';

import SampleBoard from '../SampleBoard';
import Keyboard from '../Keyboard';

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
      <div className={classNames('TypewriterBoard', className)}>
        <SampleBoard
          ref={this.textAreaRef}
          userText={userText}
          cursorAt={cursorAt}
          signToWrite={signToWrite}
          writtenSign={writtenSign}
          onChange={this.handleChangeRef}
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
