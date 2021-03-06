import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import preval from 'preval.macro';
import React from 'react';

import { LanguageSwitcher } from '@components';
import { getLangCode } from '@intl/languages';
import {
  ROUTE_PATH_CONTACT,
  ROUTE_PATH_FAQ,
  ROUTE_PATH_TERMS_OF_USE,
  ROUTE_PATH_PRIVACY_POLICY,
  ROUTE_PATH_LEGAL_NOTICE,
  ROUTE_PATH_CONTRIBUTION,
} from '@routes';

// @ts-ignore

type Props = {
  appName: string;
  version: string;
};

function Footer(props: Props) {
  const { appName, version } = props;
  const intl = useIntl();
  const lang = intl.locale;
  const langCode = getLangCode(lang);
  const buildTimestamp = preval`module.exports = new Date()`;
  const formattedBuildTime = new Date(buildTimestamp).toLocaleString(langCode);

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
                  to={ROUTE_PATH_CONTACT}
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
                  to={ROUTE_PATH_FAQ}
                >
                  <FormattedMessage id="site.faq" defaultMessage="FAQ" />
                </Link>
              </li>
              <li className="footerNav__item">
                <Link
                  className="footerNav__link interactive interactive--inverse"
                  to={ROUTE_PATH_PRIVACY_POLICY}
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
                  to={ROUTE_PATH_LEGAL_NOTICE}
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
                  to={ROUTE_PATH_TERMS_OF_USE}
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
                  to={ROUTE_PATH_CONTRIBUTION}
                >
                  <FormattedMessage
                    id="site.contribution"
                    defaultMessage="Contribution"
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
            />{' '}
            <FormattedMessage
              id="site.lastupdate"
              defaultMessage="Last update"
              values={{ version }}
            />
            {': '}
            {formattedBuildTime}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
