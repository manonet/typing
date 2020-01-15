/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// @ts-ignore
import { injectIntl } from 'gatsby-plugin-intl';
import { IntlShape } from 'react-intl';
import { useStaticQuery, graphql } from 'gatsby';

type Props = {
  intl: IntlShape;
  description: string | null;
  title?: string;
  meta: [];
  keywords: string;
  lang: string;
};

function SEO({ description, lang, meta, keywords, title, intl }: Props) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            name
          }
        }
      }
    `
  );

  const metaDescription =
    description || intl.formatMessage({ id: 'site.description' });

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.name} - ${intl.formatMessage({
        id: 'site.title',
      })}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: intl.formatMessage({ id: 'site.author' }),
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ]
        .concat(
          typeof keywords !== 'undefined'
            ? {
                name: 'keywords',
                content: keywords,
              }
            : []
        )
        .concat(meta)}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default injectIntl(SEO);
