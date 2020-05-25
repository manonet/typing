import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { flushKeyboard, keyDown, keyUp, KeyboardAction } from '../actions';
import Button from '../components/Button';
import Keyboard from '../components/Keyboard';
import Layout from '../components/Layout';
import { State as ReduxState } from '../reducers';

class ExplorerPage extends React.Component {
  public textAreaRef: React.RefObject<HTMLTextAreaElement>;

  constructor() {
    super();
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

  handleKeydown = (e) => {
    const { dispatchKeyDown } = this.props;
    dispatchKeyDown(e);

    this.setState({
      output: {
        timeStamp: e.timeStamp, // https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp,
        type: e.type,
        key: e.key, // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
        code: e.code, // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
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

  handleKeyup = (event) => {
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
          ></textarea>
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
  dispatchKeyDown: (event) => dispatch(keyDown(event)),
  dispatchKeyUp: (event) => dispatch(keyUp(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerPage);
