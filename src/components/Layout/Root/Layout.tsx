/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import classNames from 'classnames';
import { StaticQuery, graphql } from 'gatsby';
import { useIntl, FormattedMessage } from 'gatsby-plugin-intl';
import React, { ReactNodeArray } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userIsTouching } from '../../../actions';
import { State as ReduxState } from '../../../reducers';
import CookieConsent from '../../CookieConsent';
import Footer from '../Footer';
import Header from '../Header';
import 'typeface-roboto';

type Props = {
  children: ReactNodeArray;
  className?: string;
  isModalOpen?: boolean;
  hasHeader?: boolean;
};

export default function Layout(props: Props) {
  const { children, className, hasHeader = true, isModalOpen } = props;

  const intl = useIntl();
  const dispatch = useDispatch();

  const { isTouchDevice } = useSelector(
    (state: ReduxState) => state.userIsTouching
  );

  // detect touch event to display mobile warning
  typeof window !== 'undefined' &&
    window.addEventListener(
      'touchstart',
      function onFirstTouch() {
        dispatch(userIsTouching(true));
        window.removeEventListener('touchstart', onFirstTouch, false);
      },
      false
    );

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
              isModalOpen: isModalOpen,
            })}
          >
            {isTouchDevice && (
              <div className="layout__alert">
                <FormattedMessage id="site.warning.mobile" />
              </div>
            )}
            {hasHeader && (
              <Header siteTitle={intl.formatMessage({ id: 'site.title' })} />
            )}
            <main className={classNames('main', className)}>{children}</main>
            <Footer
              appName={data.site.siteMetadata.name}
              version={data.site.siteMetadata.version}
              email={data.site.siteMetadata.email}
            ></Footer>
            <CookieConsent />
          </div>
        </>
      )}
    />
  );
}
