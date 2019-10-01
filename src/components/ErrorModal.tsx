import React, { ReactNode } from 'react';
// @ts-ignore
import { injectIntl, FormattedMessage } from 'gatsby-plugin-intl';
import { IntlShape } from 'react-intl';

import {
  withStyles,
  createStyles,
  Theme,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

type Props = {
  intl: IntlShape;
  open: boolean;
  title: ReactNode | null;
  content: ReactNode;
  footer: ReactNode;
  handleClose: () => {};
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function ErrorModal(props: Props) {
  const { open, content, footer } = props;

  const title = props.title || <FormattedMessage id="error.title" />;

  const handleClose = () => {
    if (props.handleClose) {
      props.handleClose();
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle onClose={handleClose} id="customized-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        {footer || (
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="modal.ok" />
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default injectIntl(ErrorModal);
