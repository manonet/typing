import React from 'react';
// @ts-ignore
import { FormattedMessage, Link } from 'gatsby-plugin-intl';

import './Header.scss';

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
      <menu>
        <Link onClick={handleClose} to="/">
          <FormattedMessage id="site.navigation.home" />
        </Link>

        <Link onClick={handleClose} to="/typewriter/">
          <FormattedMessage id="site.navigation.program" />
        </Link>

        <Link onClick={handleClose} to="/statistics/">
          <FormattedMessage id="site.navigation.statistics" />
        </Link>

        <Link onClick={handleClose} to="/pricing/">
          <FormattedMessage id="site.navigation.pricing" />
        </Link>
      </menu>
      <div>{siteTitle}</div>
    </div>
  );
}

export default Header;
