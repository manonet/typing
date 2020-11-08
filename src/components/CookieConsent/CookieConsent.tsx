import { Button } from 'antd';
import classNames from 'classnames';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import Cookies from 'js-cookie';
import React from 'react';

type Props = {
  className?: string;
};

export const ANALYTICS_CONSENT_COOKIE_NAME = 'gatsby-gdpr-google-analytics';

export default function CookieConsent({ className }: Props) {
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void; // https://stackoverflow.com/questions/53215285/how-can-i-force-component-to-re-render-with-hooks-in-react/58606536#58606536

  function setCookieConsent() {
    Cookies.set(ANALYTICS_CONSENT_COOKIE_NAME, 'true', { expires: 365 });
    forceUpdate();
  }

  if (Cookies.get(ANALYTICS_CONSENT_COOKIE_NAME) === 'true') {
    return null;
  }

  return (
    <div className={classNames('cookieConsent', className)}>
      <div className="cookieConsent__desc">
        <FormattedMessage
          id="site.cookieConsent.desc"
          defaultMessage="We use cookies to ensure that we give you the best experience on our website. If you continue to use this site we will assume that you are happy with it."
        />
        &nbsp;
        <Link className="cookieConsent__link interactive" to="/privacy-policy">
          <FormattedMessage
            id="site.cookieConsent.moreDetails"
            defaultMessage="More details"
          />
        </Link>
      </div>
      <Button className="cookieConsent__ok" onClick={setCookieConsent}>
        <FormattedMessage id="site.cookieConsent.allow" defaultMessage="OK" />
      </Button>
    </div>
  );
}
