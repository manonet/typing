import { Button, Typography } from 'antd';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';

import { modalCustomStyles } from './modalCustomStyles';

ReactModal.setAppElement('#___gatsby');

const { Title } = Typography;

type Props = {
  isOpen: boolean;
  exploreMore: () => void;
};

export default function ExploreMoreModal({ exploreMore, isOpen }: Props) {
  function handleKeydown(event: KeyboardEvent) {
    event.preventDefault();
    if (event.code === 'Enter') {
      exploreMore && exploreMore();
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
      onRequestClose={exploreMore}
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
            <Button onClick={exploreMore} color="primary">
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
