import React, { ReactNode } from 'react';
// @ts-ignore
import { injectIntl, FormattedMessage } from 'gatsby-plugin-intl';
import { IntlShape } from 'react-intl';

import Button from './Button';

type Props = {
  intl: IntlShape;
  open: boolean;
  title: ReactNode | null;
  content: ReactNode;
  footer: ReactNode;
  handleClose: () => {};
};

function LessonModal(props: Props) {
  const { open, content, footer } = props;

  const title = props.title || <FormattedMessage id="error.title" />;

  const handleClose = () => {
    if (props.handleClose) {
      props.handleClose();
    }
  };

  return (
    <div
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <div onClose={handleClose} id="customized-dialog-title">
        {title}
      </div>
      <div>{content}</div>
      <div>
        {footer || (
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="modal.ok" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default injectIntl(LessonModal);
