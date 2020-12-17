import { Button, Menu, Dropdown } from 'antd';
import { navigate } from 'gatsby';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import React, { useState, useEffect } from 'react';

import {
  ROUTE_PATH_LOGIN,
  ROUTE_PATH_TYPEWRITER,
  ROUTE_PATH_STATISTICS,
} from '../../../routes';
import useFirebase from '../../../utils/useFirebase';

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
      <div className="container header__container">
        <div className="header__siteTitle">
          <span className="header__siteName">
            {'Manonet - '}
            <FormattedMessage id="site.underDevelopement" />
          </span>
        </div>
        <menu className="header__menu menu">
          <Link
            className="menu__item"
            activeClassName="menu__item--active"
            to="/"
          >
            <FormattedMessage id="site.navigation.home" />
          </Link>

          <Link
            className="menu__item"
            activeClassName="menu__item--active"
            to={ROUTE_PATH_TYPEWRITER}
          >
            <FormattedMessage id="site.navigation.program" />
          </Link>

          <Link
            className="menu__item"
            activeClassName="menu__item--active"
            to={ROUTE_PATH_STATISTICS}
          >
            <FormattedMessage id="site.navigation.statistics" />
          </Link>
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
