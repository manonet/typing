import { injectIntl } from 'gatsby-plugin-intl';
import React from 'react';
import { WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  keyDown,
  keyUp,
  KeyboardAction,
  initPractice,
  PracticeAction,
  summarizePractice,
} from '../actions';
import { PracticeProgressBar } from '../components';
import Keyboard from '../components/Keyboard';
import Layout from '../components/Layout';
import PracticeSummaryModal from '../components/PracticeSummaryModal';
import SampleBoard from '../components/SampleBoard';
import SEO from '../components/seo';
import { State as ReduxState } from '../reducers';
import { generatePracticeText } from '../utils';

// TODO add close on Enter function to modals
// TODO lift ErrorModal, make it reusable
// TODO enable/disable backspace
// TODO differentiate same character on different levels: 'e', 'E', '€' ...
// TODO fix stucked last hint on new Practice
// TODO initial hint on the very first Practice

// TODO language detection if necessary -  navigator.language.substring(0, 2) https://medium.com/ableneo/internationalize-react-apps-done-right-using-react-intl-library-82978dbe175e

// TODO Enable layout separation, make it possible to switch between layouts. User should be able to define names for them.
// TODO Recognise new layouts, layout changes - handle characterNotFound
// TODO statistic may only belong to a specific keyboard layout. Create new statistic for each and every layouts
// TODO Create keyboardDiscoveryProgressBar component, which dynamically display the known percentage. Green can be for fully discovered keys, yellow for the partial ones, like new levels or dead keys. Promote it as a feature, not as weakness :)
// TODO Practice can be started, because key.code, so position of keys on the mechanical board is known, e.g.: KeyF and KeyJ.
// TODO
// TODO

type Props = {
  dispatchInitPractice: (sampleText: string) => {};
  dispatchKeyDown: (event) => {};
  dispatchKeyUp: (event) => {};
  finishedPractices: number;
  isUserInputFocused: boolean;
  sampleText: string;
  showSummary: boolean;
  userText: string;
} & WrappedComponentProps;

type State = {
  isModalOpen: boolean;
};

export const MODAL_CLOSE_TIMEOUT = 500;

class TypewriterPage extends React.Component<Props, State> {
  public textAreaRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: Props) {
    super(props);
    this.textAreaRef = React.createRef();
    this.state = {
      isModalOpen: false,
    };

    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.startNewPractice = this.startNewPractice.bind(this);
    this.repeatPractice = this.repeatPractice.bind(this);
    this.cancelPractice = this.cancelPractice.bind(this);
  }

  focusTextInputRef = this.focusTextInput.bind(this);

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.isPracticing) {
      // practice ended
      nextProps.dispatchSummarizePractice();
      return { isModalOpen: true };
    }
    return null;
  }

  componentDidMount() {
    this.focusTextInputRef();
    this.startNewPractice();
  }

  focusTextInput() {
    const userInput = this.textAreaRef.current;
    if (userInput) {
      userInput.focus();
      userInput.selectionStart = userInput.selectionEnd =
        this.props.userText?.length || 0; // set caret position to the end of the user text
    }
  }

  startNewPractice() {
    const { allChars, dispatchInitPractice } = this.props;
    const wordLength = 4; // TODO use state value and wire it
    const nonPracticeGlyphs = ['', ' ', '\n'];
    const filteredChars = allChars.filter((char) => char.correct < 10);
    if (Array.isArray(filteredChars) && filteredChars.length > wordLength) {
      const practiceGlyphs = filteredChars.map((char) => char.glyph);
      const filteredGlyphs = practiceGlyphs.filter(
        (glyph) => !nonPracticeGlyphs.includes(glyph)
      );

      const sampleText = generatePracticeText({
        glyphs: filteredGlyphs,
        parcticeLength: 5,
        wordLength: 2,
        uniqueWordCount: 2,
      });
      dispatchInitPractice(sampleText);
      this.handleModalClose();
      this.focusTextInputRef();
    } else {
      // explore new chars
      console.info("can't start new practice");
    }
  }

  repeatPractice() {
    const { dispatchInitPractice, sampleText } = this.props;
    dispatchInitPractice(sampleText);
    this.handleModalClose();
    this.focusTextInputRef();
  }

  cancelPractice() {
    this.handleModalClose();
  }

  handleKeydown(event) {
    const { dispatchKeyDown } = this.props;

    dispatchKeyDown(event);
  }

  handleKeyup(event) {
    const { dispatchKeyUp } = this.props;

    dispatchKeyUp(event);
  }

  handleModalOpen() {
    this.setState({
      isModalOpen: true,
    });
  }

  handleModalClose() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const { isModalOpen } = this.state;
    const {
      finishedPractices,
      intl,
      isUserInputFocused,
      showSummary,
    } = this.props;
    // TODO - this check shall only happen on focus change!
    if (isUserInputFocused) {
      document.addEventListener('keydown', this.handleKeydown, false);
      document.addEventListener('keyup', this.handleKeyup, false);
    } else {
      document.removeEventListener('keydown', this.handleKeydown, false);
      document.removeEventListener('keyup', this.handleKeyup, false);
    }

    return (
      <Layout isModalOpen={isModalOpen}>
        <PracticeProgressBar />
        <SEO
          lang={intl.locale}
          title={intl.formatMessage({ id: 'typewriter.page.title' })}
          isModalOpen={isModalOpen}
        />

        <div className="TypewriterBoard">
          <SampleBoard
            ref={this.textAreaRef}
            focusTextInput={this.focusTextInputRef}
          />
          <div className="finishedPractices">
            № {finishedPractices + 1}, finished: {finishedPractices}
          </div>
          <Keyboard className={'TypewriterBoard__keyboard'} />
        </div>
        <PracticeSummaryModal
          title="Summary"
          isOpen={isModalOpen}
          closeTimeoutMS={MODAL_CLOSE_TIMEOUT}
          startNewPractice={this.startNewPractice}
          cancelPractice={this.cancelPractice}
          repeatPractice={this.repeatPractice}
          correctChars={120}
          mistakenChars={2}
          elapsedTime={238}
        ></PracticeSummaryModal>
      </Layout>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const { focusUserInput, typing } = state;
  return {
    isUserInputFocused: focusUserInput.isUserInputFocused,
    sampleText: typing.sampleText,
    userText: typing.userText,
    allChars: typing.allChars,
    finishedPractices: typing.finishedPractices,
    isPracticing: typing.isPracticing,
    showSummary: typing.showSummary,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    ReduxState,
    undefined,
    PracticeAction | KeyboardAction
  >
) => ({
  dispatchInitPractice: (sampleText: string) =>
    dispatch(initPractice(sampleText)),
  dispatchSummarizePractice: () => dispatch(summarizePractice()),
  dispatchKeyDown: (event) => dispatch(keyDown(event)),
  dispatchKeyUp: (event) => dispatch(keyUp(event)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TypewriterPage));
