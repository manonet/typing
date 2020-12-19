// import theme from './src/theme/ant-design-theme.ts';
const path = require('path');

const packageJson = require('./package.json');
const theme = require('./src/theme/ant-design-theme.ts');

module.exports = {
  pathPrefix: '',
  siteMetadata: {
    name: 'ManoNet',
    description: packageJson.description,
    author: packageJson.author,
    email: packageJson.email,
    version: packageJson.version,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-intl',
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [
          'ca',
          'de',
          'en',
          'es',
          'fa',
          'fr',
          'hr',
          'hu',
          'pl',
          'pt-br',
        ],
        // language file path
        defaultLanguage: 'en',
        // option to redirect to `/ko` when connecting `/`
        redirect: true,
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {},
    },
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'UA-4516268-16', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-analytics', // default
          anonymize: true, // default
        },
        googleTagManager: {
          trackingId: '', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-tagmanager', // default
          dataLayerName: 'dataLayer', // default
        },
        facebookPixel: {
          pixelId: '', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-facebook-pixel', // default
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        // environments: ['production', 'development'],
      },
    },
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true,
      },
    },
    {
      resolve: 'gatsby-plugin-less',
      options: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: theme,
        },
      },
    },
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        '@': path.join(__dirname, '/src'),
        '@actions': path.join(__dirname, '/src/actions'),
        '@components': path.join(__dirname, '/src/components'),
        '@images': path.join(__dirname, '/src/images'),
        '@intl': path.join(__dirname, '/src/intl'),
        '@pages': path.join(__dirname, '/src/pages'),
        '@reducers': path.join(__dirname, '/src/reducers'),
        '@routes': path.join(__dirname, '/src/routes.tsx'),
        '@state': path.join(__dirname, '/src/state'),
        '@styles': path.join(__dirname, '/src/styles'),
        '@theme': path.join(__dirname, '/src/theme'),
        '@types': path.join(__dirname, '/src/types'),
        '@utils': path.join(__dirname, '/src/utils'),
      },
    },
  ],
};
