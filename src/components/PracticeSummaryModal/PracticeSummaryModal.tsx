import { FormattedMessage } from 'gatsby-plugin-intl';
import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';

import Button from '../Button';

ReactModal.setAppElement('#___gatsby');

type Props = {
  isOpen: boolean;
  title: ReactNode;
  correctChars: number;
  mistakenChars: number;
  elapsedTime: number;
  onRequestClose: () => {};
  startNewPractice: () => {};
};

export default function PracticeSummaryModal(props: Props) {
  const {
    cancelPractice,
    correctChars,
    elapsedTime,
    isOpen,
    mistakenChars,
    onRequestClose,
    repeatPractice,
    startNewPractice,
  } = props;

  const title = props.title;

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

  return (
    <ReactModal
      onRequestClose={onRequestClose}
      aria-labelledby="customized-dialog-title"
      isOpen={isOpen}
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
              cancel
            </Button>
            <Button onClick={repeatPractice} color="primary">
              repeatPractice
            </Button>
            <Button onClick={startNewPractice} color="primary">
              <FormattedMessage id="general.ok" />
            </Button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
