import { useIntl, FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';

import { Layout, SEO } from '@components';

export default function ContributionPage() {
  const intl = useIntl();

  return (
    <Layout className="contribution">
      <SEO title={intl.formatMessage({ id: 'site.contribution' })} />

      <section className="contribution__section">
        <div className="container">
          <h2>
            <FormattedMessage
              id="site.contribution"
              defaultMessage="Contribution"
            />
          </h2>
          <div>
            <p>
              <FormattedMessage
                id="contribution.translate.title"
                defaultMessage="Please help with the translation of the page."
              />
            </p>
            <p>
              <FormattedMessage
                id="contribution.translate.desc"
                defaultMessage="If you understand English (or Hungarian), please help people to use this application in their own native language. Click on the link below for further details:"
              />{' '}
              <ul>
                <li>
                  Details on{' '}
                  <a
                    href="https://gitlab.com/zyxneo/typing/-/blob/dev/CONTRIBUTING.md#translations"
                    target="_blank"
                  >
                    gitlab
                  </a>
                </li>
                <li>
                  Project on{' '}
                  <a
                    href="https://poeditor.com/join/project/eIB3WJcqZ9"
                    target="_blank"
                  >
                    poeditor
                  </a>{' '}
                  translation management system
                </li>
              </ul>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
