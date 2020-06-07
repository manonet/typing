/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { useStaticQuery, graphql } from 'gatsby';
import { injectIntl } from 'gatsby-plugin-intl';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
// @ts-ignore
import { IntlShape } from 'react-intl';

type Props = {
  intl: IntlShape;
  description: string | null;
  title?: string;
  meta: [];
  keywords: string;
  lang: string;
};

const RtlLangs = [
  'ae' /* Avestan */,
  'ar' /* 'العربية', Arabic */,
  'arc' /* Aramaic */,
  'arz' /* 'مصرى', Egyptian  */,
  'azb' /* 'تۆرکجه', Azeri, Azerbaijani  */,
  'bcc' /* 'بلوچی مکرانی', Southern Balochi */,
  'bqi' /* 'بختياري', Bakthiari */,
  'ckb' /* 'Soranî / کوردی', Sorani */,
  'dv' /* 'ދިވެހިބަސް', Dhivehi */,
  'fa' /* 'فارسی', Persian, Farsi */,
  'glk' /* 'گیلکی', Gilaki */,
  'he' /* 'עברית', Hebrew */,
  'ku' /* 'Kurdî / كوردی', Kurdish */,
  'mzn' /* 'مازِرونی', Mazanderani */,
  'nqo' /* 'ߒߞߏ', N'Ko */,
  'pnb' /* 'پنجابی', Western Punjabi */,
  'ps' /* 'پښتو', Pashto, */,
  'sd' /* 'سنڌي', Sindhi */,
  'ug' /* 'Uyghurche / ئۇيغۇرچە', Uyghur */,
  'ur' /* 'اردو', Urdu */,
  'yi' /* 'ייִדיש', Yiddish */,
];

function SEO({ description, intl, keywords, lang, meta, title }: Props) {
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

  // Ensure that land string can be matched with RtlLangs
  const langCode = lang.replace(/([\-\_].+)/, '').toLowerCase();
  // for the Right To Left languages add the proper HTML dir attribude
  const dir = RtlLangs.includes(langCode) ? 'rtl' : 'ltr';

  return (
    <Helmet
      htmlAttributes={{
        lang,
        dir,
      }}
      bodyAttributes={{
        class: 'body',
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
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/brands.min.css"
      />
      {/* Global site tag (gtag.js) - Google Analytics */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-4516268-16"
      ></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-4516268-16');
        `}
      </script>
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
