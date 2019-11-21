import React from 'react';
// @ts-ignore
import { injectIntl } from 'gatsby-plugin-intl';
import MuiLink from '@material-ui/core/Link';
import { IntlShape } from 'react-intl';
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
    <h1>HomePage</h1>

    <h3>Under development</h3>

    <p>
      You can find more info in{' '}
      <MuiLink href="https://github.com/manonet/typing/">
        Github repository
      </MuiLink>
    </p>
    <MuiLink component={Link} to="/typewriter/">
      Go to the Typewriter
    </MuiLink>

    <AppStatiatics />
  </Layout>
);

export default injectIntl(IndexPage);
