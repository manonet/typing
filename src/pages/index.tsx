import { Link } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';
import { FormattedMessage } from 'gatsby-plugin-intl';
import React, { useState, useEffect } from 'react';

import Layout from '../components/Layout';
import SEO from '../components/seo';

const IndexPage = () => {
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => setSignIn(!!user));

    // Now you either return just unregisterAuthObserver
    // which will be called when the component is unmounted
    return unregisterAuthObserver;

    // or you create a function if you want more login when the component is unmounted
    // return () => {
    //   unregisterAuthObserver();
    //   console.log("Sdd");
    // }
  }, []); // Important, pass an empty array so to execute useEffect hook only once

  const [signedIn, setSignIn] = useState(false);

  return (
    <Layout>
      <SEO title="Manonet" />
      <h1>HomePage</h1>
      {signedIn && <p>displayName {firebase.auth().currentUser.displayName}</p>}
      <h3>
        <FormattedMessage id="site.underDevelopement" />
      </h3>

      <p>
        <FormattedMessage id="site.description" />
      </p>
      <p>
        You can find more info in{' '}
        <a href="https://github.com/manonet/typing/">Github repository</a>
      </p>
      <Link to="/typewriter/">Go to the Typewriter</Link>
    </Layout>
  );
};

export default IndexPage;
