import React from 'react';
import { injectIntl, Link } from 'gatsby-plugin-intl';

import Button from '@material-ui/core/Button';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ intl }) => (
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
