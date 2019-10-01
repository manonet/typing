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
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { StaticQuery, graphql } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import muiTheme from '../theme';

import Header from './header';
import './layout.css';
import 'typeface-roboto';
import { incrementNumber, incrementAction } from '../actions';
import LanguageSwitcher from './LanguageSwitcher';

import { State as ReduxState } from '../state/initialState';

type Props = {
  children: ReactNodeArray;
  isBlurred: boolean;
} & InjectedIntlProps;

const Counter = ({
  count,
  increment,
}: {
  count: number;
  increment: () => {};
}) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
  </div>
);

const mapStateToProps = ({ count }: { count: number }) => ({ count });

const mapDispatchToProps = (
  dispatch: ThunkDispatch<ReduxState, undefined, incrementAction>
) => ({
  increment: () => dispatch(incrementNumber(2)),
});

const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

function Layout(props: Props) {
  const { children, isBlurred, intl } = props;
  const classes = useStyles();

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

export default injectIntl(Layout);