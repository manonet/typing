import React from 'react'
import { injectIntl, FormattedMessage } from 'gatsby-plugin-intl'

import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = ({ intl }) => (
  <Layout>
    <SEO
      lang={intl.locale}
      title={intl.formatMessage({ id: '404.page.title' })}
    />
    <h1><FormattedMessage id="404.page.title" /></h1>
    <p><FormattedMessage id="404.page.desc" /></p>
  </Layout>
)

export default injectIntl(NotFoundPage)
