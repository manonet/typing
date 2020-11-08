import { Button } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { flushKeyboard, keyDown, keyUp, KeyboardAction } from '../actions';
import Keyboard from '../components/Keyboard';
import Layout from '../components/Layout';
import { State as ReduxState } from '../reducers';

type Props = {
  userText?: string;
  dispatchKeyUp: (event: KeyboardEvent) => void;
  dispatchKeyDown: (event: KeyboardEvent) => void;
  dispatchFlushKeyboard: (event: React.MouseEvent) => void;
};

type State = {
  output: Partial<React.KeyboardEvent & { modifiers: string[] }>;
};

class ExplorerPage extends React.Component<Props, State> {
  public textAreaRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: Props) {
    super(props);
    this.textAreaRef = React.createRef();
    this.state = {
      output: {},
    };
  }

  // const [inputFocused, setInputFocused] = useState(false);
  // const [output, setOutput] = useState({});

  focusTextInputRef = this.focusTextInput.bind(this);

  componentDidMount() {
    this.focusTextInputRef();
  }

  focusTextInput() {
    const userInput = this.textAreaRef.current;
    if (userInput) {
      userInput.focus();
      userInput.selectionStart = userInput.selectionEnd =
        this.props.userText?.length || 0; // set caret position to the end of the user text
    }
  }

  handleKeydown = (e: KeyboardEvent) => {
    const { dispatchKeyDown } = this.props;
    dispatchKeyDown(e);

    this.setState({
      output: {
        timeStamp: e.timeStamp, // https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp,
        type: e.type,
        key: e.key, // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
        // @ts-ignore
        code: e.code, // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code code does not exist in KeyboardEvent type
        altKey: e.altKey, // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/altKey
        ctrlKey: e.ctrlKey, // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey
        metaKey: e.metaKey, // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey
        shiftKey: e.shiftKey, // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey
        repeat: e.repeat, // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat
        location: e.location, // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location
        modifiers: [
          // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
          ...(e.getModifierState('Alt') ? ['alt'] : []),
          ...(e.getModifierState('AltGraph') ? ['AltGraph'] : []),
          ...(e.getModifierState('CapsLock') ? ['CapsLock'] : []),
          ...(e.getModifierState('Control') ? ['Control'] : []),
          ...(e.getModifierState('Shift') ? ['Shift'] : []),
        ],
      },
    });
  };

  handleKeyup = (event: KeyboardEvent) => {
    const { dispatchKeyUp } = this.props;
    dispatchKeyUp(event);
  };

  render() {
    const { dispatchFlushKeyboard } = this.props;
    // console.log('KeyEventInfo', this.state.output);
    return (
      <Layout>
        <h2>Explorer</h2>
        <div className="explorer" style={{ display: 'flex' }}>
          <textarea
            ref={this.textAreaRef}
            onFocus={() => {
              document.addEventListener('keydown', this.handleKeydown, false);
              document.addEventListener('keyup', this.handleKeyup, false);
            }}
            onBlur={() => {
              document.removeEventListener(
                'keydown',
                this.handleKeydown,
                false
              );
              document.removeEventListener('keyup', this.handleKeyup, false);
            }}
            // onKeyDown={(e) => handleKeydown(e)}
            // onKeyUp={(e) => handleKeyup(e)}
          />
          <Button onClick={dispatchFlushKeyboard}>Clear data</Button>
        </div>
        <Keyboard />
      </Layout>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const { typing } = state;
  return {
    userText: typing.userText,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<ReduxState, undefined, KeyboardAction>
) => ({
  dispatchFlushKeyboard: () => dispatch(flushKeyboard()),
  dispatchKeyDown: (event: KeyboardEvent) => dispatch(keyDown(event)),
  dispatchKeyUp: (event: KeyboardEvent) => dispatch(keyUp(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerPage);
