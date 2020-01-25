/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { ReactNodeArray } from 'react';
import classNames from 'classnames';
// @ts-ignore
import { injectIntl, InjectedIntlProps } from 'gatsby-plugin-intl';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../Header';
import 'typeface-roboto';
import LanguageSwitcher from '../../components/LanguageSwitcher';

type Props = {
  children: ReactNodeArray;
  isBlurred: boolean;
} & InjectedIntlProps;

function Layout(props: Props) {
  const { children, isBlurred, intl } = props;

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              name
              version
            }
          }
        }
      `}
      render={(data) => (
        <>
          <div
            className={classNames({
              isBlurred: isBlurred,
            })}
          >
            <Header siteTitle={intl.formatMessage({ id: 'site.title' })} />
            <div className="content">
              <main>{children}</main>
            </div>
            <footer>
              <LanguageSwitcher />
              {data.site.siteMetadata.name} - version:{' '}
              {data.site.siteMetadata.version}
            </footer>
          </div>
        </>
      )}
    />
  );
}

export default injectIntl(Layout);
