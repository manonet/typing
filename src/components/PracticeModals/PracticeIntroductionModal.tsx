import { Button, Typography } from 'antd';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { APP_ELEMENT } from '@';
import { introductionModalClosed, setUserInputFocus } from '@actions';
import { Hand } from '@components';
import { State as ReduxState } from '@reducers';
import { Key } from '@types';

import { modalCustomStyles } from './modalCustomStyles';

ReactModal.setAppElement(APP_ELEMENT);

const { Title } = Typography;

type Props = {
  isOpen: boolean;
};

export default function PracticeStartModal({ isOpen }: Props) {
  const intl = useIntl();
  const dispatch = useDispatch();

  const { charToLearn, charsToLearn, keyToLearn, keys } = useSelector(
    (state: ReduxState) => state.typing
  );

  function closeModal() {
    dispatch(introductionModalClosed());
    dispatch(setUserInputFocus(true));
  }

  function handleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    if (event.code === 'Enter') {
      closeModal();
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
    keys && keys.length && keys.find((key: Key) => key.code === keyToLearn);

  const title = (
    <FormattedMessage
      id="lesson.title"
      defaultMessage="Lesson {numberOfLesson}"
      values={{
        numberOfLesson: charsToLearn.length,
      }}
    />
  );

  return (
    <ReactModal
      onRequestClose={closeModal}
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
            {charsToLearn.length > 1 ? (
              <div>
                <FormattedMessage
                  id="modal.introduction.previous.finished"
                  defaultMessage="Now you know how to type the character {charLearned}. It's time to move to the next one!"
                  values={{
                    charLearned: charsToLearn[charsToLearn.length - 2],
                  }}
                />
              </div>
            ) : null}
            <div>
              <FormattedMessage
                id="modal.introduction.desc"
                defaultMessage="The next character to learn is {charToLearn}. For that use your {hand} {finger}."
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
            <div
              className={`practiceStart__info practiceStart__info--${key.hand}`}
            >
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
            <span>
              <Button onClick={closeModal}>
                <FormattedMessage
                  id="modal.button.next"
                  defaultMessage="Next"
                />{' '}
                (
                <FormattedMessage
                  id="keyboard.key.enter"
                  defaultMessage="Enter"
                />
                )
              </Button>
            </span>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
