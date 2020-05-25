/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import classNames from 'classnames';
import { StaticQuery, graphql } from 'gatsby';
import {
  injectIntl,
  // @ts-ignore
  InjectedIntlProps,
  FormattedMessage,
} from 'gatsby-plugin-intl';
import React, { ReactNodeArray } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { userIsTouching, UserIsTouchingAction } from '../../../actions';
import { State as ReduxState } from '../../../reducers';
import Footer from '../Footer';
import Header from '../Header';
import 'typeface-roboto';

type Props = {
  children: ReactNodeArray;
  isBlurred: boolean;
} & InjectedIntlProps;

function Layout(props: Props) {
  const {
    children,
    dispatchUserIsTouching,
    intl,
    isBlurred,
    isTouchDevice,
  } = props;

  // detect touch event to display mobile warning
  window.addEventListener(
    'touchstart',
    function onFirstTouch() {
      dispatchUserIsTouching(true);
      window.removeEventListener('touchstart', onFirstTouch, false);
    },
    false
  );

  console.info('Happy hacking! (۶ૈ ಠ益ಠ)۶ૈ=͟͟͞͞ ⌨');

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
            {isTouchDevice && (
              <div className="layout__alert">
                <FormattedMessage id="site.warning.mobile" />
              </div>
            )}
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
const mapStateToProps = (state: ReduxState) => {
  const { userIsTouching } = state;
  return {
    isTouchDevice: userIsTouching.isTouchDevice,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<ReduxState, undefined, UserIsTouchingAction>
) => ({
  dispatchUserIsTouching: (isTouchDevice: boolean) =>
    dispatch(userIsTouching(isTouchDevice)),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Layout));
