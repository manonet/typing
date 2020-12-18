import { useIntl, FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/seo';

export default function PrivacyPolicyPage() {
  const intl = useIntl();

  return (
    <Layout className="privacyPolicy">
      <SEO title={intl.formatMessage({ id: 'site.privacyPolicy' })} />

      <section className="privacyPolicy__section">
        <div className="container">
          <h2>
            <FormattedMessage id="site.privacyPolicy" />
          </h2>

          <h3>
            <FormattedMessage
              id="site.privacyPolicy.cookies.title"
              defaultMessage="Cookies"
            />
          </h3>

          <p>
            <FormattedMessage
              id="site.privacyPolicy.cookies.desc"
              defaultMessage="This list of cookies will be constantly updated, therefore we recommend checking it from time to time."
            />
          </p>

          <div className="table">
            <div className="table__row">
              <div className="table__cell"></div>
              <div className="table__cell"></div>
            </div>
            <div className="table__row">
              <div className="table__cell">
                _ga, _gid, gatsby-gdpr-google-analytics
              </div>
              <div className="table__cell">
                <a href="https://analytics.google.com/" target="_blank">
                  analytics.google.com
                </a>
                <br />
                <a
                  href="https://policies.google.com/technologies/cookies"
                  target="_blank"
                >
                  policies.google.com/technologies/cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
