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
import 'typeface-roboto'

const styles = () => ({
  root: {
    flexGrow: 1,
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
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <main>{children}</main>
                <footer>
                  ©
                  {' '}
                  {new Date().getFullYear()}
      , Built with
                  {' '}
                  <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export default withStyles(styles)(Layout)
