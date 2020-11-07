/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import classNames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import { useIntl } from 'gatsby-plugin-intl';
import React from 'react';
import { Helmet } from 'react-helmet';

import { RtlLangs, getLangCode } from '../intl/languages';

type Props = {
  description?: string | null;
  title?: string;
  meta?: [];
  keywords?: string;
  isModalOpen?: boolean;
};

export default function SEO({
  description,
  isModalOpen,
  keywords,
  meta = [],
  title,
}: Props) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            name
            author
          }
        }
      }
    `
  );

  const intl = useIntl();
  const lang = intl.locale;

  const metaDescription =
    description || intl.formatMessage({ id: 'site.description' });
  const metaKeywords = keywords || [
    intl.formatMessage({ id: 'site.keywords.online' }),
    intl.formatMessage({ id: 'site.keywords.instructor' }),
    intl.formatMessage({ id: 'site.keywords.tutor' }),
    intl.formatMessage({ id: 'site.keywords.tutorial' }),
    intl.formatMessage({ id: 'site.keywords.education' }),
    intl.formatMessage({ id: 'site.keywords.teaching' }),
    intl.formatMessage({ id: 'site.keywords.learning' }),
    intl.formatMessage({ id: 'site.keywords.application' }),
    intl.formatMessage({ id: 'site.keywords.typewriting' }),
    intl.formatMessage({ id: 'site.keywords.typewriter' }),
    intl.formatMessage({ id: 'site.keywords.type' }),
    intl.formatMessage({ id: 'site.keywords.10Thumbs' }),
    intl.formatMessage({ id: 'site.keywords.tenFinger' }),
    intl.formatMessage({ id: 'site.keywords.lessons' }),
    intl.formatMessage({ id: 'site.keywords.practices' }),
    intl.formatMessage({ id: 'site.keywords.course' }),
  ];

  const langCode = getLangCode(lang);
  // for the Right To Left languages add the proper HTML dir attribude
  const dir = RtlLangs.includes(langCode) ? 'rtl' : 'ltr';

  return (
    <Helmet
      htmlAttributes={{
        lang,
        dir,
      }}
      bodyAttributes={{
        class: classNames('body ', { isModalOpen: isModalOpen }),
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
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'keywords',
          content: metaKeywords,
        },
      ].concat(meta)}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      {langCode === 'fa' && (
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Cairo:300,400,500"
        />
      )}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/brands.min.css"
      />
    </Helmet>
  );
}
