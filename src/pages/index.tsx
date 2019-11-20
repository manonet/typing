import React from 'react';
// @ts-ignore
import { injectIntl } from 'gatsby-plugin-intl';
import { IntlShape } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import AppStatiatics from '../components/AppStatiatics';

import Layout from '../components/layout';
import SEO from '../components/seo';

type Props = {
  intl: IntlShape;
};

const IndexPage = ({ intl }: Props) => (
  <Layout>
    <SEO lang={intl.locale} title="Manonet" />
    <Typography>
      <h1>HomePage</h1>

      <h3>Under development</h3>

      <p>
        You can find more info in{' '}
        <Link href="https://github.com/manonet/typing/">Github repository</Link>
      </p>
      <Link to="/typewriter/">Go to the Typewriter</Link>

      <AppStatiatics />
    </Typography>
  </Layout>
);

export default injectIntl(IndexPage);
