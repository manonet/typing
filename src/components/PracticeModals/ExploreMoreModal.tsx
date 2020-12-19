import { Button, Typography } from 'antd';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';

import { APP_ELEMENT } from '@';
import { discoveryModalClosed, setUserInputFocus } from '@actions';

import { modalCustomStyles } from './modalCustomStyles';

ReactModal.setAppElement(APP_ELEMENT);

const { Title } = Typography;

type Props = {
  isOpen: boolean;
};

export default function ExploreMoreModal({ isOpen }: Props) {
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(discoveryModalClosed());
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

  const title = (
    <FormattedMessage
      id="modal.explore.title"
      defaultMessage="Explore new areas!"
    />
  );

  return (
    <ReactModal
      onRequestClose={closeModal}
      aria-labelledby={title}
      isOpen={isOpen}
      style={modalCustomStyles}
    >
      <div className="exploreMoreModal">
        <Title level={2} className="exploreMoreModal__header">
          {title}
        </Title>
        <div className="exploreMoreModal__content">
          <div>
            <FormattedMessage
              id="modal.explore.desc"
              defaultMessage="It is time to explore your keyboard and discover new characters!\nIt is simple, just press the marked keys."
            />
          </div>
        </div>
        <div className="exploreMoreModal__footer">
          <div className="exploreMoreModal__footerButtons">
            <Button onClick={closeModal}>
              <FormattedMessage
                id="modal.explore.button.explore"
                defaultMessage="I am ready!"
              />
            </Button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}
