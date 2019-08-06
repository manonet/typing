/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import { injectIntl } from 'gatsby-plugin-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StaticQuery, graphql } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import muiTheme from '../theme';

import Header from './header';
import './layout.css';
import 'typeface-roboto';
import { incrementNumber } from '../actions';
import LanguageSwitcher from './LanguageSwitcher';

const Counter = ({ count, increment }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
  </div>
);

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
};

const mapStateToProps = ({ count }) => ({ count });

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(incrementNumber(2)),
});

const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

const styles = (theme) => ({
  root: {
    transition: '.2s filter ease-in-out',
  },
  isBlurred: {
    filter: 'blur(6px)',
  },
  content: {
    margin: 'auto',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
});

function Layout(props) {
  const { children, classes, isBlurred, intl } = props;

  const LayoutClasses = classNames(classes.root, {
    [classes.isBlurred]: isBlurred,
  });

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
        <ThemeProvider theme={muiTheme}>
          <div className={LayoutClasses}>
            <Header siteTitle={intl.formatMessage({ id: 'site.title' })} />
            <div className={classes.content}>
              <Grid container spacing={10}>
                <Grid item xs={12}>
                  <main>{children}</main>
                </Grid>
              </Grid>
            </div>
            <ConnectedCounter />
            <footer>
              <LanguageSwitcher />
              {data.site.siteMetadata.name} - version:{' '}
              {data.site.siteMetadata.version}
            </footer>
          </div>
        </ThemeProvider>
      )}
    />
  );
}

Layout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default injectIntl(withStyles(styles)(Layout));
