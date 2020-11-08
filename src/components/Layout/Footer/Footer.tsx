import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import React from 'react';

// @ts-ignore
import LanguageSwitcher from '../../../components/LanguageSwitcher';

type Props = {
  appName: string;
  version: string;
  email: string;
};

function Footer(props: Props) {
  const { appName, email, version } = props;

  return (
    <footer className="footer inverse">
      <div className="container footer__container">
        <div className="footer__menu">
          <nav className="footerNav">
            <h3 className="footerNav__title">
              <FormattedMessage
                id="site.contactInfo"
                defaultMessage="Contact Info"
              />
            </h3>
            <ul className="footerNav__list">
              <li className="footerNav__item">
                <i className="fa fa-envelope"></i>
                <Link
                  className="footerNav__link interactive interactive--inverse"
                  to="/contact"
                >
                  <FormattedMessage id="site.email" defaultMessage="Email" />
                </Link>
              </li>
              <li className="footerNav__item">
                <i className="fab fa-facebook"></i>
                <a
                  className="footerNav__link interactive interactive--inverse"
                  href="https://www.facebook.com/manonet/"
                >
                  Facebook
                </a>
              </li>
              <li className="footerNav__item">
                <i className="fab fa-github"></i>
                <a
                  className="footerNav__link interactive interactive--inverse"
                  href="https://github.com/manonet/typing"
                >
                  Github
                </a>
              </li>
              <li className="footerNav__item">
                <i className="fab fa-gitlab"></i>
                <a
                  className="footerNav__link interactive interactive--inverse"
                  href="https://gitlab.com/zyxneo/typing"
                >
                  Gitlab
                </a>
              </li>
            </ul>
          </nav>

          <nav className="footerNav">
            <h3 className="footerNav__title">
              <FormattedMessage
                id="site.customerSupport"
                defaultMessage="Customer Support"
              />
            </h3>
            <ul className="footerNav__list">
              <li className="footerNav__item">
                <Link
                  className="footerNav__link interactive interactive--inverse"
                  to="/terms-of-use"
                >
                  <FormattedMessage
                    id="site.termsOfUse"
                    defaultMessage="Terms of use"
                  />
                </Link>
              </li>
              <li className="footerNav__item">
                <Link
                  className="footerNav__link interactive interactive--inverse"
                  to="/privacy-policy"
                >
                  <FormattedMessage
                    id="site.privacyPolicy"
                    defaultMessage="Privacy policy"
                  />
                </Link>
              </li>
              <li className="footerNav__item">
                <Link
                  className="footerNav__link interactive interactive--inverse"
                  to="/legal-notice"
                >
                  <FormattedMessage
                    id="site.legalNotice"
                    defaultMessage="Legal Notice"
                  />
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="footerNav">
            <h3 className="footerNav__title">
              <FormattedMessage id="site.about" defaultMessage="About" />
            </h3>
            <ul className="footerNav__list">
              <li className="footerNav__item">
                <Link
                  className="footerNav__link interactive interactive--inverse"
                  to="/terms-of-use"
                >
                  <FormattedMessage
                    id="site.termsOfUse"
                    defaultMessage="Terms of use"
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <LanguageSwitcher className="footer__languages" />
      </div>

      <div className="footer__bottom">
        <div className="container footer__container">
          <div className="footer__copy">
            © {new Date().getFullYear()} {appName}.{' '}
            <FormattedMessage
              id="site.copyright"
              defaultMessage="All rights reserved."
            />
          </div>
          <div className="footer__version">
            <FormattedMessage
              id="site.version"
              defaultMessage="version: {version}"
              values={{ version }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
