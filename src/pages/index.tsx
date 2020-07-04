import { Link } from 'gatsby';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Manonet" />
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

export default IndexPage;
