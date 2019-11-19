import React from 'react';
import Link from '@material-ui/core/Link';
import { withPrefix } from 'gatsby-link';
import {
  injectIntl,
  FormattedMessage,
  InjectedIntlProps,
  // @ts-ignore
} from 'gatsby-plugin-intl';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  siteTitle: string;
} & InjectedIntlProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[900],
      color: '#fff',
    },
  })
);

function Header(props: Props) {
  const { siteTitle, intl } = props;
  const { locale } = intl;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" className={classes.root}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleClose}
            component={Link}
            href={withPrefix(`/${locale}/`)}
          >
            <FormattedMessage id="site.navigation.home" />
          </MenuItem>

          <MenuItem
            onClick={handleClose}
            component={Link}
            href={withPrefix(`/${locale}/typewriter/`)}
          >
            <FormattedMessage id="site.navigation.program" />
          </MenuItem>

          <MenuItem
            onClick={handleClose}
            component={Link}
            href={withPrefix(`/${locale}/statistics`)}
          >
            <FormattedMessage id="site.navigation.statistics" />
          </MenuItem>
        </Menu>
        <Typography variant="h6" color="inherit">
          {siteTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default injectIntl(Header);
