import { useIntl, FormattedMessage } from 'gatsby-plugin-intl';
import React from 'react';

import { Layout, SEO } from '@components';

const NotFoundPage = () => {
  const intl = useIntl();

  return (
    <Layout>
      <SEO
        title={intl.formatMessage({
          id: '404.page.title',
          defaultMessage: 'Not found',
        })}
      />
      <h1>
        <FormattedMessage id="404.page.title" defaultMessage="Not found" />
      </h1>
      <p>
        <FormattedMessage
          id="404.page.desc"
          defaultMessage="The page you are looking for could not be found."
        />
      </p>
    </Layout>
  );
};

export default NotFoundPage;
