import { injectIntl } from 'gatsby-plugin-intl';
import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  setSampleText,
  SetSampleTextAction,
  keyDown,
  keyUp,
  KeyboardAction,
} from '../actions';
import { State as ReduxState } from '../reducers';
import { navigationKeyCodes } from '../types/allEventKeyCodes';

import Keyboard from './Keyboard';
import SampleBoard from './SampleBoard';

// TODO add close on Enter function to modals
// TODO lift ErrorModal, make it reusable
// TODO enable/disable backspace
// TODO differentiate same character on different levels: 'e', 'E', '€' ...
// TODO fix stucked last hint on new lesson
// TODO initial hint on the very first lesson

// TODO language detection if necessary -  navigator.language.substring(0, 2) https://medium.com/ableneo/internationalize-react-apps-done-right-using-react-intl-library-82978dbe175e

// TODO Enable layout separation, make it possible to switch between layouts. User should be able to define names for them.
// TODO Recognise new layouts, layout changes - handle characterNotFound
// TODO statistic may only belong to a specific keyboard layout. Create new statistic for each and every layouts
// TODO Create keyboardDiscoveryProgressBar component, which dynamically display the known percentage. Green can be for fully discovered keys, yellow for the partial ones, like new levels or dead keys. Promote it as a feature, not as weakness :)
// TODO Lesson can be started, because key.code, so position of keys on the mechanical board is known, e.g.: KeyF and KeyJ.
// TODO
// TODO

type Props = {
  sampleText: string;
  isUserInputFocused: boolean;
  userText: string;
  dispatchSetSampleText: (sampleText: string) => {};
  dispatchKeyDown: (event) => {};
  dispatchKeyUp: (event) => {};
};

class Typewriter extends React.Component<Props> {
  public textAreaRef: React.RefObject<HTMLTextAreaElement>;

  constructor() {
    super();
    this.textAreaRef = React.createRef();
    this.state = {};

    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.startNewLesson = this.startNewLesson.bind(this);
  }

  focusTextInputRef = this.focusTextInput.bind(this);

  componentDidMount() {
    this.focusTextInputRef();

    const { dispatchSetSampleText } = this.props;

    dispatchSetSampleText("LôeòÎŰt's\nTyyyype Something €éÉÈǽ...");
  }

  focusTextInput() {
    const userInput = this.textAreaRef.current;
    if (userInput) {
      userInput.focus();
      userInput.selectionStart = userInput.selectionEnd =
        this.props.userText?.length || 0; // set caret position to the end of the user text
    }
  }

  startNewLesson(sampleText: string) {
    const { dispatchSetSampleText } = this.props;

    dispatchSetSampleText(sampleText);
  }

  handleKeydown(event) {
    const { dispatchKeyDown } = this.props;

    dispatchKeyDown(event);
  }

  handleKeyup(event) {
    const { dispatchKeyUp } = this.props;

    dispatchKeyUp(event);
  }

  render() {
    const { intl, isModalOpen, isUserInputFocused } = this.props;
    // TODO - this check shall only happen on focus change!
    if (isUserInputFocused) {
      document.addEventListener('keydown', this.handleKeydown, false);
      document.addEventListener('keyup', this.handleKeyup, false);
    } else {
      document.removeEventListener('keydown', this.handleKeydown, false);
      document.removeEventListener('keyup', this.handleKeyup, false);
    }

    return (
      <>
        <div className="TypewriterBoard">
          <SampleBoard
            ref={this.textAreaRef}
            focusTextInput={this.focusTextInputRef}
          />
          <Keyboard className={'TypewriterBoard__keyboard'} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const { focusUserInput, typing } = state;
  return {
    isUserInputFocused: focusUserInput.isUserInputFocused,
    sampleText: typing.sampleText,
    userText: typing.userText,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    ReduxState,
    undefined,
    SetSampleTextAction | KeyboardAction
  >
) => ({
  dispatchSetSampleText: (sampleText: string) =>
    dispatch(setSampleText(sampleText)),
  dispatchKeyDown: (event) => dispatch(keyDown(event)),
  dispatchKeyUp: (event) => dispatch(keyUp(event)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Typewriter));
