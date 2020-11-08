import { Button } from 'antd';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { flushKeyboard, KeyboardAction } from '../../../actions';
import { State as ReduxState } from '../../../reducers';

type Props = {
  dispatchFlushKeyboard: any;
};

function Header(props: Props) {
  const { dispatchFlushKeyboard } = props;

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
            to="/typewriter/"
          >
            <FormattedMessage id="site.navigation.program" />
          </Link>

          <Link
            className="menu__item"
            activeClassName="menu__item--active"
            to="/statistics/"
          >
            <FormattedMessage id="site.navigation.statistics" />
          </Link>
        </menu>
        <div className="header__userMenu">
          <Button onClick={dispatchFlushKeyboard}>Clear keyboard data</Button>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<ReduxState, undefined, KeyboardAction>
) => ({
  dispatchFlushKeyboard: () => dispatch(flushKeyboard()),
});

export default connect(null, mapDispatchToProps)(Header);
