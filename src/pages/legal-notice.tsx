import { useIntl, FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';

import { Layout, SEO } from '@components';

export default function LegalNoticePage() {
  const intl = useIntl();

  return (
    <Layout className="legalNotice">
      <SEO title={intl.formatMessage({ id: 'site.legalNotice' })} />

      <section className="legalNotice__section">
        <div className="container">
          <h2>
            <FormattedMessage id="site.legalNotice" />
          </h2>
          <div>
            <p>Service provider: Balázs Szilágyi (private person)</p>
            <p>Servers located in hungary at https://tarhely.eu/</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
