import { useIntl } from 'gatsby-plugin-intl';
import React from 'react';
import { useSelector } from 'react-redux';

import {
  Layout,
  SEO,
  PracticeText,
  Keyboard,
  Hand,
  ExploreMoreModal,
  PracticeIntroductionModal,
  PracticeSummaryModal,
} from '@components';
import { State as ReduxState } from '@reducers';

// TODO lift ErrorModal, make it reusable
// TODO enable/disable backspace
// TODO differentiate same character on different levels: 'e', 'E', '€' ...
// TODO initial hint on the very first Practice

// TODO language detection if necessary -  navigator.language.substring(0, 2) https://medium.com/ableneo/internationalize-react-apps-done-right-using-react-intl-library-82978dbe175e

// TODO Enable layout separation, make it possible to switch between layouts. User should be able to define names for them.
// TODO Recognize new layouts, layout changes
// TODO - Handle characterNotFound
// TODO statistic may only belong to a specific keyboard layout. Create new statistic for each and every layouts
// TODO Create keyboardDiscoveryProgressBar component, which dynamically display the known percentage. Green can be for fully discovered keys, yellow for the partial ones, like new levels or dead keys. Promote it as a feature, not as weakness :)
// TODO Check for keyboard layout changes on every input change. Display warning and do not change keyboard state in case of layout change, but offer creating a new one.

export const MODAL_CLOSE_TIMEOUT = 500;

export default function TypewriterPage() {
  const intl = useIntl();

  const {
    charToLearn,
    charsToLearn,
    displayedLevel,
    explorerMode,
    finishedPractices,
    handFingers,
    isCharIntroduced,
    isDiscovereyNeeded,
    isPracticeFinished,
    isPracticing,
    keyToLearn,
    keys,
    keysDown,
    layout,
    os,
    userText,
  } = useSelector((state: ReduxState) => state.typing);

  // console.log({
  //   isCharIntroduced,
  //   isPracticeFinished,
  //   keyToLearn,
  //   explorerMode,
  //   isPracticing,
  //   charToLearn,
  //   charsToLearn,
  //   userText,
  // });

  const isModalOpen = false; // TODO - check conditions for modaly

  return (
    <Layout isModalOpen={isModalOpen}>
      <SEO
        title={intl.formatMessage({
          id: 'typewriter.page.title',
          defaultMessage: 'Typewriter application',
        })}
        isModalOpen={isModalOpen}
      />
      <div className="TypewriterBoard">
        <PracticeText />
        <div className="finishedPractices">
          № {finishedPractices + 1}, finished: {finishedPractices}
        </div>
        <div className="TypewriterBoard__desk">
          <Hand
            className="TypewriterBoard__hand"
            handSide="left"
            fingers={handFingers && handFingers.left}
          />
          <Keyboard
            className={'TypewriterBoard__keyboard'}
            displayedLevel={displayedLevel}
            keys={keys}
            layout={layout}
            os={os}
          />
          <Hand
            className="TypewriterBoard__hand"
            handSide="right"
            fingers={handFingers && handFingers.right}
          />
        </div>
      </div>

      <PracticeSummaryModal
        isOpen={isPracticeFinished}
        // @ts-ignore
        closeTimeoutMS={MODAL_CLOSE_TIMEOUT}
      />

      <PracticeIntroductionModal
        isOpen={!isCharIntroduced}
        // @ts-ignore
        closeTimeoutMS={MODAL_CLOSE_TIMEOUT}
      />

      <ExploreMoreModal
        isOpen={isDiscovereyNeeded}
        // @ts-ignore
        closeTimeoutMS={MODAL_CLOSE_TIMEOUT}
      />
    </Layout>
  );
}
