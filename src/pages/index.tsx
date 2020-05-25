import { Link } from 'gatsby';
import { injectIntl, FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';
// @ts-ignore
import { IntlShape } from 'react-intl';

import Layout from '../components/Layout';
import SEO from '../components/seo';

type Props = {
  intl: IntlShape;
};

const IndexPage = ({ intl }: Props) => (
  <Layout>
    <SEO lang={intl.locale} title="Manonet" />
    <h1>HomePage</h1>

    <h3>
      <FormattedMessage id="site.underDevelopement" />
    </h3>

    <p>
      <FormattedMessage id="site.description" />
    </p>
    <p>
      You can find more info in{' '}
      <a href="https://github.com/manonet/typing/">Github repository</a>
    </p>
    <Link to="/typewriter/">Go to the Typewriter</Link>
  </Layout>
);

export default injectIntl(IndexPage);
