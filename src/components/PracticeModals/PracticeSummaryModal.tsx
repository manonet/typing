import { Button, Typography } from 'antd';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';

import { modalCustomStyles } from './modalCustomStyles';

ReactModal.setAppElement('#___gatsby');

const { Title } = Typography;

type Props = {
  isOpen: boolean;
  isPracticeAccomplished: boolean;
  // cancelPractice: () => void;
  repeatPractice: () => void;
  correctChars: number;
  mistakenChars: number;
  elapsedTime: number;
  onRequestClose: () => void;
  startNewPractice: () => void;
};

export default function PracticeSummaryModal({
  // cancelPractice,
  correctChars,
  elapsedTime,
  isOpen,
  isPracticeAccomplished,
  mistakenChars,
  onRequestClose,
  repeatPractice,
  startNewPractice,
}: Props) {
  function handleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    if (event.code === 'Enter') {
      startNewPractice && startNewPractice();
    }
    if (event.code === 'Space') {
      repeatPractice && repeatPractice();
    }
    // buggy, or not even necessary
    // if (event.code === 'Esc') {
    //   cancelPractice && cancelPractice();
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
      onRequestClose={onRequestClose}
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
            <Button onClick={cancelPractice} color="primary">
              Cancel (Esc)
            </Button> */}

            {/* TODO - before explore modal a "continue" button needed! */}
            <Button onClick={repeatPractice} color="primary">
              <FormattedMessage
                id="modal.summary.button.repeat"
                defaultMessage="Repeat"
              />{' '}
              (
              <FormattedMessage
                id="keyboard.key.space"
                defaultMessage="Space"
              />
              )
            </Button>
            <Button onClick={startNewPractice} color="primary">
              <FormattedMessage
                id="modal.summary.button.new"
                defaultMessage="New"
              />{' '}
              (Enter)
            </Button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
