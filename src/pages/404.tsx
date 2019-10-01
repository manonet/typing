import React from 'react';
// @ts-ignore
import { injectIntl, FormattedMessage } from 'gatsby-plugin-intl';
import { IntlShape } from 'react-intl';

import Layout from '../components/layout';
import SEO from '../components/seo';

type Props = {
  intl: IntlShape;
};

const NotFoundPage = ({ intl }: Props) => (
  <Layout>
    <SEO
      lang={intl.locale}
      title={intl.formatMessage({ id: '404.page.title' })}
    />
    <h1>
      <FormattedMessage id="404.page.title" />
    </h1>
    <p>
      <FormattedMessage id="404.page.desc" />
    </p>
  </Layout>
);

export default injectIntl(NotFoundPage);
