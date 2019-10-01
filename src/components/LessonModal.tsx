import React, { ReactNode } from 'react';
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export interface Props extends WithStyles<typeof styles> {
  open: boolean;
  content: ReactNode;
  onClose: () => {};
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'transparent',
    },
    paper: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    LessonModal__title: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  });

function LessonModal(props: Props) {
  const { classes, onClose, content, ...rest } = props;

  const handleClose = () => {
    onClose();
  };

  const title = 'Lesson summary';

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="LessonModal"
      BackdropProps={{
        classes: {
          root: classes.root,
        },
      }}
      PaperProps={{
        classes: {
          root: classes.paper,
        },
      }}
      {...rest}
    >
      <DialogTitle classes={{ root: classes.LessonModal__title }}>
        {title}
      </DialogTitle>
      <div>{content}</div>
    </Dialog>
  );
}

export default withStyles(styles)(LessonModal);
