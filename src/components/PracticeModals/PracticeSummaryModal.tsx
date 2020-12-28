import { Button, Typography } from 'antd';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { APP_ELEMENT } from '@';
import { summaryModalClosed, setUserInputFocus } from '@actions';
import { State as ReduxState } from '@reducers';

import { modalCustomStyles } from './modalCustomStyles';

ReactModal.setAppElement(APP_ELEMENT);

const { Title } = Typography;

type Props = {
  isOpen: boolean;
};

export default function PracticeSummaryModal({ isOpen }: Props) {
  const dispatch = useDispatch();

  const { isPracticeAccomplished } = useSelector(
    (state: ReduxState) => state.typing
  );

  const correctChars = 1;
  const mistakenChars = 1;
  const elapsedTime = 1;

  function closeSummary() {
    dispatch(summaryModalClosed());
    dispatch(setUserInputFocus(true));
  }

  function repeatPractice() {
    // dispatch(initializeRepeatPractice());
  }

  function handleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    if (event.code === 'Enter') {
      closeSummary();
    }
    if (event.code === 'Space') {
      repeatPractice();
    }

    // if (event.code === 'Esc') {
    //
    // }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown, true);

      return () => {
        document.removeEventListener('keydown', handleKeydown, true);
      };
    }
  }, [isOpen]);

  // isPracticeAccomplished is not yet calculated, but set fix true.
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
        <div className="practiceSummary__content">
          <div>Statistic comes here, e.g.:</div>
          <div>Succeed characters: {mistakenChars}</div>
          <div>Mistaken characters: {correctChars}</div>
          <div>Elapsed Time: {elapsedTime}</div>
        </div>
        <div className="practiceSummary__footer">
          <div className="practiceSummary__footerButtons">
            {/* 
            buggy, or not even necessary
            <Button onClick={cancelPractice}>
              Cancel (Esc)
            </Button> */}

            <Button onClick={repeatPractice}>
              <span>
                <FormattedMessage
                  id="modal.summary.button.repeat"
                  defaultMessage="Repeat"
                />
                {' ('}
                <FormattedMessage
                  id="keyboard.key.space"
                  defaultMessage="Space"
                />
                )
              </span>
            </Button>
            <Button onClick={closeSummary}>
              <span>
                <FormattedMessage
                  id="modal.button.continue"
                  defaultMessage="Continue"
                />
                {' (Enter)'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
