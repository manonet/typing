import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

type Props = {
  siteTitle: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[900],
      color: '#fff',
    },
  })
);

function Header(props: Props) {
  const { siteTitle } = props;
  const classes = useStyles();

  return (
    <AppBar position="static" color="default" className={classes.root}>
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          {siteTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
