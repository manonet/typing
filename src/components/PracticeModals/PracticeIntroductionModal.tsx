import { Button, Typography } from 'antd';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';

import { Glyph, EventCode, Key } from '../../types';
import { Hand } from '../index';

import { modalCustomStyles } from './modalCustomStyles';

ReactModal.setAppElement('#___gatsby');

const { Title } = Typography;

type Props = {
  isOpen: boolean;
  keys: Key[];
  charToLearn?: Glyph;
  keyToLearn: EventCode;
  onRequestClose: () => void;
  startNewPractice: () => void;
};

export default function PracticeStartModal({
  charToLearn,
  isOpen,
  keyToLearn,
  keys,
  onRequestClose,
  startNewPractice,
}: Props) {
  const intl = useIntl();

  function handleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    if (event.code === 'Enter') {
      startNewPractice && startNewPractice();
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

  const key =
    keys && keys.length && keys.find((key) => key.code === keyToLearn);

  const title = (
    <FormattedMessage
      id="modal.introduction.title"
      defaultMessage="Introduction"
    />
  );

  return (
    <ReactModal
      onRequestClose={onRequestClose}
      aria-labelledby={title}
      isOpen={isOpen}
      style={modalCustomStyles}
    >
      <div className="practiceStart">
        <Title level={2} className="practiceStart__header">
          {title}
        </Title>

        {key && (
          <div className="practiceStart__content">
            <div>
              <FormattedMessage
                id="modal.introduction.desc"
                defaultMessage="Next char to learn is {charToLearn}. For that use your {hand} {finger}"
                values={{
                  hand: intl.formatMessage({
                    id: `typing.hand.${key.hand}`,
                  }),
                  finger: intl.formatMessage({
                    id: `typing.finger.${key.finger}`,
                  }),
                  charToLearn,
                }}
              />
            </div>
            <div className="practiceStart__info">
              <div className="practiceStart__charInfo">
                <span className="practiceStart__char">{charToLearn}</span>
              </div>
              <div className="practiceStart__fingerInfo">
                <Hand
                  className="practiceStart__hand"
                  handSide={key.hand}
                  fingers={{ [key.finger]: 'toUse' }}
                />
              </div>
            </div>
          </div>
        )}
        <div className="practiceStart__footer">
          <div className="practiceStart__footerButtons">
            <Button onClick={startNewPractice} color="primary">
              <FormattedMessage id="modal.button.next" defaultMessage="Next" />{' '}
              (Enter)
            </Button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
