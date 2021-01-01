import { Button, Typography } from 'antd';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { APP_ELEMENT } from '@';
import { summaryModalClosed, setUserInputFocus } from '@actions';
import { getLangCode } from '@intl/languages';
import { State as ReduxState } from '@reducers';
import { keyRequirements, keyOrder } from '@utils';

import { modalCustomStyles } from './modalCustomStyles';

ReactModal.setAppElement(APP_ELEMENT);

const { Title } = Typography;

type Props = {
  isOpen: boolean;
};

export default function PracticeSummaryModal({ isOpen }: Props) {
  const dispatch = useDispatch();

  const intl = useIntl();
  const lang = intl.locale;
  const langCode = getLangCode(lang);

  const {
    allChars,
    charsToLearn,
    complianceRatio,
    isPracticeAccomplished,
    practiceStatistics,
  } = useSelector((state: ReduxState) => state.typing);

  const { correctHits, incorrectHits } = practiceStatistics;
  const achievementRatio = correctHits / (incorrectHits + correctHits);
  const formattedAchievementPercentage = (
    achievementRatio * 100
  ).toLocaleString(langCode, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });

  const formattedCompliancePercentage = (complianceRatio * 100).toLocaleString(
    langCode,
    {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }
  );

  // TODO - refactor it
  const charToLearn = charsToLearn[charsToLearn.length - 1];
  const charStats = allChars.find((char) => char.glyph === charToLearn);
  const correctTotalCharHits = (charStats && charStats.correct) || 0;
  const miswriteTotalCharHits = (charStats && charStats.miswrite) || 0;
  const misreadTotalCharHits = (charStats && charStats.misread) || 0;
  const incorrectTotalCharHits = miswriteTotalCharHits + misreadTotalCharHits;
  const charComplianceRatio = correctTotalCharHits
    ? correctTotalCharHits / (incorrectTotalCharHits + correctTotalCharHits)
    : 0;
  const lastKeyToLearn = keyOrder[charsToLearn.length - 1];
  const requiredHits = keyRequirements(lastKeyToLearn);

  const formattedCharCompliancePercentage = (
    charComplianceRatio * 100
  ).toLocaleString(langCode, {
    maximumFractionDigits: 3,
    minimumFractionDigits: 0,
  });
  // ----------------------------------------------------------------

  function closeSummary() {
    dispatch(summaryModalClosed({}));
    dispatch(setUserInputFocus(true));
  }

  function repeatPractice() {
    dispatch(summaryModalClosed({ repeat: true }));
    dispatch(setUserInputFocus(true));
  }

  function handleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    if (isPracticeAccomplished) {
      if (event.code === 'Enter') {
        closeSummary();
      }
      if (event.code === 'Space') {
        repeatPractice();
      }
    } else {
      if (event.code === 'Enter') {
        repeatPractice();
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown, true);

      return () => {
        document.removeEventListener('keydown', handleKeydown, true);
      };
    }
  }, [isOpen]);

  const title = isPracticeAccomplished ? (
    <FormattedMessage
      id="modal.summary.title.accomplished"
      defaultMessage="Accomplished!"
    />
  ) : (
    <FormattedMessage
      id="modal.summary.title.failed"
      defaultMessage="Failed!"
    />
  );

  const statisticSummary = (
    <div>
      <div>
        <FormattedMessage
          id="statistics.hits.correct"
          defaultMessage="Correct hits"
        />
        : {correctHits}
      </div>
      <div>
        <FormattedMessage
          id="statistics.hits.incorrect"
          defaultMessage="Incorrect hits"
        />
        : {incorrectHits}
      </div>
      <div>
        <FormattedMessage id="statistics.accuracy" defaultMessage="Accuracy" />:{' '}
        {formattedAchievementPercentage}%
      </div>
      <div>
        <FormattedMessage
          id="statistics.requirement"
          defaultMessage="Requirement"
        />
        : {formattedCompliancePercentage}%
      </div>

      {charComplianceRatio !== 0 && charComplianceRatio < complianceRatio && (
        <div>
          <FormattedMessage
            id="statistics.lesson.accuracy.requirement"
            defaultMessage="You succeed {succeedPercent}% percent in lesson,
          but you need to reach {requirementPercent}% in order to
          step further."
            values={{
              succeedPercent: formattedCharCompliancePercentage,
              requirementPercent: formattedCompliancePercentage,
            }}
          />
        </div>
      )}

      {correctTotalCharHits !== 0 && correctTotalCharHits < requiredHits && (
        <div>
          <FormattedMessage
            id="statistics.lesson.amount.requirement"
            defaultMessage="You have to hit the {charToLearn} character 
            {hitsRequired} more times in order to step
            further."
            values={{
              charToLearn,
              hitsRequired: requiredHits - correctTotalCharHits,
            }}
          />
        </div>
      )}
    </div>
  );

  const content = isPracticeAccomplished ? (
    <div className="practiceSummary__content practiceSummary__content--accomplished">
      <div>
        <FormattedMessage
          id="modal.summary.exclamation.accomplished"
          defaultMessage="Congratulation!"
        />{' '}
        <FormattedMessage
          id="modal.summary.practice.accomplished"
          defaultMessage="You finished this practice successfully."
        />
      </div>
      {statisticSummary}
    </div>
  ) : (
    <div className="practiceSummary__content practiceSummary__content--failed">
      <div>
        <FormattedMessage
          id="modal.summary.exclamation.failed"
          defaultMessage="Oh no!"
        />{' '}
        <FormattedMessage
          id="modal.summary.practice.failed"
          defaultMessage="You made too many mistakes, so you have to repeat this practice."
        />
      </div>
      {statisticSummary}
    </div>
  );

  const footerButtons = isPracticeAccomplished ? (
    <>
      <Button onClick={repeatPractice}>
        <span>
          <FormattedMessage
            id="modal.summary.button.repeat"
            defaultMessage="Repeat"
          />
          {' ('}
          <FormattedMessage id="keyboard.key.space" defaultMessage="Space" />
          {')'}
        </span>
      </Button>
      <Button onClick={closeSummary}>
        <span>
          <FormattedMessage
            id="modal.button.continue"
            defaultMessage="Continue"
          />
          {' ('}
          <FormattedMessage id="keyboard.key.enter" defaultMessage="Enter" />
          {')'}
        </span>
      </Button>
    </>
  ) : (
    <Button onClick={repeatPractice}>
      <span>
        <FormattedMessage
          id="modal.summary.button.repeat"
          defaultMessage="Repeat"
        />
        {' ('}
        <FormattedMessage id="keyboard.key.enter" defaultMessage="Enter" />
        {')'}
      </span>
    </Button>
  );

  return (
    <ReactModal
      onRequestClose={closeSummary}
      aria-labelledby={title}
      isOpen={isOpen}
      style={modalCustomStyles}
    >
      <div className="practiceSummary">
        <Title level={2} className="practiceSummary__header">
          {title}
        </Title>

        {content}

        <div className="practiceSummary__footer">
          <div className="practiceSummary__footerButtons">{footerButtons}</div>
        </div>
      </div>
    </ReactModal>
  );
}
