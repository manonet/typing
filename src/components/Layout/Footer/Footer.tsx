import React from 'react';
// @ts-ignore
import { FormattedMessage } from 'gatsby-plugin-intl';
import LanguageSwitcher from '../../../components/LanguageSwitcher';

type Props = {
  appName: string;
  version: string;
};

function Header(props: Props) {
  const { appName, version } = props;

  return (
    <footer className="footer inverse">
      <div className="footer__container">
        <LanguageSwitcher className="footer__languages" />
        <div className="footer__bottom">
          <div className="footer__copy">
            © {new Date().getFullYear()} {appName}.{' '}
            <FormattedMessage
              id="site.copyright"
              defaultMessage="All rights reserved."
            />
          </div>
          <div className="footer__version">version: {version}</div>
        </div>
      </div>
    </footer>
  );
}

export default Header;
