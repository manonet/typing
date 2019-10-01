import React from 'react';
// @ts-ignore
import { injectIntl, Link } from 'gatsby-plugin-intl';
import { IntlShape } from 'react-intl';

import Layout from '../components/layout';
import SEO from '../components/seo';

type Props = {
  intl: IntlShape;
};

const IndexPage = ({ intl }: Props) => (
  <Layout>
    <SEO lang={intl.locale} title="Manonet" />
    <h1>HomePage</h1>

    <h3>Under development</h3>

    <p>
      You can find more info in{' '}
      <a href="https://github.com/manonet/typing/">Github repository</a>
    </p>
    <Link to="/program/">Go to the Program</Link>
  </Layout>
);

export default injectIntl(IndexPage);
