import { useIntl } from 'gatsby-plugin-intl';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initPractice, summarizePractice, focusUserInput } from '../actions';
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

export const MODAL_CLOSE_TIMEOUT = 500;

export default function TypewriterPage() {
  const [isModalOpen, setIsOpen] = useState(false);
  const intl = useIntl();
  const dispatch = useDispatch();

  const { allChars, finishedPractices, isPracticing, sampleText } = useSelector(
    (state: ReduxState) => state.typing
  );

  useEffect(() => {
    startNewPractice();
    if (!isPracticing) {
      // practice ended
      dispatch(summarizePractice());
      return setIsOpen(true);
    }
  }, [isPracticing]);

  function startNewPractice() {
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
      dispatch(initPractice(sampleText));
      closeModal();
      dispatch(focusUserInput(true));
    } else {
      // explore new chars
      console.info("can't start new practice");
    }
  }

  function repeatPractice() {
    dispatch(initPractice(sampleText));
    closeModal();
    dispatch(focusUserInput(true));
  }

  function cancelPractice() {
    closeModal();
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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
        <SampleBoard />
        <div className="finishedPractices">
          № {finishedPractices + 1}, finished: {finishedPractices}
        </div>
        <Keyboard className={'TypewriterBoard__keyboard'} />
      </div>

      <PracticeSummaryModal
        title="Summary"
        isOpen={isModalOpen}
        closeTimeoutMS={MODAL_CLOSE_TIMEOUT}
        startNewPractice={startNewPractice}
        cancelPractice={cancelPractice}
        repeatPractice={repeatPractice}
        correctChars={120}
        mistakenChars={2}
        elapsedTime={238}
        onRequestClose={closeModal}
      ></PracticeSummaryModal>
    </Layout>
  );
}
