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
import Footer from '../Footer';
import 'typeface-roboto';

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
              email
              name
              version
            }
          }
        }
      `}
      render={(data) => (
        <>
          <div
            className={classNames('layout', {
              isBlurred: isBlurred,
            })}
          >
            <Header siteTitle={intl.formatMessage({ id: 'site.title' })} />
            <div className="content">
              <main>{children}</main>
            </div>
            <Footer
              appName={data.site.siteMetadata.name}
              version={data.site.siteMetadata.version}
              email={data.site.siteMetadata.email}
            ></Footer>
          </div>
        </>
      )}
    />
  );
}

export default injectIntl(Layout);
