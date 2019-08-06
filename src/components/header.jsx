import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.grey[900],
    color: '#fff',
  },
});

function Header(props) {
  const { classes, siteTitle } = props;

  return (
    <AppBar position="static" color="default" className={classes.root}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {siteTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object,
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default withStyles(styles)(Header);
