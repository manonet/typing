import React from 'react';
// @ts-ignore
import { injectIntl } from 'gatsby-plugin-intl';
import { IntlShape } from 'react-intl';

import Layout from '../../components/Layout';
import SEO from '../../components/seo';

type Props = {
  intl: IntlShape;
};

const IndexPage = ({ intl }: Props) => (
  <Layout>
    <SEO lang={intl.locale} title="Manonet - Styleguide" />
    <h1>Styleguide</h1>
  </Layout>
);

export default injectIntl(IndexPage);
