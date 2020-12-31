import { Button, Menu, Dropdown } from 'antd';
import { navigate } from 'gatsby';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import React, { useState, useEffect } from 'react';

import {
  ROUTE_PATH_LOGIN,
  ROUTE_PATH_TYPEWRITER,
  ROUTE_PATH_STATISTICS,
} from '@routes';
import useFirebase from '@utils/useFirebase';

function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const firebase = useFirebase();

  useEffect(() => {
    if (!firebase) return;
    // @ts-ignore
    return firebase.auth().onAuthStateChanged((user: any) => {
      setIsSignedIn(!!user);
    });
  }, [firebase]);

  // TODO - Delete it after 2020 Jan 30, because old cookies will expire on that day.
  const cookieValue = document && document.cookie;
  const cookies = cookieValue && cookieValue.split('; ');
  const cookieRows =
    cookies && cookies.find((row) => row.startsWith('mano_typing'));
  const oldFlashCookieRows = cookieRows && cookieRows.split('=')[1];
  const oldFlashProps =
    oldFlashCookieRows && JSON.parse(decodeURIComponent(oldFlashCookieRows));

  function userMenu(firebase: any) {
    return (
      <Menu>
        <Menu.Item onClick={() => firebase.auth().signOut()}>
          <FormattedMessage id="site.logout" defaultMessage="Sign-out" />
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <div className="header">
      {/* TODO - Delete it after 2020 Jan 30, because old cookies will expire on that day. */}
      {oldFlashCookieRows && (
        <div className="TEMPORARY-DEPRECATED-WARNING">
          A régi programot{' '}
          <a href="http://flash.manonet.org/" target="_blank">
            itt
          </a>{' '}
          találod.
          {oldFlashProps &&
            ` Itt tartottál: ${oldFlashProps.lesson}. lecke ${oldFlashProps.practice}. gyakorlat.`}
        </div>
      )}
      <div className="container header__container">
        <div className="header__siteTitle">
          <span className="header__siteName">
            {'Manonet - '}
            <FormattedMessage
              id="site.underDevelopement"
              defaultMessage="Under development"
            />
          </span>
        </div>
        <menu className="header__menu menu">
          <Link
            className="menu__item"
            activeClassName="menu__item--active"
            to="/"
          >
            <FormattedMessage id="site.navigation.home" defaultMessage="Home" />
          </Link>

          <Link
            className="menu__item"
            activeClassName="menu__item--active"
            to={ROUTE_PATH_TYPEWRITER}
          >
            <FormattedMessage
              id="site.navigation.program"
              defaultMessage="Typewriter application"
            />
          </Link>

          {process.env.NODE_ENV !== 'production' && (
            <Link
              className="menu__item"
              activeClassName="menu__item--active"
              to={ROUTE_PATH_STATISTICS}
            >
              <FormattedMessage
                id="site.navigation.statistics"
                defaultMessage="Statistics"
              />
            </Link>
          )}
        </menu>
        <div className="header__userMenu">
          {firebase && isSignedIn ? (
            <Dropdown overlay={userMenu(firebase)} arrow trigger={['click']}>
              <div className="userMenu">
                <img
                  className="userMenu__photo"
                  // @ts-ignore
                  src={firebase.auth().currentUser.photoURL}
                  // @ts-ignore
                  alt={firebase.auth().currentUser.displayName}
                />
                <div className="userMenu__displayName">
                  {
                    // @ts-ignore
                    firebase.auth().currentUser.displayName
                  }
                </div>
              </div>
            </Dropdown>
          ) : (
            <Button
              size="small"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  navigate(ROUTE_PATH_LOGIN);
                }
              }}
            >
              <FormattedMessage id="site.login" defaultMessage="Sign in" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
