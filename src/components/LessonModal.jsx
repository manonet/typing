import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const styles = (theme) => ({
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

class LessonModal extends React.Component {
  constructor() {
    super();

    this.handleClose = this.handleClose.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleClose() {
    const { onClose } = this.props;
    onClose();
  }

  handleListItemClick(value) {
    const { onClose } = this.props;
    onClose(value);
  }

  render() {
    const { classes, onClose, content, ...rest } = this.props;

    const title = 'Lesson summary';

    return (
      <Dialog
        onClose={this.handleClose}
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
}

LessonModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles)(LessonModal);
