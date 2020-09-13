import { FormattedMessage } from 'gatsby-plugin-intl';
import React, { ReactNode, useEffect } from 'react';
import ReactModal from 'react-modal';

import Button from '../Button';

ReactModal.setAppElement('#___gatsby');

type Props = {
  title: ReactNode;
  cancelPractice: () => void;
  repeatPractice: () => void;
  correctChars: number;
  mistakenChars: number;
  elapsedTime: number;
  onRequestClose: () => void;
  startNewPractice: () => void;
};

export default function PracticeSummaryModal({
  cancelPractice,
  correctChars,
  elapsedTime,
  mistakenChars,
  onRequestClose,
  repeatPractice,
  startNewPractice,
  title,
}: Props) {
  const customStyles = {
    // stylelint-disable
    overlay: {
      background: 'initial',
    },
    content: {
      top: '50%',
      right: 'auto',
      bottom: 'auto',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'initial',
      background: 'initial',
      overflow: 'auto',
      borderRadius: 'initial',
      outline: 'currentcolor none medium',
      padding: 'initial',
    },
  };

  function handleKeydown(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      startNewPractice && startNewPractice();
    }
    if (event.code === 'Space') {
      repeatPractice && repeatPractice();
    }
    if (event.code === 'Esc') {
      cancelPractice && cancelPractice();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeydown, true);
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown, true);
    };
  }, [isOpen]);

  return (
    <ReactModal
      onRequestClose={onRequestClose}
      aria-labelledby="customized-dialog-title"
      isOpen
      style={customStyles}
    >
      <div className="practiceSummary">
        <div className="practiceSummary__header">{title}</div>
        <div className="practiceSummary__content">
          <div>Succeed characters: {mistakenChars}</div>
          <div>Mistaken characters: {correctChars}</div>
          <div>Elapsed Time: {elapsedTime}</div>
        </div>
        <div className="practiceSummary__footer">
          <div className="practiceSummary__footerButtons">
            <Button onClick={cancelPractice} color="primary">
              Cancel (Esc)
            </Button>
            <Button onClick={repeatPractice} color="primary">
              Repeat (Space)
            </Button>
            <Button onClick={startNewPractice} color="primary">
              New (Enter)
            </Button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
