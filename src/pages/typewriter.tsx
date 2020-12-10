import { useIntl } from 'gatsby-plugin-intl';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  initPractice,
  focusUserInput,
  closeSummary,
  exploreKeys,
} from '../actions';
import {
  Hand,
  PracticeProgressBar,
  ExploreMoreModal,
  PracticeIntroductionModal,
  PracticeSummaryModal,
} from '../components';
import Keyboard from '../components/Keyboard';
import Layout from '../components/Layout';
import PracticeText from '../components/PracticeText';
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
// TODO Check for keyboard layout changes on every input change. Display warning and do not change keyboard state in case of layout change, but offer creating a new one.
// TODO show introduction also if char is already discovered

export const MODAL_CLOSE_TIMEOUT = 500;

export default function TypewriterPage() {
  const intl = useIntl();
  const dispatch = useDispatch();

  const {
    charToLearn,
    charsLearned,
    displayedLevel,
    explorerMode,
    finishedPractices,
    isPracticeAccomplished,
    keyToLearn,
    keys,
    keysDown,
    layout,
    lessonText,
    os,
    showExploreMore,
    showIntroduction,
    showSummary,
  } = useSelector((state: ReduxState) => state.typing);

  function startNewPractice() {
    if (charToLearn) {
      console.info('startNewPractice');
      const wordLength = 4; // TODO use state value and wire it
      // const filteredChars = allChars.filter(
      //   (char) => (char.correct as number) < 10
      // );
      const filteredChars = [charToLearn, ...charsLearned];
      // if (Array.isArray(filteredChars) && filteredChars.length > wordLength) {
      //   const practiceGlyphs = filteredChars.map((char) => char.glyph);
      //   const filteredGlyphs = practiceGlyphs.filter(
      //     (glyph) => !nonPracticeGlyphs.includes(glyph)
      //   );

      //   const lessonText = generatePracticeText({
      //     glyphs: filteredGlyphs,
      //     practiceLength: 5,
      //     wordLength: 2,
      //     uniqueWordCount: 2,
      //   });
      //   dispatch(initPractice(lessonText));
      //   dispatch(focusUserInput(true));

      // keyMap: {
      //   ' ': { index: 6, level: 'to', learned: false },
      //   '\n': { index: 41, level: 'to', learned: false },
      // },

      if (!keysDown.length) {
        const lessonText = generatePracticeText({
          glyphs: filteredChars,
          practiceLength: 7,
          wordLength: 3,
          uniqueWordCount: 2,
        });

        dispatch(initPractice(lessonText));
        dispatch(focusUserInput(true));
      }
    } else {
      console.info("can't start new practice, exploring new keys is necessary");
      dispatch(exploreKeys());
    }
  }

  function repeatPractice() {
    dispatch(initPractice(lessonText));
    dispatch(focusUserInput(true));
  }

  // buggy, or not even necessary
  // function cancelPractice() {
  //   dispatch(closeSummary());
  //   dispatch(focusUserInput(true));
  // }

  function exploreMore() {
    dispatch(closeSummary());
    dispatch(focusUserInput(true));
  }

  return (
    <Layout isModalOpen={showSummary}>
      <PracticeProgressBar />
      <SEO
        title={intl.formatMessage({ id: 'typewriter.page.title' })}
        isModalOpen={showSummary}
      />
      <div className="TypewriterBoard">
        <PracticeText />
        <div className="finishedPractices">
          № {finishedPractices + 1}, finished: {finishedPractices}
        </div>
        <div className="TypewriterBoard__desk">
          <Hand className="TypewriterBoard__hand" handSide="left" />
          <Keyboard
            className={'TypewriterBoard__keyboard'}
            displayedLevel={displayedLevel}
            keys={keys}
            layout={layout}
            os={os}
          />
          <Hand className="TypewriterBoard__hand" handSide="right" />
        </div>
      </div>

      <PracticeSummaryModal
        isOpen={showSummary}
        // @ts-ignore
        closeTimeoutMS={MODAL_CLOSE_TIMEOUT}
        startNewPractice={startNewPractice}
        // cancelPractice={cancelPractice}
        isPracticeAccomplished={isPracticeAccomplished}
        repeatPractice={repeatPractice}
        correctChars={120}
        mistakenChars={2}
        elapsedTime={238}
        onRequestClose={() => dispatch(closeSummary())}
        explorerMode={explorerMode}
      />

      <PracticeIntroductionModal
        isOpen={showIntroduction}
        // @ts-ignore
        closeTimeoutMS={MODAL_CLOSE_TIMEOUT}
        startNewPractice={startNewPractice}
        charToLearn={charToLearn}
        keys={keys}
        keyToLearn={keyToLearn}
        onRequestClose={() => dispatch(closeSummary())}
      />

      <ExploreMoreModal
        isOpen={!showSummary && showExploreMore}
        // @ts-ignore
        closeTimeoutMS={MODAL_CLOSE_TIMEOUT}
        exploreMore={exploreMore}
      />
    </Layout>
  );
}
