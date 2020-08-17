import firebase from 'gatsby-plugin-firebase';
import { FormattedDate } from 'gatsby-plugin-intl';
import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Button from '../components/Button';
import Layout from '../components/Layout';
import SEO from '../components/seo';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export default function Login() {
  const [signedIn, setSignIn] = useState(false);
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

  const user = firebase.auth().currentUser;
  function renderProfile({
    displayName,
    email,
    emailVerified,
    name,
    phoneNumber,
    photoURL,
    uid,
  }) {
    return (
      <div>
        <h1>My App</h1>
        <p>displayName: {displayName}</p>
        <p>email: {email}</p>
        <p>emailVerified {emailVerified ? 'yes' : 'no'}</p>
        <p>phoneNumber {phoneNumber}</p>
        <p>
          photoURL <img src={photoURL} />
        </p>
        <p>
          metadata.creationTime{' '}
          <FormattedDate
            value={user.metadata.creationTime}
            day="numeric"
            month="long"
            year="numeric"
            hour="numeric"
            minute="numeric"
          />
        </p>
        <p>
          metadata.lastSignInTime{' '}
          <FormattedDate
            value={user.metadata.lastSignInTime}
            day="numeric"
            month="long"
            year="numeric"
            hour="numeric"
            minute="numeric"
          />
        </p>
        <Button onClick={() => firebase.auth().signOut()}>Sign-out</Button>
      </div>
    );
  }

  return (
    <Layout>
      <SEO title="Manonet" />
      {!signedIn && user === null ? (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      ) : (
        renderProfile(user)
      )}
    </Layout>
  );
}
