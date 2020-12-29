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

import { userIsTouching } from '@actions';
import { CookieConsent, Footer, Header } from '@components';
import { State as ReduxState } from '@reducers';

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
                <FormattedMessage
                  id="site.warning.mobile"
                  defaultMessage="It seems that you are using a mobile device. This app only works on a desktop device. In order to learn typewriting with ten fingers and to use this app you need a keyboard."
                />
              </div>
            )}
            {hasHeader && <Header />}
            <main className={classNames('main', className)}>{children}</main>
            <Footer
              appName={data.site.siteMetadata.name}
              version={data.site.siteMetadata.version}
            ></Footer>
            <CookieConsent />
          </div>
        </>
      )}
    />
  );
}
