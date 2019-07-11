/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import muiTheme from '../theme'

import Header from './header'
import './layout.css'
import 'typeface-roboto'

const styles = theme => ({
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

function Layout(props) {
  const {
    children,
    classes,
    isBlurred,
  } = props

  const LayoutClasses = classNames(
    classes.root,
    {
      [classes.isBlurred]: isBlurred,
    },
  )

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              name,
              title,
              version
            }
          }
        }
      `}
      render={data => (
        <ThemeProvider theme={muiTheme}>
          <div className={LayoutClasses}>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div className={classes.content}>
              <Grid container spacing={10}>
                <Grid item xs={12}>
                  <main>{children}</main>
                </Grid>
              </Grid>
            </div>
            <footer>
              {data.site.siteMetadata.name} - {data.site.siteMetadata.title} version: {data.site.siteMetadata.version}
            </footer>
          </div>
        </ThemeProvider>
      )}
    />
  )
}

Layout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(Layout)
