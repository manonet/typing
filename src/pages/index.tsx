import React from 'react';
// @ts-ignore
import { injectIntl } from 'gatsby-plugin-intl';
import { Link } from 'gatsby';
import { IntlShape } from 'react-intl';
import AppStatistics from '../components/AppStatistics';

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
      <i className="fa fa-home"></i>Under development
    </h3>

    <p>
      You can find more info in{' '}
      <a href="https://github.com/manonet/typing/">Github repository</a>
    </p>
    <Link to="/typewriter/">Go to the Typewriter</Link>

    <AppStatistics />
  </Layout>
);

export default injectIntl(IndexPage);
