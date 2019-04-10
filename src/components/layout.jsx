/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import Header from './header'
import './layout.css'
import 'typeface-roboto'

const styles = theme => ({
  root: {},
  content: {
    margin: 'auto',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
})

function Layout(props) {
  const {
    children,
    classes,
  } = props

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div className={classes.root}>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div className={classes.content}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <main>{children}</main>
              </Grid>
            </Grid>
          </div>
          <footer>
            ©
            {' '}
            {new Date().getFullYear()}
, Built with
            {' '}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(Layout)
