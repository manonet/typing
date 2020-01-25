import React from 'react';
// @ts-ignore
import { FormattedMessage, Link } from 'gatsby-plugin-intl';

type Props = {
  siteTitle: string;
};

function Header(props: Props) {
  const { siteTitle } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <div className="header__siteTitle">
        <span className="header__siteName">{siteTitle}</span>
      </div>
      <menu className="header__menu menu">
        <Link
          className="menu__item"
          activeClassName="menu__item--active"
          onClick={handleClose}
          to="/"
        >
          <FormattedMessage id="site.navigation.home" />
        </Link>

        <Link
          className="menu__item"
          activeClassName="menu__item--active"
          onClick={handleClose}
          to="/typewriter/"
        >
          <FormattedMessage id="site.navigation.program" />
        </Link>

        <Link
          className="menu__item"
          activeClassName="menu__item--active"
          onClick={handleClose}
          to="/statistics/"
        >
          <FormattedMessage id="site.navigation.statistics" />
        </Link>

        <Link
          className="menu__item"
          activeClassName="menu__item--active"
          onClick={handleClose}
          to="/pricing/"
        >
          <FormattedMessage id="site.navigation.pricing" />
        </Link>
      </menu>
    </div>
  );
}

export default Header;
